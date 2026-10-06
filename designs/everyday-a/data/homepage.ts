import type { HomeSection } from '~/types'
import { media } from './media'

/**
 * Homepage composition (CMS: "Page builder → Home").
 * Order = render order. Toggle `enabled`, reorder, swap media/CTA/products — no code change.
 * Product blocks take either explicit `ids` (hand-picked) or a `query` (auto-merchandised).
 */
export const homepageSections: HomeSection[] = [
  {
    id: 'hero', type: 'hero', enabled: true, autoplayMs: 7000,
    slides: [
      {
        id: 'everyday', eyebrow: 'GAMBOL · Season 2026', title: ['Everyday', 'Feels Better'],
        subtitle: 'ความสบายที่ไปได้กับทุกวัน', theme: 'dark',
        media: { ...media.pier, mobileSrc: media.legsWall.src },
        ctas: [{ label: 'Shop Men', to: '/products?gender=men' }, { label: 'Shop Women', to: '/products?gender=women' }],
      },
      {
        id: 'city', eyebrow: 'City Walk Edit', title: ['Ten Thousand', 'Easy Steps'],
        subtitle: 'จากซอยหน้าบ้าน ถึงสถานีสุดท้าย เบาสบายทุกก้าว', theme: 'dark',
        media: media.bangkokSoi,
        ctas: [{ label: 'Shop City Walk', to: '/products?lifestyle=city-walk' }, { label: 'Shop Sneakers', to: '/products?type=sneakers' }],
      },
      {
        id: 'weekend', eyebrow: 'Summer Escape', title: ['Weekend', 'Starts Here'],
        subtitle: 'รองเท้าที่พร้อมไปกับทุกทริป', theme: 'dark',
        media: media.friends,
        ctas: [{ label: 'Shop the Collection', to: '/products?collection=summer-escape' }, { label: 'Shop Kids', to: '/products?gender=kids' }],
      },
    ],
  },
  {
    id: 'categories', type: 'categories', enabled: true,
    title: 'Find Your Pair', subtitle: 'เลือกคู่ที่ใช่ สำหรับทุกคนในบ้าน',
    items: [
      { label: 'Men', labelTh: 'ผู้ชาย', to: '/products?gender=men', media: media.gOutdoorMan },
      { label: 'Women', labelTh: 'ผู้หญิง', to: '/products?gender=women', media: media.gPinkLegs },
      { label: 'Kids', labelTh: 'เด็ก', to: '/products?gender=kids', media: media.kidPaint },
      { label: 'Sneakers', labelTh: 'สนีกเกอร์', to: '/products?type=sneakers', media: media.crosswalk },
    ],
  },
  {
    id: 'best-sellers', type: 'productCarousel', enabled: true,
    title: 'Best Sellers', subtitle: 'คู่ที่ทุกคนเลือกในทุกวัน',
    cta: { label: 'Shop All Best Sellers', to: '/products?badge=best-seller' },
    products: { query: { sort: 'best' }, limit: 10 },
  },
  {
    id: 'brand-story', type: 'brandStory', enabled: true,
    eyebrow: 'The GAMBOL Way', title: ['Made for', 'Everyday', 'Movement'],
    body: 'เราออกแบบรองเท้าให้คนที่ไม่เคยหยุดเคลื่อนไหว ตั้งแต่เช้าตรู่ที่ตลาด ถึงรถไฟฟ้าขบวนสุดท้าย GAMBOL ผลิตในประเทศไทย ด้วยพื้น GBOLD™ ที่นุ่ม เบา และทน เพื่อให้ทุกก้าวของวันธรรมดา รู้สึกดีกว่าเดิมนิดหนึ่ง',
    cta: { label: 'Discover the Story', to: '/stories/about-gambol' },
    media: media.travelRoad, secondaryMedia: media.gYellowFeet,
    stats: [{ value: 'Made in', label: 'Thailand' }, { value: '4', label: 'GBOLD™ Benefits' }, { value: '300+', label: 'จุดจำหน่ายทั่วไทย' }],
  },
  {
    id: 'lifestyle', type: 'lifestyle', enabled: true,
    title: 'Made for Your Day', subtitle: 'เลือกจากวันของคุณ แล้วเราจะหาคู่ที่ใช่ให้',
    items: ['everyday', 'city-walk', 'travel', 'weekend', 'outdoor', 'relax'],
  },
  {
    id: 'new-men', type: 'genderSpotlight', enabled: true,
    title: 'New for Men', subtitle: 'สไลด์และหูหนีบรุ่นใหม่ สำหรับวันที่เดินไม่หยุด', align: 'image-left',
    media: media.denim, cta: { label: 'Shop New Men', to: '/products?gender=men&badge=new' },
    products: { ids: ['gm43200', 'gm11398', 'gm11399', 'gm60101'] },
  },
  {
    id: 'new-women', type: 'genderSpotlight', enabled: true,
    title: 'New for Women', subtitle: 'สีใหม่ ทรงใหม่ ความนุ่มเดิมที่คุณรัก', align: 'image-right',
    media: media.legsWall, cta: { label: 'Shop New Women', to: '/products?gender=women&badge=new' },
    products: { ids: ['gw42174', 'gw42180', 'gm11397', 'gm11267'] },
  },
  {
    id: 'technology', type: 'technology', enabled: true,
    eyebrow: 'GBOLD Technology™', title: ['The Comfort', 'Behind', 'Every Step'],
    body: 'เทคโนโลยีพื้นรองเท้าเฉพาะของ GAMBOL ที่รวมความสบาย ความนุ่ม ความเบา และความทนทานไว้ในคู่เดียว แตะที่จุดบนพื้นรองเท้าเพื่อดูว่าแต่ละชั้นทำงานอย่างไร',
    cta: { label: 'Explore GBOLD Technology', to: '/technology' },
  },
  {
    id: 'summer-escape', type: 'featuredCollection', enabled: true,
    eyebrow: 'Featured Collection', title: ['Summer', 'Escape'], subtitle: 'รองเท้าที่พร้อมไปกับทุกทริป',
    media: media.beachSunset, cta: { label: 'Shop Summer Escape', to: '/products?collection=summer-escape' },
    products: { ids: ['gm11397', 'gw42174', 'gm43200'] },
  },
  {
    id: 'hero-product', type: 'heroProduct', enabled: true,
    eyebrow: 'GAMBOL Best Seller · No.1', productId: 'gm43111', colorId: 'ocean',
    headline: ['One Slide.', 'Every Day.'],
    body: 'สไลด์ที่ถูกเลือกมากที่สุดของ GAMBOL ใส่ได้ตั้งแต่ตื่นนอนจนถึงมื้อดึก 7 สี ทุกไซซ์ 36–44',
    benefits: [
      { title: 'Lightweight', body: 'เพียง 165 กรัม ต่อข้าง' },
      { title: 'Soft Footbed', body: 'พื้น GBOLD™ นุ่ม คืนตัวไว' },
      { title: 'Everyday Comfort', body: 'ล้างน้ำได้ แห้งไว ใส่ได้ทุกที่' },
    ],
    cta: { label: 'Discover Product', to: '/product/gbold-classic-slide' },
  },
  {
    id: 'kids', type: 'kids', enabled: true,
    title: ['Little Steps', 'Big Adventures'], subtitle: 'เบา ปลอดภัย ใส่ถอดเองได้ สำหรับนักสำรวจตัวน้อย',
    media: media.kidPaint,
    groups: [
      { label: 'Boys', labelTh: 'เด็กผู้ชาย', to: '/products?gender=kids&kids=boys', media: media.kidsRun },
      { label: 'Girls', labelTh: 'เด็กผู้หญิง', to: '/products?gender=kids&kids=girls', media: media.familyPark },
    ],
    products: { query: { gender: 'kids' }, limit: 4 },
  },
  {
    id: 'stories', type: 'stories', enabled: true,
    title: 'GAMBOL Stories', subtitle: 'ไอเดีย แฟชั่น และเรื่องเล่าจากทุกก้าว',
    storySlugs: ['walk-all-day', 'three-easy-looks', 'size-guide', 'weekend-style-guide'],
    cta: { label: 'Read All Stories', to: '/stories' },
  },
  {
    id: 'store-locator', type: 'storeLocator', enabled: true,
    title: ['Find GAMBOL', 'Near You'], body: 'ลองใส่ก่อนตัดสินใจ ที่ห้างสรรพสินค้าและร้านรองเท้ากว่า 300 แห่งทั่วประเทศ',
    media: media.bangkokNight,
  },
  {
    id: 'social', type: 'social', enabled: true,
    title: '#GAMBOLSTYLE', subtitle: 'แท็ก @gambolthailand เพื่อร่วมเป็นส่วนหนึ่งของแกลเลอรี', handle: '@gambolthailand',
    posts: [
      { media: media.legsWall, productId: 'gw42174', caption: 'Seaside' },
      { media: media.gPinkMan, productId: 'gm11267', caption: 'Pink Hour' },
      { media: media.gYellowFeet, productId: 'gm11397', caption: 'Sunny Days' },
      { media: media.gHoodie, productId: 'gm11399', caption: 'Off Duty' },
      { media: media.gOutdoorWoman, productId: 'gm43200', caption: 'Into the Woods' },
      { media: media.shadowWalk, productId: 'gm43110', caption: 'City Shadows' },
    ],
  },
]
