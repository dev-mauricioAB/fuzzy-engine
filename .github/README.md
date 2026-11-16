# Agent tooling

Skills are checked in, so a new project does not need to discover and install them again.
They are authoring guidance, not application dependencies or executable permissions.

## Inventory

| Collection | Included skills | Provenance |
|------------|-----------------|------------|
| Spec Kit 1.4.0 | specify, clarify, plan, tasks, analyze, checklist, implement, converge, constitution | `.github/skills/speckit-*`, `.specify/` manifests and [MIT license](../.specify/LICENSE) |
| Impeccable 4.9.1 | UI workflow, playbooks, launcher, four companion agent definitions | [Skill](./skills/impeccable/SKILL.md), bundled LICENSE/NOTICE, `scripts/VERSION` and engine checksums |
| Humanizer | Prose authoring | [Skill](../.agents/skills/humanizer/SKILL.md), bundled MIT license |
| Engineering | NestJS, TanStack Query, Playwright, Vercel React | Pinned refs and folder hashes in [skills lock](../skills-lock.json) |
| Superpowers | All 15 skills at the pinned revision, including planning, review, TDD, debugging, and verification | Pinned refs and hashes in skills lock |
| PM Skills selection | New-product assumptions, prioritization, experiments, interview script/synthesis, competitors, market segments/sizing, personas | Pinned refs and hashes in skills lock |

Copilot reads `.github/skills` and `.agents/skills` where supported. Reload the client and
verify discovery if skills do not appear. Agent definitions are available but do not grant
automatic delegation. No plugin marketplace, bootstrap, active hook, or visual-companion
service is configured. Review scripts before execution, especially launcher downloads.

Keep all bundled licenses and [additional notices](../.agents/THIRD_PARTY_NOTICES.txt).
NestJS/React declare MIT in frontmatter without a standalone upstream license file in their
recorded revisions. Humanizer's existing lock entry has no source ref: its bundled content
and hash are preserved, but it does not have the same ref-based restore guarantee.

## Deliberate updates

Do not reinstall tooling on every project start. Review upstream changes and license notices
before an update. Do not edit pinned skill prose to resolve conflicts; constrain routing in
repository instructions instead. Upstream TDD restart/full-suite directions do not override
the project's safety or focused-test policy. Superpowers planning and execution guidance
does not replace Spec Kit artifacts or authorize worktrees, agent dispatch, commits, hooks,
or script execution. Diagnostic exports and external reports require user approval.

For a deliberate restore of the ref-pinned shared skills, run from the project root in a
dedicated PowerShell process with Node/npm available:

```powershell
$env:DISABLE_TELEMETRY = '1'
$env:DO_NOT_TRACK = '1'
$env:npm_config_ignore_scripts = 'true'
$lock = Get-Content .\skills-lock.json -Raw | ConvertFrom-Json
foreach ($property in $lock.skills.PSObject.Properties) {
    $entry = $property.Value
    if (-not $entry.ref) { continue }
    $folder = $entry.skillPath -replace '/SKILL\.md$', ''
    $source = "https://github.com/$($entry.source)/tree/$($entry.ref)/$folder"
    npx --yes skills@1.8.1 add $source --skill $property.Name --agent github-copilot --copy --yes
    if ($LASTEXITCODE -ne 0) { throw "Skill restore failed: $($property.Name)" }
}
```

Verify content and lockfile diffs afterwards. Never run this with global-install flags.
This command restores the ref-pinned shared skills only, not Impeccable, Humanizer, or Spec Kit.
Their bundled copies are available directly from this repository's committed revision.

Spec Kit installation manifests record upstream baselines; local templates such as the
test-first tasks template are intentional customizations. Review updates so they do not
silently replace project policy. No extension hook configuration is included.

## Responsibility boundaries

Read [Copilot routing](./copilot-instructions.md) and the
[constitution](../.specify/memory/constitution.md). Spec Kit owns feature artifacts,
Impeccable UI, Humanizer prose, and engineering skills their matching implementation context.
PM skills inform discovery and require real evidence. No skill authorizes fabricated facts,
unrequested documents, external data access, deployments, commits, or agent workflows.
