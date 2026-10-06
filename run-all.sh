#!/usr/bin/env bash
# Start every GAMBOL design at once. Ctrl+C stops them all.
#
#   ./run-all.sh            dev servers with hot reload
#   ./run-all.sh --prod     build each project, then serve the production build
#                           (use this if a dev server fails with "spawn EBADF")
#   ./run-all.sh --open     also open every design in the browser once it is up
#
# Flags can be combined: ./run-all.sh --prod --open

cd "$(dirname "$0")" || exit 1

MODE=dev
OPEN=0
for arg in "$@"; do
  case "$arg" in
    --prod) MODE=prod ;;
    --open) OPEN=1 ;;
    -h|--help) sed -n '2,9p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "Unknown option: $arg (try --help)"; exit 1 ;;
  esac
done

# name | folder | port | path to open
DESIGNS="
everyday-a|designs/everyday-a|3500|/
everyday-b|designs/everyday-b|3100|/
concept-set-a|designs/concept-set-a|3300|/concept-01
concept-set-b|designs/concept-set-b|3600|/concept-01
"
SKIPPED=" "

# Stop every child process when this script ends.
trap 'echo; echo "Stopping all designs…"; kill 0 2>/dev/null' INT TERM EXIT

port_busy() { lsof -nP -iTCP:"$1" -sTCP:LISTEN >/dev/null 2>&1; }

start() {
  local name=$1 dir=$2 port=$3
  (
    cd "$dir" || exit 1
    if [ ! -d node_modules ]; then
      echo "installing dependencies…"
      npm install --no-audit --no-fund || exit 1
    fi
    if [ "$MODE" = prod ]; then
      echo "building…"
      npx nuxi build >/dev/null || { echo "build failed — run 'npx nuxi build' in $dir to see why"; exit 1; }
      PORT=$port node .output/server/index.mjs
    else
      npx nuxi dev --port "$port"
    fi
  ) 2>&1 | sed -u "s/^/[$name] /" &
}

echo "GAMBOL — starting all designs ($MODE mode)"
echo
while IFS='|' read -r name dir port path; do
  [ -z "$name" ] && continue
  if port_busy "$port"; then
    echo "[$name] port $port is already in use — skipped"
    SKIPPED="$SKIPPED$name "
    continue
  fi
  start "$name" "$dir" "$port"
  # Start the next one only after this one answers: dev servers that boot at the
  # same moment all grab the same hot-reload port (24678) and one of them breaks.
  for _ in $(seq 1 90); do
    curl -s -o /dev/null "http://localhost:$port$path" && break
    sleep 2
  done
done <<< "$DESIGNS"

# Wait for the servers, then print a summary (and open them if asked).
for _ in $(seq 1 180); do
  ready=1
  while IFS='|' read -r name dir port path; do
    [ -z "$name" ] && continue
    case "$SKIPPED" in *" $name "*) continue ;; esac
    curl -s -o /dev/null "http://localhost:$port$path" || ready=0
  done <<< "$DESIGNS"
  [ $ready = 1 ] && break
  sleep 2
done

echo
echo "────────────────────────────────────────────────────────"
while IFS='|' read -r name dir port path; do
  [ -z "$name" ] && continue
  case "$SKIPPED" in
    *" $name "*)
      printf '  – %-14s skipped: port %s is used by another program (lsof -i :%s shows which)\n' "$name" "$port" "$port"
      continue ;;
  esac
  if curl -s -o /dev/null "http://localhost:$port$path"; then
    printf '  ✓ %-14s http://localhost:%s%s\n' "$name" "$port" "$path"
    [ $OPEN = 1 ] && open "http://localhost:$port$path"
  else
    printf '  ✗ %-14s not responding — see the [%s] lines above\n' "$name" "$name"
  fi
done <<< "$DESIGNS"
echo "  ▸ Library        library/GAMBOL-Design-Library/index.html (offline)"
echo "────────────────────────────────────────────────────────"
echo "Press Ctrl+C to stop everything."
echo
wait
