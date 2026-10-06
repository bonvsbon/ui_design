# Concept Set B — 5 แนวคิดในโปรเจกต์เดียว

| # | แนวคิด | Route |
|---|---|---|
| 01 | Modern Minimal | `/concept-01` |
| 02 | Bold Sport | `/concept-02` |
| 03 | Lifestyle Editorial | `/concept-03` |
| 04 | Smart Commerce | `/concept-04` |
| 05 | Future Footwear | `/concept-05` |

หน้าพิเศษ: `/overview` (ตารางเปรียบเทียบ), `/library` (การ์ด 3 แบบ), `/studio` (แก้ campaign ในเครื่อง)

## เริ่มทำต่อ

```bash
cp -R concept-set-b ~/Projects/gambol-site
cd ~/Projects/gambol-site
npm install
npm run dev                                # http://localhost:3000/concept-0N
```

ถ้า `npm run dev` ขึ้น error `spawn EBADF` ให้ใช้ `npm run build && npm run preview` แทน

## ไฟล์ของแต่ละแนวคิด

| แนวคิด | หน้าแรก | CSS ใน `assets/css/main.css` |
|---|---|---|
| 01 Modern Minimal | `components/concepts/MinimalHome.vue` | บล็อก `/* 01: premium street … */` |
| 02 Bold Sport | `components/concepts/SportHome.vue` | บล็อก `/* 02: sport … */` |
| 03 Lifestyle Editorial | `components/concepts/StoryHome.vue` | บล็อก `/* 03: a lifestyle journal */` |
| 04 Smart Commerce | `components/concepts/CommerceHome.vue` | บล็อก `/* 04: shopping-first guidance */` |
| 05 Future Footwear | `components/concepts/FutureHome.vue` | บล็อก `/* 05: tactile material lab … */` |

ทุกแนวคิดใช้ส่วนเหล่านี้ร่วมกัน:
- **Header, footer, การ์ดสินค้า, ฟิลเตอร์:** `components/*.vue`
- **หน้ารายการสินค้าและหน้าสินค้า:** `pages/[concept]/`
- **ข้อมูลแนวคิด, campaign และ section:** `data/concepts.ts`
- **สินค้า:** `data/products.ts`
- **ตะกร้าและเนื้อหา:** `composables/`, `stores/`

**ถ้าจะลบแนวคิดที่ไม่ใช้:** ลบไฟล์ `components/concepts/<Name>Home.vue` ของแนวคิดนั้น เอา entry ออกจาก `data/concepts.ts` และเอาบรรทัดของแนวคิดนั้นออกจาก `pages/[concept]/index.vue` จากนั้นรัน `npm run typecheck`

## คำสั่ง

| คำสั่ง | ใช้ทำอะไร |
|---|---|
| `npm run dev` | เปิด dev server |
| `npm run build` แล้ว `npm run preview` | build แบบ production แล้วเปิดดู |
| `npm run build:portable` | สร้างไฟล์ offline ไว้ใน `portable/GAMBOL-Portable/` |
| `npm run test:ui` | ทดสอบด้วย Playwright + axe |

รายละเอียดอยู่ใน `README.md`, `DESIGN.md` และ `docs/`
