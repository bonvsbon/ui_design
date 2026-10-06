import type { HomeSection } from '~/types'

/** CMS: Homepage — Concept 05 (Future Footwear / Tech). */
export const homeC05: HomeSection[] = [
  { id: 'hero', type: 'HeroSpec', label: 'Product stage hero', enabled: true, props: { kicker: 'G-BOLD / 2026 PLATFORM', title: ['Engineered', 'softness.'], titleTh: 'ความนุ่มที่ถูกออกแบบมาทีละชั้น', product: 'iconic', cta: { label: 'Shop G-BOLD', to: '/products?tech=g-bold' } } },
  { id: 'exploded', type: 'Exploded', label: 'Exploded sole (scroll story)', enabled: true, props: { title: 'Inside the sole', subtitle: 'เลื่อนลงเพื่อแยกชั้นพื้นรองเท้า' } },
  { id: 'benefits', type: 'BenefitLab', label: 'Visual benefits', enabled: true, props: { title: 'Four numbers that matter' } },
  { id: 'compare', type: 'Comparison', label: 'Technology comparison', enabled: true, props: { title: 'G-BOLD vs. the usual' } },
  { id: 'lineup', type: 'Lineup', label: 'Product lineup', enabled: true, props: { title: 'The lineup', products: ['iconic', 'tofu', 'bold-strap', 'city-slip-on', 'twist', 'bold-trail'] } },
  { id: 'notes', type: 'LabNotes', label: 'Lab notes (articles)', enabled: true, props: { title: 'Lab notes' } },
]
