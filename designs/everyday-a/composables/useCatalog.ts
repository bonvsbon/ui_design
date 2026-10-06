import type { Product, ProductQuery, ProductSource, SortKey } from '~/types'

/** All products, fetched once per request and shared across components (SSR-safe cache). */
export function useProducts() {
  const { data } = useAsyncData('products', () => useApi().getProducts(), { default: () => [] as Product[] })
  return data
}

export function sortProducts(list: Product[], sort: SortKey = 'featured'): Product[] {
  const out = [...list]
  switch (sort) {
    case 'newest': return out.sort((a, b) => b.releasedAt.localeCompare(a.releasedAt))
    case 'price-asc': return out.sort((a, b) => a.price - b.price)
    case 'price-desc': return out.sort((a, b) => b.price - a.price)
    case 'best': return out.sort((a, b) => a.salesRank - b.salesRank)
    default: return out.sort((a, b) => a.salesRank - b.salesRank)
  }
}

export function queryProducts(list: Product[], q: ProductQuery): Product[] {
  const filtered = list.filter((p) =>
    (!q.gender || p.genders.includes(q.gender))
    && (!q.type || p.type === q.type)
    && (!q.badge || p.badges.includes(q.badge))
    && (!q.lifestyle || p.lifestyles.includes(q.lifestyle))
    && (!q.collection || p.collections.includes(q.collection))
    && (!q.kidsGroup || p.kidsGroup?.includes(q.kidsGroup)),
  )
  // Adult listings shouldn't be flooded with kids' sizes unless asked for
  const scoped = q.gender ? filtered : filtered.filter((p) => !p.genders.every((g) => g === 'kids'))
  return sortProducts(scoped, q.sort)
}

/** Resolve a CMS product reference (hand-picked ids or a query) against the catalog */
export function resolveProducts(list: Product[], source: ProductSource): Product[] {
  if ('ids' in source) return source.ids.map((id) => list.find((p) => p.id === id)).filter((p): p is Product => !!p)
  return queryProducts(list, source.query).slice(0, source.limit ?? 12)
}

export const productImage = (p: Product, colorIndex = 0) => p.colors[colorIndex]?.images[0] ?? p.colors[0].images[0]
export const productAltImage = (p: Product) => {
  const c = p.colors[0]
  return c.images[1] ?? p.colors[1]?.images[0]
}
