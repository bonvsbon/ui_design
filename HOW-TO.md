# คู่มือการใช้งาน GAMBOL Design Workspace

ลิงก์สำหรับแชร์: **https://bonvsbon.github.io/ui_design/**

## สารบัญ

1. [สิ่งที่ต้องมีในเครื่อง](#1-สิ่งที่ต้องมีในเครื่อง)
2. [ติดตั้งครั้งแรก](#2-ติดตั้งครั้งแรก)
3. [ดูงานทั้งหมด](#3-ดูงานทั้งหมด)
4. [รันเว็บเพื่อแก้งาน](#4-รันเว็บเพื่อแก้งาน)
5. [แก้งาน: ไฟล์อยู่ตรงไหน](#5-แก้งาน-ไฟล์อยู่ตรงไหน)
6. [อัปเดตลิงก์ที่แชร์ให้เพื่อน](#6-อัปเดตลิงก์ที่แชร์ให้เพื่อน)
7. [เอาแบบเดียวไปทำต่อ](#7-เอาแบบเดียวไปทำต่อ)
8. [ปิดหรือเปิดลิงก์สาธารณะ](#8-ปิดหรือเปิดลิงก์สาธารณะ)
9. [แก้ปัญหาที่เจอบ่อย](#9-แก้ปัญหาที่เจอบ่อย)

---

## 1. สิ่งที่ต้องมีในเครื่อง

| โปรแกรม | เวอร์ชัน | ตรวจด้วย |
|---|---|---|
| Node.js | 22.12 ขึ้นไป | `node -v` |
| Python | 3.10 ขึ้นไป | `python3 --version` |
| Git | เวอร์ชันใดก็ได้ | `git --version` |
| Google Chrome | — | ใช้ตอนถ่ายภาพตัวอย่างการ์ดใน Library |

## 2. ติดตั้งครั้งแรก

ทำครั้งเดียวหลัง clone:

```bash
git clone https://github.com/bonvsbon/ui_design.git
```

```bash
cd ui_design
```

```bash
for d in designs/*; do (cd "$d" && npm install); done
```

> `run-all.sh` จะ `npm install` ให้เองถ้ายังไม่ได้ติดตั้ง ข้ามขั้นนี้ไปได้

## 3. ดูงานทั้งหมด

**ดูออนไลน์:** เปิด https://bonvsbon.github.io/ui_design/

**ดูในเครื่อง แบบไม่ต้องรัน server:**

```bash
open library/GAMBOL-Design-Library/index.html
```

กด **Preview** บนการ์ดเพื่อเปิดแต่ละแบบ

## 4. รันเว็บเพื่อแก้งาน

### รันทั้ง 4 โปรเจกต์พร้อมกัน

```bash
./run-all.sh
```

| แบบ | URL |
|---|---|
| Everyday A | http://localhost:3500 |
| Everyday B | http://localhost:3100 |
| Concept Set A | http://localhost:3300/concept-01 (เปลี่ยนเลขท้ายเป็น 02–05) |
| Concept Set B | http://localhost:3600/concept-01 (เปลี่ยนเลขท้ายเป็น 02–05) |

ตัวเลือกเพิ่มเติม:

| คำสั่ง | ทำอะไร |
|---|---|
| `./run-all.sh --open` | เปิดทุกแบบในเบราว์เซอร์ให้ด้วย |
| `./run-all.sh --prod` | build แล้วเปิดแบบ production ใช้เมื่อ dev server มีปัญหา |
| กด **Ctrl + C** | ปิดทุกตัว |

### รันทีละโปรเจกต์

```bash
cd designs/everyday-a && npm run dev
```

เปลี่ยน `everyday-a` เป็น `everyday-b`, `concept-set-a` หรือ `concept-set-b` ได้

## 5. แก้งาน: ไฟล์อยู่ตรงไหน

แต่ละโปรเจกต์มี `START-HERE.md` อธิบายไว้ละเอียด สรุปสั้นๆ ตามนี้:

| อยากแก้ | Everyday A / B | Concept Set A | Concept Set B |
|---|---|---|---|
| Section หน้าแรก | `data/` | `data/home/c0N.ts` | `components/concepts/*Home.vue` |
| สินค้า บทความ สาขา | `mock/` | `data/catalog.ts`, `data/content.ts` | `data/products.ts` |
| สี ฟอนต์ | `assets/css/` | `assets/css/main.css` (บล็อก `CONCEPT 0N`) | `assets/css/main.css` (บล็อก `/* 0N: … */`) |
| Component | `components/` | `components/c0N/` | `components/` |

พอบันทึกไฟล์ หน้า `localhost` จะอัปเดตทันที

## 6. อัปเดตลิงก์ที่แชร์ให้เพื่อน

ทำตามลำดับ ทุกคำสั่งรันจากโฟลเดอร์หลักของ repo

**ขั้นที่ 1: สร้างไฟล์ offline ของแบบที่แก้** (รันเฉพาะแบบที่แก้)

| แก้แบบไหน | คำสั่ง |
|---|---|
| Everyday A | `cd designs/everyday-a && npm run portable && cd ../..` |
| Everyday B | ไม่ต้องทำ ขั้นที่ 2 สร้างให้เอง |
| Concept Set A | `cd designs/concept-set-a && npm run portable && cd ../..` |
| Concept Set B | `cd designs/concept-set-b && npm run build:portable && cd ../..` |

**ขั้นที่ 2: สร้างหน้า Library ใหม่** (`--shots` = ถ่ายภาพตัวอย่างการ์ดใหม่)

```bash
python3 library/_build/build-design-library.py --shots
```

**ขั้นที่ 3: เช็กในเครื่อง**

```bash
open library/GAMBOL-Design-Library/index.html
```

**ขั้นที่ 4: ส่งขึ้น GitHub**

```bash
git add -A
```

```bash
git commit -m "อธิบายสิ่งที่แก้"
```

```bash
git push
```

**ขั้นที่ 5: รอประมาณ 1 นาที**

- ดูสถานะได้ที่ https://github.com/bonvsbon/ui_design/actions ถ้าขึ้น ✓ สีเขียวแปลว่าเสร็จ
- ถ้าเปิดลิงก์แล้วยังเห็นของเก่า กด **Cmd + Shift + R**

> **ถ้าไม่สร้าง Library ใหม่ เว็บจะไม่เปลี่ยน:** GitHub publish เฉพาะโฟลเดอร์ `library/GAMBOL-Design-Library/` ถ้าแก้แค่โค้ดใน `designs/` แล้ว push เลย ลิงก์จะยังเป็นของเดิม

### แก้ข้อความบนการ์ดใน Library

ชื่อ แท็ก และไฮไลต์อยู่ในส่วน `FEATURED`, `SET_A` และ `SET_B` ของ `library/_build/build-design-library.py` ส่วนหน้าตาและสีอยู่ใน `library/_build/design-library-template.html` แก้แล้วเริ่มทำตาม [ขั้นที่ 2](#6-อัปเดตลิงก์ที่แชร์ให้เพื่อน) ได้เลย

### อัปเดตคู่มือ PDF สำหรับผู้ชม

คู่มือการดูและเลือกแบบอยู่ที่ `guide/GAMBOL-Demo-Guide.pdf` ภาพในคู่มือถ่ายจากเว็บจริง ถ้าเว็บเปลี่ยน ให้ถ่ายภาพใหม่แล้วสร้าง PDF ใหม่:

```bash
NODE_PATH=designs/concept-set-b/node_modules node guide/_build/capture.cjs
```

```bash
NODE_PATH=designs/concept-set-b/node_modules node guide/_build/build-guide.cjs
```

แก้เนื้อหาคู่มือได้ที่ `guide/_build/guide.html`

## 7. เอาแบบเดียวไปทำต่อ

copy โฟลเดอร์ของแบบนั้นออกไป โดยไม่ต้องเอาไฟล์ที่สร้างใหม่ได้ไปด้วย:

```bash
rsync -a --exclude node_modules --exclude .nuxt --exclude .output designs/everyday-a/ ~/Projects/gambol-site/
```

```bash
cd ~/Projects/gambol-site && npm install && npm run dev
```

Concept Set A / B มี 5 แนวคิดอยู่ในโปรเจกต์เดียวกัน วิธีลบแนวคิดที่ไม่ใช้อยู่ใน `START-HERE.md` ของโปรเจกต์นั้น

## 8. ปิดหรือเปิดลิงก์สาธารณะ

- **ปิด:** GitHub repo → **Settings** → **Pages** → **Unpublish site**
- **เปิดใหม่:** **Settings** → **Pages** → ตั้ง Source เป็น **GitHub Actions** แล้ว push อีกครั้ง หรือกด **Run workflow** ที่หน้า Actions

ทุกหน้ามี `noindex` จึงไม่ขึ้นใน Google แต่ทุกคนที่มีลิงก์เปิดดูได้

## 9. แก้ปัญหาที่เจอบ่อย

| อาการ | วิธีแก้ |
|---|---|
| `run-all.sh` บอกว่า port ถูกใช้อยู่ (skipped) | มีโปรแกรมอื่นใช้ port นั้น ดูว่าเป็นตัวไหนด้วย `lsof -i :3100` (เปลี่ยนเลขตาม port) แล้วปิดด้วย `kill $(lsof -t -iTCP:3100 -sTCP:LISTEN)` |
| `npm run dev` ขึ้น `spawn EBADF` | ใช้ `./run-all.sh --prod` หรือ `npm run build && npm run preview` แทน |
| `./run-all.sh` ขึ้น `permission denied` | รัน `chmod +x run-all.sh` ครั้งเดียว |
| ถ่ายภาพตัวอย่าง (`--shots`) ไม่ได้ | ติดตั้ง Google Chrome และรัน `npm install` ใน `designs/concept-set-b` เพราะสคริปต์ใช้ Playwright จากโฟลเดอร์นั้น |
| push แล้วลิงก์ยังเป็นของเก่า | ทำ [ขั้นที่ 2](#6-อัปเดตลิงก์ที่แชร์ให้เพื่อน) ก่อน push แล้วกด Cmd + Shift + R |
| Actions ขึ้น ✗ สีแดง | กดเข้าไปดู log ที่ https://github.com/bonvsbon/ui_design/actions แล้วกด **Re-run jobs** |
