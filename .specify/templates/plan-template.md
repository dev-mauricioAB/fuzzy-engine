# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace every bracket with facts from PRODUCT.md, the approved spec,
  the selected profile under profiles/, accepted ADRs, and files that actually exist.
  Write NEEDS CLARIFICATION for anything not confirmed. Do not fill gaps with examples.
-->

**Profile**: [landing | full-stack | spa-baas | ssr | mobile | api-only, from PRODUCT.md]

**Language/Runtime**: [TypeScript; Node.js LTS line and pnpm version pinned or to pin at scaffolding]

**Primary Dependencies**: [Only those the selected profile and this feature need, e.g.
React/Vite/Tailwind for landing, or NEEDS CLARIFICATION. Verify versions/peers at scaffolding.]

**Storage**: [N/A for landing; PostgreSQL via Prisma for full-stack/api-only when persistence
is in scope; the chosen provider for spa-baas; or NEEDS CLARIFICATION]

**Testing**: [Jest for unit/component/isolated integration; Playwright only for named
critical browser journeys; native mobile E2E tool only if an ADR selected one]

**Lint/Format**: [ESLint flat config and Prettier per docs/architecture.md]

**Target Platform**: [Supported browsers/devices, mobile OS versions, or server runtime]

**External Services**: [Each service, its approved access/permission basis, and its failure
behavior, or N/A]

**Hosting/Auth/Locale**: [Accepted decisions with ADR links, or NEEDS CLARIFICATION]

**Performance/Accessibility Targets**: [Agreed budgets and accessibility target; label
proposals as proposals]

**Verified Commands**: [Commands actually run against existing scripts, or "none yet".
Keep intended commands in a separate list.]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [ ] Facts trace to PRODUCT.md, the spec, ADRs, or cited sources; unknowns are marked.
- [ ] Scope fits the selected profile; no backend/database/state library without a requirement.
- [ ] Each new dependency has a concrete need; versions/peers will be verified, not assumed.
- [ ] Untrusted input, secrets, personal data, and external-data permissions are addressed.
- [ ] Runner/CI setup precedes behavior tests; each behavior has a planned failing test.
- [ ] Hosting, auth, PWA, locale, visual identity, and data providers are decided or open.
- [ ] Significant choices list alternatives and trade-offs (ADR in `docs/decisions/` when lasting).

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output, only when the feature has persistent data
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output, only when the feature has an API/service boundary
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Keep only the selected profile's layout and replace it with the real
  paths this feature touches. The delivered plan must not include profile labels or
  directories the feature does not need. Layouts come from profiles/*/README.md.
-->

```text
# [REMOVE IF UNUSED] landing, spa-baas
src/
├── components/
├── sections/ or routes/
└── lib/
tests/ or colocated *.test.tsx

# [REMOVE IF UNUSED] full-stack
apps/web/src/
apps/api/src/<feature-module>/
apps/api/prisma/
packages/contracts/   # only for real web/API reuse
packages/domain/      # only for framework-independent business rules

# [REMOVE IF UNUSED] ssr (Next.js App Router)
src/app/
src/components/
src/lib/

# [REMOVE IF UNUSED] mobile (Expo)
app/                  # Expo Router routes, if routing is selected
src/components/
src/lib/

# [REMOVE IF UNUSED] api-only
src/<feature-module>/
prisma/
test/
```

**Structure Decision**: [The selected layout with the real directories above, and why
any added package or layer is needed]
## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
