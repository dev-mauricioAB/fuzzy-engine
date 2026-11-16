# Security, environment, and secrets

Apply this to every profile from the first scaffolded commit. It turns the constitution's
"Safety and authorized data" principle into concrete project rules.

## Environment variables

- Commit a `.env.example` listing every variable with a placeholder value and a one-line
  comment. Never commit `.env` or `.env.*` files; the template's `.gitignore` already
  excludes them and keeps `*.example` files.
- Validate configuration once at startup with a schema (for example Zod) and fail fast
  with the name of the missing variable, not its value.
- Treat everything bundled into a browser or mobile app as public. Vite exposes only
  `VITE_`-prefixed variables to client code, Next.js only `NEXT_PUBLIC_`, and Expo only
  `EXPO_PUBLIC_`; none of those may hold a secret.
- Keep production secrets in the hosting provider's secret store or GitHub Actions
  secrets. Local developers use their own `.env`.

## Secrets in the repository

- Enable GitHub secret scanning and push protection in the repository settings when
  available for the repository's plan.
- If a secret is committed, rotate it first. Removing it from history does not make it
  safe again.
- Logs, error reports, screenshots, and issue text must not contain tokens, passwords,
  or personal data.

## Input and data

- Validate untrusted input at every boundary: API requests, form submissions, webhooks,
  URL parameters, and data from third-party services.
- Collect only the personal data a requirement needs. Record what is stored, why, and
  for how long in `PRODUCT.md` or an ADR.
- Using external data (scraping, APIs, datasets) needs an approved basis: a license,
  terms that allow it, or permission. Public visibility is not permission.

## Profile notes

- Landing: forms send to an approved destination. Add spam protection and a privacy
  notice when the form collects personal data.
- Full-stack and api-only: set CORS to known origins, rate-limit authentication and
  write endpoints, use parameterized queries (Prisma does this), and return errors that
  do not leak stack traces.
- spa-baas: access rules (for example Supabase row-level security or Firebase security
  rules) are the real authorization layer. Write tests for them against the local
  emulator before shipping.
- SSR: server-only code and secrets stay in server modules; review what server actions
  and route handlers accept.
- Mobile: store tokens in the platform's secure storage, not plain async storage.

## Dependencies

See [dependency updates](./dependency-updates.md). Review install scripts of new packages,
prefer maintained packages with a clear license, and keep the lockfile committed.
