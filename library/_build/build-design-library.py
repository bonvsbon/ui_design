#!/usr/bin/env python3
"""
Assemble GAMBOL Design Library: every concept (Concept Set A ×5, Concept Set B ×5, and the
two REEF-referenced Everyday builds) in one offline folder with a library index page.

  python3 library/_build/build-design-library.py            # reuse existing portables
  python3 library/_build/build-design-library.py --shots    # also refresh preview screenshots

Steps
  1. Make an offline single-file build of designs/everyday-b (it has no
     portable mode): copy to a temp dir, force client-only + hash routing,
     `nuxi generate`, then inline JS/CSS/fonts/images into one index.html.
  2. Copy the existing portables (Set A, Set B, Everyday A) into the library.
  3. Optionally screenshot each entry with Playwright for the card previews.
  4. Write index.html + README and zip everything.

Source projects are never modified.
"""
from pathlib import Path
import base64, json, re, shutil, subprocess, sys, tempfile, zipfile

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'library' / 'GAMBOL-Design-Library'
DESIGNS = ROOT / 'designs'
EVERYDAY_B = DESIGNS / 'everyday-b'
MIME = {'.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
        '.svg': 'image/svg+xml', '.woff2': 'font/woff2'}


def data_url(f: Path) -> str:
    return f'data:{MIME[f.suffix.lower()]};base64,' + base64.b64encode(f.read_bytes()).decode()


# ---------------------------------------------------------------- 1. Everyday B
def build_everyday_b(dest: Path):
    print('• Everyday B: client-only build')
    with tempfile.TemporaryDirectory() as tmp:
        work = Path(tmp) / 'reef'
        shutil.copytree(EVERYDAY_B, work, ignore=shutil.ignore_patterns(
            'node_modules', '.nuxt', '.output', 'docs', 'portable'))
        (work / 'node_modules').symlink_to(EVERYDAY_B / 'node_modules')
        cfg = work / 'nuxt.config.ts'
        s = cfg.read_text()
        s = s.replace('export default defineNuxtConfig({', '''export default defineNuxtConfig({
  ssr: false,
  router: { options: { hashMode: true } },
  experimental: { appManifest: false },
  vite: { build: { cssCodeSplit: false, assetsInlineLimit: 100_000_000,
    rollupOptions: { output: { inlineDynamicImports: true } } } },''', 1)
        s = s.replace('  vite: { server: { fs: { strict: true } } },\n', '')
        s = s.replace('  nitro: { compressPublicAssets: true },', '')
        cfg.write_text(s)
        subprocess.run(['npx', 'nuxi', 'generate'], cwd=work, check=True,
                       stdout=subprocess.DEVNULL)
        pub = work / '.output' / 'public'

        # Every public asset, keyed by its absolute URL path.
        assets = {'/' + f.relative_to(pub).as_posix(): data_url(f)
                  for f in sorted(pub.rglob('*'))
                  if f.suffix.lower() in MIME and '_nuxt' not in f.parts}

        html = (pub / 'index.html').read_text()
        html = re.sub(r'<link rel="(preconnect|modulepreload|prefetch|preload|icon)"[^>]*>\n?', '', html)

        def inline_paths(text: str) -> str:
            for path in sorted(assets, key=len, reverse=True):
                text = text.replace(path, assets[path])
            return text

        def css(m):
            return '<style>\n' + inline_paths((pub / m.group(1).lstrip('/')).read_text()) + '\n</style>'
        html = re.sub(r'<link rel="stylesheet" href="([^"]+)"[^>]*>', css, html)

        def js(m):
            code = inline_paths((pub / m.group(1).lstrip('/')).read_text())
            return '<script type="module">\n' + code.replace('</script', '<\\/script') + '\n</script>'
        html = re.sub(r'<script type="module"[^>]*src="([^"]+)"[^>]*></script>', js, html)

        # Paths built at runtime (`/images/${name}.webp`) are rewritten as Vue sets them, and
        # template asset URLs that Nuxt prefixes with the base URL ('/' + data:…) are un-prefixed.
        shim = '''<script>(function(){var A=%s;
function fix(el){if(el.nodeType!==1)return;["src","srcset","href"].forEach(function(a){var v=el.getAttribute(a);if(!v)return;if(v.indexOf("/data:")===0)el.setAttribute(a,v.slice(1));else if(A[v])el.setAttribute(a,A[v]);});}
new MutationObserver(function(ms){ms.forEach(function(m){if(m.type==="attributes")fix(m.target);else m.addedNodes.forEach(function(n){if(n.nodeType===1){fix(n);n.querySelectorAll("img,source,link").forEach(fix);}});});})
.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["src","srcset","href"]});})();</script>''' % json.dumps(assets)
        icon = f'<link rel="icon" href="{assets.get("/favicon.svg", "")}">'
        html = html.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n' + icon + '\n' + shim, 1)
        shell = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.S)
        if re.search(r'(href|src)="/_nuxt/', shell):
            raise SystemExit('Unresolved /_nuxt/ reference')
        dest.mkdir(parents=True, exist_ok=True)
        (dest / 'index.html').write_text(html)
    print(f'  {(dest / "index.html").stat().st_size / 1e6:.1f} MB')


