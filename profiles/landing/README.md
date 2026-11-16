# Landing profile

Use this profile for landing pages, campaign sites, and small frontend-only experiences.
This is guidance only; no application or dependencies are installed here.

## Planned foundation

- One pnpm-managed TypeScript frontend package with React 19+, Vite, and Tailwind.
- ESLint and Prettier for the frontend, configured during scaffolding.
- shadcn/ui controls only where needed; project-specific design through Impeccable.
- Jest/Testing Library for meaningful behavior. Playwright for a named critical action
  when the page has one, such as a contact form or primary navigation/CTA.
- Semantic HTML, keyboard access, responsive layout, and agreed accessibility/SEO requirements.

Do not create an API, database, Prisma schema, shared domain package, Zustand store,
TanStack Query client, router, or form library until a requirement justifies it.
Do not impose a monorepo's app layers on a static page.

## Before scaffolding

Confirm audience, primary action, actual content/assets and usage rights, design direction,
locale, accessibility target, and delivery/SEO needs. If a form exists, choose its authorized
destination and define success, failure, validation, and spam/privacy handling.
Do not invent customer testimonials, fake statistics, or successful form submissions.

The initial structure can be `src/` plus colocated tests or a small `tests/` directory.
Keep page sections and reusable components clear without empty abstraction layers.

Follow [project setup](../../docs/start-a-project.md) for the approved spec/plan, dependency
compatibility, runner setup, CI, and test-first sequence. PWA/offline behavior, analytics,
and deployment providers are explicit project choices.

## Scaffold acceptance

- A new project can install from its generated lockfile and run its documented scripts.
- ESLint, Prettier's non-mutating format check, typecheck, unit/component tests, and
  production build work in CI.
- Critical browser behavior, when present, is exercised without live third-party dependency.
- Responsive/manual keyboard checks are recorded; content and delivery failures are honest.
- No unused backend/database/runtime dependencies are carried from the full-stack profile.
