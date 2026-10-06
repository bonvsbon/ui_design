import type { ContentApi } from './api'

/**
 * Example: swapping the mock for a real backend.
 * Point NUXT_PUBLIC_API_BASE at your CMS/commerce gateway and return this from composables/useApi.ts.
 * Response shapes must match ~/types (map/normalise here if your API differs).
 */
export function createHttpApi(base: string): ContentApi {
  const get = <T>(path: string) => $fetch<T>(path, { baseURL: base })
  return {
    getSite: () => get('/site'),
    getHomepage: () => get('/pages/home/sections'),
    getProducts: () => get('/products'),
    getProduct: (slug) => get(`/products/${slug}`),
    getStories: () => get('/stories'),
    getStory: (slug) => get(`/stories/${slug}`),
    getStores: () => get('/stores'),
  }
}