# ---------------------------------------------------------------- catalogue
FEATURED = [
    {
        'id': 'everyday-a', 'dir': 'featured/everyday-a', 'entry': 'index.html',
        'maker': 'Version A', 'title': 'Everyday Feels Better',
        'tags': ['REEF reference', 'Lifestyle', 'Thai-first'],
        'summary': 'A lifestyle-led storefront with Thai-first copy and English display headlines. Warm neutrals, GAMBOL red, and deep lagoon tones for technology.',
        'highlights': [
            'Hero with SHOP MEN / SHOP WOMEN plus a four-up Find your pair grid',
            'Interactive GBOLD explorer on the homepage, product page, and its own page',
            'Discovery by lifestyle: Everyday, Travel, City Walk, Weekend, Outdoor, Relax',
            'Mobile-first: bottom tab bar, horizontal scrollers, sticky add-to-cart',
            'Store finder by province and district, plus geolocation',
        ],
        'pages': [('Home', '#/'), ('Men', '#/products?gender=men'), ('Product', '#/product/demo'),
                  ('GBOLD', '#/technology'), ('Stories', '#/stories'), ('Stores', '#/stores')],
    },
    {
        'id': 'everyday-b', 'dir': 'featured/everyday-b', 'entry': 'index.html',
        'maker': 'Version B', 'title': 'Everyday Feels Better',
        'tags': ['REEF reference', 'Coastal campaign', 'Commerce'],
        'summary': 'A sun-washed coastal campaign with a Barlow Condensed hangtag style. GAMBOL red is the brand color, set on white, square shopping surfaces.',
        'highlights': [
            'Illustrated mega menu with full keyboard and Escape support',
            'Alternating New for Men / New for Women photo and product groups',
            'GBOLD hotspots: keyboard tabs on desktop, an accordion on mobile',
            'URL-backed filters: gender, style, size, color, price, technology',
            'Local studio for editing homepage sections and exporting JSON',
        ],
        'pages': [('Home', '#/'), ('Products', '#/products'), ('Product', '#/product/demo'),
                  ('GBOLD', '#/technology'), ('Stories', '#/stories'), ('Stores', '#/stores'),
                  ('Studio', '#/studio')],
    },
]
REFERENCES = [('REEF', 'https://www.reef.com/'), ('GAMBOL', 'https://www.gambol.co.th/')]

SET_A = [('01', 'Premium Street', ['Premium', 'Street']),
          ('02', 'Bold Sport', ['Sport', 'Energy']),
          ('03', 'Lifestyle Storytelling', ['Lifestyle', 'Editorial']),
          ('04', 'Smart Commerce', ['Conversion', 'Finder']),
          ('05', 'Future Tech', ['Technology', 'Product lab'])]
SET_B = [('01', 'Modern Minimal', ['Premium', 'Clean']),
         ('02', 'Bold Sport', ['Sport', 'Energy']),
         ('03', 'Lifestyle Editorial', ['Lifestyle', 'Visual']),
         ('04', 'Smart Commerce', ['Conversion', 'Simple']),
         ('05', 'Future Footwear', ['Technology', 'Dark stage'])]


