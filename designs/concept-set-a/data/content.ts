import type { Article, NavItem, Promotion, Store, Technology } from '~/types'

/** CMS: "Site settings" — brand name, announcements and navigation live here, not in components. */
export const site = {
  brand: 'GAMBOL',
  tagline: 'สบายทุกก้าว ตั้งแต่ปี 2003',
  instagram: '@gambol.th',
  announcements: [
    'ส่งฟรีทั่วไทย เมื่อช้อปครบ ฿499',
    'คืนสินค้าได้ภายใน 30 วัน',
    'สมาชิกใหม่ลด 10% ใช้โค้ด HELLO10',
  ],
  freeShippingThreshold: 499,
}

export const mainNav: NavItem[] = [
  {
    label: 'Men', to: '/products?gender=men',
    children: [
      { heading: 'ประเภท', links: [
        { label: 'แตะหูหนีบ', to: '/products?gender=men&category=flip-flops' },
        { label: 'แตะสวม', to: '/products?gender=men&category=slides' },
        { label: 'สนีกเกอร์', to: '/products?gender=men&category=sneakers' },
      ] },
      { heading: 'ใช้งาน', links: [
        { label: 'ไปทำงาน', to: '/products?gender=men&activity=work' },
        { label: 'เดินทาง', to: '/products?gender=men&activity=travel' },
        { label: 'ลุยกลางแจ้ง', to: '/products?gender=men&activity=outdoor' },
      ] },
      { heading: 'แนะนำ', links: [
        { label: 'สินค้าใหม่', to: '/products?gender=men&badge=new' },
        { label: 'ขายดี', to: '/products?gender=men&sort=best' },
      ] },
    ],
    feature: { media: 'commute', title: 'CITY SLIP-ON — สวมแล้วออกเดินได้เลย', to: '/product/city-slip-on' },
  },
  {
    label: 'Women', to: '/products?gender=women',
    children: [
      { heading: 'ประเภท', links: [
        { label: 'แตะหูหนีบ', to: '/products?gender=women&category=flip-flops' },
        { label: 'แตะรัดนิ้ว', to: '/products?gender=women&category=sandals' },
        { label: 'สนีกเกอร์', to: '/products?gender=women&category=sneakers' },
      ] },
      { heading: 'ใช้งาน', links: [
        { label: 'ไปทำงาน', to: '/products?gender=women&activity=work' },
        { label: 'วันหยุด', to: '/products?gender=women&activity=weekend' },
        { label: 'เดินเยอะ', to: '/products?gender=women&activity=walking' },
      ] },
      { heading: 'แนะนำ', links: [
        { label: 'สินค้าใหม่', to: '/products?gender=women&badge=new' },
        { label: 'ลดราคา', to: '/products?gender=women&badge=sale' },
      ] },
    ],
    feature: { media: 'legsFlipflop', title: 'TWIST — สายไขว้ลุคเรียบหรู', to: '/product/twist' },
  },
  { label: 'Kids', to: '/products?gender=kids' },
  { label: 'Sneakers', to: '/products?category=sneakers' },
  { label: 'New Arrivals', to: '/products?badge=new' },
  { label: 'Technology', to: '#technology' },
  { label: 'Stories', to: '#stories' },
]

