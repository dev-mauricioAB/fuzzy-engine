# Mobile profile

Use this profile for a native iOS/Android app built with React Native and Expo. This is
guidance only; no app, Expo account, or dependencies exist yet.

## Planned foundation

- One pnpm TypeScript Expo app. Expo Router when the app has multiple screens.
- ESLint (including Expo's config) and Prettier.
- TanStack Query for server state and RHF/Zod for nontrivial forms, when needed.
- Jest with the `jest-expo` preset and React Native Testing Library for behavior.
- If the app needs its own API, add it as the full-stack or api-only profile in a pnpm
  workspace (`apps/mobile`, `apps/api`). If it needs auth or data without a custom
  server, apply the SPA + BaaS profile's provider rules.

Playwright does not drive native apps. A native end-to-end tool (Expo documents Maestro
for its workflows; Detox is another option) is a project decision: record it in an ADR
before writing E2E tasks. Until then, critical journeys get Jest coverage plus a recorded
manual run on a device or simulator.

## Before scaffolding

Confirm the target platforms and minimum OS versions, whether a web build is in scope,
offline behavior, push notifications, deep links, device permissions (camera, location,
contacts) and why each is needed, and the store accounts and release process. Each
device permission needs a stated purpose shown to the user.

Decide whether builds use Expo's cloud build service or local native builds, and who
owns the signing credentials. Store submission is a separate, approved task.

## Scaffold acceptance

- Install from the lockfile and run lint, format check, typecheck, and Jest tests.
- The app starts in a simulator or on a device for each target platform, recorded with
  the platform and OS version used.
- Tokens are stored in secure storage; only `EXPO_PUBLIC_` values reach the bundle, and
  none are secrets. See [security](../../docs/security.md).
- Critical journeys pass in the ADR-selected E2E tool, or have a recorded manual run if
  no tool is selected yet.
- Accessibility labels, dynamic text size, and screen reader checks are recorded for
  the critical screens.
