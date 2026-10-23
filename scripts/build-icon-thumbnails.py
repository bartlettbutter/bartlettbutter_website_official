#!/usr/bin/env python3
"""Generate the web-sized app icons the pages actually display.

The full-resolution PNGs in assets/app-icons/ stay the source of truth and are
still used for social previews (og:image / twitter:image / JSON-LD). Pages show
icons at 144px at most, so this writes a 288px (2x) WebP copy of each one to
assets/app-icons/web/. Non-square sources are center-cropped first.

Re-run after adding or replacing an icon:

    pip install pillow
    python3 scripts/build-icon-thumbnails.py
"""
from pathlib import Path

from PIL import Image

SIZE = 288
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "app-icons"
OUT = SRC / "web"


def main():
    OUT.mkdir(exist_ok=True)
    for src in sorted(SRC.glob("icon_*.png")):
        with Image.open(src) as im:
            im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
            side = min(im.size)
            left, top = (im.width - side) // 2, (im.height - side) // 2
            im = im.crop((left, top, left + side, top + side))
            im = im.resize((SIZE, SIZE), Image.LANCZOS)
            dst = OUT / f"{src.stem}.webp"
            im.save(dst, "WEBP", quality=90, method=6)
        print(f"{src.name}: {src.stat().st_size // 1024}KB -> {dst.stat().st_size // 1024}KB")


if __name__ == "__main__":
    main()
