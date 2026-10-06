<script setup lang="ts">
import type { Product } from '~/types'
import { activityLabels, badgeLabels } from '~/data/catalog'

/** Warm, story-first card: tinted paper plate, serif name, "good for" moments. */
const props = withDefaults(defineProps<{ product: Product; tint?: number; eager?: boolean }>(), { tint: 0 })
const { productLink } = useConcept()
const wish = useWishlist()
const plates = ['#efe2cf', '#e3e4cf', '#ecd9cf', '#dfe6e6']
const off = computed(() => discountPercent(props.product.price, props.product.compareAt))
</script>

<template>
  <article class="group">
    <div class="relative overflow-hidden rounded-card" :style="{ background: plates[tint % plates.length] }">
      <NuxtLink :to="productLink(product.slug)" class="block aspect-[5/6] p-[10%]" :aria-label="product.name">
        <div class="relative h-full">
          <ProductImg :product="product" :eager="eager" class="absolute inset-0 transition-all duration-700 group-hover:-translate-x-3 group-hover:opacity-0" />
          <ProductImg :product="product" view="mirror" alt="" class="absolute inset-0 translate-x-3 opacity-0 transition-all duration-700 group-hover:translate-x-0 group-hover:opacity-100" />
        </div>
      </NuxtLink>
      <span v-if="product.badges[0]" class="absolute left-3 top-3 rounded-full bg-surface px-3 py-1 text-xs font-semibold">{{ product.badges[0] === 'sale' ? `ลด ${off}%` : badgeLabels[product.badges[0]] }}</span>
      <button type="button" class="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-surface" :aria-pressed="wish.has(product.slug)" :aria-label="`รายการโปรด ${product.name}`" @click="wish.toggle(product.slug)">
        <AppIcon name="heart" :size="18" :class="wish.has(product.slug) && 'fill-accent text-accent'" />
      </button>
    </div>
    <div class="mt-3">
      <div class="flex items-baseline justify-between gap-3">
        <h3 class="font-display text-xl font-semibold"><NuxtLink :to="productLink(product.slug)" class="hover:text-accent-text">{{ product.name }}</NuxtLink></h3>
        <p class="shrink-0 tabular-nums"><s v-if="product.compareAt" class="mr-1 text-sm text-muted">{{ formatPrice(product.compareAt) }}</s><span :class="product.compareAt ? 'text-sale font-semibold' : ''">{{ formatPrice(product.price) }}</span></p>
      </div>
      <p class="text-sm text-muted">{{ product.subtitle }}</p>
      <p class="mt-2 text-sm"><span class="italic text-muted" style="font-family: var(--font-display)">เหมาะกับ</span> {{ product.activities.slice(0, 3).map((a) => activityLabels[a]!.th).join(' · ') }}</p>
      <div class="mt-2 flex items-center gap-1.5"><span v-for="c in product.colors" :key="c.id" class="h-3 w-3 rounded-full ring-1 ring-black/10" :style="{ background: c.hex }" :title="c.name" /></div>
    </div>
  </article>
</template>
