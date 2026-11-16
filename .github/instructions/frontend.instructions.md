---
applyTo: "src/**,apps/web/**,packages/ui/**"
---

# Frontend guidance

- Load Impeccable and its relevant playbook before UI design/implementation/review.
  Follow confirmed project context and the approved feature/design brief when present.
- Confirm audience, primary action, locale, accessibility needs, visual direction, and
  important states before user-facing UI code. Do not invent a brand or repeat settled choices.
- Landing profile: one small frontend; no backend/data/state libraries without requirements.
  Full stack: follow documented boundaries and keep server state separate from client state.
- Use React/Vite/Tailwind preferences and required shadcn/ui controls only. Preserve primitive
  semantics, keyboard/focus behavior, and source provenance; library use does not prove accessibility.
- Use semantic controls, visible focus, contrast, reduced-motion support, accessible dialogs,
  and responsive reading order. Agree on the project's accessibility target and verify it.
- Render loading, empty, missing/stale, validation, and failure states where applicable.
  Do not fabricate facts, statistics, testimonials, or successful form submissions.
- Use Humanizer for copy; preserve validation meaning, URLs, locale keys, and interpolation.
  Confirm locale and formatting rather than hard-coding a template's language into the app.
- Use Jest/Testing Library test-first for changed behavior and Playwright for named critical
  journeys only. Keep manual keyboard/usability/accessibility checks.
- Inspect the actual responsive result when runnable, and run relevant build/type checks.
  Report unverified visuals honestly. Do not create a speculative shared UI package.
