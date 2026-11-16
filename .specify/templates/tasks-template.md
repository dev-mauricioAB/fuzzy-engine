---
description: "Profile-aware test-first task list template"
---

# Tasks: [FEATURE NAME]

**Input**: Approved `spec.md`, `plan.md`, and applicable research/contracts.
**Profile**: [landing | full-stack | spa-baas | ssr | mobile | api-only]
**Status**: [proposed | approved]

Replace all placeholders and examples with the feature's actual tasks. Do not add API,
database, authentication, or deployment work unless the approved scope requires it.
Small features may use a compact task list; preserve test-first dependencies.

## Task format

`[ID] [P?] [Story] Description with exact file paths`

- `[P]` means genuinely independent work on separate files, not merely adjacent tasks.
- Include prerequisite task IDs explicitly; order alone is not a dependency.
- Each behavior implementation depends on its focused failing behavioral test.
- Use the approved plan's paths. Landing may use `src/`; full stack may use
  `apps/web`, `apps/api`, and justified shared packages.

## Foundation

Create only tasks relevant to the selected profile:

- [ ] T001 Confirm project context, scope, selected profile, and unresolved decisions.
- [ ] T002 Configure compatible pnpm/TypeScript/runtime dependencies from the approved plan.
- [ ] T003 Configure and verify Jest transforms/environment/aliases for included packages;
  depends on T002.
- [ ] T004 Configure ESLint and Prettier for included packages, lint/format/type/build/unit
  scripts, and applicable CI checks including non-mutating lint/format checks;
  depends on T002 and T003.
- [ ] T005 [If required] Configure isolated integration data and a working runner.
- [ ] T006 [If required] Configure critical-only Playwright fixtures and CI dependencies.

Runner/fixture setup must work before story tests. Vite plugins do not configure Jest.
TS/TSX, ESM, and NestJS decorators (when applicable) need verified support.
Database/Compose/migrations are full-stack tasks only when persistence is included.
Do not claim missing tools or broken imports establish a behavioral failure.

## Story [ID]: [Name and acceptance criteria]

- [ ] [ID] Write focused Jest behavior/contract/component test(s); depends on runner setup.
- [ ] [ID] Run the focused tests and confirm the expected behavioral failure; depends on tests.
- [ ] [ID] Implement the smallest required behavior; depends on confirmed red evidence.
- [ ] [ID] Verify green and refactor without changing scope; depends on implementation.
- [ ] [ID] [If critical] Verify the named Playwright journey and relevant failure/recovery
  case using controlled data; depends on the integrated behavior and browser foundations.
  Mobile projects use the ADR-selected native E2E tool or a recorded manual run instead.

Repeat for actual stories. Jest covers detailed combinations; Playwright covers named
critical journeys, not every component variant. Do not add tests for trivial accessors,
mirror implementation constants, or test mocks instead of behavior.

## Integration and handoff

- [ ] [ID] Run affected lint/format/type/build/test checks; report unrelated baseline failures.
- [ ] [ID] Review responsive layout, keyboard/focus, copy, and accessibility where applicable.
- [ ] [ID] [If full stack] Validate local web/API/database builds and explicit migrations
  through the planned Compose workflow, without exposing local credentials.
- [ ] [ID] Update the quickstart with actual verified commands and remaining limitations.

Manual usability/accessibility review remains required; automation is not full compliance
evidence. Documentation-only changes need document/link checks rather than app tests.
Commit, push, and deployment are separate actions requiring the user's authorization.
