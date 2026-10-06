<script setup lang="ts">
import type { Product } from '~/types'
const props = defineProps<{ product: Product; compact?: boolean }>()
const ui = useUiStore()
const shop = useShopStore()
const selected = ref(0)
const current = computed(() => props.product.colors[selected.value] || props.product.colors[0]!)
const saved = computed(() => shop.wishlist.includes(props.product.id))
</script>
<template>
  <article class="product-card" :class="{ compact }">
    <div class="product-image-wrap">
      <NuxtLink
        :to="`/product/${product.id}`"
        class="product-image-link"
        :aria-label="`${product.name}, ${formatPrice(product.price)}`"
        ><img
          :src="current.image"
          :alt="`${product.name} in ${current.name}`"
          class="product-image primary-image"
          width="640"
          height="560"
          loading="lazy" /><img
          v-if="selected === 0"
          :src="product.alternate"
          alt=""
          class="product-image alternate-image"
          width="640"
          height="560"
          loading="lazy" /></NuxtLink
      ><span
        v-if="product.badge"
        class="product-badge"
        :class="{ 'badge-new': product.badge === 'NEW' }"
        >{{ product.badge }}</span
      ><button
        class="wishlist-button icon-button"
        :class="{ saved }"
        :aria-label="`${saved ? 'Remove' : 'Save'} ${product.name} ${saved ? 'from' : 'to'} wishlist`"
        :aria-pressed="saved"
        @click="shop.toggle(product.id)"
      >
        <AppIcon name="heart" :size="19" /></button
      ><button class="quick-view" @click="ui.open('quick', product.id)">
        QUICK VIEW<AppIcon name="plus" :size="15" />
      </button>
    </div>
    <div class="product-info">
      <div class="product-name-price">
        <NuxtLink :to="`/product/${product.id}`"
          ><h3>{{ product.name }}</h3></NuxtLink
        ><strong>{{ formatPrice(product.price) }}</strong>
      </div>
      <p>{{ product.gender.join(' / ') }} · {{ product.type }}</p>
      <div class="color-row">
        <button
          v-for="(color, index) in product.colors"
          :key="color.name"
          class="swatch"
          :class="{ selected: selected === index }"
          :style="{ '--swatch': color.value }"
          :aria-label="`${product.name}: ${color.name}`"
          :aria-pressed="selected === index"
          @click="selected = index"
        >
          <span /></button
        ><span class="color-count"
          >{{ product.colors.length }} {{ product.colors.length === 1 ? 'color' : 'colors' }}</span
        >
      </div>
    </div>
  </article>
</template>
