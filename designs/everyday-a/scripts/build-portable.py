#!/usr/bin/env python3
"""
Builds a fully offline, single-file version of the GAMBOL "Everyday Feels Better" concept.

  npm run portable
    = PORTABLE=1 nuxi generate          # client-only, hash-routed, one JS + one CSS
    + python3 scripts/build-portable.py # inline JS/CSS, embed fonts + every image

Output: portable/GAMBOL-Everyday-Portable/ (+ .zip)
"""
from pathlib import Path
import base64, hashlib, json, re, urllib.request, zipfile

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / '.output/public'
OUT_DIR = ROOT / 'portable' / 'GAMBOL-Everyday-Portable'
CACHE = ROOT / 'scripts/.cache'
CACHE.mkdir(parents=True, exist_ok=True)
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36'
KEEP_SUBSETS = {'latin', 'latin-ext', 'thai'}
PHOTO_WIDTH = 1280  # lifestyle photos are embedded once at this width (no srcset offline)
MIME = {'.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp'}


def fetch(url: str) -> bytes:
    disk = CACHE / hashlib.sha256(url.encode()).hexdigest()
    if disk.exists():
        return disk.read_bytes()
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    disk.write_bytes(data)
    return data


def data_url(data: bytes, mime: str) -> str:
    return f'data:{mime};base64,' + base64.b64encode(data).decode()


def font_css() -> str:
    url = re.search(r"const FONTS_URL = '([^']+)'", (ROOT / 'nuxt.config.ts').read_text()).group(1)
    css = fetch(url).decode()
    blocks = []
    for subset, block in re.findall(r'/\* ([a-z-]+) \*/\s*(@font-face\s*\{[^}]+\})', css):
        if subset not in KEEP_SUBSETS:
            continue
        src = re.search(r'url\((https://[^)]+)\)', block).group(1)
        blocks.append(block.replace(src, data_url(fetch(src), 'font/woff2')))
    print(f'  fonts: {len(blocks)} @font-face blocks')
    return '\n'.join(blocks)


def assets() -> dict:
    """Keys match the `src` strings used in /data, so composables/useImage.ts can look them up."""
    out = {}
    for f in sorted((ROOT / 'public/images').rglob('*')):
        if f.suffix.lower() in MIME:
            out['/' + f.relative_to(ROOT / 'public').as_posix()] = data_url(f.read_bytes(), MIME[f.suffix.lower()])
    local = len(out)
    for photo in sorted(set(re.findall(r"'u:([0-9a-f-]+)'", (ROOT / 'data/media.ts').read_text()))):
        url = f'https://images.unsplash.com/photo-{photo}?auto=format&fit=crop&w={PHOTO_WIDTH}&q=50&fm=jpg'
        out[f'u:{photo}'] = data_url(fetch(url), 'image/jpeg')
    print(f'  images: {local} GAMBOL product/campaign + {len(out) - local} lifestyle photos')
    return out


def build():
    html = (PUBLIC / 'index.html').read_text()
    html = re.sub(r'<link rel="(preconnect|modulepreload|prefetch|preload)"[^>]*>\n?', '', html)

    def css(m):
        return '<style>\n' + (PUBLIC / m.group(1).lstrip('/')).read_text() + '\n</style>'
    html = re.sub(r'<link rel="stylesheet" href="([^"]+)"[^>]*>', css, html)

    def js(m):
        code = (PUBLIC / m.group(1).lstrip('/')).read_text().replace('</script', '<\\/script')
        return '<script type="module">\n' + code + '\n</script>'
    html = re.sub(r'<script type="module"[^>]*src="([^"]+)"[^>]*></script>', js, html)

    head_extra = (
        '<title>GAMBOL — Everyday Feels Better (Concept)</title>\n'
        f'<style>\n{font_css()}\n</style>\n'
        f'<script>window.__GAMBOL_ASSETS__={json.dumps(assets())};</script>\n'
    )
    html = html.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n' + head_extra, 1)
    shell = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.S)
    if re.search(r'(href|src)="/_nuxt/', shell):
        raise SystemExit('Unresolved /_nuxt/ reference left in HTML')

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for old in OUT_DIR.glob('*.html'):
        old.unlink()
    (OUT_DIR / 'index.html').write_text(html)

    launchers = {
        '01-Home.html': '/',
        '02-Products-Men.html': '/products?gender=men',
        '03-Product-Demo.html': '/product/demo',
        '04-GBOLD-Technology.html': '/technology',
        '05-Stories.html': '/stories',
        '06-Store-Locator.html': '/stores',
    }
    for name, route in launchers.items():
        (OUT_DIR / name).write_text(
            '<!doctype html><meta charset="utf-8">'
            f'<meta http-equiv="refresh" content="0;url=index.html#{route}">'
            f'<title>GAMBOL {route}</title>'
            f'<p>กำลังเปิด… <a href="index.html#{route}">คลิกที่นี่หากหน้าไม่เปลี่ยน</a></p>'
        )

    (OUT_DIR / 'README.txt').write_text('''GAMBOL · "Everyday Feels Better" (REEF-inspired concept) — Portable / Offline

วิธีเปิด
1. แตกไฟล์ ZIP ทั้งโฟลเดอร์
2. ดับเบิลคลิก index.html (Chrome, Edge, Safari หรือ Firefox)
   หรือเปิดไฟล์ 01–06 เพื่อเข้าแต่ละหน้าโดยตรง

index.html คือเว็บต้นแบบทั้งหมดในไฟล์เดียว (JS, CSS, ฟอนต์, รูปสินค้า และรูปไลฟ์สไตล์ฝังอยู่ในไฟล์)
ไม่ต้องใช้อินเทอร์เน็ตหรือเซิร์ฟเวอร์ ส่ง index.html ไฟล์เดียวให้ผู้อื่นได้
ไฟล์ 01–06 เป็นทางลัด ต้องอยู่โฟลเดอร์เดียวกับ index.html

หน้าที่มี: หน้าแรก · รายการสินค้า (ตัวกรอง/เรียงลำดับ) · หน้าสินค้า · GBOLD Technology · Stories · ค้นหาร้าน · Wishlist
ลองใช้: เมนู Men/Women/Kids (mega menu) · ค้นหาคำว่า "Gambol" หรือ "slide" · จุด + บนพื้นรองเท้า GBOLD
ย่อหน้าต่างให้แคบเพื่อดูเวอร์ชันมือถือ (แถบเมนูด้านล่าง)

หมายเหตุ: ตะกร้า/การชำระเงินเป็นระบบตัวอย่าง ราคา ตัวเลขเทคโนโลยี รีวิว และสาขาเป็นข้อมูลจำลอง
รูปไลฟ์สไตล์เป็นภาพประกอบชั่วคราว (Unsplash) ลิงก์ Google Maps และ "Use my location" ต้องใช้อินเทอร์เน็ต
''')

    zip_path = OUT_DIR.with_suffix('.zip')
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as z:
        for f in sorted(OUT_DIR.iterdir()):
            z.write(f, f'{OUT_DIR.name}/{f.name}')
    size = (OUT_DIR / 'index.html').stat().st_size / 1e6
    print(f'  index.html: {size:.1f} MB · zip: {zip_path.stat().st_size / 1e6:.1f} MB')
    print(f'  → {OUT_DIR}')


if __name__ == '__main__':
    build()
