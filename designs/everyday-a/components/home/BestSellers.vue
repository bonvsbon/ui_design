<script setup lang="ts">
import type { Cta, Product } from '~/types'
/** Generic product carousel section (used for Best Sellers; any query/ids from the CMS). */
defineProps<{ title: string; subtitle: string; cta: Cta; products: Product[] }>()
const uid = useId()
</script>

<template>
  <section class="py-section pt-8 lg:pt-12" :aria-labelledby="uid">
    <div class="wrap">
      <SectionHeader :id="uid" :title="title" :subtitle="subtitle" :cta="cta" />
    </div>
    <ProductCarousel class="mt-10" :products="products" :label="title" />
  </section>
</template>
