<script setup lang="ts">
const { base } = useConcept()
const { panel, count } = useShop()
</script>
<template>
  <nav class="mobile-bottom" aria-label="Mobile navigation">
    <NuxtLink :to="base"><AppIcon name="home" /><span>Home</span></NuxtLink
    ><NuxtLink :to="base + '/products'"><AppIcon name="grid" /><span>Shop</span></NuxtLink
    ><button @click="panel = 'search'"><AppIcon name="search" /><span>Search</span></button
    ><button @click="panel = 'wishlist'"><AppIcon name="heart" /><span>Wishlist</span></button
    ><button @click="panel = 'cart'">
      <AppIcon name="bag" /><span>Bag {{ count || '' }}</span>
    </button>
  </nav>
</template>
