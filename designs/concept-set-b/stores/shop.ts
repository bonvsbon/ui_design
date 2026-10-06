import type { CartItem } from '~/types'
export interface ShopState {
  cart: CartItem[]
  wishlist: string[]
  recent: string[]
  name: string
  email: string
}
export const emptyShop = (): ShopState => ({
  cart: [],
  wishlist: [],
  recent: [],
  name: '',
  email: '',
})
