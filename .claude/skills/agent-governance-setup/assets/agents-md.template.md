# AGENTS.md

Governing instructions for AI coding agents in this repo. This mirrors `CLAUDE.md`, which carries the same rules plus Claude Code-specific mechanics. **Any change to one must be mirrored in the other.**

## What this repo is

{{WHAT_THIS_IS — identical to CLAUDE.md.}}

Read before non-trivial work — do not re-derive what these already decide:

| Doc | Owns |
| --- | --- |
{{DOC_OWNERSHIP_ROWS — identical to CLAUDE.md.}}
| `INDEX.md` | where everything lives |

## The one rule everything serves

{{ONE_RULE — identical to CLAUDE.md. Omit here too if omitted there.}}

## Think before coding

State assumptions explicitly; if uncertain, ask. Multiple interpretations → present them, do not pick silently. Simpler approach exists → say so. Something unclear → stop, name it, ask.

Write the minimum code that solves the problem. No speculative features, no single-use abstractions, no unrequested flexibility, no error handling for impossible scenarios. If 200 lines could be 50, write 50.

**Surgical changes.** Every changed line traces to the request. Do not improve adjacent code, do not refactor what is not broken, match existing style. Clean up orphans *your* change created; mention pre-existing dead code rather than deleting it.

**Verifiable success criteria.** Define how the change will be checked before writing it, then verify. For multi-step work, state the plan as steps each with its own check.

## Context discipline (non-negotiable)

Context is scarce; flooding it causes thrashing — more searches, more noise, wrong or stuck.

- **Bounded search.** Cap search output at ~50 matches. More → refine the query (narrower path, narrower file glob, sharper pattern, result limit). "Too many results" means *be more specific*, not read further.
- **Bounded reads.** Small files whole; large files in ~100-line windows, targeting the range you need. Track line numbers as you read — editing lines 47–52 means referencing 47–52, not re-reading the file to count.
- **Never re-read a file already in context.**
- **Lint/typecheck after every edit.** Fix a syntax error before anything else, not after tests fail and ten steps are burned.

## Delegation

**Default: no delegation.** Keep work in the main context. Do not hand off because a task is broad, touches many files, or would finish faster in parallel. Time and speed rank below wise context use.

**Exception:** a large mechanical sweep, or a broad/unknown file surface needing more than about ten files at once. Then delegate reconnaissance to **one** sub-run on the cheapest capable model your runtime offers, returning only a distilled brief — paths, line ranges, specific facts. The cheap run **locates, collects, extracts**. It never synthesises.

Root-cause analysis, design, integration, edits and decisions stay with the main agent. Surface already small and knowable → read it directly instead of delegating.

**One at a time.** Never run delegated sub-runs concurrently unless the maintainer explicitly asks and it is genuinely necessary. Sequential wins.

Scope every delegated prompt explicitly: task, files to read, files it may modify, acceptance criteria, constraints, and where to write its report ({{REPORTS_PATH}}). Never pass full conversation history — summarise only what the subtask needs.

### Model tiers

Cheapest tier locates, collects, extracts. Top tier reasons, designs, decides, writes.

<!-- BEGIN model-tiers -->
{{MODEL_TIER_TABLE}}
<!-- END model-tiers -->

## Right-size the ceremony, never skip it

Plan → implement → test → review, update-log entries, and docs sync stay **mandatory**. What scales is their *depth*, not their existence. A one-line fix earns an update-log entry with a terse inline plan; a real feature warrants the full chain. Precision comes from *doing* each step, not from spending maximum effort on it.

## Keep `INDEX.md` current — non-negotiable

`INDEX.md` is the map every session reads before touching the tree. **Update it in the same change** that adds, moves, renames or deletes anything it lists. A stale index routes the next session to a path that no longer exists, costing more than the map ever saved.

It maps **location only**. Never copy content into it — link to the authoritative file, or you have created a second source of truth to drift. Folders with 5+ children or any subfolder carry their own `INDEX.md`; read the nearest one before exploring a folder.

## Update logs — non-negotiable

Before or immediately after any non-trivial change, add an entry at `update-logs/YYYY-MM-DD/NN-short-slug.md` — **a numbered file inside a folder named for today's date**, `NN` zero-padded and incrementing within that date. Create today's folder if it does not exist. Non-trivial = structural or architectural decision, rule change, file split, tooling pick, scope interpretation, maintainer clarification, version bump, rollback. Trivial edits — typos, formatting, comment wording — need no entry.

Each entry states **what changed**, **why**, **what alternative was considered**, and any **follow-ups**. Grammar may be sacrificed for concision. Format: `update-logs/README.md`.

**End-of-session notes are triggered, not automatic** — only when the maintainer asks, or when a large uncovered span of work reaches a natural stop. One note covers the whole span since the last one, never one per task.

**Session start:** read the most recent end-of-session note; **if none exists, fall back to the most recent numbered entry** — mid-project sessions usually have no note and that is normal. Surface a one-line orientation; do not silently execute the pickup pointer. Once per session, not per task. Full protocol: `update-logs/README.md`.

## Git

**Conventional commits. No AI references of any kind** — no tool attribution in commit messages, no generated-by lines in PR bodies, no co-author trailers naming an AI. **If your runtime adds any of these by default, suppress it.**

{{GIT_SPECIFICS — same content as CLAUDE.md, minus the Claude-default override framing.}} Do not commit or push unless asked.

## Working in this repo

- Markdown goes in {{MARKDOWN_LOCATIONS}} only, unless the maintainer asks otherwise. `CLAUDE.md`, `AGENTS.md`, `INDEX.md` and `update-logs/**` are the standing exceptions.
- Reports: {{REPORTS_PATH}}/{type}-{YYMMDD-HHMM}-{slug}.md
{{PROJECT_RULES — identical to CLAUDE.md.}}

## Runtime notes
<!-- platform-specific -->

- Activate a skill by reading its `SKILL.md` and following it. There is no skill tool and no slash commands here.
- For a structured choice, present numbered options in chat, one question per turn, and wait for the answer before continuing.
- Prefer purpose-built file-reading and search tooling over shell text utilities where your runtime offers it.
- Exclude dependency directories (`node_modules/`, `vendor/`) from every search.
