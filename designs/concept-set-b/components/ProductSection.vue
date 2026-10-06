<script setup lang="ts">
import { products } from '~/data/products'
withDefaults(
  defineProps<{ title?: string; subtitle?: string; filter?: string; limit?: number }>(),
  { title: 'A fresh step forward.', subtitle: 'New shapes. Same everyday comfort.', limit: 4 }
)
const { base } = useConcept()
</script>
<template>
  <section class="product-section section-space container">
    <div class="section-heading">
      <div>
        <h2>{{ title }}</h2>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>
      <NuxtLink :to="base + '/products' + (filter ? '?collection=' + filter : '')" class="text-link"
        >Shop {{ filter === 'Best Sellers' ? 'best sellers' : 'new arrivals'
        }}<AppIcon name="right" :size="18"
      /></NuxtLink>
    </div>
    <div class="product-grid">
      <ProductCard
        v-for="p in (filter === 'Best Sellers'
          ? products
              .filter((x) => x.badge === 'BEST SELLER')
              .concat(products.filter((x) => x.badge !== 'BEST SELLER'))
          : products
        ).slice(0, limit)"
        :key="p.id"
        :product="p"
      />
    </div>
  </section>
</template>
