# Toolchain and dependency updates

## Node.js and pnpm

- Use a Node.js LTS line. Production should run Active or Maintenance LTS; check the
  [Node.js release table](https://nodejs.org/en/about/previous-releases) when scaffolding
  rather than copying a version from this file. On 2026-11-16, v22, v24, and v26 were LTS.
- At scaffolding, pin the same major in three places: `.nvmrc` (read by CI through
  `node-version-file`), `engines.node` in `package.json`, and the hosting runtime setting.
- Pin pnpm with the `packageManager` field in `package.json`, for example
  `"packageManager": "pnpm@<version>"`, so local installs and CI use the same version.
- Commit `pnpm-lock.yaml`. CI installs with `--frozen-lockfile`.
- This template has no `package.json`. Its only script needs a Node.js version that
  supports ES modules and `node:` imports; any current LTS line works.

## Updating dependencies

- Enable Dependabot version updates for `npm` in the consuming project once
  `package.json` exists. Extend [dependabot.yml](../.github/dependabot.yml) with an
  `npm` entry on a weekly or monthly schedule, and group minor and patch updates.
- Merge only after CI passes. Read release notes for major versions, and handle each
  major update in its own pull request.
- Resolve peer dependency conflicts by choosing compatible versions. Do not use
  `--force` or legacy peer resolution to make an install succeed.
- New dependencies need a stated need in the plan or an ADR, a license compatible with
  the project, and a check of install scripts. Recent pnpm versions do not run dependency
  build scripts unless the project allows them; keep that allowlist short and reviewed.

## Updating this template's tooling

Vendored skills and Spec Kit change only through deliberate, reviewed updates (see
[agent tooling](../.github/README.md)). After any update, run
`node scripts/validate-template.mjs` and update `skills-lock.json` or the Spec Kit
manifests in the same change.
