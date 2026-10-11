# Index Wayfinder Protocol

## Why the index exists separately

Structure changes constantly. Governance files change rarely. Keeping the folder map inside `CLAUDE.md` couples a fast-moving fact to a slow-moving file, so the map goes stale and the governance files get edited for reasons that have nothing to do with governance.

`INDEX.md` splits them. It is the **wayfinder**: an agent reads it to find where something lives instead of exploring the tree — which is the cheapest form of partial disclosure available. One index read replaces a dozen speculative `ls` and `glob` calls.

## Partial disclosure

Nothing is disclosed to an agent up front except how to find things.

1. Session starts → read `CLAUDE.md` (or `AGENTS.md`) and the latest update-log entry. That is all.
2. Need to find something → read the nearest `INDEX.md`.
3. Going deeper → read that folder's `INDEX.md` first, before listing or globbing it.
4. Need authoritative detail → open the one file the index points at.

**The rule for agents: at every level, the index is read before the folder is explored.** An index that is skipped saves nobody anything.

## Location only — the hard rule

`INDEX.md` maps **where**, never **what**. One line per entry: path, and a short phrase naming what it owns. No rationale, no status, no API detail, no explanation of how something works.

Content in an index creates a second source of truth, and the second one always drifts. If the index and the file it points at disagree, **the file wins and the index is a bug.**

This is the failure mode most likely to recur. One reference project's index grew to 15KB and 156 lines, carrying implementation notes, design rationale, per-file behavior descriptions, and pending-review states — the newest project's index does the same job in 62 lines because it only ever maps location. Length is the symptom; content creep is the disease.

Specific bans, all observed in the drifted version:

- **No status.** "Which phase is complete?" is answered by the plan, not the map. State goes stale fastest of all.
- **No rationale.** "Why duplication is correct here" belongs in the architecture doc.
- **No behavior.** "Breaks if removed", "hardcodes the prefix in 5 regexes" — that is documentation.
- **No pending flags.** "Placeholder, pending final artwork" is project state.

When tempted, add the fact to the authoritative file and point at it.

## Root index

Root `INDEX.md` maps top-level structure and links each child index. Sections group by kind — governance, documentation, source, working files. Target under 80 lines.

Opening lines state the contract, so every reader inherits it:

```markdown
# INDEX

Map of this repo. **Location only — no content.** Update in the same change that
adds, moves, renames or deletes anything listed here.
```

## Nested indexes

**Threshold: a folder gets its own `INDEX.md` when it has 5 or more children, or contains any subfolder.**

Below the threshold, the parent index lists the folder's files directly. This avoids a litter of three-line index files while guaranteeing every branch point has a wayfinder.

A nested index maps **its own level only**. It lists its files, and links its child indexes without reproducing their contents. Depth is navigated by descending, not by reading one enormous file.

```markdown
# docs/ INDEX

Location only. Update in the same change that moves anything listed here.

| Path | Owns |
| --- | --- |
| `requirements.md` | goals, non-goals, success criteria |
| `architecture.md` | stack, layout, boundaries, ADRs |
| `guidelines/INDEX.md` | writing and convention guides → |

Parent: `../INDEX.md`
```

Every nested index links back to its parent. Navigation runs both directions.

Exempt from needing an index: `node_modules/`, `.git/`, `dist/`, `build/`, `coverage/`, `.venv/`, `__pycache__/`, dated `update-logs/YYYY-MM-DD/` folders (their naming *is* the index), and any ignored path.

**A folder containing a `SKILL.md` is also exempt.** That file is already the wayfinder for its own folder — its reference map states what to load and when. Adding an `INDEX.md` beside it duplicates that map, which is the second-source-of-truth failure this protocol exists to prevent. The same reasoning extends to any folder whose entry-point file already routes the reader.

## Generation and reconciliation

The tree is the source of truth. Indexes are generated from it — never the reverse. Nobody restructures a project by editing an index.

To generate or reconcile:

Reconciliation covers the **whole tree, every level**. The root index is not a special case that can be refreshed on its own: a folder three levels down that gained a subfolder needs its own index created, and its parent needs a link to it. Doing only the root leaves the deeper map pointing at a structure that no longer exists — the precise failure the index exists to prevent.

1. Walk the entire tree, skipping ignored and exempt paths.
2. For each folder meeting the threshold, ensure an `INDEX.md` exists, and that its parent index links to it.
3. Where a folder has dropped below the threshold, delete its index and fold its entries back into the parent — an index layer that only ever grows becomes litter.
4. For each existing index at any depth: drop entries whose paths no longer exist, add entries for paths present on disk but unlisted, and leave correct entries **byte-for-byte alone** — a reconciliation pass that rewrites working descriptions is not surgical.
5. Preserve human-written "Owns" phrases. They carry judgment a walker cannot regenerate. Only supply a phrase for genuinely new entries.
6. Run the validator to confirm no dead paths and no uncovered folders remain at any level.

The validator checks all of this and writes none of it. It reports dead paths, uncovered children and missing nested indexes wherever they occur; creating and editing the files is the agent's work, because an "Owns" phrase is a judgment call and a walker would flatten every one of them into a filename.

## Standing duty in the governance files

The pair carries this, and it is not optional:

> `INDEX.md` is the map every session reads before touching the tree. **Update it in the same change** that adds, moves, renames or deletes anything it lists. A stale index routes the next session to a path that no longer exists, costing more than the map ever saved.

The same-change requirement is what keeps the map honest. This skill's `update` mode is the reconciler for when that slipped, and the generator when a change is too large to hand-patch — not a substitute for the duty.
