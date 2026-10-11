# Mirror and Translation Rules

`CLAUDE.md` is the source of truth. `AGENTS.md` is derived from it, never authored independently.

The pair exists because the audience differs, not because the rules differ. **Every rule appears in both. Only the mechanics change.** A Claude Code tool name pasted into `AGENTS.md` is not a harmless artifact — it instructs a runtime that has no such tool, which produces a failed call or an invented one.

## What must be identical

Semantically identical, wording near-identical:

- what the project is, and its non-goals
- the doc-ownership table
- every project rule, boundary, and prohibition
- behavior baseline: think-before-coding, simplicity, surgical changes, verifiable criteria
- context-discipline numbers: search caps, read-window sizes, never-re-read
- delegation policy: default off, the exception, one-at-a-time
- ceremony rules and their right-sizing
- index duty and update-log duty
- the model-tier table (see marked region below)

If a rule is worth stating for one audience it is worth stating for both. Dropping it from `AGENTS.md` because it "feels Claude-ish" is the most common drift.

## What must diverge

| Concern | `CLAUDE.md` | `AGENTS.md` |
| --- | --- | --- |
| Header sentence | "Governing instructions for Claude Code in this repo. `AGENTS.md` mirrors this for other agents — any change here must be mirrored there, minus Claude-specific mechanics." | "Governing instructions for AI coding agents in this repo. This mirrors `CLAUDE.md`, which carries the same rules plus Claude Code-specific mechanics. Any change to one must be mirrored in the other." |
| Skill invocation | "Invoke skills with the Skill tool when the task matches; do not guess skill names." | "Activate a skill by reading its `SKILL.md` and following it. No slash commands, no skill tool." |
| File reading / search | "Prefer `Read`/`Grep`/`Glob` over shell equivalents (`cat`, `sed`, `find`)." | "Prefer purpose-built file-reading and search tooling over shell text utilities where your runtime offers it." |
| Search caps | "Cap `Grep`/`Glob` output at ~50 matches." | "Cap search output at ~50 matches." |
| Read windows | "Large files in ~100-line windows via `Read` `offset`/`limit`. Use the line numbers `Read` prepends." | "Large files in ~100-line windows, targeting the range you need. Track line numbers as you read." |
| Delegation noun | "Subagents" | "Delegation" / "sub-runs" |
| Cheap-tier model | names the concrete cheapest tier, e.g. `model: haiku` | "the cheapest capable model your runtime offers" — concrete names only inside the marked tier region |
| Section title | "Token discipline" | "Context discipline" |
| Rules files | "`~/.claude/rules/*` apply except where this file overrides them." | restate the rule inline, or omit the path — other runtimes do not read it |
| Hooks / wiring | may reference hooks and `.claude/` | state the behavior, not the mechanism |
| Git trailers | "Your harness instructions say to add a `Co-Authored-By: Claude` trailer and a generated-with line. **This file overrides that. Omit both.**" | "No AI references of any kind — no tool attribution, no generated-by lines, no AI co-author trailers. If your runtime adds any by default, suppress it." |
| Parallel-work override | names the specific rules file it overrides | states the rule directly, no path |
| Structured questions | "Use `AskUserQuestion` — 1–4 questions, 2–4 options each." | "Present numbered options in chat, one question per turn, and wait for the answer before continuing." |
| Tool-call batching | "Independent tool calls go in one block; dependent ones wait." | omit, or state as "batch independent operations where your runtime supports it" |

Translating means **restating the same requirement in runtime-neutral terms**. It never means deleting the requirement.

## Marked regions

Two HTML-comment markers make the mirror mechanically checkable.

### Model tiers — must be byte-identical

```markdown
<!-- BEGIN model-tiers -->
| Tier | Claude | Codex | ... |
| --- | --- | --- | --- |
| cheap | Haiku | Luna | ... |
<!-- END model-tiers -->
```

Regenerated from `model-routing-roster.md` into both files. The validator skips leak detection inside this region — model names from every provider legitimately appear in both files here — and instead requires the two regions to match exactly.

### Platform-specific sections — exempt from parity

```markdown
## Claude Code specifics
<!-- platform-specific -->
```

An H2 followed by that marker is exempt from heading-parity checking. Use it for the one trailing section per file that carries pure runtime mechanics. Do not use it to smuggle a project rule into one file only.

## Heading parity

Both files carry the same H2 set, in the same order, except exempt sections and these permitted aliases:

| `CLAUDE.md` | `AGENTS.md` |
| --- | --- |
| Token discipline | Context discipline |
| Subagents | Delegation |

Keep the alias list short. A new alias means a new validator entry — add both together or the rule is not real.

## Forbidden leaks

The validator enforces these. Full pattern list lives in `scripts/verify_governance.py`.

**Error if found in `AGENTS.md`:** `Skill tool` · `AskUserQuestion` · `Co-Authored-By: Claude` · `Generated with [Claude Code]` · `model: haiku` · `claude-opus` / `claude-sonnet` / `claude-haiku` / `claude-fable` · backticked Claude tool names (`` `Grep` ``, `` `Glob` ``, `` `WebFetch` ``, `` `TodoWrite` ``) · `~/.claude/`

**Warn if found in `AGENTS.md`:** `subagent` · `.claude/` · `slash command` — legitimate when naming what does *not* apply, as in the header sentence. Review each.

**Error if found in `CLAUDE.md`:** provider-specific model names outside the marked tier region · "read the `SKILL.md`" as the skill-invocation instruction.

**Always allowed in both:** the words `CLAUDE.md`, `AGENTS.md`, `Claude Code`, `Codex`, `Cursor` — naming the other file or another platform is how the mirror rule is stated.

## Sync direction

`CLAUDE.md` → `AGENTS.md`. A change that arrived only in `AGENTS.md` is ported back to `CLAUDE.md` first, then re-derived forward. Two sources of truth is the failure this whole design exists to prevent.
