import { products } from '~/mock/products'
import { stories, retailStores } from '~/mock/editorial'
export function useCatalog() {
  return {
    products,
    stories,
    stores: retailStores,
    findProduct: (id: string) =>
      products.find((p) => p.id === (id === 'demo' ? 'ezy-everyday' : id)),
    selectProducts: (ids?: string[], collection?: string) =>
      ids?.length
        ? ids
            .map((id) => products.find((p) => p.id === id))
            .filter((p): p is NonNullable<typeof p> => !!p)
        : products.filter((p) => !collection || p.collection === collection),
  }
}
export function formatPrice(value: number) {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0,
  }).format(value)
}
