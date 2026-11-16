# CI with GitHub Actions

This repository runs one real workflow,
[validate-template.yml](../.github/workflows/validate-template.yml), which checks skill
hashes, Spec Kit manifests, project-owned skills, and Markdown links with
`node scripts/validate-template.mjs`. Keep it in consuming projects so vendored guidance
cannot drift unnoticed.

Application CI does not exist until a profile is scaffolded. The example below is a
starting point for a consuming project, not a verified workflow. Add it only after the
scripts it calls exist and pass locally.

## Example application workflow

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

permissions:
  contents: read

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  checks:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
        with:
          persist-credentials: false
      # Reads the pnpm version from the packageManager field in package.json.
      - uses: pnpm/action-setup@73e46992e05b19abd31f2f3c20e0e7370d762115 # v6.1.1
      - uses: actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1 # v7.1.0
        with:
          node-version-file: .nvmrc
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm format:check
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm build
```

The action SHAs above were current on 2026-11-16. Dependabot's `github-actions` updates
keep them current; review each update before merging.

## Adding jobs by profile

| Profile | Add when the feature needs it |
|---------|-------------------------------|
| landing, spa-baas, ssr | A `test:e2e` job that installs Playwright browsers and runs `@critical` tests against a production build |
| full-stack, api-only | A `test:integration` job with a disposable PostgreSQL service container and explicit migrations |
| spa-baas | Integration tests against the provider's local emulator, never a live project |
| mobile | Native E2E only after an ADR selects the tool; EAS or store builds are a separate approved task |

## Rules

- Use `--frozen-lockfile` so CI fails when the lockfile is out of date.
- Run non-mutating checks only (`format:check`, never `format`).
- A required job must fail when its tests fail. Do not mark jobs `continue-on-error`,
  skip suites to get green, or treat "no tests found" as success.
- Give workflows the least `permissions` they need, and keep secrets out of logs and
  pull requests from forks.
- Deployment workflows are separate, approved work. See
  [deployment and observability](./deployment-and-observability.md).
