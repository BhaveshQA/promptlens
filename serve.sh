#!/usr/bin/env bash
# Start a local dev server for PromptLens (static HTML site)
set -e
cd "$(dirname "$0")"

PORT="${1:-8080}"
BIND="127.0.0.1"

if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Port $PORT is already in use."
  echo ""
  lsof -nP -iTCP:"$PORT" -sTCP:LISTEN 2>/dev/null || true
  echo ""
  echo "Either open the URL below in your browser, or stop that process and run again:"
  echo "  kill \$(lsof -t -iTCP:$PORT -sTCP:LISTEN)"
  echo ""
  echo "Or use a different port:"
  echo "  ./serve.sh 8081"
  echo ""
  echo "Try:  http://$BIND:$PORT/"
  exit 1
fi

echo "Serving PromptLens from: $(pwd)"
echo ""
echo "  Open in browser:  http://$BIND:$PORT/"
echo "  (use http:// — not https://, not file://)"
echo ""
echo "Press Ctrl+C to stop."
echo ""

exec python3 -m http.server "$PORT" --bind "$BIND"
