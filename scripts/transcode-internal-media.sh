#!/usr/bin/env bash
# Re-encode a folder of clips for the web (small h264, faststart, no audio) and
# write a poster frame for each. Output lands in public/internal-media/<slug>/,
# which is gitignored: in production the files are served from object storage
# via NEXT_PUBLIC_INTERNAL_MEDIA_BASE.
#
# usage: scripts/transcode-internal-media.sh <src_dir> <slug>
set -euo pipefail

src="${1:?usage: $0 <src_dir> <slug>}"
slug="${2:?usage: $0 <src_dir> <slug>}"
out="$(cd "$(dirname "$0")/.." && pwd)/public/internal-media/$slug"
mkdir -p "$out"

for f in "$src"/*.mp4; do
  name="$(basename "$f" .mp4)"
  if [[ ! -f "$out/$name.mp4" ]]; then
    echo "encoding $name"
    # cap at 480p: the page never shows a clip larger than that
    ffmpeg -hide_banner -loglevel error -y -i "$f" \
      -vf "scale=-2:'min(480,ih)'" \
      -an -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p \
      -movflags +faststart "$out/$name.tmp.mp4"
    mv "$out/$name.tmp.mp4" "$out/$name.mp4"
  fi
  if [[ ! -f "$out/$name.jpg" ]]; then
    ffmpeg -hide_banner -loglevel error -y -ss 1 -i "$f" -frames:v 1 -q:v 4 "$out/$name.jpg"
  fi
done

du -sh "$out"
