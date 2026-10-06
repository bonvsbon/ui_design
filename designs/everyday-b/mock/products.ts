import sourceColors from '~/data/product-colors.json'
import type { Product, ProductColor, FootwearType, Gender } from '~/types'
const image = (name: string) => `/images/${name}.webp`
const color = (name: string, value: string, file: string): ProductColor => ({
  name,
  value,
  image: image(file),
})
const sets: Record<number, ProductColor[]> = {
  1: [
    color('White', 'oklch(0.94 0 0)', 'shoe-1'),
    color('Black', 'oklch(0.22 0 0)', 'slide-color-2'),
    color('Blue', 'oklch(0.55 0.14 245)', 'slide-color-3'),
  ],
  2: [
    color('Brown', 'oklch(0.43 0.06 55)', 'shoe-2'),
    color('Black', 'oklch(0.22 0 0)', 'variant-2-0'),
    color('Navy', 'oklch(0.35 0.06 255)', 'variant-2-1'),
  ],
  3: [
    color('Black', 'oklch(0.22 0 0)', 'shoe-3'),
    color('Tan', 'oklch(0.69 0.09 65)', 'variant-3-1'),
    color('Blue', 'oklch(0.45 0.1 250)', 'variant-3-2'),
  ],
  4: [
    color('Black / White', 'oklch(0.25 0 0)', 'shoe-4'),
    color('Red', 'oklch(0.5 0.18 25)', 'variant-4-1'),
  ],
  5: [
    color('Navy / Orange', 'oklch(0.34 0.08 258)', 'shoe-5'),
    color('Black', 'oklch(0.22 0 0)', 'variant-5-0'),
  ],
  6: [
    color('Yellow', 'oklch(0.85 0.17 95)', 'shoe-6'),
    color('Black', 'oklch(0.22 0 0)', 'variant-6-0'),
  ],
  7: [
    color('Blue', 'oklch(0.49 0.2 262)', 'shoe-7'),
    color('Pink', 'oklch(0.72 0.12 10)', 'variant-7-1'),
  ],
  8: [
    color('Gray', 'oklch(0.6 0 0)', 'shoe-8'),
    color('Navy', 'oklch(0.35 0.07 255)', 'variant-8-1'),
  ],
}
for (const [key, colors] of Object.entries(sourceColors)) {
  if (Number(key) > 0 && colors.length)
    sets[Number(key) + 1] = colors.map((c) => ({ ...c, image: c.image.replace('.png', '.webp') }))
}
function make(
  id: string,
  name: string,
  code: string,
  index: number,
  type: FootwearType,
  gender: Gender[],
  price: number,
  collection: string,
  lifestyles: string[],
  badge?: string
): Product {
  return {
    id,
    name,
    code,
    type,
    gender,
    price,
    collection,
    lifestyles,
    badge,
    image: image(`shoe-${index}`),
    alternate: image(`shoe-${index}-alt`),
    colors: sets[index]!,
    sizes: gender.includes('Kids')
      ? [28, 29, 30, 31, 32, 33, 34, 35]
      : gender.includes('Men')
        ? [38, 39, 40, 41, 42, 43, 44, 45]
        : [35, 36, 37, 38, 39, 40, 41],
    unavailableSizes: gender.includes('Kids') ? [29] : [45],
    technology: 'GBOLD',
    description:
      'A softer way to get through your day. Easy to slip on, light on your feet, and made for the places you love. เบา นุ่ม สบาย พร้อมไปกับทุกวันของคุณ',
  }
}
export const products: Product[] = [
  make(
    'ezy-everyday',
    'EZY Everyday Slide',
    'GM43106',
    3,
    'Slides',
    ['Men', 'Women'],
    299,
    'Everyday Comfort',
    ['Everyday', 'City Walk', 'Relax'],
    'BEST SELLER'
  ),
  make(
    'ezy-cloud',
    'EZY Cloud Slide',
    'GW43108',
    1,
    'Slides',
    ['Women', 'Men'],
    329,
    'Everyday Comfort',
    ['Everyday', 'Travel', 'Relax'],
    'NEW'
  ),
  make(
    'zah-weekender',
    'ZAH Weekender',
    'GM11378',
    5,
    'Flip Flops',
    ['Men'],
    279,
    'Summer Escape',
    ['Weekend', 'Travel', 'Outdoor'],
    'BEST SELLER'
  ),
  make(
    'ezy-classic',
    'EZY Classic Slide',
    'GM43109',
    2,
    'Slides',
    ['Men', 'Women'],
    349,
    'City Ease',
    ['Everyday', 'City Walk'],
    'ONLINE EXCLUSIVE'
  ),
  make(
    'zaap-energy',
    'ZAAP Energy',
    'GM11376',
    4,
    'Flip Flops',
    ['Men'],
    299,
    'City Ease',
    ['City Walk', 'Everyday', 'Weekend'],
    'NEW'
  ),
  make(
    'zeek-sunshine',
    'ZEEK Sunshine',
    'GW11316',
    6,
    'Flip Flops',
    ['Women'],
    259,
    'Summer Escape',
    ['Travel', 'Outdoor', 'Weekend'],
    'NEW'
  ),
  make(
    'ezy-soft-step',
    'EZY Soft Step',
    'GW11267',
    8,
    'Flip Flops',
    ['Women', 'Men'],
    299,
    'Everyday Comfort',
    ['Everyday', 'Relax'],
    'BEST SELLER'
  ),
  make(
    'kids-blue-day',
    'Little Blue Day',
    'GK11267',
    7,
    'Flip Flops',
    ['Kids'],
    229,
    'Little Adventures',
    ['Everyday', 'Weekend'],
    'NEW'
  ),
  make(
    'kids-playtime',
    'Little Playtime',
    'GK11316',
    6,
    'Flip Flops',
    ['Kids'],
    239,
    'Little Adventures',
    ['Travel', 'Outdoor'],
    'NEW'
  ),
  make(
    'kids-easy',
    'Little Easy Steps',
    'GK11378',
    5,
    'Flip Flops',
    ['Kids'],
    249,
    'Little Adventures',
    ['Everyday', 'Relax']
  ),
  {
    ...make(
      'city-lite-sneaker',
      'City Lite Sneaker',
      'GB86174',
      1,
      'Sneakers',
      ['Men', 'Women'],
      899,
      'City Ease',
      ['City Walk', 'Travel', 'Everyday'],
      'NEW'
    ),
    image: image('gambol-sneaker'),
    alternate: image('gambol-sneaker-alt'),
    colors: [color('Burgundy', 'oklch(0.38 0.13 20)', 'gambol-sneaker')],
    technology: 'Lightweight',
  },
  make(
    'weekend-soft',
    'Weekend Soft',
    'GW11268',
    8,
    'Flip Flops',
    ['Women'],
    289,
    'Summer Escape',
    ['Weekend', 'Relax', 'Travel']
  ),
]
products[7]!.kidsGroup = 'Both'
products[8]!.kidsGroup = 'Girls'
products[9]!.kidsGroup = 'Boys'
