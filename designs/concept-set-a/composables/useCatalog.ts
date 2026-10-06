import { products, categories, collections } from '~/data/catalog'
import type { Product } from '~/types'

export function productImage(p: Pick<Product, 'image'>) {
  return productImageUrl(p.image)
}

export function useCatalog() {
  /** "demo" resolves to the hero product so every concept has a stable /product/demo route */
  function getProduct(slug: string): Product | undefined {
    if (slug === 'demo') return products[0]
    return products.find((p) => p.slug === slug)
  }
  const newArrivals = computed(() => [...products].sort((a, b) => b.releasedAt.localeCompare(a.releasedAt)))
  const bestSellers = computed(() => [...products].sort((a, b) => a.salesRank - b.salesRank))

  function related(p: Product, limit = 4) {
    return products
      .filter((x) => x.id !== p.id)
      .map((x) => ({
        x,
        score: (x.category === p.category ? 3 : 0) + x.activities.filter((a) => p.activities.includes(a)).length + (x.collection === p.collection ? 2 : 0),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((r) => r.x)
  }
  function bySlugs(slugs: string[]) {
    return slugs.map((s) => getProduct(s)).filter(Boolean) as Product[]
  }
  function byActivity(activity: string, limit = 4) {
    return bestSellers.value.filter((p) => p.activities.includes(activity as any)).slice(0, limit)
  }
  return { products, categories, collections, getProduct, newArrivals, bestSellers, related, bySlugs, byActivity }
}
