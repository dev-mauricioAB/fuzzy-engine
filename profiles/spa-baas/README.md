# SPA + BaaS profile

Use this profile for a client-rendered app that needs auth or data but no custom server:
the app talks directly to a backend-as-a-service such as Supabase or Firebase. This is
guidance only; no app, provider project, or dependencies exist yet.

## Planned foundation

- The landing profile's frontend: one pnpm TypeScript package with React 19+, Vite, and
  Tailwind; shadcn/ui controls where needed; ESLint and Prettier.
- The provider's official client SDK, wrapped in a small `src/lib/<provider>` module so
  components do not import it directly.
- TanStack Query for server state when the app reads or caches provider data; React Router
  when it has client routes; RHF/Zod for nontrivial forms.
- Jest/Testing Library for behavior; Playwright for named critical journeys against a
  production build and the provider's local emulator.

## Before scaffolding

The provider is a lasting decision. Record it in an ADR with the alternatives considered
(another BaaS, or the full-stack profile with your own API). Confirm:

- Which provider, which of its services (auth, database, storage, functions), and the
  plan or tier with its limits, cited with a date.
- The data model and who may read or write each record. The provider's access rules
  (Supabase row-level security, Firebase security rules) are the real authorization
  layer; client checks are only UX.
- How the app behaves when the provider is slow, down, or returns an auth error.
- Data residency, personal data, and export or lock-in concerns.

Keep provider SDK types out of domain logic and components where practical, so tests can
use a fake at the module boundary. Never use a live provider project in CI.

## Scaffold acceptance

- Install from the lockfile and run lint, format check, typecheck, unit tests, and build.
- Access rules live in the repository (migrations, rules files) and have tests that run
  against the local emulator.
- Only public client keys are in the frontend environment; service-role or admin keys
  never reach client code. See [security](../../docs/security.md).
- A named critical journey (for example sign-in and the first data write) passes in
  Playwright against the emulator, including one failure path.
