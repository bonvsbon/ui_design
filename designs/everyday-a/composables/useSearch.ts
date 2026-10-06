import { collections, typeLabels } from '~/data/products'
import { stories } from '~/data/stories'
import { lifestyles } from '~/data/lifestyles'

const norm = (s: string) => s.toLowerCase().normalize('NFKC')

/** Predictive search across products, collections, categories and stories (client-side, instant). */
export function useSearch(term: Ref<string>) {
  const products = useProducts()

  const categories = [
    { label: 'Men', th: 'ผู้ชาย', to: '/products?gender=men' },
    { label: 'Women', th: 'ผู้หญิง', to: '/products?gender=women' },
    { label: 'Kids', th: 'เด็ก', to: '/products?gender=kids' },
    ...Object.entries(typeLabels).map(([k, v]) => ({ label: v.en, th: v.th, to: `/products?type=${k}` })),
    ...lifestyles.map((l) => ({ label: l.title, th: l.tagline, to: `/products?lifestyle=${l.slug}` })),
  ]

  return computed(() => {
    const q = norm(term.value.trim())
    if (q.length < 1) return null
    const words = q.replace(/gambol/g, '').split(/\s+/).filter(Boolean)
    const match = (hay: string) => words.length === 0 || words.every((w) => norm(hay).includes(w))
    return {
      products: products.value.filter((p) => match(`${p.name} ${p.code} ${p.subtitle} ${p.type} ${p.styleLine} ${p.tagline} ${p.genders.join(' ')}`)).slice(0, 6),
      collections: collections.filter((c) => match(`${c.name} ${c.tagline}`)).slice(0, 4),
      categories: categories.filter((c) => match(`${c.label} ${c.th}`)).slice(0, 6),
      stories: stories.filter((s) => match(`${s.title} ${s.excerpt} ${s.category}`)).slice(0, 3),
    }
  })
}

export const popularSearches = ['Slide', 'GBOLD', 'หูหนีบ', 'Kids', 'Sneakers', 'ZAPP']
