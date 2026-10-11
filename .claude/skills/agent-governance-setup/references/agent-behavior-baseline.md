# Agent Behavior Baseline

The behavior sections both governance files carry. Written here in mirror-safe prose: where a mechanism is platform-specific, both phrasings are given.

Inline these as **prose rules**, not as skill invocations. "Activate the karpathy-guidelines skill" works in one runtime and fails silently in every other — and the rules are four short paragraphs, so pointing at them costs more than stating them.

## Think before coding

State assumptions explicitly; if uncertain, ask. Multiple interpretations → present them, do not pick silently. A simpler approach exists → say so. Something unclear → stop, name it, ask.

## Simplicity first

Write the minimum code that solves the problem. No speculative features, no single-use abstractions, no unrequested flexibility, no error handling for impossible scenarios. If 200 lines could be 50, write 50.

Order of preference: **YAGNI → KISS → DRY.**

## Surgical changes

Every changed line traces to the request. Do not improve adjacent code, do not refactor what is not broken, match existing style even where you would do it differently. Clean up orphans *your* change created; mention pre-existing dead code rather than deleting it.

## Verifiable success criteria

Define how the change will be checked before writing it, then verify. For multi-step work, state the plan as steps each carrying its own check:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
```

Weak criteria ("make it work") force constant clarification. Strong ones let the agent loop on its own.

## Context discipline — non-negotiable

Context is scarce; flooding it causes thrashing — more searches, more noise, wrong or stuck.

- **Bounded search.** Cap output at ~50 matches. More → refine: narrower path, narrower file glob, sharper pattern, result limit. "Too many results" means *be more specific*, not read further.
- **Bounded reads.** Small files whole; large files in ~100-line windows targeting the range you need. Track line numbers as you read — editing lines 47–52 means referencing 47–52, not re-reading the file to count.
- **Never re-read a file already in context.**
- **Lint/typecheck after every edit.** Fix a syntax error before anything else, not after tests fail and ten steps are burned.

**[Claude Code]** name the tools: cap `Grep`/`Glob` output, use `Read` with `offset`/`limit`, use the line numbers `Read` prepends, prefer `Read`/`Grep`/`Glob` over `cat`/`sed`/`find`. Section title: **Token discipline**.

**[Other runtimes]** state the same caps against "search output" and "file reading", and prefer purpose-built tooling over shell text utilities where the runtime offers it. Section title: **Context discipline**.

## Delegation — off by default

**Default: no delegation.** Keep work in the main context. Do not hand off because a task is broad, touches many files, or would finish faster in parallel. **Time and speed rank below wise context use.**

**Exception:** a large mechanical sweep, or a broad and unknown file surface needing more than about ten files at once. Then delegate reconnaissance to **one** sub-run on the cheapest capable tier, returning only a distilled brief — paths, line ranges, specific facts. The cheap run **locates, collects, extracts. It never synthesises.**

Root-cause analysis, design, integration, edits and decisions stay with the main agent. Surface already small and knowable → read it directly instead of delegating.

**One at a time.** Never run sub-runs concurrently unless the maintainer explicitly asks and it is genuinely necessary. Sequential wins.

Scope every delegated prompt: task, files to read, files it may modify, acceptance criteria, constraints, where to write its report. **Never pass full conversation history** — summarise only what the subtask needs.

**[Claude Code]** call them subagents, name the concrete cheap tier (`model: haiku`) and the agent types available, and state explicitly that this **overrides** any parallel-work guidance in the user-level rules files — otherwise those rules win against vague prose.

**[Other runtimes]** call them sub-runs or delegated runs, phrase the tier as "the cheapest capable model your runtime offers", and state the sequential rule directly with no rules-file path.

Tier routing detail: `model-routing-roster.md`.

## Right-size the ceremony, never skip it

Plan → implement → test → review, update-log entries, and docs sync stay **mandatory**. What scales is their *depth*, not their existence. A one-line fix earns an update-log entry with a terse inline plan; a real feature warrants the full chain. Precision comes from *doing* each step, not from spending maximum tokens on it.

This paragraph matters more than it looks. Without it, "be token-efficient" gets read as permission to skip the plan, skip the log, and skip the review — which is how a project loses its decision trail while appearing disciplined.

## Never weaken a check

Never hide or weaken a failing lint, typecheck, build, test, or validator to make it pass. Fix the cause, or raise the rule as a deliberate change.

## Reporting style

Sacrifice grammar for concision. List unresolved questions at the end. State what was skipped and why, rather than reporting partial work as complete.
