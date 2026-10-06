"""Removes the white studio background from product photos → transparent WebP.
Run once with Pillow available:  python3 scripts/cutout-products.py"""
from collections import deque
from pathlib import Path
from PIL import Image

DIR = Path(__file__).resolve().parents[1] / 'public/images/products'
BG = 249          # flood-fill only near-pure white studio background
EDGE_LO = 200     # 1–2 px edge band fades between EDGE_LO..BG for anti-aliasing

for src in sorted(DIR.glob('*.jpg')):
    im = Image.open(src).convert('RGB')
    w, h = im.size
    px = im.load()
    bg = bytearray(w * h)
    def white(x, y):
        return min(px[x, y]) >= BG
    q = deque((x, y) for x in range(w) for y in (0, h - 1) if white(x, y))
    q.extend((x, y) for y in range(h) for x in (0, w - 1) if white(x, y))
    while q:
        x, y = q.popleft()
        i = y * w + x
        if bg[i]: continue
        bg[i] = 1
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not bg[ny * w + nx] and white(nx, ny):
                q.append((nx, ny))
    out = Image.new('RGBA', (w, h))
    op = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            i = y * w + x
            if bg[i]:
                op[x, y] = (r, g, b, 0)
                continue
            a = 255
            near = any(0 <= x + dx < w and 0 <= y + dy < h and bg[(y + dy) * w + x + dx]
                       for dx in (-2, -1, 0, 1, 2) for dy in (-2, -1, 0, 1, 2))
            if near:
                m = min(r, g, b)
                if m > EDGE_LO:
                    a = int(255 * (BG + 1 - m) / (BG + 1 - EDGE_LO))
                    a = max(0, min(255, a))
                    if a: r, g, b = (max(0, int((c - (255 - a) * 255 / 255) * 255 / a)) if a else c for c in (r, g, b))
            op[x, y] = (r, g, b, a)
    out = out.crop(out.getbbox())
    dst = src.with_suffix('.webp')
    out.save(dst, 'WEBP', quality=84, method=6)
    print(f'{src.name} -> {dst.name} {out.size} {dst.stat().st_size // 1024} KB')
