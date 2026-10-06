import { products } from '~/data/products'
import { emptyShop } from '~/stores/shop'
import type { Panel } from '~/types'
export function useShop() {
  const shop = useState('gambol-shop', emptyShop)
  const panel = useState<Panel>('gambol-panel', () => null)
  const message = useState('gambol-toast', () => '')
  const selectedStory = useState('gambol-story', () => 'Bangkok, at your own pace')
  const count = computed(() => shop.value.cart.reduce((n, x) => n + x.quantity, 0))
  const total = computed(() =>
    shop.value.cart.reduce(
      (n, x) => n + (products.find((p) => p.id === x.productId)?.price || 0) * x.quantity,
      0
    )
  )
  function toast(text: string) {
    message.value = text
  }
  function toggleWish(id: string) {
    const i = shop.value.wishlist.indexOf(id)
    if (i >= 0) shop.value.wishlist.splice(i, 1)
    else shop.value.wishlist.push(id)
    toast(i >= 0 ? 'Removed from your wishlist' : 'Saved to your wishlist')
  }
  function addToCart(productId: string, color: string, size: number) {
    const item = shop.value.cart.find(
      (x) => x.productId === productId && x.color === color && x.size === size
    )
    if (item) item.quantity++
    else shop.value.cart.push({ productId, color, size, quantity: 1 })
    toast('Your pair is in the bag')
    panel.value = 'cart'
  }
  function viewProduct(id: string) {
    shop.value.recent = [id, ...shop.value.recent.filter((x) => x !== id)].slice(0, 6)
  }
  return {
    shop,
    panel,
    message,
    selectedStory,
    count,
    total,
    toast,
    toggleWish,
    addToCart,
    viewProduct,
  }
}
