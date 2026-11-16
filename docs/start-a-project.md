# Start a project

## 1. Choose the scope

Select [landing](../profiles/landing/README.md) or
[full stack](../profiles/full-stack/README.md). Use one profile in a consuming repository.
The profile folders are guides, not pnpm packages. There is no profile-switching generator.

For a landing page, keep backend/database dependencies out. If a form needs a service,
first choose and authorize its destination; do not make a local success message pretend
that a submission was delivered.

For a full-stack application, identify the smallest useful frontend/API/data slice.
Backend infrastructure is required only when the project actually needs it.

## 2. Establish project context

Use the [brief template](./project-brief-template.md) to create the new project's root
`PRODUCT.md`. Fill it from confirmed requirements. Leave unresolved facts explicitly open.
Do not treat placeholders or skill examples as product decisions.

Confirm:

- Audience, problem, primary action, and evidence supporting the proposed value.
- Selected profile, included/excluded capabilities, first slice, and acceptance criteria.
- Content ownership, external data permissions, privacy constraints, and secret handling.
- UI locale, supported devices, accessibility target, and relevant SEO requirements.
- Visual direction and required states, using Impeccable before user-facing UI code.
- Named critical journeys and failure cases, plus any deployment/cost constraints.

Product-discovery skills are available for uncertain assumptions, research, interviews,
segments, and personas. Use observed evidence; do not manufacture research to complete a template.

## 3. Specify and plan

The copied Spec Kit integration uses Python scripts and provides PowerShell alternatives.
Have Git and Python 3.11+ available for the default Python workflow. No package installation
is required just to read the guidance. Copilot skill discovery varies by client; reload the
window if needed and check the skill inventory.

Use `/speckit-specify` for the first feature, `/speckit-clarify` for material ambiguities,
then `/speckit-plan` and `/speckit-tasks`. These are Copilot skills when supported,
not commands to run in PowerShell. If unavailable, read their local `SKILL.md` instructions
and report the client limitation.

The [constitution](../.specify/memory/constitution.md) already contains generic engineering
policy. Use `/speckit-constitution` only when an actual amendment is needed.
Simple landing features can use compact artifacts; do not invent a database model or API
contract for a static page.

Plans must distinguish intended commands from commands verified against actual files.
Tasks must put compatible runner/CI setup before behavioral tests, and a focused failing
test before its dependent implementation. Do not copy illustrative tasks unchanged.

## 4. Scaffold the selected profile

This step is future work in the consuming project. Use package-manager/scaffolding tools,
verify current compatibility, and pin the selected Node/pnpm/dependency versions.
Do not install every library just because a skill for it is present.

Before feature behavior, prove Jest can load the relevant TypeScript/TSX, ESM, aliases,
React DOM environment, and (where used) NestJS decorators. Vite plugins do not configure Jest.
Keep type-checking separate. Do not resolve peer conflicts with force/legacy-peer-deps.

Configure actual lint, type, build, and test scripts and appropriate CI. Add database
integration and critical-browser jobs only to profiles/features needing them; required jobs
must fail on failure rather than becoming optional or suppressing tests.
The full-stack profile must support local Compose validation and isolated integration data.

## 5. Implement and verify

Use red-green-refactor for introduced/changed behavior. Broken imports and missing
dependencies are setup failures, not valid red evidence. Test focused behavior with Jest;
reserve Playwright for named critical journeys and keep manual keyboard/accessibility checks.
Do not create a second unit runner.

Record which setup/build/test/visual checks actually ran. Replace planning examples in
the quickstart with verified commands when scripts exist. Runtime apps, CI, deployment,
and database readiness are not established by this foundation.

## Updates

Treat future foundation updates as reviewed changes, not a bulk overwrite of an app.
Keep application requirements/design/history, inspect tooling diffs and licenses, and rerun
the affected checks. Never replace a consuming project's context with generic template defaults.
