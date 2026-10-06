<script setup lang="ts">
import type { HomeSection } from '~/types'
const props = defineProps<{ section: HomeSection }>()
const { selectProducts } = useCatalog()
const products = computed(() => selectProducts(props.section.productIds, props.section.collection))
</script>
<template>
  <section class="featured-collection section container">
    <div class="featured-campaign">
      <ResponsiveImage v-if="section.media" :media="section.media" :width="1536" :height="1024" />
      <div>
        <span class="brand-tag">{{ section.eyebrow }}</span>
        <h2>{{ section.title }}</h2>
        <p lang="th">{{ section.subtitle }}</p>
        <NuxtLink v-if="section.cta" :to="section.cta.href" class="button white"
          >{{ section.cta.label }}<AppIcon name="arrow" :size="18"
        /></NuxtLink>
      </div>
      <span class="summer-seal">OUT OF OFFICE.<br />IN OUR ELEMENT.</span>
    </div>
    <div class="featured-products">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>
  </section>
</template>
