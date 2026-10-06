<script setup lang="ts">
import type { Product } from '~/types'

/**
 * Product cut-out photo. `view` fakes extra angles from the single studio shot
 * until real photography is loaded into the CMS: mirror = hover/alt image, detail = macro crop.
 */
const props = withDefaults(defineProps<{
  product: Pick<Product, 'image' | 'name' | 'colors'>
  colorId?: string
  view?: 'main' | 'mirror' | 'detail' | 'sole'
  eager?: boolean
  blend?: boolean
  fit?: 'contain' | 'cover'
  alt?: string
}>(), { view: 'main', blend: true, fit: 'contain' })

const filter = computed(() => props.product.colors.find((c) => c.id === props.colorId)?.filter ?? (props.colorId ? undefined : props.product.colors[0]?.filter))
const transform = computed(() => ({
  main: 'none',
  mirror: 'scaleX(-1) rotate(-4deg) scale(1.04)',
  detail: 'scale(1.9) translate(4%, -6%)',
  sole: 'scale(1.5) translate(-10%, 10%) rotate(8deg)',
}[props.view]))
const colorName = computed(() => props.product.colors.find((c) => c.id === props.colorId)?.name ?? props.product.colors[0]?.name)
</script>

<template>
  <img
    :src="productImageUrl(product.image)"
    :alt="alt ?? `${product.name} สี ${colorName}`"
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
    width="1100" height="850"
    :class="['block h-full w-full', fit === 'cover' ? 'object-cover' : 'object-contain', blend && 'on-plate']"
    :style="{ filter, transform }"
  >
</template>
