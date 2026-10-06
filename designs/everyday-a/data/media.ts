import type { Media } from '~/types'

/**
 * Media library (CMS: "Assets").
 * `u:<id>` = Unsplash placeholder lifestyle photography (replace with GAMBOL shoots).
 * `/images/campaign/*` = GAMBOL's own campaign photography.
 * Components never build URLs themselves — see composables/useImage.ts.
 */
export const media = {
  // Lifestyle (placeholder)
  pier: { src: 'u:1569397467199-35627caed0b4', alt: 'คนนั่งห้อยขาบนท่าเรือริมทะเล สวมรองเท้าแตะหูหนีบ', focal: '50% 65%' },
  legsWall: { src: 'u:1569397693026-b29fe469c0fb', alt: 'ผู้หญิงสวมรองเท้าแตะนั่งพักบนกำแพงหินริมหาด', focal: '50% 75%' },
  beachFlip: { src: 'u:1747493159463-09ccf7c0e7c4', alt: 'รองเท้าแตะหูหนีบวางบนผืนทรายริมทะเล', focal: '45% 80%' },
  beachSunset: { src: 'u:1507525428034-b723cf961d3e', alt: 'ชายหาดยามพระอาทิตย์ตกและคลื่นซัดเข้าฝั่ง', focal: '50% 60%' },
  crosswalk: { src: 'u:1562083426-793688312265', alt: 'คนเดินข้ามทางม้าลายในเมืองยามกลางวัน', focal: '50% 25%' },
  shadowWalk: { src: 'u:1758539324961-2febd04bc30d', alt: 'เงาคนเดินบนทางเท้าในแดดจัด', focal: '50% 60%' },
  bangkokSoi: { src: 'u:1698566550411-e62234da308b', alt: 'ซอยในกรุงเทพฯ ที่มีร้านค้าและผู้คนเดินผ่าน', focal: '50% 55%' },
  bangkokNight: { src: 'u:1656299435456-41f88298b11c', alt: 'ถนนเยาวราชยามค่ำคืนกับป้ายไฟและรถตุ๊กตุ๊ก', focal: '50% 50%' },
  travelLake: { src: 'u:1527631615371-98cbbff5125a', alt: 'นักเดินทางสะพายเป้มองทะเลสาบและภูเขา', focal: '50% 40%' },
  travelRoad: { src: 'u:1480859786001-3f3bfdf20f2c', alt: 'ชายสะพายเป้เดินทางบนถนนยามเช้า', focal: '50% 40%' },
  familyPark: { src: 'u:1768569750194-eee0892bc7d6', alt: 'ครอบครัวเดินเล่นในสวนสาธารณะ', focal: '55% 70%' },
  commute: { src: 'u:1778442105822-e20953fb0904', alt: 'คนสะพายเป้เดินทางไปทำงานในเมือง', focal: '50% 60%' },
  hike: { src: 'u:1643364384949-97b6a7d08061', alt: 'นักเดินป่าเดินบนสันเขา', focal: '50% 70%' },
  kidsRun: { src: 'u:1784225162452-8ebf19052075', alt: 'เด็กวิ่งเล่นบนสนามหญ้า', focal: '50% 40%' },
  kidsSandals: { src: 'u:1625563206627-7e713d1ac0a8', alt: 'รองเท้ารัดส้นเด็กวางบนผืนทราย', focal: '50% 50%' },
  kidPaint: { src: 'u:1503454537195-1dcabb73ffb9', alt: 'เด็กหญิงหัวเราะสดใสกลางสวน', focal: '40% 30%' },
  brickFeet: { src: 'u:1789334816512-bbc99d21e2c2', alt: 'มองลงมาที่ปลายเท้าบนพื้นอิฐสีส้ม', focal: '50% 50%' },
  friends: { src: 'u:1511632765486-a01980e01a18', alt: 'กลุ่มเพื่อนกอดคอดูพระอาทิตย์ตกบนเนินเขา', focal: '50% 55%' },
  mountains: { src: 'u:1464822759023-fed622ff2c3b', alt: 'วิวภูเขาและป่าสนใต้ท้องฟ้าสดใส', focal: '50% 50%' },
  denim: { src: 'u:1516257984-b1b4d707412e', alt: 'ชายหนุ่มสวมแจ็กเก็ตยีนส์ยืนในเมือง', focal: '50% 30%' },
  officeHall: { src: 'u:1608403315268-764ed28bcb28', alt: 'ผู้คนเดินในโถงอาคารสีขาว', focal: '50% 70%' },

  // GAMBOL campaign photography
  gPinkMan: { src: '/images/campaign/gambol-1-a.jpg', alt: 'ชายหนุ่มในเสื้อสีชมพูถือโทรศัพท์ในแคมเปญ GAMBOL', focal: '50% 30%' },
  gPinkLegs: { src: '/images/campaign/gambol-1-b.jpg', alt: 'ขาผู้หญิงสวมรองเท้าแตะ GAMBOL นั่งบนเก้าอี้สีชมพู', focal: '50% 60%' },
  gYellowFeet: { src: '/images/campaign/gambol-2-a.jpg', alt: 'เท้าสวมรองเท้าแตะ GAMBOL บนผ้าสีเหลือง', focal: '50% 50%' },
  gHoodie: { src: '/images/campaign/gambol-2-b.jpg', alt: 'หญิงสาวผมบลอนด์สวมฮู้ดดี้สีดำในแคมเปญ GAMBOL', focal: '50% 30%' },
  gOutdoorMan: { src: '/images/campaign/gambol-4-a.jpg', alt: 'ชายนั่งบนพื้นดินสวมรองเท้าแตะรัดส้น GAMBOL กลางแจ้ง', focal: '50% 60%' },
  gOutdoorWoman: { src: '/images/campaign/gambol-4-b.jpg', alt: 'หญิงสาวนั่งบนกิ่งไม้สวมรองเท้า GAMBOL ในป่า', focal: '50% 40%' },
} satisfies Record<string, Media>

export type MediaKey = keyof typeof media
