/**
 * Content model.
 * Every shape here maps 1:1 to a CMS collection so the frontend never hardcodes
 * campaign copy, products or homepage composition.
 */

export type ConceptId = 'c01' | 'c02' | 'c03' | 'c04' | 'c05'

export type Gender = 'men' | 'women' | 'kids' | 'unisex'
export type CategorySlug = 'flip-flops' | 'slides' | 'sandals' | 'sneakers'
export type Activity = 'everyday' | 'walking' | 'work' | 'travel' | 'casual' | 'weekend' | 'outdoor' | 'family'
export type Benefit = 'comfort' | 'soft' | 'light' | 'durable'
export type BadgeKind = 'new' | 'best-seller' | 'online-exclusive' | 'limited' | 'sale'

export interface ColorVariant {
  id: string
  name: string
  hex: string
  /** CSS filter applied to the base photo to preview this colourway (placeholder until real shots exist) */
  filter?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  subtitle: string
  category: CategorySlug
  genders: Gender[]
  collection: string
  technologies: string[]
  price: number
  compareAt?: number
  badges: BadgeKind[]
  colors: ColorVariant[]
  sizes: number[]
  soldOutSizes?: number[]
  /** Key into /public/images/products/<image>.jpg */
  image: string
  rating: number
  reviewCount: number
  /** 1–5 scores rendered as visual benefit meters */
  benefits: Record<Benefit, number>
  weightGrams: number
  activities: Activity[]
  shortDescription: string
  description: string
  materials: string[]
  care: string[]
  releasedAt: string
  salesRank: number
  stock: number
}

export interface Category {
  slug: string
  label: string
  labelTh: string
  description: string
  /** Product filter this category resolves to */
  query: Partial<Record<'gender' | 'category' | 'collection' | 'badge', string>>
  image: string
  media?: string
}

export interface Collection {
  slug: string
  name: string
  tagline: string
  description: string
  media: string
}

export interface TechLayer {
  id: string
  name: string
  nameTh: string
  caption: string
  thicknessMm: number
  color: string
}

export interface TechBenefit {
  id: Benefit
  label: string
  labelTh: string
  metric: string
  unit: string
  claim: string
  /** 0–100 vs a standard EVA reference (100 = reference) */
  vsStandard: number
}

export interface Technology {
  slug: string
  name: string
  tagline: string
  summary: string
  layers: TechLayer[]
  benefits: TechBenefit[]
  comparison: { label: string; gbold: number; eva: number; rubber: number; unit: string; higherIsBetter: boolean }[]
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  category: 'Guide' | 'Story' | 'Care' | 'Travel' | 'Tech'
  readMinutes: number
  media: string
  date: string
}

export interface Store {
  id: string
  name: string
  mall: string
  province: string
  region: 'กรุงเทพฯ และปริมณฑล' | 'ภาคเหนือ' | 'ภาคอีสาน' | 'ภาคใต้' | 'ภาคตะวันออก'
  hours: string
  phone: string
  services: string[]
}

export interface MediaAsset {
  id: string
  /** Unsplash photo id */
  src: string
  alt: string
  credit: string
  focal?: string
}

export interface Promotion {
  id: string
  label: string
  code?: string
  detail: string
  endsAt?: string
}

/** A homepage block. Order in the array = order on page. */
export interface HomeSection<P = Record<string, any>> {
  id: string
  type: string
  /** Shown in the CMS panel */
  label: string
  enabled: boolean
  props: P
}

export interface NavItem {
  label: string
  to: string
  children?: { heading: string; links: { label: string; to: string }[] }[]
  feature?: { media: string; title: string; to: string }
}
