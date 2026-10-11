# Update logs

The decision trail for this project.

## Path

Use `update-logs/YYYY-MM-DD/NN-short-slug.md`. Create a dated folder using the
current date and number entries from `01` within that folder.

## When to write

Write an entry before or after each non-trivial structural, architectural,
scope, or tooling decision. Formatting-only changes do not need one.

## Entry format

```markdown
# NN — Short title

**What:**
**Why:**
**Alternative considered:**
**Follow-ups:**
```

Never include secrets, tokens, credentials, or personal data.

## Session start and handoff

Read the latest `*-end-of-session-*.md` first; if none exists, read the most
recent numbered entry. End-of-session notes are written only on request or at a
natural stopping point after a large span of work.
