<script setup lang="ts">
import type { HomeSection } from '~/types'
defineProps<{ section: HomeSection }>()
const { selectProducts } = useCatalog()
</script>
<template>
  <HeroCampaign v-if="section.type === 'hero'" :section="section" /><CategoryShowcase
    v-else-if="section.type === 'categories'"
    :section="section"
  />
  <div v-else-if="section.type === 'products'" class="section container">
    <ProductCarousel
      :products="selectProducts(section.productIds, section.collection)"
      :title="section.title"
      :subtitle="section.subtitle"
      :cta="section.cta"
    />
  </div>
  <EditorialCampaign
    v-else-if="section.type === 'brandStory'"
    :section="section"
  /><LifestyleShowcase
    v-else-if="section.type === 'lifestyles'"
    :section="section"
  /><CollectionFeature
    v-else-if="section.type === 'collection'"
    :section="section"
  /><TechnologyExplorer
    v-else-if="section.type === 'technology'"
    :section="section"
  /><FeaturedCollection v-else-if="section.type === 'featured'" :section="section" /><HeroProduct
    v-else-if="section.type === 'heroProduct'"
    :section="section"
  /><KidsCampaign v-else-if="section.type === 'kids'" :section="section" /><StoriesSection
    v-else-if="section.type === 'stories'"
    :section="section"
  /><StoreLocator v-else-if="section.type === 'stores'" :section="section" /><SocialGallery
    v-else-if="section.type === 'social'"
    :section="section"
  />
</template>
