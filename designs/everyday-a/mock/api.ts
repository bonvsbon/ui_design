import type { HomeSection, Product, SiteSettings, Store, Story } from '~/types'
import { homepageSections } from '~/data/homepage'
import { products } from '~/data/products'
import { site } from '~/data/site'
import { stores } from '~/data/stores'
import { stories } from '~/data/stories'

/**
 * The contract every content source must satisfy.
 * Components and pages only talk to `useApi()` → this interface, never to /data directly,
 * so a headless CMS / commerce API can replace the mock by implementing the same methods.
 */
export interface ContentApi {
  getSite(): Promise<SiteSettings>
  getHomepage(): Promise<HomeSection[]>
  getProducts(): Promise<Product[]>
  getProduct(slug: string): Promise<Product | null>
  getStories(): Promise<Story[]>
  getStory(slug: string): Promise<Story | null>
  getStores(): Promise<Store[]>
}

const clone = <T>(v: T): T => structuredClone(v)

export const mockApi: ContentApi = {
  async getSite() { return clone(site) },
  async getHomepage() { return clone(homepageSections).filter((s) => s.enabled) },
  async getProducts() { return clone(products) },
  async getProduct(slug) { return clone(products.find((p) => p.slug === slug) ?? null) },
  async getStories() { return clone(stories) },
  async getStory(slug) { return clone(stories.find((s) => s.slug === slug) ?? null) },
  async getStores() { return clone(stores) },
}
