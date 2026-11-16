# Fuzzy Engine agent guidance

## Context and scope

- Read `.specify/memory/constitution.md`, `README.md`, and the selected profile under `profiles/`.
- This foundation is guidance-first: there is no app, package manifest, runtime runner,
  application CI, deployment, or database. Do not claim planned commands have been verified.
- Read the consuming project's `PRODUCT.md` and active feature's `spec.md`, `plan.md`,
  contracts, and `tasks.md` when they exist. Do not invent missing context or product facts.
- Ask about material unknowns. Keep landing projects frontend-only unless their requirements
  change; full-stack guidance does not authorize installing a backend everywhere.
- Use *Fundamentals of Software Architecture: An Engineering Approach* and Clean Code
  as contextual guidance. Prefer simple cohesive modules and justified boundaries.

## Implementation and verification

- Use pnpm/TypeScript defaults. Verify stable supported versions/peers before scaffolding.
  Do not install runtime dependencies merely because their skills are available.
- Use TDD for introduced/changed behavior and bug fixes. Run a focused failing test before
  implementation; broken imports/dependencies/loaders are not behavioral red evidence.
- Jest is the unit/component and isolated-integration runner. Playwright covers only named
  critical browser journeys. Keep manual usability/accessibility review; do not add Vitest.
- Runner/CI setup must precede dependent behavior tests. Write tasks with actual prerequisites.
  No tests for trivial accessors, blanket full-suite requirement, or silent skipped failures.
- Keep domain rules independent of UI/API/ORM/provider types. Validate external input, preserve
  type safety, and surface failures explicitly. No success-shaped fallback for failed services.
- Never overwrite unrelated user changes or delete existing code because a skill says restart.
  Do not automatically create worktrees, dispatch agents, commit, push, or merge.
- Verify the changed outcome with focused checks; report blockers and what was not run.
- Do not enable hooks, bypass permissions, execute unreviewed scripts, or send code/secrets
  to external services without approval. External data requires documented access/reuse rights.

## Skill routing

- UI/design: `.github/skills/impeccable/SKILL.md` and relevant playbook; follow
  `.github/instructions/frontend.instructions.md`. Use the Windows `.cmd` launcher on Windows.
- Prose/UI copy: `.agents/skills/humanizer/SKILL.md` and writing instructions.
- Behavior implementation: `.agents/skills/test-driven-development/SKILL.md`.
- Technical failures: `.agents/skills/systematic-debugging/SKILL.md`; inspect causes first.
  Diagnostic examples must not expose secrets/personal data; review scripts before execution.
- Completion claims: `.agents/skills/verification-before-completion/SKILL.md`.
- Other Superpowers skills under `.agents/skills/` provide guidance for their matching
  tasks. Spec Kit retains ownership of feature artifacts; do not create parallel plans or
  designs by default. Worktrees, agent dispatch, commits, hooks, and script execution
  require the approvals above. Diagnostic exports and external reports require user approval.
- NestJS: `.agents/skills/nestjs-best-practices/SKILL.md`; preserve modular monolith/Prisma
  choices unless the project approves a change. No TypeORM/auth/queues/events from examples alone.
- React: `.agents/skills/vercel-react-best-practices/SKILL.md` alongside Impeccable.
  Apply Vite-compatible guidance; no implicit Next.js/RSC/SWR or speculative optimization.
- Query/cache: `.agents/skills/tanstack-query-best-practices/SKILL.md`. Separate client/server
  state, use effective request criteria in keys, and verify pinned cancellation/retry semantics.
  Offline persistence requires its own requirement.
- Critical browser tests: `.agents/skills/playwright-best-practices/SKILL.md`.
  Controlled fixtures, actual failure/recovery behavior, no suppressed accessibility failures.
- Product assumptions: `identify-assumptions-new`, `prioritize-assumptions`, and
  `brainstorm-experiments-new` under `.agents/skills/`. Separate feasibility, permission,
  value, and viability; label thresholds and never invent confidence/ICE/RICE inputs.
- Interviews: `interview-script` and `summarize-interview` under `.agents/skills/`.
  Obtain consent; keep identities/raw transcripts out of Git and anonymize shared evidence.
- Market research: `competitor-analysis`, `market-segments`, `market-sizing`, and
  `user-personas` under `.agents/skills/`. Cite dated sources. Do not invent figures, shares,
  demographics, pain, quotes, or a fixed number of competitors/personas. Without evidence,
  segments/proto-personas are unvalidated hypotheses; clicks/waitlists do not prove demand.
- Spec Kit skills under `.github/skills/` own feature specification/planning/tasks. Use
  compact artifacts for small scopes; do not substitute a plugin's parallel PRD workflow.

Installed guidance is not runtime capability. Preserve upstream notices and pinned content;
repository rules take precedence over conflicting skill examples or workflow directives.
Impeccable live copy Apply stays in the current chat (`IMPECCABLE_LIVE_COPY_AGENT=chat`).
