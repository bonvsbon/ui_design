<script setup lang="ts">
import type { Product } from '~/types'
import { badgeLabels, benefitLabels, technologyLabels } from '~/data/catalog'

/** Spec-sheet card: light "specimen" plate on graphite, mono readouts, mini benefit bars. */
const props = withDefaults(defineProps<{ product: Product; index?: number; eager?: boolean }>(), {})
const { productLink } = useConcept()
const wish = useWishlist()
const colorId = ref(props.product.colors[0]!.id)
</script>

<template>
  <article class="group flex h-full flex-col border border-line bg-surface transition-colors hover:border-accent">
    <div class="flex items-center justify-between border-b border-line px-3 py-2 font-mono text-[11px] uppercase text-muted">
      <span>{{ index != null ? `SPEC-${String(index + 1).padStart(3, '0')}` : product.id.toUpperCase() }}</span>
      <span class="text-accent">{{ product.badges.map((b) => badgeLabels[b]).join(' / ') }}</span>
    </div>
    <NuxtLink :to="productLink(product.slug)" class="relative block aspect-[4/3] bg-[#ecebe6] p-[10%]" :aria-label="product.name">
      <ProductImg :product="product" :color-id="colorId" :eager="eager" class="transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2" />
      <span class="absolute bottom-2 left-2 font-mono text-[10px] text-[#55565a]">{{ product.weightGrams }} g · {{ product.technologies.map((t) => technologyLabels[t]).join(' + ') }}</span>
    </NuxtLink>
    <div class="flex flex-1 flex-col p-4">
      <div class="flex items-start justify-between gap-3">
        <h3 class="font-display text-xl font-medium"><NuxtLink :to="productLink(product.slug)" class="hover:text-accent">{{ product.name }}</NuxtLink></h3>
        <button type="button" class="-mr-1 -mt-1 grid h-9 w-9 place-items-center" :aria-pressed="wish.has(product.slug)" :aria-label="`รายการโปรด ${product.name}`" @click="wish.toggle(product.slug)"><AppIcon name="heart" :size="18" :class="wish.has(product.slug) && 'fill-accent text-accent'" /></button>
      </div>
      <p class="text-sm text-muted">{{ product.subtitle }}</p>
      <dl class="mt-3 grid grid-cols-4 gap-2">
        <div v-for="(v, k) in product.benefits" :key="k">
          <dt class="font-mono text-[10px] uppercase text-muted">{{ benefitLabels[k]!.en.slice(0, 5) }}</dt>
          <dd class="mt-1 h-1 bg-surface-2" :aria-label="`${benefitLabels[k]!.th} ${v}/5`"><span class="block h-full bg-accent" :style="{ width: v * 20 + '%' }" /></dd>
        </div>
      </dl>
      <div class="mt-auto flex items-end justify-between pt-4">
        <div class="flex gap-1">
          <button v-for="c in product.colors" :key="c.id" type="button" class="h-4 w-4 rounded-[2px] ring-1 ring-offset-2 ring-offset-surface" :class="colorId === c.id ? 'ring-accent' : 'ring-transparent'" :style="{ background: c.hex }" :aria-label="c.name" :aria-pressed="colorId === c.id" @click="colorId = c.id" />
        </div>
        <p class="font-mono tabular-nums"><s v-if="product.compareAt" class="mr-2 text-xs text-muted">{{ formatPrice(product.compareAt) }}</s><span :class="product.compareAt ? 'text-sale' : ''">{{ formatPrice(product.price) }}</span></p>
      </div>
    </div>
  </article>
</template>
