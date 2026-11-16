# Full-stack profile

Use this profile when an application needs an API, persistence, and integrated user journeys.
This is guidance only; there are no services, schema, containers, or app dependencies yet.

## Planned foundation

- pnpm workspace: `apps/web` and `apps/api`.
- ESLint and Prettier across the included workspace packages, configured during scaffolding.
- React/Vite/Tailwind/shadcn frontend; React Router for routes, Zustand for shared client
  state, TanStack Query for server state, and RHF/Zod for forms where required.
- NestJS modular monolith, PostgreSQL, and latest compatible stable Prisma.
- Shared `packages/contracts` and `packages/domain` only for real reuse/business rules.
  Keep framework/ORM/provider types outside the domain.
- Local Docker Compose validation for web/API/database, isolated integration data, and
  critical-only Playwright alongside Jest tests.

Install only capabilities selected for the first useful slice. Authentication, queues, events,
payments, maps, PWA/offline storage, database hosting, and deployment targets remain undecided.
The presence of skills for a library does not make it an application dependency.

## Before scaffolding

Confirm the first user outcome, data ownership/permissions, API contracts, persistence,
validation/errors, and important failure/recovery states. Decide environment handling,
migration process, test isolation, and critical browser journeys before implementation.
Do not retain a generic demo domain as a product requirement.

Use feature modules and explicit boundaries. Add ports/use cases for meaningful workflows
or replaceable external dependencies; do not add layers with no responsibility.

Follow [project setup](../../docs/start-a-project.md) and
[architecture/quality defaults](../../docs/architecture.md).
Pin compatible stable dependencies and verify TS/TSX, ESM, aliases, and decorators in Jest.

## Scaffold acceptance

- Web/API/domain/contracts, where present, pass documented build and type checks.
- ESLint and Prettier's non-mutating format check cover included packages and run in CI.
- A named critical user journey crosses the real local web/API/persistence boundary.
- Jest covers rules/contracts/components and isolated integration; Playwright covers the
  critical journey and its important recovery case, with controlled data.
- CI provisions disposable dependencies, runs required checks, and fails on actual errors.
- Compose builds and runs the local stack with health checks and explicit migration guidance.
- Secrets remain local/untracked, failures are explicit, and no deployment is implied.
