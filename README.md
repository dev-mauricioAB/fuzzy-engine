# Fuzzy Engine

A reusable, guidance-first foundation for starting web projects with Copilot, Spec Kit,
Impeccable, and a curated set of engineering and product-discovery skills.

Choose one profile:

| Profile | Use it for | Planned runtime foundation |
|---------|------------|----------------------------|
| [Landing](./profiles/landing/README.md) | Landing pages and small frontend-only sites | pnpm, TypeScript, React, Vite, Tailwind; selected shadcn/ui controls |
| [Full stack](./profiles/full-stack/README.md) | Applications needing an API, persistence, and critical end-to-end journeys | Landing frontend plus NestJS, Prisma, PostgreSQL, and Docker Compose |

This revision contains skills, instructions, planning templates, and profile guidance.
It has no application scaffold, dependency manifest, pnpm lockfile, app test runner, CI
pipeline, database, or deployment. Profiles are documented choices, not generated apps.
Application dependencies will be installed and pinned when a chosen profile is scaffolded.

## Start a project

1. Copy this foundation into a new repository, excluding `.git`, or use GitHub's template
   feature if a maintainer enables it. A normal clone retains this template's history.
2. Open that repository in VS Code/Copilot. Read the
   [constitution](./.specify/memory/constitution.md) and choose one profile.
3. Follow [project setup](./docs/start-a-project.md). Confirm the audience, intended
   outcome, locale, accessibility requirements, data permissions, and critical journeys.
4. Create project-specific context and an approved feature spec/plan before scaffolding.
5. Scaffold only the selected profile, verify compatible dependencies and working test
   runners, then implement behavior through red-green-refactor.

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
- Jest for unit/component and isolated integration tests; Playwright for named critical
  browser journeys. Keep manual usability and accessibility review.
- Spec Kit owns feature specifications, plans, and tasks. Impeccable owns interface design;
  Humanizer supports prose. Product skills help discovery without inventing evidence.
- Backend, database, forms, routing, state libraries, and PWA behavior are opt-in by need.
  Hosting, authentication, payment services, maps, and a visual identity are not preselected.

See [architecture and quality](./docs/architecture.md),
[agent tooling](./.github/README.md), and the [project brief template](./docs/project-brief-template.md).
Third-party skill licenses remain with their files and in the
[shared notices](./.agents/THIRD_PARTY_NOTICES.txt); Spec Kit's notice is
[preserved separately](./.specify/LICENSE). Those licenses apply to their respective content.
