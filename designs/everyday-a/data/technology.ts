import type { TechPoint } from '~/types'

/** GBOLD Technology™ content (CMS: "Technology"). Hotspot x/y are % positions over the sole illustration. */
export const techPoints: TechPoint[] = [
  { id: 'comfort', label: 'Comfort', title: 'รองรับรูปเท้าตามธรรมชาติ', body: 'พื้นโค้งรับอุ้งเท้าและส้นเท้า กระจายน้ำหนักให้สมดุล ยืนหรือเดินนานก็ไม่ล้า', x: 66, y: 19 },
  { id: 'soft', label: 'Soft', title: 'สัมผัสนุ่มตั้งแต่ก้าวแรก', body: 'โฟม GBOLD™ ยุบตัวรับแรงกระแทกแล้วคืนตัวไว นุ่มแต่ไม่ยวบ ไม่ต้องรอให้รองเท้า “เข้าเท้า”', x: 33, y: 39 },
  { id: 'lite', label: 'Lite', title: 'เบา จนลืมว่าใส่อยู่', body: 'โครงสร้างโฟมเซลล์ปิด น้ำหนักเบากว่ายางทั่วไป ลอยน้ำได้ ทุกก้าวจึงคล่องตัว', x: 68, y: 59 },
  { id: 'durable', label: 'Durable', title: 'ทนทานสำหรับทุกวัน', body: 'เนื้อวัสดุยืดหยุ่นสูง ไม่แตกลายง่าย พื้นนอกกันลื่นลายคลื่น ใช้งานได้ยาวนานทั้งแดดและฝน', x: 35, y: 79 },
]

/** Layer stack used by the sole construction diagram on PDP and /technology */
export const techLayers = [
  { name: 'Footbed', th: 'แผ่นรองเท้าขึ้นลายนูน', note: 'กันลื่นเมื่อเท้าเปียก ระบายอากาศ' },
  { name: 'GBOLD™ Core', th: 'โฟมแกนกลาง GBOLD™', note: 'ซับแรงกระแทก คืนตัวไว น้ำหนักเบา' },
  { name: 'Arch Support', th: 'โครงรับอุ้งเท้า', note: 'รองรับรูปเท้าตามธรรมชาติ' },
  { name: 'Outsole', th: 'พื้นนอกยางลายคลื่น', note: 'ยึดเกาะพื้นเปียก ทนการสึกหรอ' },
]

export const techStats = [
  { value: '–30%', label: 'น้ำหนักเบากว่าพื้นยางทั่วไป*' },
  { value: '2×', label: 'การคืนตัวหลังรับแรงกด*' },
  { value: '10,000+', label: 'ก้าวต่อวันอย่างสบาย*' },
]
