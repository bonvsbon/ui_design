import type { ConceptId } from '~/types'

export const conceptMeta: Record<ConceptId, { id: ConceptId; base: string; number: string; name: string; short: string }> = {
  c01: { id: 'c01', base: '/concept-01', number: '01', name: 'Modern Minimal / Premium Street', short: 'Premium Street' },
  c02: { id: 'c02', base: '/concept-02', number: '02', name: 'Bold Sport / Energy', short: 'Bold Sport' },
  c03: { id: 'c03', base: '/concept-03', number: '03', name: 'Lifestyle Storytelling', short: 'Every Step' },
  c04: { id: 'c04', base: '/concept-04', number: '04', name: 'Product Discovery / Smart Commerce', short: 'Find Your Pair' },
  c05: { id: 'c05', base: '/concept-05', number: '05', name: 'Future Footwear / Tech Brand', short: 'G-BOLD Lab' },
}

/**
 * Resolves the active concept from the URL so CMS links like "/products?gender=men"
 * can be stored once and rendered inside any concept.
 */
export function useConcept() {
  const route = useRoute()
  const concept = computed(() => {
    const m = route.path.match(/^\/concept-0([1-5])/)
    return conceptMeta[(m ? `c0${m[1]}` : 'c01') as ConceptId]
  })
  function link(to: string) {
    if (!to || to.startsWith('http') || to.startsWith('#')) return to
    return concept.value.base + (to === '/' ? '' : to)
  }
  function productLink(slug: string) {
    return link(`/product/${slug}`)
  }
  return { concept, link, productLink }
}
