import { products } from '~/data/catalog'
import type { Benefit, Product } from '~/types'

export type FinderWho = 'men' | 'women' | 'kids'
export type FinderNeed = 'everyday' | 'walking' | 'travel' | 'casual' | 'outdoor'
export type FinderMatter = 'soft' | 'light' | 'durable' | 'supportive'

const matterToBenefit: Record<FinderMatter, Benefit> = { soft: 'soft', light: 'light', durable: 'durable', supportive: 'comfort' }

/**
 * "Find Your Pair" recommendation logic — transparent scoring so merchandisers
 * can reason about (and later tune in the CMS) why a product is recommended.
 */
export function useFinder() {
  const who = ref<FinderWho | null>(null)
  const need = ref<FinderNeed | null>(null)
  const matter = ref<FinderMatter | null>(null)

  const scored = computed(() => {
    return products
      .filter((p) => !who.value || p.genders.includes(who.value) || (who.value !== 'kids' && p.genders.includes('unisex')))
      .map((p) => {
        let score = 60
        const reasons: string[] = []
        if (need.value) {
          if (p.activities.includes(need.value)) { score += 18; reasons.push('ตรงกับการใช้งาน') } else score -= 15
        }
        if (matter.value) {
          const b = p.benefits[matterToBenefit[matter.value]]
          score += (b - 3) * 8
          if (b >= 5) reasons.push('คะแนนสูงสุดในด้านที่คุณเลือก')
        }
        score += Math.max(0, 6 - p.salesRank) // light popularity boost
        return { product: p as Product, match: Math.max(40, Math.min(99, Math.round(score))), reasons }
      })
      .sort((a, b) => b.match - a.match)
  })

  const step = computed(() => (who.value ? (need.value ? (matter.value ? 3 : 2) : 1) : 0))
  const query = computed(() => {
    const q: Record<string, string> = {}
    if (who.value) q.gender = who.value
    if (need.value) q.activity = need.value
    if (matter.value) q.sort = 'best'
    return q
  })
  function reset() { who.value = null; need.value = null; matter.value = null }
  return { who, need, matter, scored, step, query, reset }
}
