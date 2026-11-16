#!/usr/bin/env node
// Validates template integrity: vendored skill hashes, Spec Kit manifests, project-owned
// skill metadata, and relative Markdown links. Uses only Node.js built-ins.
// Usage: node scripts/validate-template.mjs
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const notes = [];
const toPosix = (p) => p.split(sep).join('/');

// Local customizations of Spec Kit baseline files. Keep this list in sync with .github/README.md.
const SPEC_KIT_CUSTOMIZED = new Set([
  '.specify/.gitignore',
  '.specify/templates/plan-template.md',
  '.specify/templates/tasks-template.md',
]);
// Skills written for this template rather than vendored from upstream.
const PROJECT_OWNED_SKILLS = new Set(['start-project', 'next-slice', 'verify-slice']);

function normalizeLineEndings(buf) {
  if (buf.includes(0) || !buf.includes('\r\n')) return buf;
  return Buffer.from(buf.toString('latin1').replaceAll('\r\n', '\n'), 'latin1');
}

// Mirrors the folder hash used by the Skills CLI lock file (skills@1.8.1).
function skillFolderHash(dir) {
  const files = [];
  const walk = (current, prefix) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (['.git', '__pycache__', '__pypackages__'].includes(entry.name)) continue;
        walk(join(current, entry.name), `${prefix}${entry.name}/`);
      } else if (entry.isFile() && entry.name !== 'metadata.json') {
        files.push({ path: Buffer.from(prefix + entry.name, 'utf-8'), content: normalizeLineEndings(readFileSync(join(current, entry.name))) });
      }
    }
  };
  walk(dir, '');
  files.sort((a, b) => Buffer.compare(a.path, b.path));
  const hash = createHash('sha256');
  for (const { path, content } of files) {
    hash.update(path).update('\0').update(String(content.length)).update('\0').update(content);
  }
  return hash.digest('hex');
}

function checkSkillsLock() {
  const lock = JSON.parse(readFileSync(join(root, 'skills-lock.json'), 'utf-8'));
  const locked = new Set(Object.keys(lock.skills));
  for (const [name, entry] of Object.entries(lock.skills)) {
    const dir = join(root, '.agents', 'skills', name);
    if (!existsSync(join(dir, 'SKILL.md'))) {
      errors.push(`skills-lock: ${name} has no .agents/skills/${name}/SKILL.md`);
      continue;
    }
    if (skillFolderHash(dir) !== entry.computedHash) {
      errors.push(`skills-lock: .agents/skills/${name} does not match its locked hash`);
    }
  }
  for (const entry of readdirSync(join(root, '.agents', 'skills'), { withFileTypes: true })) {
    if (entry.isDirectory() && !locked.has(entry.name)) {
      errors.push(`skills-lock: .agents/skills/${entry.name} is not recorded in skills-lock.json`);
    }
  }
  notes.push(`skills-lock: checked ${locked.size} skills`);
}

function checkSpecKitManifests() {
  const dir = join(root, '.specify', 'integrations');
  let count = 0;
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.manifest.json'))) {
    const manifest = JSON.parse(readFileSync(join(dir, file), 'utf-8'));
    for (const [path, expected] of Object.entries(manifest.files)) {
      count += 1;
      const full = join(root, path);
      if (!existsSync(full)) {
        errors.push(`spec-kit: ${path} listed in ${file} is missing`);
        continue;
      }
      const actual = createHash('sha256').update(normalizeLineEndings(readFileSync(full))).digest('hex');
      if (actual === expected) continue;
      if (SPEC_KIT_CUSTOMIZED.has(path)) notes.push(`spec-kit: ${path} is a documented local customization`);
      else errors.push(`spec-kit: ${path} differs from ${file} without a documented customization`);
    }
  }
  notes.push(`spec-kit: checked ${count} manifest entries`);
}

function checkProjectSkills() {
  for (const name of PROJECT_OWNED_SKILLS) {
    const file = join(root, '.github', 'skills', name, 'SKILL.md');
    if (!existsSync(file)) {
      errors.push(`project skill: .github/skills/${name}/SKILL.md is missing`);
      continue;
    }
    const front = readFileSync(file, 'utf-8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const nameLine = front?.[1].match(/^name:\s*(.+)$/m)?.[1].trim().replace(/^["']|["']$/g, '');
    const hasDescription = /^description:\s*\S/m.test(front?.[1] ?? '');
    if (nameLine !== name || !hasDescription) {
      errors.push(`project skill: ${name} needs frontmatter with name: ${name} and a description`);
    }
  }
}

const VENDORED = ['.agents/skills/', '.github/skills/', '.specify/', 'node_modules/', '.git/'];
const PROJECT_OWNED_UNDER_VENDORED = ['.specify/memory/', ...[...PROJECT_OWNED_SKILLS].map((s) => `.github/skills/${s}/`)];

function markdownFiles(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    const rel = toPosix(relative(root, full)) + (entry.isDirectory() ? '/' : '');
    const owned = PROJECT_OWNED_UNDER_VENDORED.some((p) => rel.startsWith(p) || p.startsWith(rel));
    if (VENDORED.some((p) => rel.startsWith(p)) && !owned) continue;
    if (entry.isDirectory()) markdownFiles(full, out);
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

function checkMarkdownLinks() {
  const files = markdownFiles(root);
  for (const file of files) {
    const text = readFileSync(file, 'utf-8').replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
    for (const match of text.matchAll(/\]\(<?([^)\s>]+)>?(?:\s+"[^"]*")?\)/g)) {
      const target = match[1];
      if (/^(https?:|mailto:|#)/.test(target)) continue;
      const path = decodeURIComponent(target.split('#')[0]);
      if (!existsSync(resolve(dirname(file), path))) {
        errors.push(`link: ${toPosix(relative(root, file))} -> ${target} does not exist`);
      }
    }
  }
  notes.push(`links: checked ${files.length} project-owned Markdown files`);
}

for (const check of [checkSkillsLock, checkSpecKitManifests, checkProjectSkills, checkMarkdownLinks]) {
  try {
    check();
  } catch (error) {
    errors.push(`${check.name}: ${error.message}`);
  }
}

for (const note of notes) console.log(`ok   ${note}`);
for (const error of errors) console.error(`FAIL ${error}`);
console.log(errors.length ? `\n${errors.length} problem(s) found.` : '\nTemplate validation passed.');
process.exitCode = errors.length ? 1 : 0;
