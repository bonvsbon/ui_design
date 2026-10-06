import { products, categories, collections, categoryLabels } from '~/data/catalog'
import { articles } from '~/data/content'
import type { Product, Category, Collection, Article } from '~/types'

export interface SearchResults {
  products: Product[]
  categories: Category[]
  collections: Collection[]
  articles: Article[]
  total: number
}

export const popularSearches = ['slide', 'ICONIC', 'แตะหูหนีบ', 'สลิปออน', 'รองเท้าเด็ก', 'G-BOLD']

function score(hay: string, terms: string[]) {
  let s = 0
  for (const t of terms) {
    const i = hay.indexOf(t)
    if (i === -1) return 0
    s += i === 0 ? 3 : 1
  }
  return s
}

/** Predictive search across every content type. Pure & synchronous — swap for an API later. */
export function useSearch(query: Ref<string>) {
  const terms = computed(() =>
    query.value.toLowerCase().trim().split(/\s+/).filter(Boolean).map(normalizeQuery),
  )

  const results = computed<SearchResults>(() => {
    const t = terms.value
    if (!t.length) return { products: [], categories: [], collections: [], articles: [], total: 0 }
    const rank = <T>(list: T[], hay: (x: T) => string, limit: number) =>
      list
        .map((x) => ({ x, s: score(hay(x).toLowerCase(), t) }))
        .filter((r) => r.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, limit)
        .map((r) => r.x)

    const r = {
      products: rank(products, (p) => `${p.name} ${p.category} ${categoryLabels[p.category]} ${p.subtitle} ${p.shortDescription} ${p.technologies.join(' ')}`, 5),
      categories: rank(categories, (c) => `${c.slug} ${c.label} ${c.labelTh} ${c.description}`, 3),
      collections: rank(collections, (c) => `${c.name} ${c.tagline} ${c.description}`, 2),
      articles: rank(articles, (a) => `${a.title} ${a.excerpt} ${a.category}`, 3),
    }
    return { ...r, total: r.products.length + r.categories.length + r.collections.length + r.articles.length }
  })

  /** Wraps matched substrings so the UI can emphasise them */
  function highlight(text: string) {
    const raw = query.value.trim()
    if (!raw) return [{ text, hit: false }]
    const idx = text.toLowerCase().indexOf(raw.toLowerCase())
    if (idx === -1) return [{ text, hit: false }]
    return [
      { text: text.slice(0, idx), hit: false },
      { text: text.slice(idx, idx + raw.length), hit: true },
      { text: text.slice(idx + raw.length), hit: false },
    ]
  }

  return { results, highlight }
}
