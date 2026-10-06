import type { LifestyleEntry } from '~/types'
import { media } from './media'

/** Discovery by lifestyle (CMS: "Lifestyles"). Each card links to /products?lifestyle=<slug>. */
export const lifestyles: LifestyleEntry[] = [
  { slug: 'everyday', title: 'Everyday', tagline: 'หยิบใส่ได้ทุกวัน ไม่ต้องคิด', media: media.crosswalk },
  { slug: 'travel', title: 'Travel', tagline: 'เบา พกง่าย พร้อมออกเดินทาง', media: media.travelLake },
  { slug: 'city-walk', title: 'City Walk', tagline: 'เบา สบาย พร้อมเดินทั้งวัน', media: media.bangkokSoi },
  { slug: 'weekend', title: 'Weekend', tagline: 'วันหยุดที่ไม่ต้องวางแผน', media: media.friends },
  { slug: 'outdoor', title: 'Outdoor', tagline: 'ทนทาน กันลื่น ลุยได้', media: media.gOutdoorWoman },
  { slug: 'relax', title: 'Relax', tagline: 'ช้าลงนิด ให้เท้าได้พัก', media: media.pier },
]
