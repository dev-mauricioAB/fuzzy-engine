# API-only profile

Use this profile for a backend service with no web frontend in the same repository: a
public or partner API, a backend for an existing app, or an integration service. This is
guidance only; no service, schema, or dependencies exist yet.

## Planned foundation

- One pnpm TypeScript NestJS application organized as a modular monolith of feature
  modules. ESLint and Prettier.
- PostgreSQL through the latest compatible stable Prisma, when persistence is in scope.
- Request validation at the boundary (NestJS pipes with class-validator, or Zod; choose
  one and record it), and an OpenAPI description generated from the code.
- Jest for unit and module tests (`@nestjs/testing`) and isolated integration tests
  against a disposable PostgreSQL. No Playwright unless a browser journey exists.
- Docker Compose for local API and database, with health checks.

Authentication, queues, events, caching layers, and microservices are not included by
default. Add each one when a requirement needs it and record it in an ADR.

## Before scaffolding

Confirm the API consumers and how they authenticate, the first endpoints and their
contracts, error format, versioning approach, pagination, rate limits, data ownership,
and retention. Write contracts before implementation and test against them.

Keep business rules independent of NestJS and Prisma where the domain is nontrivial.
Add ports or use cases for meaningful workflows or replaceable external services, not
as empty layers.

## Scaffold acceptance

- Install from the lockfile and run lint, format check, typecheck, unit tests, and build.
- Integration tests run against a disposable database in CI with explicit migrations.
- The generated OpenAPI document matches the agreed contracts for the first slice.
- Errors use the agreed format and do not leak stack traces or internal details.
- Compose builds and runs the service and database locally with health checks.
- Secrets stay out of the repository. See [security](../../docs/security.md).
