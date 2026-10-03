#!/usr/bin/env bash
cd "$(dirname "$0")"
PORT="${1:-8933}"
exec python3 -m http.server "$PORT" --bind 127.0.0.1
