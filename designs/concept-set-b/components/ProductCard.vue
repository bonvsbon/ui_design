<script setup lang="ts">
import type { Product } from '~/types'
import { formatPrice } from '~/data/products'
const props = defineProps<{ product: Product }>()
const { base } = useConcept()
const { shop, toggleWish } = useShop()
const color = ref(0)
const url = computed(() => base.value + '/product/' + props.product.id)
</script>
<template>
  <article class="product-card">
    <div class="product-visual">
      <NuxtLink :to="url" :aria-label="'Shop ' + product.name" class="product-image-link"
        ><img
          :src="product.colors[color]?.image || product.image"
          :alt="product.name + ' in ' + product.colors[color]?.name"
          width="600"
          height="600"
          loading="lazy"
          class="product-main-image" /><img
          :src="product.hoverImage"
          alt=""
          width="600"
          height="600"
          loading="lazy"
          class="product-hover-image"
      /></NuxtLink>
      <span v-if="product.badge" :class="['product-badge', { new: product.badge === 'NEW' }]">{{
        product.badge
      }}</span>
      <button
        class="wish-button"
        :aria-label="
          (shop.wishlist.includes(product.id) ? 'Remove ' : 'Save ') +
          product.name +
          (shop.wishlist.includes(product.id) ? ' from wishlist' : ' to wishlist')
        "
        :aria-pressed="shop.wishlist.includes(product.id)"
        @click="toggleWish(product.id)"
      >
        <AppIcon name="heart" :class="{ filled: shop.wishlist.includes(product.id) }" :size="19" />
      </button>
      <NuxtLink :to="url" class="quick-shop"
        >Choose your size <AppIcon name="plus" :size="16"
      /></NuxtLink>
    </div>
    <div class="product-info">
      <div class="product-title-row">
        <h3>
          <NuxtLink :to="url">{{ product.name }}</NuxtLink>
        </h3>
        <span class="price">{{ formatPrice(product.price) }}</span>
      </div>
      <div class="product-meta">
        <span>{{ product.gender.join(' / ') }} · {{ product.category }}</span
        ><del v-if="product.originalPrice">{{ formatPrice(product.originalPrice) }}</del>
      </div>
      <div class="swatches">
        <button
          v-for="(c, i) in product.colors"
          :key="c.name"
          :aria-label="product.name + ' in ' + c.name"
          :aria-pressed="color === i"
          :style="{ '--swatch': c.value }"
          :class="['swatch', { selected: color === i }]"
          @click="color = i"
        ></button
        ><span>{{ product.colors.length }} colours</span
        ><span v-if="product.originalPrice" class="discount"
          >−{{ Math.round((1 - product.price / product.originalPrice) * 100) }}%</span
        >
      </div>
    </div>
  </article>
</template>
