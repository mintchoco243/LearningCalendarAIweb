# Git Setup and Ignore Baseline

## Repository init

During `init`, check for a repository before anything else touches disk:

```bash
git rev-parse --git-dir 2>/dev/null
```

- **Exists** → leave it alone. Never re-init, never touch existing history or config.
- **Absent** → tell the maintainer you will run `git init`, and wait. Then:

```bash
git init
```

Do not create a first commit, do not add a remote, do not stage anything. `git init` establishes the repo; what goes into history is the maintainer's call. **Never commit or push unless explicitly asked** — that rule holds in every mode.

If the folder sits inside a parent repository (`git rev-parse` succeeds from a parent), say so and ask before nesting a new repo inside it. That is almost never intended.

## Ignore file

Write `.gitignore` from `assets/gitignore.template`, then **delete every block that does not apply to this project.**

That instruction is the whole point. Across the reference projects, one Next.js-shaped ignore file was copied into five repos that were not Next.js projects, carrying `# flutter`, `.dart_tool`, `GoogleService-Info.plist`, `next-env.d.ts`, and `test-ck` into places none of them existed. Four of them also inherited a corrupted line where two patterns had been merged into one — `claude/skills/.../demo-*.claude/session-state/*.tmp` — which silently ignores neither path correctly. Copy-paste debris is not free: it hides real entries, and nobody audits a 100-line ignore file.

The newest project replaced the blob with nine deliberate lines. Match that.

## Baseline — always include

Present in essentially every reference project, and correct for any stack:

```gitignore
# OS
.DS_Store
Thumbs.db

# Secrets — never commit
.env
.env.*
!.env.example

# Logs
*.log

# Agent tooling (local state, not project source)
.agentkit/
.agents/
.codex/
.opencode/
.gemini/

# Transient tool output
playwright-output/
screenshots/
repomix-output.xml
__pycache__/
```

`.env` before `.env.*` before `!.env.example` — order matters, and the negation must come last or it does nothing.

**`.claude/` is a decision, not a default.** Some reference projects ignore it wholly; one ignores it but re-includes `!/.claude/rules/` so repo-level rules stay tracked. Ask which the maintainer wants. Committed `.claude/` means shared skills and rules; ignored means local-only. Do not guess.

## Stack blocks — include only when the stack is present

Verify against the actual project before adding a block. `package.json` present → the Node block. No `package.json` → no Node block.

Node/JS: `node_modules/`, `dist/`, `build/`, `coverage/`, `*.tsbuildinfo`, `npm-debug.log*`, `yarn-error.log*`, `.pnpm-debug.log*`
Next.js: `.next/`, `out/`, `next-env.d.ts`
Storybook: `storybook-static/`
Vercel: `.vercel`
Python: `__pycache__/`, `.venv/`, `*.pyc`, `.pytest_cache/`
Flutter/Dart: `.dart_tool/`, `GoogleService-Info.plist`

## Lockfiles: commit them

**Commit `package-lock.json` / `yarn.lock` / `pnpm-lock.yaml`.** Do not ignore them.

The copied blob in five reference projects ignores all three — while the newest project's own `CLAUDE.md` states the opposite as a hard rule: *"Always commit `pnpm-lock.yaml` — verify with `git check-ignore`, never assume; `git add` on an ignored path is a silent no-op."* One of those two is wrong, and it is the blob.

Three reasons, in order of weight:

1. **Reproducibility.** Without the lockfile, an install re-resolves version ranges from scratch — another machine or another month yields different transitive versions. The lockfile is the only record of which exact tree worked.
2. **Integrity.** Each entry pins a `sha512` of the package tarball, so a tampered or republished package fails the install. Ignoring the lockfile discards that supply-chain check.
3. **CI.** `pnpm install --frozen-lockfile`, the recommended CI invocation, *fails* without a committed lockfile. Ignoring it means a broken pipeline or a silently unpinned one.

Merge conflicts are the real reason people ignore lockfiles. The fix is to resolve the conflict by re-running the install and committing the result — not to remove the mechanism.

**One package manager per repo, one committed lockfile.** Two managers' lockfiles in one tree disagree about the dependency graph, and nothing reconciles them. Ignore the other managers' lockfiles explicitly if there is any chance of one appearing. Publishing a library is the one case where ignoring the lockfile is worth discussing, and it is a discussion, not a default.

That `git check-ignore` warning generalises: **after writing `.gitignore`, verify the files you expect to be tracked are not ignored.**

```bash
git check-ignore -v <path>   # prints the rule that ignores it, or exits 1 if not ignored
```

Run it on the governance files themselves, on lockfiles, and on anything a broad rule might have swallowed. Staging an ignored path fails silently — no error, no file, no clue.

## Generated artifacts

Ignore generated output by default. When a project deliberately ships a build — a precompiled CLI, a distribution entrypoint — that is a **documented exception** carrying its reason inline:

```gitignore
dist/
# Exception: the compiled CLI is what users run; Node cannot strip types under
# node_modules, so the build ships rather than being produced at install time.
!/engine/cli/dist/
!/engine/cli/dist/**
```

A negation without a comment becomes unexplainable within a month. Both the newest projects comment theirs; follow that.

## Commit policy in the governance files

The pair carries this rule, translated per platform (see `mirror-and-translation-rules.md`):

- Conventional commits.
- **No AI references of any kind** — no tool attribution in messages, no generated-by lines in PR bodies, no AI co-author trailers.
- Scope commits narrowly; one package or concern where possible.
- Never commit secrets, dotenv files, tokens, keys, credentials, or personal data.
- Do not commit or push unless asked.

**[Claude Code]** the harness default adds a `Co-Authored-By: Claude` trailer and a generated-with line to PR bodies. `CLAUDE.md` must state explicitly that the project overrides that default and both are omitted — a general "no AI references" rule is not enough, because the harness instruction is specific and will win against vague prose.

**[Other runtimes]** state it as: no AI references of any kind; if your runtime adds them by default, suppress them.
