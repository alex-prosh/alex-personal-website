#!/usr/bin/env bash
# Upload a page's transcoded media (public/internal-media/<slug>/) to the R2 bucket
# that serves it in production. Re-running overwrites what is there.
# Needs `npx wrangler login` first.
#
# usage: scripts/upload-internal-media.sh <slug>
set -euo pipefail

slug="${1:?usage: $0 <slug>}"
bucket="${R2_BUCKET:-alex-internal-media}"
dir="$(cd "$(dirname "$0")/.." && pwd)/public/internal-media/$slug"

for f in "$dir"/*; do
  name="$(basename "$f")"
  case "$name" in
    *.mp4) type="video/mp4" ;;
    *.jpg) type="image/jpeg" ;;
    *) continue ;;
  esac
  echo "uploading $name"
  npx wrangler r2 object put "$bucket/$slug/$name" --file "$f" \
    --content-type "$type" --cache-control "public, max-age=604800" --remote >/dev/null
done

echo "uploaded $(ls "$dir" | grep -c -E '\.(mp4|jpg)$') files to $bucket/$slug/"
