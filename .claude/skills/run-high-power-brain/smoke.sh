#!/usr/bin/env bash
# smoke.sh — build the wiki, serve it, verify key pages, optionally screenshot
#
# Usage:
#   bash .claude/skills/run-high-power-brain/smoke.sh            # build + verify
#   bash .claude/skills/run-high-power-brain/smoke.sh --screenshot  # + screenshot via Playwright
#
# Run from the vault root.

set -euo pipefail

VAULT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
SITE_DIR="$VAULT_ROOT/site"
PORT=8742
SCREENSHOT=false

for arg in "$@"; do
  [[ "$arg" == "--screenshot" ]] && SCREENSHOT=true
done

# ── 0. Kill any stale server holding site/ open ───────────────────────────────
# On Windows, pkill doesn't reach Python processes — use netstat+taskkill
STALE_PID=$(netstat -ano 2>/dev/null | grep ":$PORT " | grep LISTENING | awk '{print $5}' | head -1) || true
if [[ -n "$STALE_PID" ]]; then
  taskkill //F //PID "$STALE_PID" 2>/dev/null || true
  sleep 0.5
fi

# ── 1. Build ──────────────────────────────────────────────────────────────────
echo "Building wiki..."
cd "$VAULT_ROOT"
python scripts/wiki_build.py
echo ""

# ── 2. Serve ──────────────────────────────────────────────────────────────────
echo "Starting server on port $PORT..."
cd "$SITE_DIR"
python -m http.server "$PORT" >/dev/null 2>&1 &
SERVER_PID=$!
trap "taskkill //F //PID $SERVER_PID 2>/dev/null || kill $SERVER_PID 2>/dev/null || true" EXIT
sleep 1

# ── 3. Verify ─────────────────────────────────────────────────────────────────
check_page() {
  local url="$1"
  local label="$2"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT/$url")
  if [[ "$code" == "200" ]]; then
    echo "  ✓ $label ($url)"
  else
    echo "  ✗ $label ($url) — HTTP $code"
    kill "$SERVER_PID" 2>/dev/null || true
    exit 1
  fi
}

echo "Verifying pages..."
check_page "master-plan.html"        "MASTER PLAN"
check_page "1---aspirations/index.html" "Aspirations index"
check_page "9---operations/index.html"  "Operations index"
check_page "people/index.html"          "People index"
echo ""

# ── 4. Screenshot (optional) ──────────────────────────────────────────────────
if [[ "$SCREENSHOT" == "true" ]]; then
  echo "Taking screenshot (requires Node.js + playwright)..."
  TMPDIR_PW=$(mktemp -d)
  cat > "$TMPDIR_PW/package.json" << 'PKGJSON'
{"name":"ss","version":"1.0.0","dependencies":{"playwright":"1.60.0"}}
PKGJSON
  (cd "$TMPDIR_PW" && npm install --silent 2>&1 | tail -1)
  (cd "$TMPDIR_PW" && npx playwright install chromium --quiet 2>/dev/null || true)

  OUTFILE="$VAULT_ROOT/site/screenshot.png"
  cat > "$TMPDIR_PW/ss.mjs" << EOF
import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto('http://localhost:$PORT/master-plan.html');
await page.screenshot({ path: '$OUTFILE' });
await browser.close();
console.log('Screenshot saved: $OUTFILE');
EOF
  node "$TMPDIR_PW/ss.mjs"
  rm -rf "$TMPDIR_PW"
fi

echo "Smoke test passed."
