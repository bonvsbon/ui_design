import type { HomeSection } from '~/types'

/** CMS: Homepage — Concept 04 (Smart Commerce). */
export const homeC04: HomeSection[] = [
  { id: 'finder', type: 'Finder', label: 'Find Your Pair (hero)', enabled: true, props: { title: 'หาคู่ที่ใช่ใน 3 คลิก', subtitle: 'ตอบ 3 คำถามสั้น ๆ แล้วเราจะแนะนำรองเท้าที่เหมาะกับคุณที่สุด' } },
  { id: 'trust', type: 'TrustBar', label: 'Service promises', enabled: true, props: {} },
  { id: 'quick', type: 'QuickShop', label: 'Shop by category', enabled: true, props: { title: 'ช้อปตามหมวดหมู่', items: ['men', 'women', 'kids', 'sneakers', 'slides', 'flip-flops', 'new', 'best'] } },
  { id: 'deals', type: 'Deals', label: 'Promotions', enabled: true, props: { title: 'ดีลประจำสัปดาห์' } },
  { id: 'best', type: 'BestSellers', label: 'Best sellers grid', enabled: true, props: { title: 'ขายดีที่สุด', limit: 8 } },
  { id: 'compare', type: 'Compare', label: 'Quick comparison', enabled: true, props: { title: 'เทียบรุ่นยอดนิยม', products: ['iconic', 'tofu', 'bold-strap'] } },
  { id: 'reviews', type: 'Reviews', label: 'Reviews summary', enabled: true, props: { title: 'ลูกค้าพูดถึงเรา' } },
  { id: 'stores', type: 'Stores', label: 'Store locator', enabled: true, props: { title: 'รับสินค้าที่สาขาภายใน 2 ชั่วโมง' } },
]
