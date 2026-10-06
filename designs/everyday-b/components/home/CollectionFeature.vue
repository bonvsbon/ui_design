<script setup lang="ts">
import type { HomeSection } from '~/types'
const props = defineProps<{ section: HomeSection }>()
const { selectProducts } = useCatalog()
const products = computed(() => selectProducts(props.section.productIds, props.section.collection))
</script>
<template>
  <section class="collection-feature container" :class="{ 'collection-reverse': section.reverse }">
    <div class="collection-photo">
      <ResponsiveImage v-if="section.media" :media="section.media" :width="900" :height="1200" />
      <div>
        <span>THE EVERYDAY ROTATION</span>
        <h2>{{ section.title }}</h2>
        <p>{{ section.subtitle }}</p>
        <NuxtLink v-if="section.cta" :to="section.cta.href" class="button white"
          >{{ section.cta.label }}<AppIcon name="arrow" :size="17"
        /></NuxtLink>
      </div>
    </div>
    <div class="collection-products">
      <ProductCard v-for="product in products" :key="product.id" :product="product" compact />
    </div>
  </section>
</template>
