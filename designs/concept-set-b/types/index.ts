export interface ProductColor {
  name: string
  value: string
  image?: string
}
export interface Product {
  id: string
  name: string
  category: string
  gender: string[]
  price: number
  originalPrice?: number
  image: string
  hoverImage: string
  colors: ProductColor[]
  sizes: number[]
  badge?: string
  collection: string
  technology: string
  occasions: string[]
  benefits: string[]
  description: string
}
export interface Concept {
  id: string
  number: string
  name: string
  label: string
  description: string
  audience: string
  strength: string
  risk: string
  use: string
  color: string
}
export interface CartItem {
  productId: string
  color: string
  size: number
  quantity: number
}
export type Panel =
  'search' | 'wishlist' | 'cart' | 'account' | 'stores' | 'checkout' | 'size' | 'story' | null
export interface SectionConfig {
  id: string
  label: string
  enabled: boolean
}
export interface Campaign {
  title: string
  subtitle: string
  cta: string
  image: string
}