export const technology: Technology = {
  slug: 'g-bold',
  name: 'G-BOLD',
  tagline: 'โฟมที่นุ่มพอจะสบาย และแน่นพอจะใช้ได้นาน',
  summary: 'G-BOLD คือโฟมพื้นรองเท้าที่พัฒนาและผลิตในโรงงานของเราเองในประเทศไทย ผสมเซลล์อากาศขนาดเล็กให้ยุบตัวรับแรงกระแทกแล้วคืนตัวทันที',
  layers: [
    { id: 'top', name: 'Contour Top', nameTh: 'ผิวสัมผัสโค้งรับเท้า', caption: 'ผิวลายละเอียดกันลื่นเมื่อเท้าเปียก ขึ้นรูปรับอุ้งเท้า', thicknessMm: 3, color: '#e9e3d6' },
    { id: 'core', name: 'G-BOLD Core', nameTh: 'แกนโฟม G-BOLD', caption: 'เซลล์อากาศปิด ยุบรับแรงแล้วคืนตัว ไม่ยวบเมื่อใช้นาน', thicknessMm: 16, color: '#ffb547' },
    { id: 'arch', name: 'Arch Support', nameTh: 'ส่วนรองรับอุ้งเท้า', caption: 'ความหนาแน่นสูงกว่าใต้อุ้งเท้า ช่วยกระจายน้ำหนัก', thicknessMm: 5, color: '#c98a3a' },
    { id: 'grip', name: 'Grip Outsole', nameTh: 'พื้นนอกกันลื่น', caption: 'ดอกยางลายคลื่นระบายน้ำ ยึดเกาะบนพื้นเปียก', thicknessMm: 4, color: '#3a3b40' },
  ],
  benefits: [
    { id: 'comfort', label: 'Comfort', labelTh: 'สบาย', metric: '−32', unit: '%', claim: 'แรงกดที่ส้นเท้าลดลง', vsStandard: 68 },
    { id: 'soft', label: 'Soft', labelTh: 'นุ่ม', metric: '35', unit: 'Asker C', claim: 'ความนุ่มระดับหมอนรองเท้า', vsStandard: 72 },
    { id: 'light', label: 'Lightweight', labelTh: 'เบา', metric: '148', unit: 'g', claim: 'ต่อข้าง (ICONIC ไซซ์ 41)', vsStandard: 74 },
    { id: 'durable', label: 'Durable', labelTh: 'ทนทาน', metric: '50K', unit: 'รอบ', claim: 'ทดสอบงอพับโดยไม่แตกร้าว', vsStandard: 140 },
  ],
  comparison: [
    { label: 'การคืนตัว', gbold: 62, eva: 44, rubber: 30, unit: '%', higherIsBetter: true },
    { label: 'น้ำหนักต่อข้าง', gbold: 148, eva: 200, rubber: 310, unit: 'g', higherIsBetter: false },
    { label: 'ยุบถาวรหลังใช้ 6 เดือน', gbold: 4, eva: 12, rubber: 3, unit: '%', higherIsBetter: false },
    { label: 'ทนงอพับ', gbold: 50, eva: 30, rubber: 60, unit: 'K รอบ', higherIsBetter: true },
  ],
}

export const articles: Article[] = [
  { slug: 'slide-or-flip-flop', title: 'Slide หรือ Flip-flop: แบบไหนเหมาะกับวันของคุณ', excerpt: 'เทียบความต่างของแตะสวมและแตะหูหนีบ ทั้งความกระชับ การเดินไกล และลุค', category: 'Guide', readMinutes: 4, media: 'pier', date: '2026-09-28' },
  { slug: '10000-steps-bangkok', title: 'เดินกรุงเทพฯ 10,000 ก้าว กับรองเท้าคู่เดียว', excerpt: 'จากเยาวราชถึงอารีย์ บันทึกหนึ่งวันของคนที่ไม่อยากเปลี่ยนรองเท้า', category: 'Story', readMinutes: 6, media: 'bangkokSoi', date: '2026-09-15' },
  { slug: 'care-g-bold', title: 'ดูแลพื้น G-BOLD ให้นุ่มเหมือนวันแรก', excerpt: 'สามขั้นตอนง่าย ๆ ที่ช่วยยืดอายุรองเท้าแตะของคุณ', category: 'Care', readMinutes: 3, media: 'brickFeet', date: '2026-08-30' },
  { slug: 'island-hopping-kit', title: 'จัดกระเป๋าไปทะเลใต้: ทำไมแตะสวมสายคู่ถึงคุ้มที่สุด', excerpt: 'เกาะหลีเป๊ะ เกาะกูด หรือเกาะเต่า เตรียมคู่ไหนดี', category: 'Travel', readMinutes: 5, media: 'beachFlipflops', date: '2026-08-12' },
  { slug: 'size-guide-kids', title: 'วิธีวัดไซซ์เท้าลูกที่บ้านใน 2 นาที', excerpt: 'ใช้แค่กระดาษกับไม้บรรทัด พร้อมตารางเทียบไซซ์', category: 'Guide', readMinutes: 2, media: 'kidsSandals', date: '2026-07-22' },
  { slug: 'inside-g-bold-lab', title: 'เบื้องหลังโฟม G-BOLD: จากห้องแล็บถึงเท้าคุณ', excerpt: 'ทำไมความนุ่มกับความทนต้องสมดุลกัน', category: 'Tech', readMinutes: 7, media: 'shadowWalk', date: '2026-07-01' },
]

