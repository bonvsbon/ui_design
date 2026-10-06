from pathlib import Path
import re, base64, mimetypes, urllib.request, zipfile, hashlib
root=Path(__file__).resolve().parents[1]
out=root/'exports/GAMBOL-10-Designs'
font_cache=root/'exports/.font-cache'
font_cache.mkdir(parents=True,exist_ok=True)
out.mkdir(parents=True,exist_ok=True)
cache={}
def data_url(data,mime):
    return 'data:'+mime+';base64,'+base64.b64encode(data).decode()
def remote(url):
    if url not in cache:
        disk=font_cache/hashlib.sha256(url.encode()).hexdigest()
        if disk.exists():
            cache[url]=disk.read_bytes()
        else:
            request=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
            with urllib.request.urlopen(request,timeout=45) as response:
                cache[url]=response.read()
            disk.write_bytes(cache[url])
    return cache[url]
def embed_font(match):
    url=match.group(1)
    return 'url('+data_url(remote(url),'font/woff2' if '.woff2' in url else 'font/ttf')+')'
def stylesheet(match):
    href=match.group(1)
    if href.startswith('https://fonts.googleapis.com/'):
        css=re.sub(r'url\((https://[^)]+)\)',embed_font,remote(href).decode())
    else:
        css=(root/href).read_text()
    return '<style>\n'+css+'\n</style>'
def embed_asset(match):
    name=match.group(0)
    if name not in cache:
        cache[name]=data_url((root/name).read_bytes(),mimetypes.guess_type(name)[0])
    return cache[name]
names={'redline':'01-Redline.html','colorclub':'02-Color-Club.html','nightshift':'03-Night-Shift.html','studio':'04-Product-Studio.html','playground':'05-Playground.html','dayfinder':'06-Day-Finder.html','gallery':'07-Product-Gallery.html','detaillab':'08-Detail-Lab.html','sidebyside':'09-Side-by-Side.html','lineup':'10-The-Lineup.html'}
def bundle(source,design=None):
    html=(root/source).read_text()
    html=re.sub(r'<link\b[^>]*rel="preconnect"[^>]*>','',html)
    # Both attribute orders occur in the source stylesheets.
    html=re.sub(r'<link\b(?=[^>]*rel="stylesheet")(?=[^>]*href="([^"]+)")[^>]*>',stylesheet,html)
    scripts=[]
    def script(match):
        scripts.append((root/match.group(1)).read_text())
        return ''
    html=re.sub(r'<script src="([^"]+)" defer></script>',script,html)
    if scripts:
        js='\n;\n'.join(scripts)
        js=re.sub(r'const requestedDesign = [^\n]+;', 'const requestedDesign = "'+design+'";',js,count=1)
        html=html.replace('</body>','<script>\n'+js.replace('</script','<\\/script')+'\n</script>\n</body>')
    for key,name in names.items():
        html=html.replace('storefront.html?design='+key,name)
    html=html.replace('href="gallery.html"','href="'+names['gallery']+'"')
    if design:
        html=re.sub(r'<body data-design="[^"]+">','<body data-design="'+design+'">',html)
    return re.sub(r'assets/[A-Za-z0-9_-]+\.(?:jpg|png)',embed_asset,html)
for design,filename in names.items():
    (out/filename).write_text(bundle('gallery.html' if design=='gallery' else 'storefront.html',design))
(out/'index.html').write_text(bundle('index.html'))
(out/'README.txt').write_text('''GAMBOL · Portable prototypes (10 designs)

วิธีเปิด
1. แตกไฟล์ ZIP ทั้งโฟลเดอร์
2. เปิด index.html ด้วย Chrome, Edge, Safari หรือ Firefox
3. เลือกดีไซน์ที่ต้องการ

แต่ละไฟล์ HTML รวมภาพ ฟอนต์ CSS และ JavaScript ในตัว
สามารถส่งไฟล์แต่ละดีไซน์แยกไปเปิดแบบออฟไลน์ได้
ลิงก์กลับหน้ารวมต้องมี index.html อยู่ในโฟลเดอร์เดียวกัน
ลิงก์ไปเว็บ Gambol และร้านทางการต้องใช้อินเทอร์เน็ต
ถุงสินค้าเป็นระบบตัวอย่าง ไม่ได้เชื่อมต่อการชำระเงิน

01 Redline
02 Color Club
03 Night Shift
04 Product Studio
05 Playground
06 Day Finder
07 Product Gallery (ตามดีไซน์อ้างอิง)
08 Detail Lab (ใหม่)
09 Side by Side (ใหม่)
10 The Lineup (ใหม่)
''')
archive=root/'exports/GAMBOL-10-Designs-Portable.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
    for p in sorted(out.iterdir()):
        if p.is_file(): z.write(p,arcname='GAMBOL-10-Designs/'+p.name)
print(str(archive))
print(f'{archive.stat().st_size/1024/1024:.1f} MB')
