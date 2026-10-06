<script setup lang="ts">
const ui = useUiStore()
const shop = useShopStore()
</script>
<template>
  <nav class="mobile-bottom" aria-label="Mobile shopping navigation">
    <NuxtLink to="/"><AppIcon name="home" :size="21" /><span>Home</span></NuxtLink
    ><NuxtLink to="/products"><AppIcon name="grid" :size="21" /><span>Shop</span></NuxtLink
    ><button @click="ui.open('search')">
      <AppIcon name="search" :size="21" /><span>Search</span></button
    ><button @click="ui.open('wishlist')">
      <AppIcon name="heart" :size="21" /><span
        >Saved<span v-if="shop.wishlist.length"> · {{ shop.wishlist.length }}</span></span
      ></button
    ><button @click="ui.open('cart')">
      <AppIcon name="bag" :size="21" /><span
        >Bag<span v-if="shop.count"> · {{ shop.count }}</span></span
      >
    </button>
  </nav>
</template>
