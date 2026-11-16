# Fuzzy Engine constitution

**Version**: 1.1.0 | **Adopted**: 2026-11-16 | **Amended**: 2026-11-16

## I. Evidence and clarification

Contributors MUST inspect relevant project context, distinguish facts from assumptions,
and ask about material uncertainty. Requirements and external facts MUST NOT be invented.
Each product MUST establish its own audience, scope, locale, and acceptance criteria.
Template examples are not product decisions.

## II. Fit-for-purpose architecture

Use *Fundamentals of Software Architecture: An Engineering Approach* and Clean Code as
contextual guidance. Prefer simple cohesive modules and explicit responsibilities.
Significant choices MUST describe their requirements, alternatives, and trade-offs.
Landing pages MUST NOT inherit a backend/database or unnecessary abstraction layers.
Full-stack projects SHOULD start as a modular monolith with framework-independent domain
rules where business complexity warrants them. Dependencies MUST have a concrete need.

## III. Safety and authorized data

Validate untrusted inputs, minimize personal data, protect secrets, and handle failures
explicitly. External data access and reuse MUST have an approved basis and method; public
visibility is not permission. Do not bypass controls or silently convert errors into success.
Preserve existing user changes. Scripts, hooks, external services, and destructive operations
require appropriate review/approval; skills do not override those constraints.

## IV. Test-first quality

New/changed behavior and bug fixes MUST follow red-green-refactor with a focused behavioral
failure before implementation. Broken tooling is not red evidence.
Use Jest for unit/component and isolated integration tests, and Playwright only for the
project's named critical browser journeys. Native mobile end-to-end tooling, when needed,
MUST be selected through a recorded decision. Manual usability/accessibility review remains
necessary. Runner/CI setup MUST precede dependent behavior tests in generated tasks.
Use the narrowest sufficient checks, expand when justified, and report unverified outcomes.
Documentation-only work does not require application tests.

## V. Profile-aware delivery

pnpm/TypeScript and the documented profiles are defaults to evaluate, not preinstalled
capabilities. Version/peer compatibility MUST be verified at scaffolding. Do not add a
second unit runner or bypass peer conflicts. Hosting, auth, PWA, locale, visual identity,
and data providers MUST be explicit project decisions, recorded as ADRs under
`docs/decisions/` when they outlast one feature.
Keep proposed commands separate from verified commands. No commit, push, deployment,
automatic agent dispatch, or hook enablement is implied by a skill workflow.

## Governance

This constitution governs generic starter policy. A consuming project may amend it through
an explicit maintainer-reviewed decision and update its version/date. Preserve requirement
semantics across specs/plans/tasks and document intentional deviations. Do not carry an
unrelated product's constraints, research, branding, or history into a new project.
