#!/usr/bin/env python3
"""Verify a project's agent-governance layer.

Checks the CLAUDE.md / AGENTS.md mirror pair, the INDEX.md wayfinder layer,
update-logs naming, and the ignore-file baseline.

Usage:
    python3 verify-governance.py [PROJECT_ROOT] [--json]

Exit 1 if any ERROR was found, 0 otherwise (warnings do not fail the run).
Standard library only; no third-party dependencies.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

LINE_CAP_HARD = 200
LINE_CAP_WARN = 120
NESTED_INDEX_CHILD_THRESHOLD = 5

# Directories never mapped in an index and never walked.
EXEMPT_DIRS = {
    ".git", ".github", "node_modules", "vendor", "dist", "build", "out",
    ".next", ".venv", "__pycache__", ".pytest_cache", "coverage",
    "storybook-static", ".turbo", ".cache", ".vercel",
    ".claude", ".agentkit", ".agents", ".codex", ".opencode", ".gemini",
}
EXEMPT_FILE_PREFIXES = (".",)

# High-churn or generated folders: never expected to carry their own index.
NO_INDEX_DIRS = {
    "update-logs", "reports", "journals", "__fixtures__", "__snapshots__",
    "__tests__", "__mocks__", "fixtures", "snapshots",
}

# Heading aliases: both governance files may use either name for the same
# section. Values are the canonical key both sides normalise to.
HEADING_ALIASES = {
    "token discipline": "context-discipline",
    "context discipline": "context-discipline",
    "subagents": "delegation",
    "delegation": "delegation",
    "claude code specifics": "platform-notes",
    "runtime notes": "platform-notes",
}

# Leaks in AGENTS.md: content that instructs a runtime which has no such thing.
AGENTS_LEAKS_ERROR = [
    (r"AskUserQuestion", "Claude-only tool name"),
    (r"\bSkill tool\b", "Claude-only tool name"),
    (r"model:\s*(haiku|sonnet|opus|fable)", "Claude-only model directive"),
    (r"Co-Authored-By", "Claude harness-specific trailer"),
    (r"`(Read|Grep|Glob|Edit|Write|Bash|Task|TodoWrite|WebFetch)`",
     "Claude-only tool name"),
    (r"\.claude/", "Claude-only path"),
    (r"/ak:", "Claude-only slash command"),
    (r"\bharness\b", "Claude harness framing"),
    (r"`(offset|limit|head_limit)`", "Claude-only tool parameter"),
]
AGENTS_LEAKS_WARN = [
    (r"Claude Code", "Claude Code named outside a mirror reference"),
    (r"\bsubagent", "Claude terminology; prefer sub-run / delegated run"),
    (r"slash command", "Claude Code terminology"),
]

# Leaks in CLAUDE.md: mirror-side phrasing that reads as vague to Claude Code,
# which has concrete tools and should be told to use them by name.
CLAUDE_LEAKS_WARN = [
    (r"your runtime", "generic mirror phrasing; name the Claude tool instead"),
    (r"cheapest capable model your runtime", "generic mirror phrasing"),
    (r"\bsub-run", "mirror terminology; Claude Code calls these subagents"),
]

MARKED_REGION_RE = re.compile(
    r"<!--\s*BEGIN\s+([a-z0-9-]+)\s*-->(.*?)<!--\s*END\s+\1\s*-->",
    re.DOTALL,
)
PLATFORM_MARKER = "<!-- platform-specific -->"
PLACEHOLDER_RE = re.compile(r"\{\{[A-Z_]+")
BACKTICK_PATH_RE = re.compile(r"`([^`]+)`")
DATE_DIR_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
LOG_FILE_RE = re.compile(r"^\d{2}-[a-z0-9][a-z0-9-]*\.md$")
LOCKFILES = ("package-lock.json", "yarn.lock", "pnpm-lock.yaml")


class Report:
    def __init__(self) -> None:
        self.items: list[dict] = []

    def add(self, level: str, check: str, message: str, path: str = "") -> None:
        self.items.append(
            {"level": level, "check": check, "message": message, "path": path}
        )

    def error(self, check: str, message: str, path: str = "") -> None:
        self.add("ERROR", check, message, path)

    def warn(self, check: str, message: str, path: str = "") -> None:
        self.add("WARN", check, message, path)

    @property
    def error_count(self) -> int:
        return sum(1 for i in self.items if i["level"] == "ERROR")

    @property
    def warn_count(self) -> int:
        return sum(1 for i in self.items if i["level"] == "WARN")


def read(path: Path) -> str | None:
    try:
        return path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        return None


def strip_marked_regions(text: str) -> str:
    """Remove BEGIN/END regions — they are legitimately cross-platform."""
    return MARKED_REGION_RE.sub("", text)


def strip_platform_section(text: str) -> str:
    """Remove the trailing platform-specific section from the marker onward."""
    idx = text.find(PLATFORM_MARKER)
    if idx == -1:
        return text
    # Back up to the start of the heading line that precedes the marker.
    head = text[:idx].rstrip("\n")
    last_heading = head.rfind("\n## ")
    return head[:last_heading] if last_heading != -1 else head


def h2_headings(text: str) -> list[str]:
    return re.findall(r"^##\s+(.+?)\s*$", text, re.MULTILINE)


def canonical_heading(heading: str) -> str:
    h = heading.lower().replace("`", "")
    h = re.sub(r"\s*\((?:non-negotiable|required)\)\s*", "", h)
    h = re.split(r"\s+[—–-]{1,2}\s+", h)[0]  # drop trailing clause after a dash
    h = re.sub(r"\s+", " ", h).strip()
    return HEADING_ALIASES.get(h, h)


# --- checks -----------------------------------------------------------------


def check_presence(root: Path, rep: Report) -> dict[str, str]:
    """Confirm the governance artifacts exist. Returns the ones that do."""
    found: dict[str, str] = {}
    required = {
        "CLAUDE.md": "ERROR",
        "AGENTS.md": "ERROR",
        "INDEX.md": "ERROR",
        "update-logs/README.md": "WARN",
        ".gitignore": "WARN",
    }
    for rel, level in required.items():
        path = root / rel
        text = read(path) if path.is_file() else None
        if text is None:
            rep.add(level, "presence", f"missing {rel}", rel)
        else:
            found[rel] = text
    if (root / "update-log").is_dir():
        rep.error(
            "presence",
            "found 'update-log/' — the canonical folder is 'update-logs/' (plural)",
            "update-log",
        )
    return found


def check_length_and_placeholders(files: dict[str, str], rep: Report) -> None:
    for rel in ("CLAUDE.md", "AGENTS.md"):
        text = files.get(rel)
        if text is None:
            continue
        n = len(text.splitlines())
        if n > LINE_CAP_HARD:
            rep.error("length", f"{rel} is {n} lines; hard cap is {LINE_CAP_HARD}", rel)
        elif n > LINE_CAP_WARN:
            rep.warn(
                "length",
                f"{rel} is {n} lines; target is under {LINE_CAP_WARN} "
                f"— delegate detail to a reference file",
                rel,
            )
        for m in PLACEHOLDER_RE.finditer(text):
            line = text[: m.start()].count("\n") + 1
            rep.error(
                "placeholder",
                f"{rel}:{line} still contains an unfilled template placeholder",
                rel,
            )


def check_heading_parity(files: dict[str, str], rep: Report) -> None:
    claude, agents = files.get("CLAUDE.md"), files.get("AGENTS.md")
    if claude is None or agents is None:
        return
    c = {canonical_heading(h): h for h in h2_headings(claude)}
    a = {canonical_heading(h): h for h in h2_headings(agents)}
    # The platform section is where divergence is allowed; one side lacking it
    # is a gap worth flagging, not a mirror violation.
    for key in sorted(c.keys() - a.keys()):
        level = "WARN" if key == "platform-notes" else "ERROR"
        rep.add(
            level,
            "heading-parity",
            f"CLAUDE.md has section '{c[key]}' with no counterpart in AGENTS.md",
            "AGENTS.md",
        )
    for key in sorted(a.keys() - c.keys()):
        level = "WARN" if key == "platform-notes" else "ERROR"
        rep.add(
            level,
            "heading-parity",
            f"AGENTS.md has section '{a[key]}' with no counterpart in CLAUDE.md",
            "CLAUDE.md",
        )
    for rel, text in (("CLAUDE.md", claude), ("AGENTS.md", agents)):
        if PLATFORM_MARKER not in text:
            rep.warn(
                "heading-parity",
                f"{rel} has no '{PLATFORM_MARKER}' section; platform-specific "
                f"mechanics belong in one marked section, not scattered",
                rel,
            )


def check_marked_regions(files: dict[str, str], rep: Report) -> None:
    claude, agents = files.get("CLAUDE.md"), files.get("AGENTS.md")
    if claude is None or agents is None:
        return
    c = {name: body for name, body in MARKED_REGION_RE.findall(claude)}
    a = {name: body for name, body in MARKED_REGION_RE.findall(agents)}
    if "model-tiers" not in c:
        rep.warn(
            "marked-region",
            "CLAUDE.md has no 'model-tiers' region; model names should live in "
            "one regenerable block",
            "CLAUDE.md",
        )
    for name in sorted(c.keys() | a.keys()):
        if name not in a:
            rep.error("marked-region", f"region '{name}' missing from AGENTS.md", "AGENTS.md")
        elif name not in c:
            rep.error("marked-region", f"region '{name}' missing from CLAUDE.md", "CLAUDE.md")
        elif c[name].strip() != a[name].strip():
            rep.error(
                "marked-region",
                f"region '{name}' differs between the pair; marked regions must "
                f"be byte-identical",
                "AGENTS.md",
            )


def check_leaks(files: dict[str, str], rep: Report) -> None:
    specs = (
        ("AGENTS.md", AGENTS_LEAKS_ERROR, "ERROR"),
        ("AGENTS.md", AGENTS_LEAKS_WARN, "WARN"),
        ("CLAUDE.md", CLAUDE_LEAKS_WARN, "WARN"),
    )
    for rel, patterns, level in specs:
        text = files.get(rel)
        if text is None:
            continue
        scannable = strip_platform_section(strip_marked_regions(text))
        for lineno, line in enumerate(scannable.splitlines(), start=1):
            lowered = line.lower()
            # A line about the mirror, or one enumerating several runtimes,
            # is discussing portability rather than instructing a runtime.
            if "mirror" in lowered:
                continue
            if "claude code" in lowered and any(
                other in lowered for other in ("codex", "cursor", "gemini", "copilot")
            ):
                continue
            for pattern, why in patterns:
                m = re.search(pattern, line)
                if m:
                    rep.add(
                        level,
                        "platform-leak",
                        f"{rel}: '{m.group(0)}' — {why}",
                        rel,
                    )


def expand_index_path(raw: str) -> list[str]:
    """Turn one index cell into concrete relative paths to test."""
    raw = raw.strip().rstrip("/")
    raw = re.sub(r"/?\*\*?$", "", raw)  # drop trailing /** or /*
    if not raw or raw.startswith(("http", "#")) or " " in raw:
        return []
    brace = re.search(r"\{([^}]*)\}", raw)
    if brace:
        return [
            raw[: brace.start()] + alt.strip() + raw[brace.end() :]
            for alt in brace.group(1).split(",")
        ]
    return [raw]


def iter_index_files(root: Path):
    for path in sorted(root.rglob("INDEX.md")):
        if any(part in EXEMPT_DIRS for part in path.relative_to(root).parts):
            continue
        yield path


def check_index_paths(root: Path, rep: Report) -> None:
    for index in iter_index_files(root):
        rel_index = index.relative_to(root).as_posix()
        text = read(index)
        if text is None:
            rep.error("index-path", f"cannot read {rel_index}", rel_index)
            continue
        for lineno, line in enumerate(text.splitlines(), start=1):
            if not line.lstrip().startswith("|"):
                continue
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if not cells or set(cells[0]) <= set("-: "):
                continue
            m = BACKTICK_PATH_RE.search(cells[0])
            if not m:
                continue
            for candidate in expand_index_path(m.group(1)):
                target = (index.parent / candidate).resolve()
                if not target.exists():
                    rep.error(
                        "index-path",
                        f"{rel_index}:{lineno} points at '{candidate}', "
                        f"which does not exist",
                        rel_index,
                    )


def visible_children(directory: Path) -> list[Path]:
    out = []
    for child in sorted(directory.iterdir()):
        if child.name in EXEMPT_DIRS:
            continue
        if child.is_file() and child.name.startswith(EXEMPT_FILE_PREFIXES):
            continue
        out.append(child)
    return out


def check_index_coverage(root: Path, files: dict[str, str], rep: Report) -> None:
    """Every index must list the children of its own folder.

    Runs over the root index and every nested index reachable through it, so a
    map that went stale three folders down is reported as loudly as a stale
    root map. A mapped folder with no index of its own ends that branch —
    check_nested_index owns the finding that the index is missing.
    """
    if files.get("INDEX.md") is None:
        return
    queue = [root]
    while queue:
        directory = queue.pop(0)
        index = directory / "INDEX.md"
        index_text = read(index) if index.is_file() else None
        if index_text is None:
            continue
        rel_index = index.relative_to(root).as_posix()
        where = (
            "at the root"
            if directory == root
            else f"in {directory.relative_to(root).as_posix()}/"
        )
        for child in visible_children(directory):
            name = child.name
            if name in ("INDEX.md", "CLAUDE.md", "AGENTS.md"):
                continue
            if name not in index_text:
                rep.warn(
                    "index-coverage",
                    f"'{name}' exists {where} but is not listed in {rel_index}",
                    rel_index,
                )
                continue
            if child.is_dir() and (child / "INDEX.md").is_file():
                queue.append(child)


def check_nested_index(root: Path, rep: Report) -> None:
    """Expect an index only in folders the index layer actually maps.

    The wayfinder exists so that descending through *mapped* folders always
    meets an index first. It is not a mandate to index every source and
    fixture directory — that would cost more upkeep than the map saves. So a
    folder is only a candidate when its parent's index names it, and a folder
    without an index terminates the walk instead of cascading warnings down
    its whole subtree.
    """
    queue = [root]
    while queue:
        directory = queue.pop(0)
        index = directory / "INDEX.md"
        index_text = read(index) if index.is_file() else None
        if index_text is None:
            continue
        for child in visible_children(directory):
            if not child.is_dir() or child.name in NO_INDEX_DIRS:
                continue
            if child.name not in index_text:
                continue  # not mapped — index-coverage owns that finding
            if (child / "SKILL.md").is_file():
                continue  # a skill's SKILL.md is already that folder's wayfinder
            grandchildren = visible_children(child)
            has_subdir = any(
                g.is_dir() and g.name not in NO_INDEX_DIRS for g in grandchildren
            )
            if len(grandchildren) < NESTED_INDEX_CHILD_THRESHOLD and not has_subdir:
                continue
            rel = child.relative_to(root).as_posix()
            if (child / "INDEX.md").is_file():
                queue.append(child)
            else:
                reason = (
                    "contains a subfolder"
                    if has_subdir
                    else f"has {len(grandchildren)} children"
                )
                rep.warn(
                    "nested-index",
                    f"{rel}/ is mapped and {reason}, but has no INDEX.md",
                    rel,
                )


def check_update_logs(root: Path, rep: Report) -> None:
    logs = root / "update-logs"
    if not logs.is_dir():
        return
    dated = 0
    for child in sorted(logs.iterdir()):
        if child.is_file():
            if child.name != "README.md" and child.suffix == ".md":
                rep.error(
                    "update-log-path",
                    f"update-logs/{child.name} is a flat file; entries belong in "
                    f"a YYYY-MM-DD subfolder",
                    f"update-logs/{child.name}",
                )
            continue
        if not child.is_dir() or child.name in EXEMPT_DIRS:
            continue
        if not DATE_DIR_RE.match(child.name):
            rep.error(
                "update-log-path",
                f"update-logs/{child.name}/ is not a YYYY-MM-DD folder name",
                f"update-logs/{child.name}",
            )
            continue
        dated += 1
        for entry in sorted(child.iterdir()):
            if entry.is_dir() or entry.suffix != ".md":
                continue
            if not LOG_FILE_RE.match(entry.name):
                rep.error(
                    "update-log-path",
                    f"update-logs/{child.name}/{entry.name} does not match "
                    f"NN-short-slug.md",
                    f"update-logs/{child.name}/{entry.name}",
                )
    if dated == 0:
        rep.warn("update-log-path", "update-logs/ has no dated entry folders", "update-logs")


def check_gitignore(root: Path, files: dict[str, str], rep: Report) -> None:
    text = files.get(".gitignore")
    if text is None:
        return
    lines = [ln.strip() for ln in text.splitlines()]
    active = [ln for ln in lines if ln and not ln.startswith("#")]
    joined = "\n".join(active)

    baseline = [(".DS_Store", "WARN"), (".env", "ERROR")]
    for pattern, level in baseline:
        if not any(ln == pattern or ln.startswith(pattern) for ln in active):
            rep.add(level, "gitignore", f".gitignore does not cover '{pattern}'", ".gitignore")
    if ".env" in joined and "!.env.example" not in joined:
        rep.warn(
            "gitignore",
            ".gitignore ignores .env files without re-including .env.example",
            ".gitignore",
        )
    if (root / "package.json").is_file() and "node_modules" not in joined:
        rep.error("gitignore", ".gitignore does not cover 'node_modules'", ".gitignore")

    for lock in LOCKFILES:
        if not (root / lock).is_file():
            continue
        if any(ln == lock or ln.endswith("/" + lock) for ln in active):
            rep.error(
                "gitignore",
                f"'{lock}' exists but is ignored; lockfiles are committed — "
                f"reproducibility, integrity hashes, and --frozen-lockfile CI "
                f"all depend on it",
                ".gitignore",
            )

    present = [lock for lock in LOCKFILES if (root / lock).is_file()]
    if len(present) > 1:
        rep.warn(
            "gitignore",
            f"{len(present)} lockfiles present ({', '.join(present)}); one "
            f"package manager per repo, one committed lockfile",
            ".gitignore",
        )

    for lineno, line in enumerate(lines, start=1):
        if line.count("*") and "/" in line and re.search(r"\*[^\s/]*\.[a-z]+[a-z./*-]*\*", line):
            rep.warn(
                "gitignore",
                f".gitignore:{lineno} looks like two patterns merged onto one "
                f"line: '{line}'",
                ".gitignore",
            )


# --- entry point ------------------------------------------------------------


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", nargs="?", default=".", help="project root")
    parser.add_argument("--json", action="store_true", help="emit JSON")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    if not root.is_dir():
        print(f"not a directory: {root}", file=sys.stderr)
        return 2

    rep = Report()
    files = check_presence(root, rep)
    check_length_and_placeholders(files, rep)
    check_heading_parity(files, rep)
    check_marked_regions(files, rep)
    check_leaks(files, rep)
    check_index_paths(root, rep)
    check_index_coverage(root, files, rep)
    check_nested_index(root, rep)
    check_update_logs(root, rep)
    check_gitignore(root, files, rep)

    if args.json:
        print(json.dumps(
            {
                "root": str(root),
                "errors": rep.error_count,
                "warnings": rep.warn_count,
                "findings": rep.items,
            },
            indent=2,
        ))
    else:
        for item in rep.items:
            print(f"{item['level']:5}  {item['check']:16}  {item['message']}")
        if not rep.items:
            print("OK — governance layer passes all checks.")
        else:
            print(f"\n{rep.error_count} error(s), {rep.warn_count} warning(s)")

    return 1 if rep.error_count else 0


if __name__ == "__main__":
    sys.exit(main())
