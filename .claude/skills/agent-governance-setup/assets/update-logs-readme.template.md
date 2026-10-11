# Update logs

The decision trail for this project. Many agents work here across many sessions; this is how the next one learns what the last one decided without reading a conversation it cannot see.

`CLAUDE.md` and `AGENTS.md` carry a short summary of these rules and point here. **This file is the full protocol.**

## Path — exact

```
update-logs/YYYY-MM-DD/NN-short-slug.md
```

**Always a numbered file inside a subfolder named for the current date. No exceptions, no flat files.**

- **Folder per date, `YYYY-MM-DD`**, zero-padded. **Create today's folder if it does not exist** — that is part of writing the entry, not a precondition to check.
- **Use the current date.** Not the date of the newest folder present, not the date the work started. Get today's date; do not infer it from the tree.
- **`NN` is zero-padded and increments within that date**, restarting at `01` each day.
- **Slug is short, kebab-case, and names the change**, not the task: `engine-token-codegen`, not `phase-2`.

```
update-logs/
  2026-08-04/
    01-project-foundation.md
    02-engine-token-codegen.md
  2026-08-06/
    01-validator-rules.md
```

Canonical folder is `update-logs/` **plural**. Never create a competing `update-log/`.

## When to write

Before or immediately after any non-trivial change. Non-trivial: a structural or architectural decision, a rule or contract change, a file split, a tooling pick, a scope interpretation, a clarification from the maintainer, a version bump, a rollback.

Trivial edits — typos, formatting, comment wording — need no entry.

## Entry format

**What changed · why · what alternative was considered · follow-ups.** Grammar may be sacrificed for concision.

The alternative-considered line is what makes the log worth keeping: it stops the next agent from re-proposing what was already rejected.

```markdown
# 02 — Engine token codegen

**What:** tokens.json → src/styles/tokens.css generator in packages/engine.
**Why:** single hand-edited source; @theme emits utilities + CSS vars in one pass.
**Alternative considered:** keeping tailwind.config.ts — rejected, same value
maintained in three places is a live drift source.
**Follow-ups:** ramp generation (base colour → 50–950) still manual.
```

Never put a secret, token, key, credential, or personal data in an entry. Reference the config path instead.

## End-of-session notes

**Triggered, never automatic.** Write one only when:

- the maintainer asks to end the session or asks for a note, **or**
- a large span of work has accumulated that no existing note covers, and you are at a natural stopping point.

Do **not** trigger from context limits, idle time, or inference.

**One note covers the whole span since the last one — never one per task.** The numbered entries already carry the detail; the note is an index and a handoff, not a duplicate.

Name it `NN-end-of-session-<slug>.md` in today's dated folder, taking the next number in that day's sequence. Sections:

1. **Session goal** — the request that opened the span.
2. **Completed (DONE)** — finished items with paths, one line each, marked unambiguously so the next agent skips them.
3. **In-progress** — started, not finished: current state + next concrete step.
4. **Key decisions** — scope, stack, design choices + reason.
5. **Files touched** — created / modified / deleted, one line of purpose each.
6. **Unresolved questions or blockers** — needing maintainer input or external resolution.
7. **Pickup pointer** — recommended first action next session.

Cross-reference the numbered entries rather than restating them. Nothing material since the last note: `No material changes; nothing to hand off.`

## Session start

At the start of every session, before acting on the request:

1. Look for the most recent `*-end-of-session-*.md` — latest dated folder first, then highest `NN`.
2. **If none exists, fall back to the most recent numbered entry.** Mid-project sessions frequently have no note, and that is normal.
3. Read whichever was found. Internalise what is DONE (skip it), what is in progress, what is blocked, where to resume.
4. Surface a one-line orientation: *"Last entry <date>: <X>. Continue there, or different focus?"* — **do not silently auto-execute the pickup pointer.**
5. If the opening request is unrelated, acknowledge the prior context exists and follow the new request. The note is context, not a directive.
6. If neither exists, or the read fails, proceed normally and mention it once.

**Once per session, not per task.** Do not preload other entries — fetch one only when a specific item demands it.
