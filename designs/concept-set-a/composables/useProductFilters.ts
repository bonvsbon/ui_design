import { products, categoryLabels, genderLabels, technologyLabels, collections, activityLabels } from '~/data/catalog'
import type { Product } from '~/types'

export type SortKey = 'recommended' | 'new' | 'best' | 'price-asc' | 'price-desc'
export const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'recommended', label: 'แนะนำ' },
  { value: 'new', label: 'มาใหม่' },
  { value: 'best', label: 'ขายดี' },
  { value: 'price-asc', label: 'ราคา: ต่ำ → สูง' },
  { value: 'price-desc', label: 'ราคา: สูง → ต่ำ' },
]

const MULTI = ['gender', 'category', 'size', 'color', 'tech', 'collection', 'activity', 'badge'] as const
type MultiKey = (typeof MULTI)[number]

const colorFamilies: Record<string, string[]> = {
  ดำ: ['black', 'midnight', 'carbon', 'charcoal'],
  'เขียว': ['olive', 'moss', 'forest', 'mint'],
  'น้ำเงิน': ['navy', 'sky'],
  'ม่วง/ชมพู': ['lavender', 'rose', 'coral', 'wine'],
  'น้ำตาล/เบจ': ['khaki', 'cocoa', 'clay'],
}
export const colorFamilySwatch: Record<string, string> = {
  ดำ: '#1d1d1f', 'เขียว': '#55663f', 'น้ำเงิน': '#2b3a5c', 'ม่วง/ชมพู': '#b07ab8', 'น้ำตาล/เบจ': '#9a7a5a',
}

function toArray(v: unknown): string[] {
  if (v == null || v === '') return []
  return (Array.isArray(v) ? v : String(v).split(',')).map(String).filter(Boolean)
}

/**
 * URL-synced filtering. Filters live in the query string so results are shareable
 * and the back button behaves; every concept renders its own UI on top of this.
 */
