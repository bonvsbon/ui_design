# GAMBOL — Design Workspace

```
gambol/
├── library/                       หน้า Design Library สำหรับส่งให้คนอื่นดู (offline)
│   ├── GAMBOL-Design-Library/     ดับเบิลคลิก index.html
│   ├── GAMBOL-Design-Library.zip  ไฟล์สำหรับส่งต่อ
│   └── _build/                    สคริปต์ที่ใช้สร้าง library
├── designs/                       โปรเจกต์ Nuxt — copy ออกไปทำต่อได้ทันที
│   ├── everyday-a/      ★         Everyday Feels Better · Version A (REEF reference)
│   ├── everyday-b/      ★         Everyday Feels Better · Version B (REEF reference)
│   ├── concept-set-a/             5 แนวคิด: Premium Street, Bold Sport, Lifestyle Storytelling, Smart Commerce, Future Tech
│   └── concept-set-b/             5 แนวคิด: Modern Minimal, Bold Sport, Lifestyle Editorial, Smart Commerce, Future Footwear
└── _archive/
    └── early-static-prototype/    ต้นแบบ HTML ยุคแรก (เก็บไว้อ้างอิง)
```

## รันทั้งหมดพร้อมกัน

```bash
./run-all.sh            # dev server ทั้ง 4 โปรเจกต์ แก้โค้ดแล้วหน้าเว็บอัปเดตทันที
./run-all.sh --open     # เปิดทุกแบบในเบราว์เซอร์ให้ด้วย
./run-all.sh --prod     # build แล้วเปิดแบบ production (ใช้เมื่อ dev server มีปัญหา)
```

| แบบ | URL |
|---|---|
| Everyday A | http://localhost:3500 |
| Everyday B | http://localhost:3100 |
| Concept Set A | http://localhost:3300/concept-01 |
| Concept Set B | http://localhost:3600/concept-01 |

กด Ctrl+C เพื่อปิดทุกตัว ถ้า port ไหนมีโปรแกรมอื่นใช้อยู่ สคริปต์จะข้ามโปรเจกต์นั้นแล้วแจ้งให้รู้

## เลือกแบบไหนแล้วเอาไปทำต่อ

1. เลือกแบบจาก `library/GAMBOL-Design-Library/index.html`
2. copy โฟลเดอร์ใน `designs/` ที่ตรงกับแบบนั้นออกไป ไม่ต้องเอา `node_modules`, `.nuxt`, `.output` ไปด้วย
3. ทำตาม `START-HERE.md` ในโฟลเดอร์นั้น ส่วนใหญ่ก็แค่ `npm install` แล้ว `npm run dev`

```bash
rsync -a --exclude node_modules --exclude .nuxt --exclude .output designs/everyday-a/ ~/Projects/gambol-site/
```

| แบบใน Library | โฟลเดอร์ | Route |
|---|---|---|
| ★ Everyday · Version A | `designs/everyday-a` | `/` |
| ★ Everyday · Version B | `designs/everyday-b` | `/` |
| Set A · 01–05 | `designs/concept-set-a` | `/concept-01` … `/concept-05` |
| Set B · 01–05 | `designs/concept-set-b` | `/concept-01` … `/concept-05` |

แต่ละโฟลเดอร์ใน `designs/` ใช้งานได้ในตัวเอง ไม่มี path หรือ symlink ที่ชี้ออกไปนอกโฟลเดอร์

## ลิงก์สำหรับแชร์

**https://bonvsbon.github.io/ui_design/** · มีทั้ง 12 แบบ

GitHub Actions จะ publish ใหม่อัตโนมัติเมื่อ push ไฟล์ใน `library/GAMBOL-Design-Library/` ขึ้น `main` (ดู [.github/workflows/pages.yml](.github/workflows/pages.yml)) ทุกหน้ามี `noindex` จึงไม่ขึ้นใน Google และมีป้ายบอกว่าไม่ใช่เว็บไซต์ทางการ

## สร้าง Library ใหม่

ถ้าแก้ดีไซน์แล้วอยากอัปเดต library:

1. export ไฟล์ portable ของโปรเจกต์ที่แก้ใหม่ (`npm run portable` หรือ `npm run build:portable`) ยกเว้น `everyday-b` ที่สคริปต์ build ให้เอง
2. รันคำสั่งด้านล่าง ถ้าอยากถ่ายภาพตัวอย่างการ์ดใหม่ให้เติม `--shots` แล้ว commit + push เพื่ออัปเดตลิงก์

```bash
python3 library/_build/build-design-library.py
```

ข้อความบนการ์ด เช่น ชื่อ แท็ก หรือไฮไลต์ แก้ได้ในส่วน `FEATURED`, `SET_A` และ `SET_B` ของสคริปต์ ส่วนหน้าตา library อยู่ใน `library/_build/design-library-template.html`
