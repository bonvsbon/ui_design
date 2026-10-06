<script setup lang="ts">
import { footwearTypes } from '~/data/site'
const props = defineProps<{ category: string }>()
defineEmits<{ close: [] }>()
const query = computed(() =>
  props.category === 'Sneakers' ? 'type=Sneakers' : `gender=${props.category}`
)
</script>
<template>
  <div class="mega-menu">
    <div class="mega-content container">
      <div>
        <h2>{{ category.toUpperCase() }}</h2>
        <NuxtLink class="text-link" :to="`/products?${query}`" @click="$emit('close')"
          >SHOP ALL {{ category.toUpperCase() }}<AppIcon name="arrow" :size="17"
        /></NuxtLink>
      </div>
      <div>
        <h3>Shop by style</h3>
        <NuxtLink
          v-for="type in footwearTypes"
          :key="type"
          :to="`/products?${query}&type=${encodeURIComponent(type)}`"
          >{{ type }}</NuxtLink
        >
      </div>
      <div>
        <h3>Find your favourite</h3>
        <NuxtLink :to="`/products?${query}&new=true`">New arrivals</NuxtLink
        ><NuxtLink :to="`/products?${query}&best=true`">Best sellers</NuxtLink
        ><NuxtLink :to="`/products?${query}&collection=Everyday%20Comfort`"
          >Everyday comfort</NuxtLink
        >
        <h3 class="mt-6">Collections</h3>
        <NuxtLink to="/technology">GBOLD Technology</NuxtLink
        ><NuxtLink :to="`/products?${query}&collection=Summer%20Escape`">Summer Escape</NuxtLink>
      </div>
      <NuxtLink to="/products?lifestyle=Weekend" class="mega-campaign"
        ><img
          src="/images/coast-mobile.webp"
          width="800"
          height="533"
          alt="Coastal weekends in comfortable sandals" /><span
          >GO WHERE THE DAY TAKES YOU.<AppIcon name="upRight" /></span></NuxtLink
      ><button
        class="icon-button mega-close"
        aria-label="Close navigation menu"
        @click="$emit('close')"
      >
        <AppIcon name="close" />
      </button>
    </div>
  </div>
</template>
