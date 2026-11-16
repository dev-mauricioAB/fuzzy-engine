---
name: start-project
description: Start a new project from the Fuzzy Engine template. Use when the user wants to begin a new app, landing page, or service from this foundation, choose a profile, or create PRODUCT.md before any specification or scaffolding.
---

# Start a project

Bring a freshly copied template to the point where `/speckit-specify` can run on
confirmed facts. Do not scaffold, install packages, or write application code here.

## Steps

1. Read `.specify/memory/constitution.md`, `README.md`, and `docs/start-a-project.md`.
   Check whether `PRODUCT.md` already exists. If it does, continue from its open questions
   instead of starting over.
2. Ask the user for the product idea in their words. Then pick a profile with them using
   the table in `README.md`. Read only the selected `profiles/<name>/README.md`.
3. Use the `ask_user` tool (or ask in plain text if the client has no form tool) for the
   brief's material unknowns. Ask in small groups, most decisive first:
   - audience, problem, evidence, and the primary action;
   - first slice, explicit exclusions, and acceptance criteria;
   - locale, devices, accessibility target, and SEO needs;
   - data, external services, permissions, secrets, and personal data;
   - hosting, auth, budget, and other decisions the profile lists as open.
   Accept "unknown" as an answer. Record it as an open question; do not fill it in.
4. Create `PRODUCT.md` at the repository root from `docs/project-brief-template.md`.
   Write only what the user confirmed. Label proposals and assumptions as such.
5. For each decision that will outlast one feature (profile, hosting, auth, data provider,
   native E2E tool), draft an ADR in `docs/decisions/` from `0000-template.md` with
   status `Proposed`. Ask the user to accept it; set `Accepted` only after they do.
6. Remove template-only material the project does not need, with the user's approval:
   unused `profiles/*` folders and the template's own README sections. Keep the
   constitution, skills, notices, and licenses.
7. Report: the selected profile, what `PRODUCT.md` now confirms, the open questions that
   block specification, and the suggested `/speckit-specify` input for the first slice.

## Stop conditions

- The user cannot name an audience or a primary action: stop after step 3 and suggest the
  product-discovery skills (`identify-assumptions-new`, `interview-script`).
- A requirement needs data the user has no right to use: record it as blocked.
- Never claim a command, version, or service works; nothing has been scaffolded yet.
