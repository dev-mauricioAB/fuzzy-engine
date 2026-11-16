---
name: verify-slice
description: Verify a finished slice or change against its spec, plan, and tasks, and produce an evidence report. Use before claiming work is done, before a pull request, or when the user asks "is this done?", "verify", or "what did we actually check?".
---

# Verify slice

Produce an evidence-based report for the current change. Follow
`.agents/skills/verification-before-completion/SKILL.md`: no claim without a command run
in this session.

## Steps

1. Identify the scope: the task IDs, the feature folder under `specs/`, and the changed
   files from `git status` and `git diff`.
2. Re-read the acceptance criteria for those tasks in `spec.md` and `tasks.md`. Make a
   checklist with one line per criterion.
3. Run the checks that exist in `package.json` scripts and apply to the changed packages,
   in this order: `format:check`, `lint`, `typecheck`, focused tests, `build`, then
   `test:integration` and `test:e2e` only if the change touches what they cover. Read each
   result in full. Do not run a script that does not exist; list it as not available.
4. For each acceptance criterion, mark it met with the evidence (test name, command
   output, or manual observation), not met, or not verified.
5. For UI changes, list the manual checks done (responsive widths, keyboard path, focus,
   contrast, copy). If the app could not be run, say so.
6. Check the diff for secrets, debug code, unrelated edits, new dependencies without a
   stated need, and changes to vendored skills or license files.

## Report format

```markdown
## Verification: [task IDs / feature]

| Check | Command | Result |
|-------|---------|--------|

Acceptance criteria:
- [x] AC-1 ... (evidence)
- [ ] AC-2 ... (not verified: reason)

Test-first evidence: [the failing run seen before implementation, or "none recorded"]
Manual review: [what was checked, or "not done"]
Not verified: [list, or "none"]
Risks / follow-ups: [list]
```

Use this report as the "Verification" section of the pull request template.
Never write "done", "passing", or "fixed" for something listed under "Not verified".
