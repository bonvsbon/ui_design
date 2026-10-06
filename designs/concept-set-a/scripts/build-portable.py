#!/usr/bin/env python3
"""
Builds a fully offline, single-file version of all five concepts.

  PORTABLE=1 npx nuxi generate      # client-only, hash-routed, one JS + one CSS
  python3 scripts/build-portable.py # inline JS/CSS + embed images, photos and fonts

Output: portable/GAMBOL-5-Concepts-Portable/ (+ .zip)
"""
from pathlib import Path
import base64, hashlib, json, re, urllib.request, zipfile

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / '.output/public'
OUT_DIR = ROOT / 'portable' / 'GAMBOL-5-Concepts-Portable'
CACHE = ROOT / 'scripts/.cache'
CACHE.mkdir(parents=True, exist_ok=True)
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36'
KEEP_SUBSETS = {'latin', 'latin-ext', 'thai'}


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


# --- Fonts -----------------------------------------------------------------
def font_css() -> str:
    urls = set()
    for f in (ROOT / 'layouts').glob('*.vue'):
        urls.update(re.findall(r"useFontStylesheet\('([^']+)'\)", f.read_text()))
    seen, blocks = set(), []
    for url in sorted(urls):
        css = fetch(url).decode()
        for subset, block in re.findall(r'/\* ([a-z-]+) \*/\s*(@font-face\s*\{[^}]+\})', css):
            if subset not in KEEP_SUBSETS:
                continue
            src = re.search(r'url\((https://[^)]+)\)', block).group(1)
            key = re.sub(r'\s+', ' ', block)
            if key in seen:
                continue
            seen.add(key)
            blocks.append(block.replace(src, data_url(fetch(src), 'font/woff2')))
    print(f'  fonts: {len(blocks)} @font-face blocks from {len(urls)} stylesheets')
    return '\n'.join(blocks)


# --- Images ----------------------------------------------------------------
def product_images() -> dict:
    out = {}
    for f in sorted((ROOT / 'public/images/products').glob('*.webp')):
        out[f.stem] = data_url(f.read_bytes(), 'image/webp')
    print(f'  product photos: {len(out)}')
    return out


def media_images() -> dict:
    src = (ROOT / 'data/media.ts').read_text()
    out = {}
    for mid, photo in re.findall(r"(\w+): \{ id: '\w+', src: '([^']+)'", src):
        url = f'https://images.unsplash.com/photo-{photo}?auto=format&fit=crop&w=1200&q=62&fm=jpg'
        out[mid] = data_url(fetch(url), 'image/jpeg')
    print(f'  lifestyle photos: {len(out)}')
    return out


# --- Assemble --------------------------------------------------------------
def build():
    html = (PUBLIC / 'index.html').read_text()
    html = re.sub(r'<link rel="(preconnect|modulepreload)"[^>]*>\n?', '', html)

    def css(m):
        return '<style>\n' + (PUBLIC / m.group(1).lstrip('/')).read_text() + '\n</style>'
    html = re.sub(r'<link rel="stylesheet" href="([^"]+)"[^>]*>', css, html)

    def js(m):
        code = (PUBLIC / m.group(1).lstrip('/')).read_text().replace('</script', '<\\/script')
        return '<script type="module">\n' + code + '\n</script>'
    html = re.sub(r'<script type="module" src="([^"]+)"[^>]*></script>', js, html)

    globals_js = (
        'window.__GAMBOL_PORTABLE__=true;'
        f'window.__GAMBOL_IMAGES__={json.dumps(product_images())};'
        f'window.__GAMBOL_MEDIA__={json.dumps(media_images())};'
    )
    head_extra = (
        '<title>GAMBOL 2026 — 5 Website Concepts</title>\n'
        f'<style>\n{font_css()}\n</style>\n'
        f'<script>{globals_js}</script>\n'
    )
    html = html.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n' + head_extra, 1)
    shell = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.S)  # runtime config mentions /_nuxt/ harmlessly
    if re.search(r'(href|src)="/_nuxt/', shell):
        raise SystemExit('Unresolved /_nuxt/ reference left in HTML')

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for old in OUT_DIR.glob('*.html'):
        old.unlink()
    (OUT_DIR / 'index.html').write_text(html)

    launchers = {
        '01-Premium-Street.html': '/concept-01',
        '02-Bold-Sport.html': '/concept-02',
        '03-Lifestyle-Storytelling.html': '/concept-03',
        '04-Smart-Commerce.html': '/concept-04',
        '05-Future-Tech.html': '/concept-05',
    }
    for name, route in launchers.items():
        (OUT_DIR / name).write_text(
            '<!doctype html><meta charset="utf-8">'
            f'<meta http-equiv="refresh" content="0;url=index.html#{route}">'
            f'<title>GAMBOL {route}</title>'
            f'<p>กำลังเปิด… <a href="index.html#{route}">คลิกที่นี่หากหน้าไม่เปลี่ยน</a></p>'
        )

    (OUT_DIR / 'README.txt').write_text('''GAMBOL · 5 Website Concepts (Portable / Offline)

วิธีเปิด
1. แตกไฟล์ ZIP ทั้งโฟลเดอร์
2. ดับเบิลคลิก index.html (Chrome, Edge, Safari หรือ Firefox)
   หรือเปิดไฟล์ 01–05 เพื่อเข้าแต่ละแนวคิดโดยตรง

index.html คือเว็บต้นแบบทั้งหมดในไฟล์เดียว (JS, CSS, ฟอนต์ รูปสินค้า และรูปไลฟ์สไตล์ฝังอยู่ในไฟล์)
ไม่ต้องใช้อินเทอร์เน็ตหรือเซิร์ฟเวอร์ สามารถส่งไฟล์ index.html ไฟล์เดียวให้ผู้อื่นได้
ไฟล์ 01–05 เป็นทางลัด ต้องอยู่โฟลเดอร์เดียวกับ index.html

ในแต่ละแนวคิดมี: หน้าแรก · หน้ารายการสินค้า · หน้าสินค้า
ปุ่ม CMS (มุมซ้ายล่างของหน้าแรก) ใช้เปิด/ปิดและเรียงลำดับ section ได้
ปุ่ม "สลับแนวคิด" ใช้สลับไปหน้าเดียวกันของแนวคิดอื่น
ลองค้นหาคำว่า “slide” เพื่อดูการค้นหาแบบคาดเดา

หมายเหตุ: ตะกร้า/การชำระเงินเป็นระบบตัวอย่าง ตัวเลขเทคโนโลยี รีวิว และสาขาเป็นข้อมูลจำลอง
ลิงก์นำทาง (Google Maps) ต้องใช้อินเทอร์เน็ต

01 Premium Street · 02 Bold Sport · 03 Lifestyle Storytelling · 04 Smart Commerce · 05 Future Tech
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
