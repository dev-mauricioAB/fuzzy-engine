# Fuzzy Engine

A reusable, guidance-first foundation for starting web projects with Copilot, Spec Kit,
Impeccable, and a curated set of engineering and product-discovery skills.

Choose one profile:

| Profile | Use it for | Planned runtime foundation |
|---------|------------|----------------------------|
| [Landing](./profiles/landing/README.md) | Landing pages and small frontend-only sites | pnpm, TypeScript, React, Vite, Tailwind; selected shadcn/ui controls |
| [Full stack](./profiles/full-stack/README.md) | Applications needing an API, persistence, and critical end-to-end journeys | Landing frontend plus NestJS, Prisma, PostgreSQL, and Docker Compose |
| [SPA + BaaS](./profiles/spa-baas/README.md) | Client-rendered apps using a hosted backend such as Supabase or Firebase | Landing frontend plus the chosen provider's SDK and local emulator |
| [SSR](./profiles/ssr/README.md) | Sites needing server rendering or static generation for SEO or first load | Next.js App Router with Tailwind (framework choice recorded in an ADR) |
| [Mobile](./profiles/mobile/README.md) | Native iOS/Android apps | Expo and React Native with `jest-expo`; native E2E tool chosen by ADR |
| [API only](./profiles/api-only/README.md) | Backend services without a web frontend in the repository | NestJS, Prisma, PostgreSQL, OpenAPI, and Docker Compose |

This revision contains skills, instructions, planning templates, profile guidance, editor
settings, GitHub issue/PR templates, and a template validation workflow. It has no
application scaffold, dependency manifest, pnpm lockfile, app test runner, app CI,
database, or deployment. Profiles are documented choices, not generated apps.
Application dependencies will be installed and pinned when a chosen profile is scaffolded.

The one runnable check validates the template itself (skill hashes, Spec Kit manifests,
project skills, and Markdown links). It needs only Node.js LTS:

```powershell
node scripts/validate-template.mjs
```

## Start a project

1. Select **Use this template** on GitHub, or copy this foundation into a new repository
   excluding `.git`. A normal clone retains this template's history.
2. Open that repository in VS Code/Copilot, install the recommended extensions, and ask
   run `/start-project` in Copilot Chat (or ask for the `start-project` skill). It reads the
   [constitution](./.specify/memory/constitution.md), helps you choose one profile, and
   writes `PRODUCT.md` from your confirmed answers.
3. Follow [project setup](./docs/start-a-project.md). Confirm the audience, intended
   outcome, locale, accessibility requirements, data permissions, and critical journeys.
4. Create project-specific context and an approved feature spec/plan before scaffolding.
5. Scaffold only the selected profile, verify compatible dependencies and working test
   runners, then implement behavior through red-green-refactor. Use `/next-slice` for one
      reviewed slice at a time and `/verify-slice` before each pull request.

Suggested first request:

> Use the landing profile. Help me define the audience, content, design direction, and
> acceptance criteria for my project. Ask about material unknowns before scaffolding.

For an application:

> Use the full-stack profile. Help me define the first vertical slice, data ownership,
> API contracts, and critical end-to-end journey before scaffolding.

## Defaults

- Fit-for-purpose architecture guided by *Fundamentals of Software Architecture: An
  Engineering Approach* and Clean Code. Add layers and packages when they solve a real need.
- pnpm and TypeScript. Recheck supported stable versions and peer compatibility at scaffolding.
- ESLint for linting and Prettier for formatting, configured when a profile is scaffolded.
- Jest for unit/component and isolated integration tests; Playwright for named critical
  browser journeys. Keep manual usability and accessibility review.
- Spec Kit owns feature specifications, plans, and tasks. Impeccable owns interface design;
  Humanizer supports prose. Product skills help discovery without inventing evidence.
- Backend, database, forms, routing, state libraries, and PWA behavior are opt-in by need.
  Hosting, authentication, payment services, maps, and a visual identity are not preselected.

## Guides

| Topic | Document |
|-------|----------|
| Step-by-step project setup | [Start a project](./docs/start-a-project.md) |
| Architecture, testing, lint/format | [Architecture and quality](./docs/architecture.md) |
| Product context | [Project brief template](./docs/project-brief-template.md) |
| Lasting decisions | [Architecture decision records](./docs/decisions/README.md) |
| Environment, secrets, input, data | [Security](./docs/security.md) |
| GitHub Actions | [CI](./docs/ci.md) |
| Node/pnpm pinning and updates | [Dependency updates](./docs/dependency-updates.md) |
| Hosting and monitoring choices | [Deployment and observability](./docs/deployment-and-observability.md) |
| Skills, provenance, updates | [Agent tooling](./.github/README.md) |
| Rules for non-Copilot agents | [AGENTS.md](./AGENTS.md) |

The repository's own content is under the [MIT license](./LICENSE).
Third-party skill licenses remain with their files and in the
[shared notices](./.agents/THIRD_PARTY_NOTICES.txt); Spec Kit's notice is
[preserved separately](./.specify/LICENSE). Those licenses apply to their respective content.
