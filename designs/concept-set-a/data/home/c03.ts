import type { HomeSection } from '~/types'

/** CMS: Homepage — Concept 03 (Lifestyle Storytelling). */
export const homeC03: HomeSection[] = [
  {
    id: 'cover', type: 'Cover', label: 'Magazine cover hero', enabled: true,
    props: {
      issue: 'ฉบับที่ 07 · ฤดูฝน 2026',
      title: 'Every Step Has a Story',
      titleTh: 'ทุกก้าวมีเรื่องเล่า',
      intro: 'เรื่องเล็ก ๆ ของคนที่เดินทั้งวัน — จากรถไฟฟ้าตอนเช้า ถึงทะเลวันหยุด และรองเท้าที่อยู่กับพวกเขาทุกก้าว',
      cta: { label: 'ช้อปตามโมเมนต์', to: '#moments' },
      secondary: { label: 'อ่านเรื่องเด่น', to: '#stories' },
      collage: [
        { media: 'crosswalk', caption: '07:40 · อโศก' },
        { media: 'pier', caption: 'เสาร์ · เกาะกูด' },
        { media: 'familyPark', caption: 'อาทิตย์ · สวนเบญจกิติ' },
      ],
      sticker: 'tofu',
    },
  },
  {
    id: 'moments', type: 'Moments', label: 'Shop by moment', enabled: true,
    props: {
      title: 'ใส่ไปไหนดี?',
      subtitle: 'เลือกโมเมนต์ของคุณ แล้วเราจะแนะนำคู่ที่ใช่',
      moments: [
        { key: 'everyday', en: 'Everyday', th: 'ทุกวัน', media: 'crosswalk', story: 'ตื่นสาย วิ่งขึ้นรถไฟฟ้า แวะร้านกาแฟ คู่ที่ใส่ง่ายที่สุดคือคู่ที่คุณจะหยิบทุกวัน', pins: [{ product: 'tofu', x: 28, y: 22 }, { product: 'iconic', x: 62, y: 60 }] },
        { key: 'work', en: 'Work', th: 'ทำงาน', media: 'officeHall', story: 'ประชุมเช้า เดินข้ามตึกบ่าย เลิกงานไปต่อ — ลุคเรียบร้อยที่ไม่ต้องทรมานเท้า', pins: [{ product: 'twist', x: 40, y: 78 }, { product: 'city-slip-on', x: 70, y: 82 }] },
        { key: 'travel', en: 'Travel', th: 'เดินทาง', media: 'travelLake', story: 'กระเป๋าใบเดียว รองเท้าคู่เดียว พับเก็บง่าย แห้งไว เดินได้ทั้งเมืองใหม่', pins: [{ product: 'cozy-travel', x: 50, y: 85 }] },
        { key: 'weekend', en: 'Weekend', th: 'วันหยุด', media: 'pier', story: 'ไม่มีนาฬิกาปลุก ไม่มีแผน มีแค่ทะเล ลม และรองเท้าแตะที่ไม่ต้องคิด', pins: [{ product: 'iconic', x: 40, y: 82 }, { product: 'bold-strap', x: 66, y: 78 }] },
        { key: 'outdoor', en: 'Outdoor', th: 'กลางแจ้ง', media: 'hike', story: 'ทางหิน ลำธาร และแคมป์ไฟ — ต้องการพื้นที่ยึดเกาะดีและสายที่ปรับได้', pins: [{ product: 'bold-trail', x: 58, y: 80 }] },
        { key: 'family', en: 'Family', th: 'ครอบครัว', media: 'familyPark', story: 'วันอาทิตย์ของทั้งบ้าน คู่เล็กกับคู่ใหญ่ที่นุ่มเหมือนกัน', pins: [{ product: 'iconic-kids', x: 62, y: 84 }, { product: 'tofu', x: 52, y: 82 }] },
      ],
    },
  },
  {
    id: 'feature', type: 'FeatureStory', label: 'Featured story', enabled: true,
    props: {
      kicker: 'เรื่องเด่นประจำฉบับ',
      title: 'เดินกรุงเทพฯ 10,000 ก้าว กับรองเท้าคู่เดียว',
      byline: 'เรื่อง: ปาณิสรา · ภาพ: ทีม GAMBOL Journal',
      media: 'bangkokSoi',
      body: 'เราเริ่มต้นที่ตลาดน้อยตอนเจ็ดโมงเช้า ข้ามสะพานไปฝั่งธน แวะกินข้าวหมูแดงร้านเดิม แล้วนั่งเรือข้ามฟากกลับมาเดินต่อที่เยาวราช ถึงค่ำนาฬิกานับก้าวขึ้นเลข 10,482 และสิ่งเดียวที่ไม่ต้องเปลี่ยนเลยทั้งวันคือรองเท้า',
      quote: '“ไม่ได้รู้สึกว่าใส่รองเท้าอยู่ จนกระทั่งถอดมันออกตอนถึงบ้าน”',
      products: ['city-slip-on', 'iconic-cozy'],
    },
  },
  { id: 'tech', type: 'GentleTech', label: 'Why it feels soft (technology)', enabled: true, props: { title: 'ทำไมถึงนุ่มแบบนี้?', subtitle: 'G-BOLD อธิบายง่าย ๆ ใน 4 ข้อ' } },
  { id: 'collections', type: 'Collections', label: 'Collections', enabled: true, props: { title: 'คอลเลกชันประจำฤดู' } },
  { id: 'community', type: 'Community', label: 'Customer stories', enabled: true, props: { title: 'เรื่องเล่าจากผู้ใส่จริง' } },
  { id: 'journal', type: 'Journal', label: 'Journal / articles', enabled: true, props: { title: 'GAMBOL Journal' } },
  { id: 'visit', type: 'VisitUs', label: 'Store locator + newsletter', enabled: true, props: { title: 'มาลองที่ร้านใกล้คุณ' } },
]
