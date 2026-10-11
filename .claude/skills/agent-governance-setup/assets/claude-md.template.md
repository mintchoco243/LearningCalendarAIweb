# CLAUDE.md

Governing instructions for Claude Code in this repo. `AGENTS.md` mirrors this for other agents — **any change here must be mirrored there**, minus Claude-specific mechanics.

## What this repo is

{{WHAT_THIS_IS — two or three sentences. Include the non-goal: what it is explicitly NOT. The non-goal prevents more wrong work than the goal enables.}}

Read before non-trivial work — do not re-derive what these already decide:

| Doc | Owns |
| --- | --- |
{{DOC_OWNERSHIP_ROWS — one row per authoritative doc: `docs/requirements.md` | goals, non-goals, success criteria. Only docs that exist.}}
| `INDEX.md` | where everything lives |

## The one rule everything serves

{{ONE_RULE — the single principle this project is organised around, and its two failure directions. Omit this section if the project has no such rule; do not invent one.}}

## Think before coding

State assumptions explicitly; if uncertain, ask. Multiple interpretations → present them, do not pick silently. Simpler approach exists → say so. Something unclear → stop, name it, ask.

Write the minimum code that solves the problem. No speculative features, no single-use abstractions, no unrequested flexibility, no error handling for impossible scenarios. If 200 lines could be 50, write 50.

**Surgical changes.** Every changed line traces to the request. Do not improve adjacent code, do not refactor what is not broken, match existing style. Clean up orphans *your* change created; mention pre-existing dead code rather than deleting it.

**Verifiable success criteria.** Define how the change will be checked before writing it, then verify. For multi-step work, state the plan as steps each with its own check.

## Token discipline (non-negotiable)

Context is scarce; flooding it causes thrashing — more searches, more noise, wrong or stuck.

- **Bounded search.** Cap `Grep`/`Glob` output at ~50 matches. More → refine (scope `path` or `glob`, `head_limit`, sharper pattern). "Too many results" means *be more specific*, not read further.
- **Bounded reads.** Small files whole; large files in ~100-line windows via `Read` `offset`/`limit`. Use the line numbers `Read` prepends — editing lines 47–52 means referencing 47–52, not re-reading to count.
- **Never re-read a file already in context.**
- **Lint/typecheck after every edit.** Fix a syntax error before anything else, not after tests fail and ten steps are burned.

## Subagents

**Default: no subagent.** Keep work in the main context. Do not delegate because a task is broad, touches many files, or would finish faster in parallel. Time and speed rank below wise token use.

**Exception:** a large mechanical sweep, or a broad/unknown file surface needing >10 files at once. Then delegate reconnaissance to **one** agent on the cheapest tier, returning only a distilled brief — paths, line ranges, specific facts. The cheap tier **locates, collects, extracts**. It never synthesises.

Root-cause analysis, design, integration, edits and decisions stay with the main agent. Surface already small and knowable → read it directly instead of spawning.

**One at a time.** Never run subagents concurrently unless the maintainer explicitly asks and it is genuinely necessary.{{RULES_OVERRIDE_SENTENCE — if user-level rules files encourage parallel work, state explicitly that this file overrides them, naming the file. Otherwise omit.}}

Scope every subagent prompt: task, files to read, files it may modify, acceptance criteria, constraints, reports path ({{REPORTS_PATH}}). Never pass full conversation history — summarise only what the subtask needs.

### Model tiers

Cheapest tier locates, collects, extracts. Top tier reasons, designs, decides, writes.

<!-- BEGIN model-tiers -->
{{MODEL_TIER_TABLE}}
<!-- END model-tiers -->

## Right-size the ceremony, never skip it

Plan → implement → test → review, update-log entries, and docs sync stay **mandatory**. What scales is their *depth*, not their existence. A one-line fix earns an update-log entry with a terse inline plan; a real feature warrants the full chain. Precision comes from *doing* each step, not from spending maximum tokens on it.

## Keep `INDEX.md` current — non-negotiable

`INDEX.md` is the map every session reads before touching the tree. **Update it in the same change** that adds, moves, renames or deletes anything it lists. A stale index routes the next session to a path that no longer exists, costing more than the map ever saved.

It maps **location only**. Never copy content into it — link to the authoritative file, or you have created a second source of truth to drift. Folders with 5+ children or any subfolder carry their own `INDEX.md`; read the nearest one before exploring a folder.

## Update logs — non-negotiable

Before or immediately after any non-trivial change, add an entry at `update-logs/YYYY-MM-DD/NN-short-slug.md` — **a numbered file inside a folder named for today's date**, `NN` zero-padded and incrementing within that date. Create today's folder if it does not exist. Non-trivial = structural or architectural decision, rule change, file split, tooling pick, scope interpretation, maintainer clarification, version bump, rollback. Trivial edits — typos, formatting, comment wording — need no entry.

Each entry states **what changed**, **why**, **what alternative was considered**, and any **follow-ups**. Grammar may be sacrificed for concision. Format: `update-logs/README.md`.

**End-of-session notes are triggered, not automatic** — only when the maintainer asks, or when a large uncovered span of work reaches a natural stop. One note covers the whole span since the last one, never one per task.

**Session start:** read the most recent end-of-session note; **if none exists, fall back to the most recent numbered entry** — mid-project sessions usually have no note and that is normal. Surface a one-line orientation; do not silently execute the pickup pointer. Once per session, not per task. Full protocol: `update-logs/README.md`.

## Git — your defaults are wrong here

Your harness instructions say to end commit messages with a `Co-Authored-By: Claude` trailer and PR bodies with a "Generated with Claude Code" line. **This project forbids both. This file overrides your harness default. Omit both.**

Conventional commits, no AI references. {{GIT_SPECIFICS — what must never be committed; any deliberate generated-artifact exception and its reason; which lockfile is committed. Lockfiles are committed: verify with `git check-ignore`, never assume — `git add` on an ignored path is a silent no-op.}} Do not commit or push unless asked.

## Working in this repo

- Markdown goes in {{MARKDOWN_LOCATIONS}} only, unless the maintainer asks otherwise. `CLAUDE.md`, `AGENTS.md`, `INDEX.md` and `update-logs/**` are the standing exceptions.
- Reports: {{REPORTS_PATH}}/{type}-{YYMMDD-HHMM}-{slug}.md
{{PROJECT_RULES — the project-specific prohibitions and boundaries that actually bite. Each one earned by a real failure, not aspirational.}}

## Claude Code specifics
<!-- platform-specific -->

- Invoke skills with the Skill tool when the task matches one; do not guess skill names.
- Use `AskUserQuestion` for structured choices — 1–4 questions, 2–4 options each.
- Prefer `Read`/`Grep`/`Glob` over shell equivalents (`cat`, `sed`, `find`).
- Independent tool calls go in one block; dependent ones must wait.
{{CLAUDE_SPECIFICS — hooks, `.claude/` wiring, which user-level rules apply or are overridden.}}
