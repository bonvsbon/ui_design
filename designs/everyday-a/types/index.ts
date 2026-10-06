/**
 * Content model.
 * Each interface maps 1:1 to a CMS collection / API resource so components never
 * hardcode campaigns, products or homepage composition.
 */

export type Gender = 'men' | 'women' | 'kids'
export type KidsGroup = 'boys' | 'girls'
export type ProductType = 'flip-flops' | 'slides' | 'sandals' | 'sneakers'
export type Lifestyle = 'everyday' | 'travel' | 'city-walk' | 'weekend' | 'outdoor' | 'relax'
export type Benefit = 'comfort' | 'soft' | 'lite' | 'durable'
export type Badge = 'best-seller' | 'new' | 'online-exclusive'
export type StyleLine = 'EZY' | 'ZAH' | 'ZAPP' | 'ZEEK'

/** Image reference. `src` is either a local path (/images/...) or an Unsplash photo id. */
export interface Media {
  src: string
  alt: string
  /** CSS object-position, lets editors set the focal point */
  focal?: string
  /** Optional portrait crop for mobile art direction */
  mobileSrc?: string
}

export interface Cta {
  label: string
  to: string
}

export interface ColorVariant {
  id: string
  name: string
  hex: string
  /** Primary + alternate angle for this colourway */
  images: [string, string] | [string]
}

export interface Product {
  id: string
  slug: string
  /** Real GAMBOL style code format, e.g. GM43111 */
  code: string
  name: string
  /** Short Thai descriptor shown on PDP */
  subtitle: string
  type: ProductType
  genders: Gender[]
  kidsGroup?: KidsGroup[]
  styleLine: StyleLine
  collections: string[]
  lifestyles: Lifestyle[]
  price: number
  compareAt?: number
  badges: Badge[]
  colors: ColorVariant[]
  sizes: number[]
  soldOutSizes?: number[]
  gbold: boolean
  benefits: Benefit[]
  weightGrams: number
  rating: number
  reviewCount: number
  tagline: string
  description: string
  materials: string[]
  salesRank: number
  releasedAt: string
}

export interface Collection {
  slug: string
  name: string
  tagline: string
  media: Media
}

export interface LifestyleEntry {
  slug: Lifestyle
  title: string
  tagline: string
  media: Media
}

export interface Story {
  slug: string
  category: 'Style' | 'How-to' | 'Activity' | 'Technology'
  title: string
  excerpt: string
  readMinutes: number
  date: string
  media: Media
  body: string[]
}

export interface Store {
  id: string
  name: string
  type: 'Department Store' | 'Shoe Store' | 'GAMBOL Shop'
  province: string
  district: string
  address: string
  hours: string
  phone: string
  lat: number
  lng: number
}

export interface TechPoint {
  id: Benefit
  label: string
  title: string
  body: string
  /** Hotspot position over the sole illustration, in % */
  x: number
  y: number
}

/* ------------------------------------------------------------------
   Homepage sections (CMS "Page builder")
   ------------------------------------------------------------------ */

/** Product source: an explicit list of ids OR a query resolved by the catalog */
export type ProductSource =
  | { ids: string[] }
  | { query: ProductQuery; limit?: number }

export interface ProductQuery {
  gender?: Gender
  type?: ProductType
  badge?: Badge
  lifestyle?: Lifestyle
  collection?: string
  kidsGroup?: KidsGroup
  sort?: SortKey
}

export type SortKey = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'best'

interface SectionBase<T extends string> {
  id: string
  type: T
  enabled: boolean
}

export interface HeroSlide {
  id: string
  eyebrow: string
  title: string[]
  subtitle: string
  media: Media
  /** Optional mp4 — rendered instead of the image when present */
  video?: string
  ctas: Cta[]
  theme: 'light' | 'dark'
}

export type HomeSection =
  | (SectionBase<'hero'> & { slides: HeroSlide[]; autoplayMs: number })
  | (SectionBase<'categories'> & { title: string; subtitle: string; items: { label: string; labelTh: string; to: string; media: Media }[] })
  | (SectionBase<'productCarousel'> & { title: string; subtitle: string; cta: Cta; products: ProductSource })
  | (SectionBase<'brandStory'> & { eyebrow: string; title: string[]; body: string; cta: Cta; media: Media; secondaryMedia?: Media; stats: { value: string; label: string }[] })
  | (SectionBase<'lifestyle'> & { title: string; subtitle: string; items: Lifestyle[] })
  | (SectionBase<'genderSpotlight'> & { title: string; subtitle: string; align: 'image-left' | 'image-right'; media: Media; cta: Cta; products: ProductSource })
  | (SectionBase<'technology'> & { eyebrow: string; title: string[]; body: string; cta: Cta })
  | (SectionBase<'featuredCollection'> & { eyebrow: string; title: string[]; subtitle: string; media: Media; cta: Cta; products: ProductSource })
  | (SectionBase<'heroProduct'> & { eyebrow: string; productId: string; colorId?: string; headline: string[]; body: string; benefits: { title: string; body: string }[]; cta: Cta })
  | (SectionBase<'kids'> & { title: string[]; subtitle: string; media: Media; groups: { label: string; labelTh: string; to: string; media: Media }[]; products: ProductSource })
  | (SectionBase<'stories'> & { title: string; subtitle: string; storySlugs: string[]; cta: Cta })
  | (SectionBase<'storeLocator'> & { title: string[]; body: string; media: Media })
  | (SectionBase<'social'> & { title: string; subtitle: string; handle: string; posts: { media: Media; productId?: string; caption: string }[] })

export type HomeSectionType = HomeSection['type']

/* ------------------------------------------------------------------
   Global content
   ------------------------------------------------------------------ */

export interface MegaMenuColumn {
  heading: string
  links: { label: string; to: string }[]
}

export interface NavItem {
  label: string
  to: string
  mega?: {
    columns: MegaMenuColumn[]
    feature: { media: Media; eyebrow: string; title: string; to: string }
  }
}

export interface SiteSettings {
  announcements: { text: string; to?: string }[]
  nav: NavItem[]
  footer: { heading: string; links: { label: string; to: string }[] }[]
  social: { label: string; href: string; icon: 'facebook' | 'instagram' | 'tiktok' | 'line' | 'youtube' }[]
  freeShippingThreshold: number
}

export interface CartLine {
  productId: string
  colorId: string
  size: number
  qty: number
}
