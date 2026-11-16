---
description: Implement the next approved task or vertical slice from the active Spec Kit tasks.md, test first, then stop for review.
agent: agent
argument-hint: Optional feature folder or task IDs, for example specs/001-signup T012
---

Follow the [next-slice skill](../skills/next-slice/SKILL.md) for one slice only.

Scope requested: ${input:scope:Feature folder or task IDs (leave empty to pick the next ready task)}

Check the preconditions first and stop if any fail. Use the
[TDD skill](../../.agents/skills/test-driven-development/SKILL.md) and show the failing run
before implementing. Ask before adding a dependency or deviating from `plan.md`. End with the
[verify-slice](../skills/verify-slice/SKILL.md) report. Do not commit, push, or start
another slice.
