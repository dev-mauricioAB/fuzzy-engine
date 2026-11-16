# Architecture and quality defaults

## Profile boundaries

Use the smallest structure appropriate to the selected profile. These are proposed
scaffolding layouts, not existing runtime directories. The table covers the two base
profiles; SPA + BaaS, SSR, mobile, and API only reuse these rules with the differences
described in their own READMEs under `profiles/`.

| Concern | Landing | Full stack |
|---------|---------|------------|
| Runtime | Frontend only | Web frontend, API, and database when required |
| Structure | One frontend package | pnpm workspace with `apps/web`, `apps/api`, and justified shared packages |
| State | Component state first | Component state; Zustand for small shared client state; TanStack Query for server state |
| Forms | Native semantics; RHF/Zod only for actual form complexity | RHF/Zod where useful; validate untrusted input at API boundaries too |
| Browser tests | Named critical CTA/form/navigation path if present | Named critical integrated journey and its important failure/recovery path |
| Data integration tests | None unless a real integration exists | Isolated local/disposable PostgreSQL where persistence is used |
| PWA, auth, hosting | Explicit project decisions | Explicit project decisions |

The preferred frontend is React 19+ with Vite and Tailwind. Use selected source-distributed
shadcn/ui controls when needed, retain their source/version provenance, and own their updates.
Do not mix in another component system without a documented reason. Routing is React Router
when client routes are required; a one-page site need not install it.

For a full-stack project, start with one NestJS API organized into feature modules.
Keep business rules independent of NestJS, React, Prisma, and external providers. Introduce
use cases/ports when a boundary or nontrivial workflow warrants them, not an empty layer
for every function. Share Zod contracts where web/API validation genuinely overlaps.
Use PostgreSQL through Prisma's latest compatible stable GA version; no database host is chosen.
Read local environment configuration explicitly, validate it, and keep production secrets in
the hosting environment. Do not implement queues, microservices, events, or auth by default.

## Test-first delivery

Jest is the single unit/component/isolated-integration runner. React behavior uses Testing
Library; API/module tests can use `@nestjs/testing`. Use real domain behavior and controlled
fixtures. Mock external boundaries intentionally rather than asserting only mock calls.

1. Configure and verify the runner before behavior work.
2. Write a focused test that fails for the required missing behavior.
3. Implement minimally and verify it passes.
4. Refactor with tests green. Expand validation when affected boundaries justify it.

Do not delete existing code or user changes because an upstream skill says to restart.
Do not test trivial accessors or run an exhaustive browser matrix for every small change.
Report pre-existing failures without fixing unrelated issues.

Playwright tests are selected from a project's named critical journeys, marked `@critical`.
Use controlled fixtures and deterministic local dependencies, never live third-party accounts
or services to make CI pass. A typical planned script is `test:e2e` using
`playwright test --grep @critical`; it does not exist until configured.
Include a failure/recovery path when the main journey depends on network/persistence.
Do not suppress accessibility failures or claim that automation proves complete usability/WCAG
compliance. Keep manual keyboard, responsive, and assistive-technology review.

## Planned verification interface

Scaffolding should configure ESLint with a flat config for the selected TypeScript project.
Cover frontend source and tests; for full stack, also cover API and included shared packages.
Scope browser, Node, React, and test rules to the files that use them. Verify supported stable
versions and peer compatibility before installing the required development dependencies.

Configure Prettier with a shared project config, using its defaults unless the project
chooses otherwise. Use `eslint-config-prettier` after other ESLint configs to disable
conflicting formatting rules. Keep linting and formatting as separate checks.
Configure ignores for dependencies, generated output, lockfiles, and vendored material
such as `.agents/skills`, `.github/skills`, and `.specify` in both tools; do not reformat
upstream content. Cover project-owned source, tests, configuration, and documentation
where applicable.

Scaffolding should define `lint`, `format`, `format:check`, `typecheck`, `build`, `test`,
and opt-in `test:watch`. `format` writes changes; `format:check` checks without modifying files.
Add `test:integration` for real isolated integrations and `test:e2e` for critical browser
journeys. These are intended script names, not currently runnable commands.
When scaffolding, verify that `lint` detects a lint violation and `format:check` detects an
unformatted project-owned file, then confirm both pass after correction.

CI should use pinned compatible Node/pnpm versions, the generated lockfile, and frozen
installs. Run non-mutating lint/format checks and applicable type/unit/build checks;
full-stack changes add isolated database/integration and critical-browser checks.
Test setup must precede dependent features.
Do not use missing tests, skipped jobs, or unconfigured scripts as success evidence.

Full-stack local validation should build web/API/database through Docker Compose, use
health checks and named database storage, document explicit migrations, and exclude
credentials and generated output from images. Keep destructive database actions explicit
and scoped to disposable/local resources. Deployment is a separate approved task.

## Project-specific decisions

Confirm locale, visual identity, accessibility target (WCAG 2.2 AA is the starting proposal),
SEO/rendering requirements, performance budgets, source licenses, auth needs, hosting/cost,
and any offline behavior during planning. A client-rendered Vite site is a default to evaluate,
not a promise that every search-indexing or social-preview requirement is already met.
