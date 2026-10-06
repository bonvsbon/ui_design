<script setup lang="ts">
import type { Product } from '~/types'
import { genderLabels, typeLabels } from '~/data/products'

const props = withDefaults(defineProps<{ product: Product; priority?: boolean; sizes?: string }>(), { priority: false })
const wishlist = useWishlistStore()
const ui = useUiStore()

const to = computed(() => `/product/${props.product.slug}`)
const primary = computed(() => imageUrl(productImage(props.product)))
const alt = computed(() => { const a = productAltImage(props.product); return a ? imageUrl(a) : undefined })
const meta = computed(() => {
  const g = props.product.genders
  const who = g.length > 1 ? 'Unisex' : genderLabels[g[0]].en
  return `${who} ${typeLabels[props.product.type].en}`
})
const wished = computed(() => wishlist.has(props.product.id))
function toggleWish() {
  const on = wishlist.toggle(props.product.id)
  ui.notify(on ? `เพิ่ม ${props.product.name} ในรายการโปรดแล้ว` : 'นำออกจากรายการโปรดแล้ว')
}
</script>

<template>
  <article class="group/card relative flex flex-col">
    <div class="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-paper-2">
      <NuxtLink :to="to" class="absolute inset-0 block" :aria-label="`${product.name} — ${formatPrice(product.price)}`" tabindex="-1">
        <img
          :src="primary" :alt="`${product.name} สี ${product.colors[0].name}`" width="575" height="575"
          :loading="priority ? 'eager' : 'lazy'" decoding="async"
          class="absolute inset-0 h-full w-full object-contain p-[9%] mix-blend-multiply transition duration-500 ease-out group-hover/card:scale-[1.03]"
          :class="alt ? 'lg:group-hover/card:opacity-0' : ''"
        >
        <img
          v-if="alt" :src="alt" alt="" aria-hidden="true" loading="lazy" decoding="async" width="575" height="575"
          class="absolute inset-0 hidden h-full w-full object-contain p-[9%] opacity-0 mix-blend-multiply transition duration-500 ease-out group-hover/card:opacity-100 lg:block"
        >
      </NuxtLink>

      <div v-if="product.badges.length" class="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1">
        <ProductBadge :badge="product.badges[0]" />
      </div>

      <button
        type="button" class="absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-white/70"
        :aria-pressed="wished" :aria-label="wished ? `นำ ${product.name} ออกจากรายการโปรด` : `เพิ่ม ${product.name} ในรายการโปรด`"
        @click="toggleWish"
      >
        <AppIcon name="heart" :size="20" :class="wished ? 'fill-red text-red' : ''" />
      </button>

      <!-- Quick view: hover bar on desktop, icon on touch -->
      <button
        type="button"
        class="absolute inset-x-3 bottom-3 hidden h-11 translate-y-2 items-center justify-center gap-2 rounded-full bg-white/95 text-[0.72rem] font-semibold uppercase tracking-[0.12em] opacity-0 transition duration-300 ease-out hover:bg-white focus-visible:translate-y-0 focus-visible:opacity-100 group-hover/card:translate-y-0 group-hover/card:opacity-100 lg:flex"
        @click="ui.quickView(product.id)"
      >
        <AppIcon name="eye" :size="16" /> Quick View
      </button>
      <button type="button" class="absolute bottom-2 right-2 grid h-11 w-11 place-items-center rounded-full bg-white/90 lg:hidden" :aria-label="`ดู ${product.name} แบบย่อ`" @click="ui.quickView(product.id)">
        <AppIcon name="plus" :size="18" />
      </button>
    </div>

    <div class="mt-3 flex flex-col gap-0.5 pr-1">
      <h3 class="text-[0.95rem] font-semibold leading-snug">
        <NuxtLink :to="to" class="hover:underline underline-offset-4">{{ product.name }}</NuxtLink>
      </h3>
      <p class="text-sm text-muted">{{ meta }}</p>
      <p class="mt-1 text-[0.95rem] font-medium">
        <span :class="product.compareAt ? 'text-red' : ''">{{ formatPrice(product.price) }}</span>
        <s v-if="product.compareAt" class="ml-2 text-sm font-normal text-muted">{{ formatPrice(product.compareAt) }}</s>
      </p>
      <div class="mt-2 flex items-center gap-1.5" :aria-label="`${product.colors.length} สี`">
        <span
          v-for="c in product.colors.slice(0, 5)" :key="c.id" :title="c.name"
          class="h-3.5 w-3.5 rounded-full ring-1 ring-inset ring-black/15" :style="{ background: c.hex }"
        />
        <span v-if="product.colors.length > 5" class="text-xs text-muted">+{{ product.colors.length - 5 }}</span>
      </div>
    </div>
  </article>
</template>