export function useProductFilters() {
  const route = useRoute()
  const router = useRouter()

  const selected = computed(() => {
    const out = {} as Record<MultiKey, string[]>
    for (const k of MULTI) out[k] = toArray(route.query[k])
    return out
  })
  const priceMax = computed(() => (route.query.price ? Number(route.query.price) : null))
  const sort = computed<SortKey>(() => (route.query.sort as SortKey) || 'recommended')
  const q = computed(() => String(route.query.q || ''))

  function match(p: Product, skip?: string) {
    const s = selected.value
    if (skip !== 'gender' && s.gender.length && !s.gender.some((g) => p.genders.includes(g as any))) return false
    if (skip !== 'category' && s.category.length && !s.category.includes(p.category)) return false
    if (skip !== 'size' && s.size.length && !s.size.some((z) => p.sizes.includes(Number(z)) && !p.soldOutSizes?.includes(Number(z)))) return false
    if (skip !== 'color' && s.color.length && !s.color.some((fam) => p.colors.some((c) => colorFamilies[fam]?.includes(c.id)))) return false
    if (skip !== 'tech' && s.tech.length && !s.tech.some((t) => p.technologies.includes(t))) return false
    if (skip !== 'collection' && s.collection.length && !s.collection.includes(p.collection)) return false
    if (skip !== 'activity' && s.activity.length && !s.activity.some((a) => p.activities.includes(a as any))) return false
    if (skip !== 'badge' && s.badge.length && !s.badge.some((b) => p.badges.includes(b as any))) return false
    if (skip !== 'price' && priceMax.value && p.price > priceMax.value) return false
    if (q.value) {
      const hay = `${p.name} ${p.subtitle} ${p.category} ${categoryLabels[p.category]} ${p.shortDescription}`.toLowerCase()
      if (!q.value.toLowerCase().split(/\s+/).every((t) => hay.includes(normalizeQuery(t)))) return false
    }
    return true
  }

  const wishlist = useWishlist()
  const wishlistOnly = computed(() => route.query.wishlist === '1')

  const results = computed(() => {
    const list = products.filter((p) => match(p) && (!wishlistOnly.value || wishlist.has(p.slug)))
    switch (sort.value) {
      case 'new': return list.sort((a, b) => b.releasedAt.localeCompare(a.releasedAt))
      case 'best': return list.sort((a, b) => a.salesRank - b.salesRank)
      case 'price-asc': return list.sort((a, b) => a.price - b.price)
      case 'price-desc': return list.sort((a, b) => b.price - a.price)
      default: return list.sort((a, b) => a.salesRank * 0.6 - b.salesRank * 0.6 + (b.badges.includes('new') ? 1 : 0) - (a.badges.includes('new') ? 1 : 0))
    }
  })

  /** Facet options with live counts (count ignores the facet's own selection, so options never vanish) */
  const facets = computed(() => {
    const count = (key: string, test: (p: Product) => boolean) => products.filter((p) => match(p, key) && test(p)).length
    const allSizes = [...new Set(products.flatMap((p) => p.sizes))].sort((a, b) => a - b)
    return [
      { key: 'gender' as const, label: 'เพศ', type: 'list' as const, options: (['men', 'women', 'kids'] as const).map((g) => ({ value: g, label: genderLabels[g], count: count('gender', (p) => p.genders.includes(g)) })) },
      { key: 'category' as const, label: 'ประเภท', type: 'list' as const, options: Object.entries(categoryLabels).map(([v, l]) => ({ value: v, label: l, count: count('category', (p) => p.category === v) })) },
      { key: 'activity' as const, label: 'ใส่ไปไหน', type: 'list' as const, options: Object.entries(activityLabels).map(([v, l]) => ({ value: v, label: l.th, count: count('activity', (p) => p.activities.includes(v as any)) })) },
      { key: 'size' as const, label: 'ไซซ์ (EU)', type: 'size' as const, options: allSizes.map((z) => ({ value: String(z), label: String(z), count: count('size', (p) => p.sizes.includes(z) && !p.soldOutSizes?.includes(z)) })) },
      { key: 'color' as const, label: 'สี', type: 'color' as const, options: Object.keys(colorFamilies).map((fam) => ({ value: fam, label: fam, swatch: colorFamilySwatch[fam], count: count('color', (p) => p.colors.some((c) => colorFamilies[fam]!.includes(c.id))) })) },
      { key: 'tech' as const, label: 'เทคโนโลยี', type: 'list' as const, options: Object.entries(technologyLabels).map(([v, l]) => ({ value: v, label: l, count: count('tech', (p) => p.technologies.includes(v)) })) },
      { key: 'collection' as const, label: 'คอลเลกชัน', type: 'list' as const, options: collections.map((c) => ({ value: c.slug, label: c.name, count: count('collection', (p) => p.collection === c.slug) })) },
    ]
  })

  const priceBounds = { min: 0, max: Math.ceil(Math.max(...products.map((p) => p.price)) / 50) * 50 }

  function setQuery(patch: Record<string, string | string[] | null | undefined>) {
    const next: Record<string, any> = { ...route.query, ...patch }
    for (const k of Object.keys(next)) {
      const v = next[k]
      if (v == null || v === '' || (Array.isArray(v) && !v.length)) delete next[k]
      else if (Array.isArray(v)) next[k] = v.join(',')
    }
    router.replace({ query: next })
  }
  function toggle(key: MultiKey, value: string) {
    const cur = selected.value[key]
    setQuery({ [key]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] })
  }
  function isOn(key: MultiKey, value: string) {
    return selected.value[key].includes(value)
  }
  function setPrice(max: number | null) {
    setQuery({ price: max && max < priceBounds.max ? String(max) : null })
  }
  function setSort(v: SortKey) {
    setQuery({ sort: v === 'recommended' ? null : v })
  }
  function clearAll() {
    router.replace({ query: {} })
  }

  const activeChips = computed(() => {
    const chips: { key: string; value: string; label: string }[] = []
    for (const f of facets.value) for (const o of f.options) if (selected.value[f.key].includes(o.value)) chips.push({ key: f.key, value: o.value, label: o.label })
    for (const b of selected.value.badge) chips.push({ key: 'badge', value: b, label: b.toUpperCase().replace('-', ' ') })
    if (priceMax.value) chips.push({ key: 'price', value: '', label: `ไม่เกิน ${formatPrice(priceMax.value)}` })
    if (q.value) chips.push({ key: 'q', value: '', label: `“${q.value}”` })
    return chips
  })
  function removeChip(c: { key: string; value: string }) {
    if (c.key === 'price' || c.key === 'q') setQuery({ [c.key]: null })
    else toggle(c.key as MultiKey, c.value)
  }

  const heading = computed(() => {
    const s = selected.value
    if (wishlistOnly.value) return { en: 'Wishlist', th: 'รายการโปรด' }
    if (s.badge.includes('new')) return { en: 'New Arrivals', th: 'สินค้าใหม่' }
    if (s.badge.includes('best-seller')) return { en: 'Best Sellers', th: 'ขายดี' }
    if (s.gender.length === 1) return { en: s.gender[0] === 'men' ? 'Men' : s.gender[0] === 'women' ? 'Women' : 'Kids', th: genderLabels[s.gender[0]!]! }
    if (s.category.length === 1) return { en: s.category[0]!.replace('-', ' '), th: categoryLabels[s.category[0]!]! }
    if (q.value) return { en: `Search`, th: `ผลการค้นหา “${q.value}”` }
    return { en: 'All Footwear', th: 'รองเท้าทั้งหมด' }
  })

  return { results, wishlistOnly, facets, selected, priceMax, priceBounds, sort, q, toggle, isOn, setPrice, setSort, setQuery, clearAll, activeChips, removeChip, heading }
}

const synonyms: Record<string, string> = {
  slide: 'slides', สไลด์: 'slides', แตะสวม: 'slides', หูหนีบ: 'flip', flipflop: 'flip', 'flip-flop': 'flip', sneaker: 'sneakers', ผ้าใบ: 'sneakers', สลิปออน: 'slip-on',
}
export function normalizeQuery(t: string) {
  const k = t.toLowerCase().trim()
  return synonyms[k] ? synonyms[k]!.replace(/s$/, '') : k
}
