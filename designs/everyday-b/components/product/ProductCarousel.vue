<script setup lang="ts">
import type { Product, CTA } from '~/types'
defineProps<{ products: Product[]; title?: string; subtitle?: string; cta?: CTA }>()
const track = ref<HTMLElement>()
function move(dir: number) {
  track.value?.scrollBy({
    left: dir * (track.value.clientWidth * 0.78),
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  })
}
</script>
<template>
  <section class="product-carousel">
    <SectionHeading v-if="title" :title="title" :subtitle="subtitle" :cta="cta"
      ><div class="carousel-controls">
        <button class="circle-button" :aria-label="`Previous ${title} products`" @click="move(-1)">
          <AppIcon name="left" :size="18" /></button
        ><button class="circle-button" :aria-label="`Next ${title} products`" @click="move(1)">
          <AppIcon name="arrow" :size="18" />
        </button></div
    ></SectionHeading>
    <div
      ref="track"
      class="product-track"
      tabindex="0"
      :aria-label="`${title || 'Featured'} products, scroll to explore`"
    >
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </section>
</template>
