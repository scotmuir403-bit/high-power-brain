---
name: run-high-power-brain
description: Run, build, serve, or screenshot the High Power Brain wiki. Use when asked to run the vault, start the wiki server, build the wiki, take a screenshot of the site, or verify the wiki builds correctly.
---

High Power Brain is a markdown vault with a static wiki generator (`scripts/wiki_build.py` → Python). It builds 925+ pages into `site/` and serves them as a Wikipedia-style HTML site. The smoke script at `.claude/skills/run-high-power-brain/smoke.sh` is the agent path — it builds, serves on port 8742, and verifies key pages.

All commands below are verified on Windows with Git Bash (Python 3.14, Node.js 24). Run from the vault root.

## Prerequisites

```bash
pip install markdown jinja2   # one-time; wiki_build.py auto-installs these too
# Node.js required only for --screenshot
```

## Build

```bash
python scripts/wiki_build.py
# Output: "Found 925 pages" → "Built 925 pages in site/"
# Takes ~1 second. Wipes site/ and rebuilds from scratch.
```

## Run (agent path)

Build, serve, and verify all key pages return 200:

```bash
bash .claude/skills/run-high-power-brain/smoke.sh
```

Add `--screenshot` to also capture `site/screenshot.png` via Playwright (requires Node.js; downloads Chromium on first run):

```bash
bash .claude/skills/run-high-power-brain/smoke.sh --screenshot
```

Key URLs once serving on port 8742:
- `http://localhost:8742/master-plan.html` — full architecture doc
- `http://localhost:8742/1---aspirations/index.html` — Aspirations category
- `http://localhost:8742/9---operations/index.html` — Operations / workflows
- `http://localhost:8742/people/index.html` — People pages

## Run (human path)

```bash
python scripts/wiki_build.py
cd site && python -m http.server 8742
# Then open http://localhost:8742/master-plan.html in a browser
```

## Gotchas

- **Root `index.html` shows "Misc"** — `build_category_indexes()` in `wiki_build.py` overwrites `site/index.html` when processing root-level vault files (ATTRIBUTION.md, MASTER PLAN.md, Coaching philosophy.md). Their `top_cat` is empty, so `slugify("")` → `""` → path collapses to `site/index.html`. Navigate to category indexes directly (e.g. `/1---aspirations/index.html`) instead of `/`.

- **"Recent" sidebar shows spec files** — The `site/` directory is not gitignored for spec files in `5 - Projects/website-cloner/`. Their recent mtime makes them appear in the sidebar. Not a bug in the wiki generator.

- **Category URL slugification** — Folder names like `1 - Aspirations` become `1---aspirations` (spaces → hyphens, leading digits preserved). The `--` comes from spaces around the `-` separator all becoming `-`.

- **Windows process cleanup** — `pkill` from Git Bash does not kill Python processes on Windows. The smoke script uses `netstat + taskkill` instead. If the script fails with `[WinError 32] The process cannot access the file`, kill the stale server manually with `taskkill //F //PID <pid>`.

- **`set -euo pipefail` + grep in `$(...)`** — when grep returns exit code 1 (no matches) inside a pipeline inside `$()`, bash exits even though it's a variable assignment. Always append `|| true` to such pipelines.

- **Playwright first run** — The smoke script installs playwright + chromium into a temp dir every time `--screenshot` is used. This takes ~30s on first run. Cache at a fixed path if repeated screenshots are needed.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `ModuleNotFoundError: No module named 'markdown'` | `pip install markdown jinja2` |
| `Address already in use` on port 8742 | `netstat -ano \| grep ":8742" \| grep LISTENING` → get PID → `taskkill //F //PID <pid>` |
| Playwright hangs silently | Check Node.js is on PATH: `node --version` |
| Pages show 0 for a category in sidebar | That category's folder may be excluded in `wiki_build.py:EXCLUDED_DIRS_FULL` |
