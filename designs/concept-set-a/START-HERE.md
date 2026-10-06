# Concept Set A — 5 แนวคิดในโปรเจกต์เดียว

| # | แนวคิด | Route |
|---|---|---|
| 01 | Premium Street | `/concept-01` |
| 02 | Bold Sport | `/concept-02` |
| 03 | Lifestyle Storytelling | `/concept-03` |
| 04 | Smart Commerce | `/concept-04` |
| 05 | Future Tech | `/concept-05` |

## เริ่มทำต่อ

```bash
cp -R concept-set-a ~/Projects/gambol-site
cd ~/Projects/gambol-site
npm install
npm run dev                                # http://localhost:3000/concept-0N
```

พอ copy ไปแล้วรันได้ทันทีทั้ง 5 แนวคิด ถ้าจะเลือกทำต่อแค่แนวคิดเดียว ก็ทำงานในไฟล์ของแนวคิดนั้นตามตารางด้านล่างได้เลย ไฟล์ของแนวคิดอื่นจะเก็บไว้หรือลบทิ้งก็ได้

## ไฟล์ของแต่ละแนวคิด (N = 01–05)

| ส่วน | ไฟล์ของแนวคิด N | ใช้ร่วมกันทุกแนวคิด |
|---|---|---|
| หน้าเว็บ | `pages/concept-0N/` | `pages/index.vue` (หน้าเปรียบเทียบ) |
| Layout (header, footer, ฟอนต์) | `layouts/c0N.vue` | |
| Component | `components/c0N/` | `components/shared/` |
| Section หน้าแรก (CMS) | `data/home/c0N.ts` | `data/catalog.ts`, `data/content.ts`, `data/media.ts` |
| สีและ token | บล็อก `CONCEPT 0N` ใน `assets/css/main.css` | ส่วนที่เหลือของ `main.css`, `tailwind.config.ts` |
| Logic | | `composables/`, `stores/`, `types/` |

**ถ้าจะลบแนวคิดที่ไม่ใช้:** ลบ `pages/concept-0X/`, `layouts/c0X.vue`, `components/c0X/` และ `data/home/c0X.ts` ของแนวคิดนั้น แล้วเอา entry `c0X` ออกจาก `conceptMeta` ใน `composables/useConcept.ts` และ `types/` จากนั้นรัน `npm run typecheck` เพื่อหาจุดที่ยังอ้างถึงไฟล์ที่ลบไป

## คำสั่ง

| คำสั่ง | ใช้ทำอะไร |
|---|---|
| `npm run dev` | เปิด dev server |
| `npm run build` แล้ว `npm run preview` | build แบบ production แล้วเปิดดู |
| `npm run portable` | สร้างไฟล์ offline ไว้ใน `portable/GAMBOL-5-Concepts-Portable/` |

รายละเอียดสถาปัตยกรรมอยู่ใน `README.md`
