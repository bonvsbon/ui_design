import type { Product, SortKey } from '~/types'
import { collections, genderLabels, typeLabels } from '~/data/products'
import { lifestyles } from '~/data/lifestyles'

/** Colour families for filtering (derived from variant hex, so new colourways need no extra data). */
export const colorFamilies = [
  { id: 'black', label: 'Black', hex: '#1B1B1B' },
  { id: 'white', label: 'White', hex: '#F2F0EB' },
  { id: 'grey', label: 'Grey', hex: '#8E9093' },
  { id: 'blue', label: 'Blue', hex: '#1F5FAF' },
  { id: 'green', label: 'Green', hex: '#4C5A36' },
  { id: 'yellow', label: 'Yellow', hex: '#F2C230' },
  { id: 'red', label: 'Red', hex: '#C9271F' },
  { id: 'brown', label: 'Brown', hex: '#5A3A28' },
  { id: 'purple', label: 'Purple', hex: '#A08BD0' },
]
function familyOf(hex: string): string {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 510, d = max - min
  if (d < 28) return l < 0.3 ? 'black' : l > 0.8 ? 'white' : 'grey'
  let h = 0
  if (max === r) h = ((g - b) / d) % 6
  else if (max === g) h = (b - r) / d + 2
  else h = (r - g) / d + 4
  h = (h * 60 + 360) % 360
  if (h < 18 || h >= 340) return l < 0.3 ? 'brown' : 'red'
  if (h < 45) return 'brown'
  if (h < 70) return 'yellow'
  if (h < 170) return 'green'
  if (h < 250) return l < 0.2 ? 'black' : 'blue'
  return 'purple'
}
export const productFamilies = (p: Product) => [...new Set(p.colors.map((c) => familyOf(c.hex)))]

export const priceRanges = [
  { id: 'u300', label: 'ต่ำกว่า ฿300', min: 0, max: 299 },
  { id: '300-500', label: '฿300 – ฿500', min: 300, max: 500 },
  { id: 'o500', label: 'มากกว่า ฿500', min: 501, max: Infinity },
]

export const sortOptions: { id: SortKey; label: string }[] = [
  { id: 'featured', label: 'แนะนำ' },
  { id: 'best', label: 'ขายดี' },
  { id: 'newest', label: 'มาใหม่' },
  { id: 'price-asc', label: 'ราคา: ต่ำ → สูง' },
  { id: 'price-desc', label: 'ราคา: สูง → ต่ำ' },
]

const list = (v: unknown) => (typeof v === 'string' && v ? v.split(',') : [])
const one = (v: unknown) => (typeof v === 'string' && v ? v : undefined)

/**
 * URL-driven product filters: every filter lives in the query string, so results are shareable,
 * back-button friendly and SSR-rendered.
 */
export function useProductFilters() {
  const route = useRoute()
  const router = useRouter()
  const all = useProducts()

  const f = computed(() => ({
    gender: one(route.query.gender),
    type: one(route.query.type),
    badge: one(route.query.badge),
    lifestyle: one(route.query.lifestyle),
    collection: one(route.query.collection),
    kids: one(route.query.kids),
    style: one(route.query.style),
    q: one(route.query.q),
    price: one(route.query.price),
    gbold: route.query.gbold === '1',
    sizes: list(route.query.size).map(Number),
    colors: list(route.query.color),
    sort: (one(route.query.sort) ?? 'featured') as SortKey,
  }))

  const results = computed(() => {
    const v = f.value
    const range = priceRanges.find((r) => r.id === v.price)
    const words = (v.q ?? '').toLowerCase().replace(/gambol/g, '').split(/\s+/).filter(Boolean)
    const out = all.value.filter((p) =>
      (!v.gender || p.genders.includes(v.gender as Product['genders'][number]))
      && (v.gender === 'kids' || v.gender || v.q || !p.genders.every((g) => g === 'kids'))
      && (!v.type || p.type === v.type)
      && (!v.badge || p.badges.includes(v.badge as Product['badges'][number]))
      && (!v.lifestyle || p.lifestyles.includes(v.lifestyle as Product['lifestyles'][number]))
      && (!v.collection || p.collections.includes(v.collection))
      && (!v.kids || p.kidsGroup?.includes(v.kids as 'boys' | 'girls'))
      && (!v.style || p.styleLine === v.style)
      && (!v.gbold || p.gbold)
      && (!range || (p.price >= range.min && p.price <= range.max))
      && (!v.sizes.length || v.sizes.some((s) => p.sizes.includes(s) && !p.soldOutSizes?.includes(s)))
      && (!v.colors.length || productFamilies(p).some((c) => v.colors.includes(c)))
      && (!words.length || words.every((w) => `${p.name} ${p.code} ${p.subtitle} ${p.type} ${p.styleLine} ${p.tagline}`.toLowerCase().includes(w))),
    )
    return sortProducts(out, v.sort)
  })

  /** Set (or clear with undefined/empty) query params, keeping the rest */
  function set(patch: Record<string, string | number | undefined | null | (string | number)[]>) {
    const q: Record<string, string> = {}
    for (const [k, val] of Object.entries(route.query)) if (typeof val === 'string') q[k] = val
    for (const [k, val] of Object.entries(patch)) {
      const s = Array.isArray(val) ? val.join(',') : val
      if (s === undefined || s === null || s === '') delete q[k]
      else q[k] = String(s)
    }
    router.replace({ query: q })
  }
  function toggleIn(key: 'size' | 'color', value: string | number) {
    const cur = key === 'size' ? f.value.sizes.map(String) : f.value.colors
    const v = String(value)
    set({ [key]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] })
  }

  const heading = computed(() => {
    const v = f.value
    if (v.q) return { title: `Results for “${v.q}”`, sub: 'ผลการค้นหา' }
    const col = collections.find((c) => c.slug === v.collection)
    if (col) return { title: col.name, sub: col.tagline }
    const life = lifestyles.find((l) => l.slug === v.lifestyle)
    if (life) return { title: `${life.title} Edit`, sub: life.tagline }
    if (v.badge === 'new') return { title: v.gender ? `New for ${genderLabels[v.gender]?.en.replace("'s", '')}` : 'New Arrivals', sub: 'รุ่นใหม่ล่าสุดประจำฤดูกาล' }
    if (v.badge === 'best-seller') return { title: 'Best Sellers', sub: 'คู่ที่ทุกคนเลือกในทุกวัน' }
    if (v.badge === 'online-exclusive') return { title: 'Online Exclusive', sub: 'รุ่นที่มีเฉพาะบนเว็บไซต์' }
    if (v.gender === 'kids') return { title: "Kids' Footwear", sub: 'เบา ปลอดภัย ใส่ถอดเองได้' }
    if (v.gender) return { title: `${genderLabels[v.gender]?.en ?? ''} Footwear`, sub: `รองเท้า${genderLabels[v.gender]?.th ?? ''} สำหรับทุกวัน` }
    if (v.type) return { title: typeLabels[v.type]?.en ?? 'Footwear', sub: typeLabels[v.type]?.th ?? '' }
    return { title: 'All Footwear', sub: 'รองเท้า GAMBOL ทุกรุ่น พื้น GBOLD™' }
  })

  const activeCount = computed(() => {
    const v = f.value
    return [v.price, v.gbold || undefined, v.collection, v.style].filter(Boolean).length + v.sizes.length + v.colors.length
  })

  return { f, results, set, toggleIn, heading, activeCount, all }
}
