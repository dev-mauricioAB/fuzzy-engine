---
name: next-slice
description: Pick and implement the next task or vertical slice from an approved Spec Kit tasks.md using test-first delivery. Use when the user says "next slice", "next task", "continue implementation", or asks to build the next approved story.
---

# Next slice

Implement one approved slice, then stop for review. This skill does not replace
`/speckit-implement`; use it when the user wants a smaller, reviewed step at a time.

## Preconditions

Find the active feature under `specs/`. Stop and say what is missing if any of these fail:

- `spec.md`, `plan.md`, and `tasks.md` exist, and `tasks.md` is marked approved or the user
  confirms it is.
- `/speckit-analyze` has run since the last change to those files, or the user waives it.
- No `NEEDS CLARIFICATION` remains in the parts of the plan this slice depends on.

## Steps

1. Read `PRODUCT.md`, the feature's `spec.md`, `plan.md`, `tasks.md`, contracts, and the
   ADRs the plan links. Read the selected profile README.
2. Choose the first unchecked task whose listed prerequisites are all checked. If it is a
   story, take the story's whole test, red, implement, green group. State which task IDs you
   picked and why. Do not pick ahead of unchecked prerequisites.
3. If the slice needs tooling that is not set up yet (runner, lint, CI), do the foundation
   task first and verify it with a real run before any behavior test.
4. Follow `.agents/skills/test-driven-development/SKILL.md`:
   write the focused test, run it, and confirm it fails for the missing behavior.
   A missing import, dependency, or broken config is a setup failure, not red evidence.
5. Implement the smallest change that passes. Use the plan's paths and dependencies only;
   if the slice needs a new dependency or deviates from the plan, stop and ask.
6. Run the focused test, then the affected lint, format check, typecheck, and build
   scripts that actually exist. Use `.agents/skills/systematic-debugging/SKILL.md` for
   failures instead of guessing.
7. Check off only the tasks whose verification you ran. Update the quickstart when a
   command becomes real.
8. Report with the `verify-slice` format: what changed, the red and green evidence,
   commands and results, and what was not verified. Then stop. Do not commit, push, or
   start the next slice unless the user asks.