def entries():
    out = [dict(f, featured=True) for f in FEATURED]
    for n, title, tags in SET_A:
        out.append({'id': f'set-a-{n}', 'dir': 'concept-set-a', 'entry': 'index.html', 'hash': f'#/concept-{n}',
                    'maker': 'Set A', 'number': n, 'title': title, 'tags': tags})
    for n, title, tags in SET_B:
        out.append({'id': f'set-b-{n}', 'dir': 'concept-set-b', 'entry': 'GAMBOL-All-5-Concepts.html',
                    'hash': f'#/concept-{n}', 'maker': 'Set B', 'number': n, 'title': title, 'tags': tags})
    return out


# ---------------------------------------------------------------- 2. copy portables
def copy_portables():
    print('• copying portables')
    for sub in ('concept-set-a', 'concept-set-b', 'featured'):
        shutil.rmtree(OUT / sub, ignore_errors=True)
    shutil.copytree(DESIGNS / 'concept-set-a/portable/GAMBOL-5-Concepts-Portable', OUT / 'concept-set-a')
    set_b_src = DESIGNS / 'concept-set-b/portable/GAMBOL-Portable'
    (OUT / 'concept-set-b').mkdir(parents=True)
    # The five Concept-0N files are the same app with a different start route; keep one.
    for name in ('GAMBOL-All-5-Concepts.html', 'ASSET-CREDITS.md'):
        shutil.copy2(set_b_src / name, OUT / 'concept-set-b' / name)
    shutil.copytree(set_b_src / 'Licenses', OUT / 'concept-set-b/Licenses')
    shutil.copytree(DESIGNS / 'everyday-a/portable/GAMBOL-Everyday-Portable', OUT / 'featured/everyday-a')


# ---------------------------------------------------------------- 3. screenshots
def screenshots(items):
    print('• screenshots')
    shots = OUT / 'previews'
    shots.mkdir(exist_ok=True)
    script = '''
const { chromium } = require('playwright');
(async () => {
  const items = JSON.parse(process.argv[1]);
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  for (const [url, file] of items) {
    await p.goto(url); await p.waitForTimeout(2500);
    await p.screenshot({ path: file, type: 'jpeg', quality: 72 });
  }
  await b.close();
})();'''
    jobs = [((OUT / e['dir'] / e['entry']).as_uri() + e.get('hash', '#/'), str(shots / f"{e['id']}.jpg"))
            for e in items]
    subprocess.run(['node', '-e', script, json.dumps(jobs)], check=True,
                   cwd=DESIGNS / 'concept-set-b', env={**__import__('os').environ, 'NODE_PATH': str(DESIGNS / 'concept-set-b/node_modules')})


# ---------------------------------------------------------------- 4. index
def esc(s: str) -> str:
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')


