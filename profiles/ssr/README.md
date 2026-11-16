# SSR profile

Use this profile when search indexing, social previews, or first-load performance need
server rendering or static generation, for example content sites, marketing sites with
many pages, or e-commerce catalogs. This is guidance only; no app or dependencies exist.

The planned framework is Next.js with the App Router. Choosing it, or an alternative such
as React Router framework mode or Astro, is a lasting decision: record it in an ADR. If a
client-rendered Vite app with prerendering meets the SEO needs, prefer the landing or
SPA + BaaS profile instead.

## Planned foundation

- One pnpm TypeScript Next.js app with Tailwind; shadcn/ui controls where needed;
  ESLint (including the framework's recommended config) and Prettier.
- Server Components by default; Client Components only for interactivity.
- Data access in server-only modules. Add an API or database only if a requirement
  needs one, following the full-stack profile's rules for persistence.
- Jest/Testing Library through the framework's Jest integration for synchronous
  components and logic. Jest does not support async Server Components; cover those
  through Playwright critical journeys.

## Before scaffolding

Confirm the rendering strategy per route (static, revalidated, or dynamic), which pages
must be indexable, metadata and social preview requirements, and the hosting target,
since server features depend on the host's runtime support. Confirm caching behavior
for data that changes, and what users see when a data source fails.

Keep business rules in plain TypeScript modules so they test without the framework.
Do not add Next.js-specific patterns (server actions, middleware, edge runtime) until a
requirement needs them.

## Scaffold acceptance

- Install from the lockfile and run lint, format check, typecheck, unit tests, and build.
- The production build output matches the agreed rendering strategy for each route.
- Required pages render their metadata and content without client JavaScript, checked
  in the built output or with Playwright.
- A named critical journey passes in Playwright against the production build.
- Secrets are used only in server code; no secret appears in the client bundle.