export const stores: Store[] = [
  { id: 's1', name: 'GAMBOL Flagship', mall: 'เซ็นทรัลเวิลด์ ชั้น 2', province: 'กรุงเทพมหานคร', region: 'กรุงเทพฯ และปริมณฑล', hours: '10:00–22:00', phone: '02 000 1001', services: ['วัดไซซ์เท้า', 'รับสินค้าที่สาขา', 'คืนสินค้า'] },
  { id: 's2', name: 'GAMBOL', mall: 'ไอคอนสยาม ชั้น G', province: 'กรุงเทพมหานคร', region: 'กรุงเทพฯ และปริมณฑล', hours: '10:00–22:00', phone: '02 000 1002', services: ['รับสินค้าที่สาขา', 'คืนสินค้า'] },
  { id: 's3', name: 'GAMBOL', mall: 'เซ็นทรัล เวสต์เกต', province: 'นนทบุรี', region: 'กรุงเทพฯ และปริมณฑล', hours: '10:00–21:00', phone: '02 000 1003', services: ['รับสินค้าที่สาขา'] },
  { id: 's4', name: 'GAMBOL', mall: 'เซ็นทรัล เชียงใหม่ แอร์พอร์ต', province: 'เชียงใหม่', region: 'ภาคเหนือ', hours: '10:30–21:00', phone: '053 000 104', services: ['วัดไซซ์เท้า', 'รับสินค้าที่สาขา'] },
  { id: 's5', name: 'GAMBOL', mall: 'เซ็นทรัล ขอนแก่น', province: 'ขอนแก่น', region: 'ภาคอีสาน', hours: '10:30–21:00', phone: '043 000 105', services: ['รับสินค้าที่สาขา'] },
  { id: 's6', name: 'GAMBOL', mall: 'เซ็นทรัล ภูเก็ต ฟลอเรสต้า', province: 'ภูเก็ต', region: 'ภาคใต้', hours: '10:30–22:00', phone: '076 000 106', services: ['วัดไซซ์เท้า', 'คืนสินค้า'] },
  { id: 's7', name: 'GAMBOL', mall: 'เทอร์มินอล 21 พัทยา', province: 'ชลบุรี', region: 'ภาคตะวันออก', hours: '11:00–23:00', phone: '038 000 107', services: ['รับสินค้าที่สาขา'] },
]

export const promotions: Promotion[] = [
  { id: 'promo-1', label: 'ลด 15% เมื่อซื้อ 2 คู่', code: 'PAIR15', detail: 'เฉพาะสินค้าราคาปกติ ถึง 31 ต.ค. 2026', endsAt: '2026-10-31T23:59:00+07:00' },
  { id: 'promo-2', label: 'ส่งฟรีทั่วไทย', detail: 'เมื่อช้อปครบ ฿499' },
  { id: 'promo-3', label: 'สมาชิกใหม่ลด 10%', code: 'HELLO10', detail: 'สำหรับคำสั่งซื้อแรก' },
]

export const testimonials = [
  { name: 'พลอย, 29', city: 'กรุงเทพฯ', product: 'tofu', quote: 'ใส่ไปทำงาน เดินจาก BTS ไปออฟฟิศทุกวัน ไม่เคยเจ็บง่ามนิ้วเลย', rating: 5 },
  { name: 'คุณต้น, 41', city: 'เชียงใหม่', product: 'bold-strap', quote: 'พาลูกไปเที่ยวดอย ลุยน้ำตกได้ แห้งไว ซื้อให้ทั้งบ้านแล้ว', rating: 5 },
  { name: 'มายด์, 34', city: 'ภูเก็ต', product: 'iconic', quote: 'ยืนขายของทั้งวัน คู่นี้นุ่มที่สุดที่เคยใส่ สีพาสเทลก็น่ารัก', rating: 5 },
]
