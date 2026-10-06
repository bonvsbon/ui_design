import type { Category, Collection, Product } from '~/types'

/**
 * Mock catalogue (CMS: "Products", "Categories", "Collections").
 * Prices/claims are prototype placeholders.
 */

const care = [
  'ล้างด้วยน้ำสะอาดผสมสบู่อ่อน ใช้แปรงขนนุ่มขัดเบา ๆ',
  'ผึ่งในที่ร่ม หลีกเลี่ยงแดดจัดและความร้อนสูง',
  'ห้ามซักด้วยเครื่องหรืออบแห้ง',
]
const careSuede = [
  'ใช้แปรงสำหรับหนังกลับปัดฝุ่นตามแนวขน',
  'หลีกเลี่ยงการแช่น้ำ เช็ดคราบด้วยผ้าหมาด',
  'ใส่กระดาษไว้ด้านในเพื่อคงรูปทรงเมื่อไม่ได้ใช้งาน',
]

const sizesAdult = [36, 37, 38, 39, 40, 41, 42, 43, 44]
const sizesMen = [39, 40, 41, 42, 43, 44, 45, 46]
const sizesWomen = [35, 36, 37, 38, 39, 40, 41]
const sizesKids = [28, 29, 30, 31, 32, 33, 34, 35]

export const products: Product[] = [
  {
    id: 'p-iconic', slug: 'iconic', name: 'ICONIC', subtitle: 'รองเท้าแตะหูหนีบ G-BOLD',
    category: 'flip-flops', genders: ['men', 'women', 'unisex'], collection: 'g-bold-originals', technologies: ['g-bold'],
    price: 465, badges: ['best-seller', 'online-exclusive'],
    colors: [
      { id: 'lavender', name: 'Lavender', hex: '#a08bd0' },
      { id: 'mint', name: 'Mint', hex: '#7fc8b0', filter: 'hue-rotate(200deg) saturate(.8) brightness(1.05)' },
      { id: 'coral', name: 'Coral', hex: '#e7826f', filter: 'hue-rotate(95deg) saturate(1.1)' },
      { id: 'sky', name: 'Sky', hex: '#7ea7e0', filter: 'hue-rotate(-45deg)' },
    ],
    sizes: sizesAdult, soldOutSizes: [36],
    image: 'iconic', rating: 4.8, reviewCount: 2314,
    benefits: { comfort: 5, soft: 5, light: 4, durable: 4 }, weightGrams: 148,
    activities: ['everyday', 'weekend', 'casual', 'travel'],
    shortDescription: 'หูหนีบสัมผัสนุ่ม พื้น G-BOLD คืนตัวไว ใส่ได้ทั้งวัน',
    description: 'รุ่นขายดีตลอดกาลที่ถูกออกแบบใหม่ในปี 2026 พื้น G-BOLD หนาขึ้น 2 มม. ให้สัมผัสนุ่มแต่ไม่ยวบ ขอบพื้นโค้งรับอุ้งเท้า หูหนีบบุด้วยวัสดุนุ่มเพื่อลดการเสียดสีระหว่างนิ้ว',
    materials: ['พื้น: G-BOLD Comfort Foam', 'หูหนีบ: PU บุฟองน้ำ', 'พื้นนอก: ยางกันลื่นลายคลื่น'],
    care, releasedAt: '2026-03-01', salesRank: 1, stock: 64,
  },
  {
    id: 'p-iconic-cozy', slug: 'iconic-cozy', name: 'ICONIC COZY', subtitle: 'หูหนีบผ้าสักหลาด สำหรับผู้ชาย',
    category: 'flip-flops', genders: ['men'], collection: 'city-walk-26', technologies: ['g-bold'],
    price: 499, badges: ['new'],
    colors: [
      { id: 'olive', name: 'Olive / Sand', hex: '#4c5a36' },
      { id: 'navy', name: 'Navy / Sand', hex: '#2d3c5c', filter: 'hue-rotate(110deg) saturate(.9)' },
      { id: 'wine', name: 'Wine / Sand', hex: '#6e2a35', filter: 'hue-rotate(250deg) saturate(1.1)' },
    ],
    sizes: [40, 41, 42, 43, 44],
    image: 'cozy', rating: 4.7, reviewCount: 412,
    benefits: { comfort: 5, soft: 4, light: 4, durable: 4 }, weightGrams: 162,
    activities: ['everyday', 'work', 'casual', 'walking'],
    shortDescription: 'หูหนีบผ้าสัมผัสนุ่ม ดูเรียบร้อยพอสำหรับวันทำงานสบาย ๆ',
    description: 'ICONIC ในลุคที่โตขึ้น หูหนีบหุ้มผ้าสัมผัสคล้ายสักหลาด พื้นโทนทรายเข้ากับกางเกงผ้าและยีนส์ เหมาะกับวันที่ต้องเดินระหว่างออฟฟิศ คาเฟ่ และรถไฟฟ้า',
    materials: ['พื้น: G-BOLD Comfort Foam', 'หูหนีบ: ผ้าไมโครสักหลาด', 'พื้นนอก: ยางกันลื่น'],
    care, releasedAt: '2026-09-12', salesRank: 6, stock: 22,
  },
  {
    id: 'p-bold', slug: 'bold-strap', name: 'BOLD STRAP', subtitle: 'แตะสวมสองสายปรับได้',
    category: 'slides', genders: ['men', 'unisex'], collection: 'g-bold-originals', technologies: ['g-bold'],
    price: 405, compareAt: 459, badges: ['sale'],
    colors: [
      { id: 'khaki', name: 'Khaki', hex: '#8a8170' },
      { id: 'carbon', name: 'Carbon', hex: '#2b2b2b', filter: 'grayscale(1) contrast(1.5) brightness(.95)' },
      { id: 'moss', name: 'Moss', hex: '#5f6a3a', filter: 'hue-rotate(35deg) saturate(1.8)' },
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    image: 'bold', rating: 4.6, reviewCount: 958,
    benefits: { comfort: 4, soft: 4, light: 4, durable: 5 }, weightGrams: 210,
    activities: ['weekend', 'travel', 'outdoor', 'casual'],
    shortDescription: 'สายเทปปรับกระชับได้สองจุด พื้นหนาทนทาน ลุยได้ทุกทริป',
    description: 'สไลด์สายคู่ปรับระดับด้วยเทปตีนตุ๊กแก ลายกราฟิก BOLD ทอในสายผ้า พื้น G-BOLD ความหนา 28 มม. รองรับการเดินระยะไกล เหมาะกับสายเที่ยวและสายแคมป์',
    materials: ['พื้น: G-BOLD Dual Density', 'สาย: ผ้าทอโพลีเอสเตอร์ + เทปปรับระดับ', 'พื้นนอก: ยางลายตาราง'],
    care, releasedAt: '2025-11-02', salesRank: 3, stock: 41,
  },
  {
    id: 'p-tofu', slug: 'tofu', name: 'TOFU', subtitle: 'หูหนีบชิ้นเดียว นุ่มเด้ง',
    category: 'flip-flops', genders: ['women', 'unisex'], collection: 'weekend-club', technologies: ['g-bold'],
    price: 235, badges: ['best-seller'],
    colors: [
      { id: 'black', name: 'Midnight', hex: '#1d1d1f' },
      { id: 'cocoa', name: 'Cocoa', hex: '#4a3226', filter: 'sepia(1) saturate(1.4) brightness(1.5)' },
    ],
    sizes: sizesWomen,
    image: 'tofu', rating: 4.9, reviewCount: 3120,
    benefits: { comfort: 5, soft: 5, light: 5, durable: 3 }, weightGrams: 118,
    activities: ['everyday', 'weekend', 'casual', 'family'],
    shortDescription: 'ขึ้นรูปชิ้นเดียว ไร้รอยต่อ เบาเหมือนไม่ได้ใส่',
    description: 'TOFU ขึ้นรูปจาก G-BOLD ชิ้นเดียวทั้งคู่ ไม่มีรอยต่อให้ระคายเท้า ล้างน้ำง่าย แห้งไว เป็นคู่ที่หยิบใส่ได้ตั้งแต่เช้าจนดึก',
    materials: ['ขึ้นรูปชิ้นเดียว: G-BOLD Soft Foam'],
    care, releasedAt: '2025-06-15', salesRank: 2, stock: 120,
  },
  {
    id: 'p-twist', slug: 'twist', name: 'TWIST', subtitle: 'แตะสวมนิ้วโป้ง สายไขว้',
    category: 'sandals', genders: ['women'], collection: 'city-walk-26', technologies: ['g-bold'],
    price: 445, badges: ['new', 'limited'],
    colors: [
      { id: 'navy', name: 'Navy / Latte', hex: '#2c3e57' },
      { id: 'rose', name: 'Rose / Latte', hex: '#b46a7a', filter: 'hue-rotate(150deg) saturate(1.1) brightness(1.1)' },
      { id: 'forest', name: 'Forest / Latte', hex: '#2f5a43', filter: 'hue-rotate(-75deg) saturate(1.1)' },
    ],
    sizes: sizesWomen, soldOutSizes: [35, 41],
    image: 'twist', rating: 4.5, reviewCount: 187,
    benefits: { comfort: 4, soft: 4, light: 4, durable: 4 }, weightGrams: 136,
    activities: ['work', 'everyday', 'walking', 'casual'],
    shortDescription: 'สายไขว้เรียบหรู ใส่ไปทำงานได้ เดินทั้งวันไม่เมื่อย',
    description: 'สายหนัง PU เย็บขอบด้วยด้ายคอนทราสต์ ไขว้รอบนิ้วโป้งเพื่อความกระชับโดยไม่ต้องมีสายรัดส้น พื้นสองชั้นโทนลาเต้กับฟ้าเย็นตา จำนวนจำกัดเฉพาะคอลเลกชัน City Walk',
    materials: ['พื้น: G-BOLD สองชั้น', 'สาย: PU เย็บขอบ', 'พื้นนอก: ยางกันลื่น'],
    care, releasedAt: '2026-09-20', salesRank: 9, stock: 9,
  },
  {
    id: 'p-slipon', slug: 'city-slip-on', name: 'CITY SLIP-ON', subtitle: 'สลิปออนหนังกลับ ผู้ชาย',
    category: 'sneakers', genders: ['men'], collection: 'city-walk-26', technologies: ['g-bold', 'grip-lite'],
    price: 595, badges: ['new'],
    colors: [
      { id: 'olive', name: 'Olive Suede', hex: '#4a5a3b' },
      { id: 'navy', name: 'Navy Suede', hex: '#2b3a5c', filter: 'hue-rotate(115deg) saturate(.9)' },
      { id: 'charcoal', name: 'Charcoal', hex: '#3a3a3a', filter: 'grayscale(1) contrast(1.1)' },
    ],
    sizes: sizesMen, soldOutSizes: [46],
    image: 'slip-on', rating: 4.6, reviewCount: 274,
    benefits: { comfort: 5, soft: 4, light: 3, durable: 5 }, weightGrams: 286,
    activities: ['work', 'everyday', 'walking', 'travel'],
    shortDescription: 'สวมง่ายไม่ต้องผูกเชือก พื้นในบุ G-BOLD เดินได้ทั้งวัน',
    description: 'สลิปออนหนังกลับสังเคราะห์ ยางยืดซ่อนด้านข้างให้สวมถอดง่าย พื้นใน G-BOLD ถอดซักได้ พื้นนอก Grip-Lite เบากว่ายางทั่วไปแต่ยังยึดเกาะดีบนพื้นเปียก',
    materials: ['ส่วนบน: หนังกลับสังเคราะห์', 'พื้นใน: G-BOLD ถอดซักได้', 'พื้นนอก: Grip-Lite Rubber'],
    care: careSuede, releasedAt: '2026-08-28', salesRank: 5, stock: 33,
  },
  {
    id: 'p-slipon-w', slug: 'city-slip-on-w', name: 'CITY SLIP-ON W', subtitle: 'สลิปออน ผู้หญิง',
    category: 'sneakers', genders: ['women'], collection: 'city-walk-26', technologies: ['g-bold', 'grip-lite'],
    price: 545, badges: ['online-exclusive'],
    colors: [
      { id: 'navy', name: 'Navy', hex: '#2b3a5c', filter: 'hue-rotate(115deg) saturate(.9)' },
      { id: 'clay', name: 'Clay', hex: '#8c5a3c', filter: 'hue-rotate(-75deg) saturate(1.4) brightness(1.15)' },
    ],
    sizes: sizesWomen,
    image: 'slip-on', rating: 4.5, reviewCount: 96,
    benefits: { comfort: 5, soft: 4, light: 4, durable: 4 }, weightGrams: 244,
    activities: ['work', 'walking', 'travel', 'everyday'],
    shortDescription: 'ทรงเพรียวขึ้น เบาขึ้น สำหรับวันที่ต้องเดินเยอะ',
    description: 'ปรับทรงหัวเรียวลงสำหรับเท้าผู้หญิง น้ำหนักเบากว่ารุ่นผู้ชาย 15% ขายเฉพาะออนไลน์',
    materials: ['ส่วนบน: หนังกลับสังเคราะห์', 'พื้นใน: G-BOLD', 'พื้นนอก: Grip-Lite Rubber'],
    care: careSuede, releasedAt: '2026-07-10', salesRank: 11, stock: 18,
  },
  {
    id: 'p-trail', slug: 'bold-trail', name: 'BOLD TRAIL', subtitle: 'สไลด์สายคู่ ลุยนอกเมือง',
    category: 'slides', genders: ['men', 'women', 'unisex'], collection: 'weekend-club', technologies: ['g-bold', 'grip-lite'],
    price: 489, badges: ['limited'],
    colors: [
      { id: 'moss', name: 'Moss', hex: '#5f6a3a', filter: 'hue-rotate(35deg) saturate(1.8)' },
      { id: 'clay', name: 'Clay', hex: '#9a6b4e', filter: 'sepia(.6) saturate(1.6) hue-rotate(-15deg)' },
    ],
    sizes: sizesAdult,
    image: 'bold', rating: 4.7, reviewCount: 143,
    benefits: { comfort: 4, soft: 3, light: 3, durable: 5 }, weightGrams: 228,
    activities: ['outdoor', 'travel', 'weekend'],
    shortDescription: 'พื้น Grip-Lite ดอกยางลึก พร้อมลุยลำธารและทางหิน',
    description: 'เวอร์ชันลุยของ BOLD STRAP เพิ่มดอกยางลึก 4 มม. และสายผ้ากันน้ำ แห้งไวเมื่อเปียก',
    materials: ['พื้น: G-BOLD Dual Density', 'สาย: ผ้ากันน้ำ', 'พื้นนอก: Grip-Lite ดอกลึก'],
    care, releasedAt: '2026-05-05', salesRank: 8, stock: 14,
  },
  {
    id: 'p-twist-soft', slug: 'twist-soft', name: 'TWIST SOFT', subtitle: 'แตะนิ้วโป้ง พื้นนุ่มพิเศษ',
    category: 'sandals', genders: ['women'], collection: 'g-bold-originals', technologies: ['g-bold'],
    price: 399, compareAt: 475, badges: ['sale'],
    colors: [
      { id: 'rose', name: 'Rose', hex: '#b46a7a', filter: 'hue-rotate(150deg) saturate(1.1) brightness(1.1)' },
      { id: 'navy', name: 'Navy', hex: '#2c3e57' },
    ],
    sizes: sizesWomen,
    image: 'twist', rating: 4.4, reviewCount: 221,
    benefits: { comfort: 5, soft: 5, light: 4, durable: 3 }, weightGrams: 128,
    activities: ['everyday', 'casual', 'weekend'],
    shortDescription: 'พื้นนุ่มขึ้นอีกระดับ เหมาะกับคนยืนนาน',
    description: 'TWIST ที่เพิ่มชั้นโฟมนุ่มด้านบน สำหรับคนที่ยืนหรือเดินเกินวันละ 8 ชั่วโมง',
    materials: ['พื้น: G-BOLD + Soft Top Layer', 'สาย: PU'],
    care, releasedAt: '2025-12-01', salesRank: 7, stock: 27,
  },
  {
    id: 'p-tofu-kids', slug: 'tofu-kids', name: 'TOFU KIDS', subtitle: 'หูหนีบเด็ก นุ่ม เบา ล้างง่าย',
    category: 'flip-flops', genders: ['kids'], collection: 'little-steps', technologies: ['g-bold'],
    price: 199, badges: ['new'],
    colors: [
      { id: 'midnight', name: 'Midnight', hex: '#1d1d1f' },
      { id: 'cocoa', name: 'Cocoa', hex: '#4a3226', filter: 'sepia(1) saturate(1.4) brightness(1.5)' },
    ],
    sizes: sizesKids,
    image: 'tofu', rating: 4.8, reviewCount: 312,
    benefits: { comfort: 5, soft: 5, light: 5, durable: 4 }, weightGrams: 74,
    activities: ['family', 'weekend', 'everyday'],
    shortDescription: 'เบาแค่ 74 กรัม ขอบมนปลอดภัยสำหรับเท้าเด็ก',
    description: 'TOFU ไซซ์เด็ก ขอบพื้นยกสูงกันสะดุด ไม่มีชิ้นส่วนเล็กหลุดได้ ปลอดสาร BPA',
    materials: ['ขึ้นรูปชิ้นเดียว: G-BOLD Soft Foam (BPA-free)'],
    care, releasedAt: '2026-09-01', salesRank: 10, stock: 58,
  },
  {
    id: 'p-iconic-kids', slug: 'iconic-kids', name: 'ICONIC KIDS', subtitle: 'หูหนีบเด็ก สีพาสเทล',
    category: 'flip-flops', genders: ['kids'], collection: 'little-steps', technologies: ['g-bold'],
    price: 259, badges: ['best-seller'],
    colors: [
      { id: 'lavender', name: 'Lavender', hex: '#a08bd0' },
      { id: 'coral', name: 'Coral', hex: '#e7826f', filter: 'hue-rotate(95deg) saturate(1.1)' },
      { id: 'mint', name: 'Mint', hex: '#7fc8b0', filter: 'hue-rotate(200deg) saturate(.8) brightness(1.05)' },
    ],
    sizes: sizesKids,
    image: 'iconic', rating: 4.8, reviewCount: 540,
    benefits: { comfort: 5, soft: 5, light: 5, durable: 4 }, weightGrams: 88,
    activities: ['family', 'weekend', 'everyday'],
    shortDescription: 'คู่เหมือนพ่อแม่ ในไซซ์ของเด็ก',
    description: 'ICONIC ย่อส่วนสำหรับเด็ก หูหนีบนุ่มพิเศษ ลดการเสียดสีระหว่างนิ้ว เหมาะกับการเริ่มหัดใส่หูหนีบ',
    materials: ['พื้น: G-BOLD Soft Foam', 'หูหนีบ: TPU นุ่ม'],
    care, releasedAt: '2026-04-11', salesRank: 4, stock: 76,
  },
  {
    id: 'p-cozy-travel', slug: 'cozy-travel', name: 'COZY TRAVEL', subtitle: 'หูหนีบพกพา น้ำหนักเบา',
    category: 'flip-flops', genders: ['unisex', 'men', 'women'], collection: 'weekend-club', technologies: ['g-bold'],
    price: 429, badges: ['online-exclusive'],
    colors: [
      { id: 'navy', name: 'Navy / Sand', hex: '#2d3c5c', filter: 'hue-rotate(110deg) saturate(.9)' },
      { id: 'olive', name: 'Olive / Sand', hex: '#4c5a36' },
    ],
    sizes: sizesAdult,
    image: 'cozy', rating: 4.6, reviewCount: 168,
    benefits: { comfort: 4, soft: 4, light: 5, durable: 4 }, weightGrams: 132,
    activities: ['travel', 'weekend', 'casual'],
    shortDescription: 'พับใส่กระเป๋าได้ พร้อมถุงผ้าพกพา',
    description: 'พื้นบางลงแต่ยังคงความนุ่มของ G-BOLD มาพร้อมถุงผ้าสำหรับพกในกระเป๋าเดินทาง',
    materials: ['พื้น: G-BOLD Light', 'หูหนีบ: ผ้าทอ', 'ถุงผ้าพกพา'],
    care, releasedAt: '2026-06-20', salesRank: 12, stock: 31,
  },
]

export const categories: Category[] = [
  { slug: 'men', label: 'Men', labelTh: 'ผู้ชาย', description: 'แตะ สไลด์ และสลิปออนสำหรับทุกวัน', query: { gender: 'men' }, image: 'slip-on', media: 'commute' },
  { slug: 'women', label: 'Women', labelTh: 'ผู้หญิง', description: 'นุ่ม เบา และดูดีตั้งแต่เช้าจนค่ำ', query: { gender: 'women' }, image: 'twist', media: 'legsFlipflop' },
  { slug: 'kids', label: 'Kids', labelTh: 'เด็ก', description: 'เบา ปลอดภัย ล้างง่าย', query: { gender: 'kids' }, image: 'iconic', media: 'kidsRun' },
  { slug: 'sneakers', label: 'Sneakers', labelTh: 'สนีกเกอร์', description: 'สลิปออนและรองเท้าผ้าใบพื้น G-BOLD', query: { category: 'sneakers' }, image: 'slip-on', media: 'brickFeet' },
  { slug: 'slides', label: 'Slides', labelTh: 'แตะสวม', description: 'สวมง่าย ปรับได้ ลุยได้', query: { category: 'slides' }, image: 'bold', media: 'pier' },
  { slug: 'flip-flops', label: 'Flip-flops', labelTh: 'แตะหูหนีบ', description: 'คู่ที่หยิบใส่บ่อยที่สุด', query: { category: 'flip-flops' }, image: 'tofu', media: 'beachFlipflops' },
  { slug: 'sandals', label: 'Sandals', labelTh: 'รองเท้าแตะรัดนิ้ว', description: 'เรียบร้อยพอสำหรับวันทำงาน', query: { category: 'sandals' }, image: 'twist', media: 'officeHall' },
  { slug: 'new', label: 'New Arrivals', labelTh: 'สินค้าใหม่', description: 'คอลเลกชันล่าสุดประจำฤดูกาล', query: { badge: 'new' }, image: 'cozy', media: 'bangkokSoi' },
  { slug: 'best', label: 'Best Sellers', labelTh: 'ขายดี', description: 'คู่ที่คนไทยเลือกมากที่สุด', query: { badge: 'best-seller' }, image: 'iconic', media: 'crosswalk' },
]

export const collections: Collection[] = [
  { slug: 'g-bold-originals', name: 'G-BOLD Originals', tagline: 'คู่ต้นฉบับ นุ่มตั้งแต่ก้าวแรก', description: 'รุ่นคลาสสิกที่พัฒนาพื้น G-BOLD ใหม่ทั้งหมดในปี 2026', media: 'crosswalk' },
  { slug: 'city-walk-26', name: 'City Walk ’26', tagline: 'เดินทั้งเมือง ไม่ต้องเปลี่ยนคู่', description: 'คอลเลกชันสำหรับคนเมืองที่เดินวันละหมื่นก้าว', media: 'bangkokSoi' },
  { slug: 'weekend-club', name: 'Weekend Club', tagline: 'วันหยุดที่ไม่ต้องคิดเยอะ', description: 'แตะหูหนีบและ slide น้ำหนักเบา แห้งไว สำหรับทะเล ภูเขา และคาเฟ่', media: 'pier' },
  { slug: 'little-steps', name: 'Little Steps', tagline: 'ก้าวเล็ก ๆ ที่สบายที่สุด', description: 'คอลเลกชันเด็ก ปลอดภัย เบา ล้างง่าย', media: 'kidsSandals' },
]

export const technologyLabels: Record<string, string> = {
  'g-bold': 'G-BOLD Foam',
  'grip-lite': 'Grip-Lite Outsole',
}

export const genderLabels: Record<string, string> = {
  men: 'ผู้ชาย', women: 'ผู้หญิง', kids: 'เด็ก', unisex: 'ใส่ได้ทุกเพศ',
}

export const categoryLabels: Record<string, string> = {
  'flip-flops': 'แตะหูหนีบ', slides: 'แตะสวม', sandals: 'แตะรัดนิ้ว', sneakers: 'สนีกเกอร์',
}

export const activityLabels: Record<string, { th: string; en: string }> = {
  everyday: { th: 'ทุกวัน', en: 'Everyday' },
  walking: { th: 'เดินเยอะ', en: 'Walking' },
  work: { th: 'ทำงาน', en: 'Work' },
  travel: { th: 'เดินทาง', en: 'Travel' },
  casual: { th: 'ลำลอง', en: 'Casual' },
  weekend: { th: 'วันหยุด', en: 'Weekend' },
  outdoor: { th: 'กลางแจ้ง', en: 'Outdoor' },
  family: { th: 'ครอบครัว', en: 'Family' },
}

export const badgeLabels: Record<string, string> = {
  new: 'NEW',
  'best-seller': 'BEST SELLER',
  'online-exclusive': 'ONLINE EXCLUSIVE',
  limited: 'LIMITED',
  sale: 'SALE',
}

export const benefitLabels: Record<string, { th: string; en: string }> = {
  comfort: { th: 'สบาย', en: 'Comfort' },
  soft: { th: 'นุ่ม', en: 'Soft' },
  light: { th: 'เบา', en: 'Lightweight' },
  durable: { th: 'ทนทาน', en: 'Durable' },
}
