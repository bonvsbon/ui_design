export type Gender = 'Men' | 'Women' | 'Kids'
export type FootwearType = 'Flip Flops' | 'Slides' | 'Sandals' | 'Sneakers'
export interface ProductColor {
  name: string
  value: string
  image: string
  alternate?: string
}
export interface Product {
  id: string
  code: string
  name: string
  type: FootwearType
  gender: Gender[]
  price: number
  image: string
  alternate: string
  colors: ProductColor[]
  sizes: number[]
  unavailableSizes: number[]
  badge?: string
  collection: string
  technology: string
  lifestyles: string[]
  description: string
  kidsGroup?: 'Boys' | 'Girls' | 'Both'
}
export interface CTA {
  label: string
  href: string
}
export interface Media {
  src: string
  mobileSrc?: string
  alt: string
  video?: string
  position?: string
}
export interface VisualCard {
  id: string
  title: string
  subtitle?: string
  image: Media
  href: string
}
export type SectionType =
  | 'hero'
  | 'categories'
  | 'products'
  | 'brandStory'
  | 'lifestyles'
  | 'collection'
  | 'technology'
  | 'featured'
  | 'heroProduct'
  | 'kids'
  | 'stories'
  | 'stores'
  | 'social'
export interface HomeSection {
  id: string
  type: SectionType
  enabled: boolean
  title: string
  subtitle?: string
  eyebrow?: string
  body?: string
  media?: Media
  cta?: CTA
  secondaryCta?: CTA
  productIds?: string[]
  collection?: string
  cards?: VisualCard[]
  reverse?: boolean
  storyIds?: string[]
}
export interface SiteContent {
  announcement: { text: string; link: CTA }
  sections: HomeSection[]
}
export interface Story {
  id: string
  category: string
  title: string
  excerpt: string
  image: string
  readTime: string
  paragraphs: string[]
  productIds: string[]
}
export interface RetailStore {
  id: string
  name: string
  province: string
  district: string
  address: string
  hours: string
  lat: number
  lng: number
  sample: boolean
}
export interface CartItem {
  key: string
  productId: string
  color: string
  size: number
  quantity: number
}
