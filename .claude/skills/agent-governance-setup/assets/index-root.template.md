# INDEX.md

Map of this repo. **Location only — no content.** Update in the same change that adds, moves, renames or deletes anything listed here.

Deeper folders carry their own `INDEX.md`. Read the nearest one before exploring a folder.

## Governance

| Path | Owns |
| --- | --- |
| `CLAUDE.md` | agent rules for Claude Code |
| `AGENTS.md` | agent rules for other runtimes (mirror of `CLAUDE.md`) |
| `INDEX.md` | this map |
| `update-logs/` | decision trail; see `update-logs/README.md` for the protocol |

## Documentation

| Path | Owns |
| --- | --- |
{{DOC_ROWS — one row per doc file or doc folder that exists. "Owns" is a short noun phrase naming the authority, not a summary: "goals, non-goals, success criteria" — not "this document explains the goals of the project". Folders with their own index point at it: `docs/` | `docs/INDEX.md`.}}

## Source

| Path | Owns |
| --- | --- |
{{SOURCE_ROWS — top-level source folders/packages only. Do not enumerate files inside them; that is the nested index's job. Omit this whole section if the project has no source tree yet.}}

## Configuration

| Path | Owns |
| --- | --- |
{{CONFIG_ROWS — root config files an agent must find: package manifest, lockfile, tsconfig, linter, formatter, CI workflows, ignore files. Only those present.}}

## Not mapped

{{EXEMPT_LIST — one line naming what is deliberately absent from this map and why: dependency directories, build output, local agent state, anything git-ignored. Prevents the next agent from "fixing" the omission.}}