def render(items):
    tpl = (Path(__file__).parent / 'design-library-template.html').read_text()

    def href(e, h=None):
        return f"{e['dir']}/{e['entry']}{h or e.get('hash', '#/')}"

    def preview(e):
        img = f"previews/{e['id']}.jpg"
        if (OUT / img).exists():
            return f'<img src="{img}" alt="" loading="lazy" width="1440" height="900">'
        return '<div class="ph"></div>'

    feat = []
    for e in (i for i in items if i.get('featured')):
        tags = ''.join(f'<span>{esc(t)}</span>' for t in e['tags'])
        hl = ''.join(f'<li>{esc(h)}</li>' for h in e['highlights'])
        pages = ''.join(f'<a href="{href(e, h)}">{esc(n)}</a>' for n, h in e['pages'])
        feat.append(f'''<article class="feature">
  <a class="feature-art" href="{href(e)}" aria-label="Preview {esc(e['title'])} — {e['maker']}">{preview(e)}<span class="badge">★ Featured</span></a>
  <div class="feature-body">
    <p class="eyebrow">{e['maker']} · REEF × GAMBOL</p>
    <h3>{esc(e['title'])}</h3>
    <p class="tags">{tags}</p>
    <p class="summary">{esc(e['summary'])}</p>
    <ul class="highlights">{hl}</ul>
    <nav class="pages" aria-label="{esc(e['title'])} pages">{pages}</nav>
    <a class="btn" href="{href(e)}">Preview <span aria-hidden="true">↗</span></a>
  </div>
</article>''')

    def group(maker):
        cards = []
        for e in (i for i in items if i['maker'] == maker and not i.get('featured')):
            tags = ''.join(f'<span>{esc(t)}</span>' for t in e['tags'])
            cards.append(f'''<li class="card">
  <a class="card-art" href="{href(e)}" tabindex="-1" aria-hidden="true">{preview(e)}<span class="num">{e['number']}</span></a>
  <div class="card-body"><h3>{esc(e['title'])}</h3><p class="tags">{tags}</p>
  <a class="btn" href="{href(e)}" aria-label="Preview {esc(e['title'])}, {maker}">Preview <span aria-hidden="true">↗</span></a></div>
</li>''')
        return '\n'.join(cards)

    refs = ' · '.join(f'<a href="{u}" target="_blank" rel="noopener">{n}</a>' for n, u in REFERENCES)
    html = (tpl.replace('{{FEATURED}}', '\n'.join(feat)).replace('{{SET_A}}', group('Set A'))
               .replace('{{SET_B}}', group('Set B')).replace('{{REFS}}', refs)
               .replace('{{COUNT}}', str(len(items))))
    (OUT / 'index.html').write_text(html)


README = '''GAMBOL · Design Library (Portable / Offline)

วิธีเปิด
1. แตกไฟล์ ZIP ทั้งโฟลเดอร์ (ห้ามย้ายไฟล์ออกจากโฟลเดอร์)
2. ดับเบิลคลิก index.html แล้วกด Preview บนการ์ดที่อยากดู

ในนี้มีทั้งหมด 12 ดีไซน์
★ Featured: 2 ดีไซน์ที่อ้างอิงจาก REEF (reef.com) × GAMBOL (gambol.co.th)
  - featured/everyday-a  : Everyday Feels Better (Version A)
  - featured/everyday-b  : Everyday Feels Better (Version B)
• Concept Set A: 5 แนวคิด  (concept-set-a/index.html)
• Concept Set B: 5 แนวคิด  (concept-set-b/GAMBOL-All-5-Concepts.html)

เปิดได้โดยไม่ต้องใช้อินเทอร์เน็ตหรือเซิร์ฟเวอร์ ใช้ Chrome, Edge, Safari หรือ Firefox
หมายเหตุ: ราคา สินค้า สาขา และการชำระเงินเป็นข้อมูลจำลอง ลิงก์ภายนอก (Google Maps, reference) ต้องใช้อินเทอร์เน็ต
'''


def add_noindex():
    """Keep the shared prototypes out of search engines when the library is published."""
    tag = '<meta name="robots" content="noindex, nofollow">'
    for f in OUT.rglob('*.html'):
        html = f.read_text()
        if tag in html:
            continue
        html, n = re.subn(r'(<meta charset="utf-8">)', r'\1' + tag, html, count=1, flags=re.I)
        if not n:
            html = re.sub(r'(<head[^>]*>)', r'\1' + tag, html, count=1, flags=re.I)
        f.write_text(html)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    copy_portables()
    build_everyday_b(OUT / 'featured/everyday-b')
    items = entries()
    if '--shots' in sys.argv or any(not (OUT / 'previews' / f"{e['id']}.jpg").exists() for e in items):
        screenshots(items)
    render(items)
    add_noindex()
    (OUT / 'README.txt').write_text(README)
    zip_path = OUT.with_suffix('.zip')
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as z:
        for f in sorted(OUT.rglob('*')):
            if f.is_file() and f.name != '.DS_Store':
                z.write(f, f'{OUT.name}/{f.relative_to(OUT).as_posix()}')
    print(f'• done → {OUT}  (zip {zip_path.stat().st_size / 1e6:.0f} MB)')


if __name__ == '__main__':
    main()
