# Everyday A — "Everyday Feels Better" ★

ดีไซน์ที่ใช้ [REEF](https://www.reef.com/) เป็น reference ด้าน UX ร่วมกับ [GAMBOL](https://www.gambol.co.th/) โปรเจกต์นี้ใช้งานได้ในตัวเอง copy โฟลเดอร์นี้ไปที่ไหนก็ทำงานต่อได้ทันที

## เริ่มทำต่อ

```bash
cp -R everyday-a ~/Projects/gambol-site   # หรือ rsync ข้าม node_modules ก็ได้
cd ~/Projects/gambol-site
npm install
npm run dev                                # http://localhost:3000
```

| คำสั่ง | ใช้ทำอะไร |
|---|---|
| `npm run dev` | เปิด dev server พร้อม hot reload |
| `npm run build` แล้ว `npm run preview` | build แบบ production แล้วเปิดดู |
| `npm run typecheck` | ตรวจ TypeScript |
| `npm run portable` | สร้างไฟล์ offline ไว้ใน `portable/GAMBOL-Everyday-Portable/` |

## แก้อะไรที่ไหน

| อยากแก้ | ไฟล์ |
|---|---|
| ลำดับและเนื้อหา section หน้าแรก | `data/` (ดูหัวข้อ "Where the mock data lives" ใน README.md) |
| สินค้า บทความ สาขา | `mock/` |
| สี ฟอนต์ ระยะห่าง | `assets/css/`, `tailwind.config.ts` |
| Component | `components/<กลุ่ม>/` |
| หน้าเว็บ | `pages/` |

รายละเอียดเชิงลึกอยู่ใน `README.md` และ `docs/` (analysis, design-strategy)
