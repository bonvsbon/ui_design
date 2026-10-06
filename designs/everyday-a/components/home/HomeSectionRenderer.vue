<script setup lang="ts">
import type { HomeSection, Story } from '~/types'
import { stories as allStories } from '~/data/stories'
/**
 * Page-builder renderer: maps CMS section `type` → component and resolves product/story references.
 * Unknown types are skipped, so the CMS can ship new section types before the frontend supports them.
 */
const props = defineProps<{ sections: HomeSection[] }>()
const products = useProducts()
const byId = (id: string) => products.value.find((p) => p.id === id)
const src = (s: Parameters<typeof resolveProducts>[1]) => resolveProducts(products.value, s)
const pickStories = (slugs: string[]) => slugs.map((slug) => allStories.find((x) => x.slug === slug)).filter((x): x is Story => !!x)
</script>

<template>
  <template v-for="s in props.sections" :key="s.id">
    <HeroCampaign v-if="s.type === 'hero'" :slides="s.slides" :autoplay-ms="s.autoplayMs" />
    <CategoryShowcase v-else-if="s.type === 'categories'" :title="s.title" :subtitle="s.subtitle" :items="s.items" />
    <BestSellers v-else-if="s.type === 'productCarousel'" :title="s.title" :subtitle="s.subtitle" :cta="s.cta" :products="src(s.products)" />
    <BrandStory v-else-if="s.type === 'brandStory'" :eyebrow="s.eyebrow" :title="s.title" :body="s.body" :cta="s.cta" :media="s.media" :secondary-media="s.secondaryMedia" :stats="s.stats" />
    <LifestyleShowcase v-else-if="s.type === 'lifestyle'" :title="s.title" :subtitle="s.subtitle" :items="s.items" />
    <GenderSpotlight v-else-if="s.type === 'genderSpotlight'" :title="s.title" :subtitle="s.subtitle" :align="s.align" :media="s.media" :cta="s.cta" :products="src(s.products)" />
    <TechnologyExplorer v-else-if="s.type === 'technology'" :eyebrow="s.eyebrow" :title="s.title" :body="s.body" :cta="s.cta" />
    <FeaturedCollection v-else-if="s.type === 'featuredCollection'" :eyebrow="s.eyebrow" :title="s.title" :subtitle="s.subtitle" :media="s.media" :cta="s.cta" :products="src(s.products)" />
    <HeroProduct v-else-if="s.type === 'heroProduct' && byId(s.productId)" :eyebrow="s.eyebrow" :product="byId(s.productId)!" :color-id="s.colorId" :headline="s.headline" :body="s.body" :benefits="s.benefits" :cta="s.cta" />
    <KidsShowcase v-else-if="s.type === 'kids'" :title="s.title" :subtitle="s.subtitle" :media="s.media" :groups="s.groups" :products="src(s.products)" />
    <StoriesShowcase v-else-if="s.type === 'stories'" :title="s.title" :subtitle="s.subtitle" :cta="s.cta" :stories="pickStories(s.storySlugs)" />
    <StoreLocatorTeaser v-else-if="s.type === 'storeLocator'" :title="s.title" :body="s.body" :media="s.media" />
    <SocialGallery v-else-if="s.type === 'social'" :title="s.title" :subtitle="s.subtitle" :handle="s.handle" :posts="s.posts.map((p) => ({ ...p, product: p.productId ? byId(p.productId) : undefined }))" />
  </template>
</template>
