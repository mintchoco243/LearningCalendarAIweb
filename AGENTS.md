# AGENTS.md

Governing instructions for AI coding agents in this repository. This mirrors
`CLAUDE.md`; keep the meaning of both files aligned.

## What this repo is

This repository contains a frontend-only React prototype for Garena staff to
find, explore, and sign up for Learning & Development activities. It provides a
yearly calendar, training details, and local prototype registration state. It
does not include authentication, payments, a CMS, a database, or backend work.

Read before non-trivial work:

| Doc | Owns |
| --- | --- |
| `docs/requirements.md` | scope, non-goals, success criteria |
| `docs/architecture.md` | stack, app structure, UI boundaries |
| `plans/01-landing-page-prototype.md` | approved delivery plan |
| `INDEX.md` | repository locations |

## Think before coding

State assumptions explicitly when they affect scope. Prefer the smallest
implementation that satisfies the accepted plan. Every changed line must trace
to the request; do not refactor adjacent code without need.

Define a practical check before implementing and run it after meaningful edits.
Do not weaken a failing typecheck, lint, build, test, or validator; fix the
underlying cause.

## Context discipline

- Keep search output to about 50 results; refine broad searches.
- Read small files whole and large files in focused windows.
- Do not reread files already in context without a reason.
- Fix syntax errors immediately after an edit.

## Delegation

Do not delegate by default. One reconnaissance-only delegated run may be used
for a large mechanical sweep or an unknown surface with more than ten relevant
files. It may locate, collect, and extract facts only. Design, decisions,
integration, and edits remain with the main agent. Never run delegated runs
concurrently unless the maintainer explicitly requests it.

### Model tiers

<!-- BEGIN model-tiers -->
| Task class | Claude | Codex |
| --- | --- | --- |
| Locate, collect, extract | Haiku | Luna |
| Bounded implementation | Sonnet | Terra |
| Reason, design, decide, write | Opus (Fable for hardest calls) | Sol |
<!-- END model-tiers -->

## Keep the map and logs current

Read the nearest `INDEX.md` before exploring a folder. Update the index in the
same change that adds, moves, renames, or deletes listed files. Indexes map
locations only.

For every non-trivial change, add `update-logs/YYYY-MM-DD/NN-short-slug.md`.
Include what changed, why, an alternative considered, and follow-ups. Read the
latest end-of-session note or numbered entry at session start.

## Git

Use conventional commits when asked to commit. Never include AI attribution,
generated-by lines, or co-author trailers. Never commit secrets, dotenv files,
keys, or credentials. Commit the chosen package-manager lockfile. Do not commit
or push unless asked.

## Working in this repo

- Markdown belongs in `docs/`, `plans/`, and `update-logs/`, except for root
  governance files and `INDEX.md` files.
- Keep application code in `src/`; browser-only mock data is allowed there.
- Keep the prototype frontend-only. Do not introduce server APIs, persistence,
  authentication, payments, CMS integration, or a database.
- Use English system UI text and explicit date formatting.

## Runtime specifics
<!-- platform-specific -->

- Activate a relevant skill by reading its `SKILL.md` and following it.
- Prefer purpose-built file-reading and search tools where available.
- Batch independent operations where the runtime supports it.
