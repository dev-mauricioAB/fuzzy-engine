# Architecture decision records

Record lasting project decisions here: the profile choice, hosting, authentication, data
provider, native E2E tool, a new package or layer, or a deliberate deviation from the
constitution. Feature-level choices that only affect one feature can stay in that
feature's `plan.md` or `research.md`.

## How to add one

1. Copy [0000-template.md](./0000-template.md) to the next number, for example
   `0001-select-profile.md`.
2. Fill it from confirmed requirements and cited sources. Write "unknown" instead of
   guessing, and keep the status `Proposed` until a maintainer accepts it.
3. Link the ADR from `PRODUCT.md` under "Decisions and open questions" and from any plan
   that depends on it.
4. Never rewrite an accepted ADR. Supersede it with a new one and set the old status to
   `Superseded by NNNN`.

The template ships with no accepted decisions. Each consuming project starts its own log;
do not copy another product's ADRs into a new project.
