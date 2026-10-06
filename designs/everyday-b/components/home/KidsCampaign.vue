<script setup lang="ts">
import type { HomeSection } from '~/types'
const props = defineProps<{ section: HomeSection }>()
const { selectProducts } = useCatalog()
const products = computed(() => selectProducts(props.section.productIds))
</script>
<template>
  <section class="kids-section section container">
    <div class="kids-campaign">
      <div class="kids-copy">
        <AppIcon name="sun" :size="42" />
        <h2>{{ section.title }}</h2>
        <p lang="th">{{ section.subtitle }}</p>
        <div class="button-row">
          <NuxtLink v-if="section.cta" :to="section.cta.href" class="button dark"
            >{{ section.cta.label }}<AppIcon name="arrow" :size="17" /></NuxtLink
          ><NuxtLink
            v-if="section.secondaryCta"
            :to="section.secondaryCta.href"
            class="button secondary"
            >{{ section.secondaryCta.label }}<AppIcon name="arrow" :size="17"
          /></NuxtLink>
        </div>
      </div>
      <ResponsiveImage v-if="section.media" :media="section.media" :width="1536" :height="1024" />
    </div>
    <div class="featured-products">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>
  </section>
</template>
