import { portableMedia } from '~/composables/usePortable'
import type { MediaAsset } from '~/types'

/**
 * Lifestyle media library (CMS: "Media").
 * Temporary photography from Unsplash for the prototype — swap `src` for
 * brand-owned shoots without touching any component.
 */
export const media: Record<string, MediaAsset> = {
  crosswalk: { id: 'crosswalk', src: '1562083426-793688312265', alt: 'คนเดินข้ามทางม้าลายในเมือง', credit: 'Unsplash', focal: '50% 20%' },
  shadowWalk: { id: 'shadowWalk', src: '1758539324961-2febd04bc30d', alt: 'เงาคนเดินบนทางเท้ายามแดดจัด', credit: 'Unsplash', focal: '50% 60%' },
  bangkokNight: { id: 'bangkokNight', src: '1656299435456-41f88298b11c', alt: 'ถนนเยาวราชยามค่ำคืนกับป้ายไฟและรถตุ๊กตุ๊ก', credit: 'Unsplash', focal: '50% 50%' },
  bangkokSoi: { id: 'bangkokSoi', src: '1698566550411-e62234da308b', alt: 'ซอยในกรุงเทพฯ ที่มีร้านค้าและผู้คนเดินผ่าน', credit: 'Unsplash', focal: '50% 60%' },
  beachFlipflops: { id: 'beachFlipflops', src: '1747493159463-09ccf7c0e7c4', alt: 'รองเท้าแตะวางบนหาดทรายริมทะเล', credit: 'Unsplash', focal: '50% 80%' },
  pier: { id: 'pier', src: '1569397467199-35627caed0b4', alt: 'นั่งห้อยขาบนท่าเรือไม้ใส่รองเท้าแตะริมทะเล', credit: 'Unsplash', focal: '50% 70%' },
  legsFlipflop: { id: 'legsFlipflop', src: '1569397693026-b29fe469c0fb', alt: 'ผู้หญิงใส่รองเท้าแตะนั่งบนกำแพงหิน', credit: 'Unsplash', focal: '50% 80%' },
  travelLake: { id: 'travelLake', src: '1527631615371-98cbbff5125a', alt: 'นักเดินทางสะพายเป้มองทะเลสาบและภูเขา', credit: 'Unsplash', focal: '50% 40%' },
  travelRoad: { id: 'travelRoad', src: '1480859786001-3f3bfdf20f2c', alt: 'ชายสะพายเป้เดินบนถนนยามเช้า', credit: 'Unsplash', focal: '50% 40%' },
  familyPark: { id: 'familyPark', src: '1768569750194-eee0892bc7d6', alt: 'ครอบครัวเดินเล่นในสวนสาธารณะ', credit: 'Unsplash', focal: '55% 70%' },
  officeHall: { id: 'officeHall', src: '1608403315268-764ed28bcb28', alt: 'ผู้คนเดินในโถงอาคารสำนักงานสีขาว', credit: 'Unsplash', focal: '50% 70%' },
  commute: { id: 'commute', src: '1778442105822-e20953fb0904', alt: 'คนสะพายเป้เดินทางไปทำงานในเมือง', credit: 'Unsplash', focal: '50% 60%' },
  stationRush: { id: 'stationRush', src: '1728207357533-d7a9eb532130', alt: 'ผู้คนเดินลงบันไดสถานีในแสงเย็น', credit: 'Unsplash', focal: '60% 60%' },
  hike: { id: 'hike', src: '1643364384949-97b6a7d08061', alt: 'นักเดินป่าเดินบนสันเขา', credit: 'Unsplash', focal: '50% 70%' },
  kidsRun: { id: 'kidsRun', src: '1784225162452-8ebf19052075', alt: 'เด็กวิ่งเล่นบนสนามหญ้า', credit: 'Unsplash', focal: '50% 40%' },
  kidsSandals: { id: 'kidsSandals', src: '1625563206627-7e713d1ac0a8', alt: 'รองเท้ารัดส้นเด็กวางบนผืนทราย', credit: 'Unsplash', focal: '50% 50%' },
  brickFeet: { id: 'brickFeet', src: '1789334816512-bbc99d21e2c2', alt: 'มองลงมาที่ปลายเท้าบนพื้นอิฐสีส้ม', credit: 'Unsplash', focal: '50% 50%' },
  neonFeet: { id: 'neonFeet', src: '1548781256-248c08c645b5', alt: 'แสงไฟนีออนสะท้อนบนพื้นเปียกข้างรองเท้า', credit: 'Unsplash', focal: '50% 40%' },
}

export function mediaUrl(id: string, width = 1200, height?: number) {
  const asset = media[id]
  if (!asset) return ''
  const embedded = portableMedia(id)
  if (embedded) return embedded
  const h = height ? `&h=${height}` : ''
  return `https://images.unsplash.com/photo-${asset.src}?auto=format&fit=crop&w=${width}${h}&q=70`
}

export function mediaSrcset(id: string, widths = [480, 800, 1200, 1800], ratio?: number) {
  if (portableMedia(id)) return undefined
  return widths
    .map((w) => `${mediaUrl(id, w, ratio ? Math.round(w * ratio) : undefined)} ${w}w`)
    .join(', ')
}
