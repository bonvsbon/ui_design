import type { HomeSection } from '~/types'

/** CMS: Homepage — Concept 02 (Bold Sport). */
export const homeC02: HomeSection[] = [
  {
    id: 'hero', type: 'HeroCampaign', label: 'Animated hero', enabled: true,
    props: {
      kicker: 'G-BOLD ENERGY · SS26',
      title: ['BOUNCE', 'BACK.'],
      subtitle: 'พื้น G-BOLD คืนตัวไว เบาแค่ 148 กรัม พร้อมทุกการเคลื่อนไหว ตั้งแต่สนามถึงถนน',
      marquee: 'MOVE LIGHT • เบาทุกก้าว • STAY SOFT • นุ่มทุกวัน • ',
      cta: { label: 'ช้อปเลย', to: '/products' },
      slides: [
        { product: 'bold-strap', color: '#d7ff3a', stat: '28 มม.', statLabel: 'พื้นหนา' },
        { product: 'iconic', color: '#b9a6ff', stat: '148 g', statLabel: 'ต่อข้าง' },
        { product: 'city-slip-on', color: '#7cf0c5', stat: '−32%', statLabel: 'แรงกดส้นเท้า' },
      ],
    },
  },
  { id: 'quick', type: 'QuickCategories', label: 'Quick category nav', enabled: true, props: { items: ['men', 'women', 'kids', 'sneakers', 'slides', 'flip-flops', 'new', 'best'] } },
  { id: 'trending', type: 'Trending', label: 'Trending products', enabled: true, props: { title: 'TRENDING', subtitle: 'ร้อนแรงที่สุดสัปดาห์นี้' } },
  { id: 'promo', type: 'PromoTicker', label: 'Promotion ticker', enabled: true, props: { items: ['ซื้อ 2 คู่ลด 15% โค้ด PAIR15', 'ส่งฟรีครบ ฿499', 'สมาชิกใหม่ลด 10% โค้ด HELLO10'] } },
  { id: 'tech', type: 'TechViz', label: 'Technology visualization', enabled: true, props: { title: 'SQUISH TEST', subtitle: 'กดค้างแล้วปล่อย — ดูว่า G-BOLD คืนตัวเร็วแค่ไหน' } },
  {
    id: 'segments', type: 'Segments', label: 'Sport / lifestyle segmentation', enabled: true,
    props: {
      items: [
        { key: 'recovery', title: 'RECOVERY', th: 'พักเท้าหลังเล่นกีฬา', media: 'hike', to: '/products?category=slides', products: ['bold-strap', 'bold-trail'] },
        { key: 'street', title: 'STREET', th: 'เดินเมืองทั้งวัน', media: 'bangkokNight', to: '/products?activity=walking', products: ['city-slip-on', 'iconic-cozy'] },
      ],
    },
  },
  { id: 'showcase', type: 'Showcase', label: 'Interactive product showcase', enabled: true, props: { title: 'PICK YOUR POWER', products: ['iconic', 'bold-strap', 'tofu', 'city-slip-on', 'twist'] } },
]
