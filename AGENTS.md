# Agent instructions

This file is for coding agents that do not read `.github/copilot-instructions.md`.
That file is the canonical rule set; read it in full before working. Then read:

1. [.specify/memory/constitution.md](./.specify/memory/constitution.md) for the policy
   every change must follow.
2. [README.md](./README.md) and the selected profile under [profiles/](./profiles/).
3. In a consuming project: `PRODUCT.md`, accepted ADRs in
   [docs/decisions/](./docs/decisions/README.md), and the active feature's `spec.md`,
   `plan.md`, contracts, and `tasks.md` under `specs/`.

## Rules that apply to every agent

- Do not invent requirements, versions, commands, or product facts. Ask, or record the
  question as open.
- This template has no application, `package.json`, or app CI. The only runnable check
  is `node scripts/validate-template.mjs`. Report other commands as planned, not verified.
- Implement behavior test-first: a focused failing test before the code. Jest for
  unit/component/integration, Playwright only for named critical browser journeys.
- Do not commit, push, deploy, create worktrees, dispatch agents, enable hooks, or run
  unreviewed scripts without the user's approval.
- Do not edit vendored skills (`.agents/skills/`, `.github/skills/speckit-*`,
  `.github/skills/impeccable/`) or license notices. After a deliberate tooling update,
  run the validation script.

## Skills

Skills live in `.github/skills/` and `.agents/skills/`. Each folder has a `SKILL.md`
describing when to use it. Start with `start-project`, `next-slice`, and `verify-slice`
for the project workflow, and the `speckit-*` skills for feature specs, plans, and tasks.
In VS Code, `.github/prompts/` exposes the workflow skills as `/start-project`,
`/next-slice`, and `/verify-slice`.
