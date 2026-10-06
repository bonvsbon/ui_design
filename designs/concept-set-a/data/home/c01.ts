import type { HomeSection } from '~/types'

/** CMS: Homepage — Concept 01 (Premium Street). Array order = page order. */
export const homeC01: HomeSection[] = [
  {
    id: 'hero', type: 'HeroCampaign', label: 'Hero campaign', enabled: true,
    props: {
      campaigns: [
        { id: 'walk', media: 'shadowWalk', eyebrow: 'Campaign 2026 / 01', title: ['Walk', 'your line.'], subtitle: 'ทุกเมืองมีเส้นทางของมัน — ICONIC ใหม่ พื้น G-BOLD หนาขึ้น 2 มม. นุ่มขึ้นในทุกก้าว', cta: { label: 'ช้อป ICONIC', to: '/product/iconic' }, secondary: { label: 'ดูคอลเลกชัน', to: '/products?collection=g-bold-originals' }, product: 'iconic' },
        { id: 'city', media: 'bangkokSoi', eyebrow: 'City Walk ’26 / 02', title: ['Ten thousand', 'steps. One pair.'], subtitle: 'คอลเลกชันใหม่สำหรับคนเมืองที่เดินทั้งวัน — สลิปออนพื้น G-BOLD และแตะรัดนิ้วลุคเรียบหรู', cta: { label: 'ช้อป City Walk', to: '/products?collection=city-walk-26' }, secondary: { label: 'สินค้าใหม่', to: '/products?badge=new' }, product: 'city-slip-on' },
        { id: 'weekend', media: 'pier', eyebrow: 'Weekend Club / 03', title: ['Off duty,', 'on point.'], subtitle: 'แตะสวมสายคู่ BOLD STRAP ลดพิเศษ 12% ตลอดเดือนตุลาคม', cta: { label: 'ช้อป BOLD STRAP', to: '/product/bold-strap' }, secondary: { label: 'Weekend Club', to: '/products?collection=weekend-club' }, product: 'bold-strap' },
      ],
    },
  },
  { id: 'categories', type: 'CategoryIndex', label: 'Shop by category', enabled: true, props: { title: 'Shop by category', items: ['men', 'women', 'kids', 'sneakers', 'slides', 'flip-flops'] } },
  { id: 'new', type: 'ProductRail', label: 'New arrivals', enabled: true, props: { eyebrow: 'Just landed', title: 'New Arrivals', source: 'new', link: '/products?badge=new' } },
  { id: 'tech', type: 'TechSpotlight', label: 'Signature technology', enabled: true, props: { product: 'iconic' } },
  { id: 'best', type: 'BestSellers', label: 'Trending / best sellers', enabled: true, props: { title: 'Trending now', subtitle: 'คู่ที่ถูกเลือกมากที่สุดในสัปดาห์นี้', limit: 5 } },
  { id: 'campaign', type: 'LifestyleCampaign', label: 'Lifestyle campaign', enabled: true, props: { media: 'bangkokNight', eyebrow: 'Stories / Bangkok after dark', title: 'The city doesn’t clock out.', body: 'จากเยาวราชถึงทรงวาด คืนวันศุกร์ที่เดินไม่หยุด เราพาสามคนเมืองออกไปเดินกับ CITY SLIP-ON ตลอดคืน', cta: { label: 'อ่านเรื่องราว', to: '#stories' }, products: ['city-slip-on', 'iconic-cozy'] } },
  { id: 'lifestyle', type: 'ShopByLifestyle', label: 'Shop by lifestyle', enabled: true, props: { title: 'Shop by lifestyle', tabs: [{ key: 'work', label: 'City & Work', media: 'officeHall' }, { key: 'weekend', label: 'Weekend', media: 'pier' }, { key: 'travel', label: 'Travel', media: 'travelRoad' }, { key: 'family', label: 'Family', media: 'familyPark' }] } },
  { id: 'stores', type: 'StoreLocator', label: 'Store locator', enabled: true, props: { title: 'Find a store', subtitle: 'ลองไซซ์จริง วัดเท้าฟรี และรับสินค้าที่สาขาภายใน 2 ชั่วโมง' } },
  { id: 'social', type: 'SocialGallery', label: 'Social gallery', enabled: true, props: { handle: '@gambol.th', items: ['brickFeet', 'legsFlipflop', 'crosswalk', 'neonFeet', 'beachFlipflops', 'commute'] } },
]
