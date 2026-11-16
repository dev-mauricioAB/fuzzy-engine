---
description: Verify the current change against its spec, plan, and tasks, and write an evidence report for review or a pull request.
agent: agent
argument-hint: Optional task IDs or feature folder to verify
---

Follow the [verify-slice skill](../skills/verify-slice/SKILL.md) for:

${input:scope:Task IDs or feature folder (leave empty to use the current diff)}

Run only the checks that exist in this project and read each result in full. Mark every
acceptance criterion as met with evidence, not met, or not verified. List the scripts that
are not available instead of assuming they pass. Return the report in the skill's format.
