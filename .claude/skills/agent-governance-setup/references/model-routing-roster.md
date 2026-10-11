# Model Routing Roster

**This file is the only place model names live.** Governance files describe work in task classes and carry one generated tier table. When a provider renames or releases a tier, this file changes and both governance files get their marked region regenerated — nothing else moves.

That constraint comes from observed failure: earlier projects hardcoded `GPT-5.4-mini` and `GPT-5.6 Luna` into their prose, and both went stale while the surrounding rules stayed correct. Names drift faster than principles.

## Task classes

Two classes. The split is about **judgment**, not difficulty or size.

### Class A — locate, collect, extract

Cheapest capable tier. Low or no extended thinking.

- finding which files are relevant
- collecting paths, line ranges, symbol locations
- extracting a stated fact from a known file
- mechanical sweeps across many files
- counting, listing, enumerating
- verifying a string is present or absent

Class A returns a **distilled brief**: paths, line ranges, specific facts. It never returns an opinion, a diagnosis, or a design.

### Class B — reason, design, decide, write

Top tier available. Extended thinking where offered.

- root-cause analysis
- architecture and design decisions
- brainstorming and option comparison
- writing plans, documents, specs
- writing and editing production code
- reviewing code and reviewing plans
- integration work and any judgment call
- every interaction with the maintainer

**Class B work never runs on a Class A tier**, however routine it looks. A cheap tier that guesses at a root cause costs more than the tokens it saved, because the wrong answer gets built on.

The mid tier exists for Class B work that is well-specified and bounded — a mechanical refactor with a clear spec, a test written against a stated contract. When in doubt between mid and top, the decision itself is Class B: use top.

## Roster

Maintain this table. It generates the marked region in `CLAUDE.md` and `AGENTS.md`.

| Class | Claude | Codex (OpenAI) | Google | DeepSeek |
| --- | --- | --- | --- | --- |
| A — locate/collect/extract | Haiku | Luna | *fill in* | *fill in* |
| B — bounded implementation | Sonnet | Terra | *fill in* | *fill in* |
| B — reason/design/decide | Opus | Sol | *fill in* | *fill in* |
| B — hardest calls | Fable | Sol | *fill in* | *fill in* |

Rows are task classes, columns are providers. Add a provider by adding a column; never by adding prose to a governance file.

Verify a tier name against the runtime before writing it into a project. A wrong model id fails loudly at call time, which is survivable — but a *plausible* wrong name that silently resolves to a different tier is not.

## The generated region

Both governance files carry this, byte-identical, between markers. Keep it to the providers the maintainer actually uses; a table full of *fill in* rows is noise.

```markdown
<!-- BEGIN model-tiers -->
| Task class | Claude | Codex |
| --- | --- | --- |
| Locate, collect, extract | Haiku | Luna |
| Bounded implementation | Sonnet | Terra |
| Reason, design, decide, write | Opus (Fable for the hardest calls) | Sol |
<!-- END model-tiers -->
```

The validator requires both regions to match exactly and skips leak detection inside them — cross-provider names belong in both files here, and only here.

## Prose that surrounds the table

The governance files state the routing rule in class terms, so the prose survives every model release:

> Delegate only reconnaissance, and only to the cheapest tier: it **locates, collects, extracts** and returns a distilled brief — paths, line ranges, facts. It never synthesises. Root-cause analysis, design, integration, edits and decisions stay with the main agent on a top tier.

**[Claude Code]** may name the concrete tier at the call site, e.g. `model: haiku`, since the mechanism is Claude-specific anyway.

**[Other runtimes]** phrase it as "the cheapest capable model your runtime offers", and let the table supply the name.

## Delegation is still off by default

Tier routing is not a licence to delegate. The baseline in `agent-behavior-baseline.md` holds: **no delegation by default**, one sub-run at a time, and only for a large mechanical sweep or a broad unknown file surface. Choosing the right tier for a delegation that should not have happened saves nothing.
