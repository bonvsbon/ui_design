<script setup lang="ts">
import type { Product } from '~/types'
import { badgeLabels, categoryLabels } from '~/data/catalog'

/** Conversion card: rating, stock signal, savings, and a size-picker quick add that works on touch. */
const props = withDefaults(defineProps<{ product: Product; match?: number; list?: boolean; eager?: boolean }>(), { list: false })
const { productLink } = useConcept()
const wish = useWishlist()
const cart = useCart()
const toast = useToast()
const colorId = ref(props.product.colors[0]!.id)
const picking = ref(false)
const off = computed(() => discountPercent(props.product.price, props.product.compareAt))
function add(z: number) {
  cart.add(props.product, colorId.value, z)
  toast.show(`✓ เพิ่ม ${props.product.name} (${z}) ลงตะกร้าแล้ว`)
  picking.value = false
}
const badgeTone: Record<string, string> = { new: 'bg-accent text-accent-ink', 'best-seller': 'bg-accent-2 text-accent-2-ink', 'online-exclusive': 'bg-ink text-bg', limited: 'bg-[#7c3aed] text-white', sale: 'bg-sale text-white' }
</script>

<template>
  <article class="group relative flex h-full rounded-card border border-line bg-bg transition-shadow hover:shadow-pop" :class="list ? 'flex-row gap-4 p-3' : 'flex-col p-3'">
    <div class="relative overflow-hidden rounded-media bg-surface" :class="list ? 'w-36 shrink-0' : ''">
      <NuxtLink :to="productLink(product.slug)" class="block aspect-square p-4" :aria-label="product.name">
        <ProductImg :product="product" :color-id="colorId" :eager="eager" class="transition-transform duration-300 group-hover:scale-105" />
      </NuxtLink>
      <ul class="absolute left-2 top-2 flex flex-col items-start gap-1">
        <li v-for="b in product.badges" :key="b" class="rounded-md px-2 py-0.5 text-[11px] font-bold" :class="badgeTone[b]">{{ b === 'sale' ? `-${off}%` : badgeLabels[b] }}</li>
      </ul>
      <span v-if="match" class="absolute bottom-2 left-2 rounded-md bg-bg px-2 py-0.5 text-xs font-bold text-accent-text shadow-card">ตรงใจ {{ match }}%</span>
      <button type="button" class="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-bg shadow-card" :aria-pressed="wish.has(product.slug)" :aria-label="`รายการโปรด ${product.name}`" @click="wish.toggle(product.slug)">
        <AppIcon name="heart" :size="18" :class="wish.has(product.slug) && 'fill-sale text-sale'" />
      </button>
    </div>
    <div class="flex flex-1 flex-col pt-3" :class="list && 'pt-0'">
      <p class="text-xs text-muted">{{ categoryLabels[product.category] }}</p>
      <h3 class="font-bold leading-snug"><NuxtLink :to="productLink(product.slug)" class="hover:text-accent-text">{{ product.name }}</NuxtLink></h3>
      <p class="mt-0.5 flex items-center gap-1 text-xs"><AppIcon name="star" :size="12" class="fill-[#f59e0b] text-[#f59e0b]" /><span class="font-semibold">{{ product.rating }}</span><span class="text-muted">({{ product.reviewCount.toLocaleString() }})</span></p>
      <div class="mt-2 flex items-center gap-1">
        <button v-for="c in product.colors" :key="c.id" type="button" class="h-5 w-5 rounded-full ring-2 ring-offset-1" :class="colorId === c.id ? 'ring-ink' : 'ring-transparent'" :style="{ background: c.hex }" :aria-label="c.name" :aria-pressed="colorId === c.id" @click="colorId = c.id" />
        <span class="ml-1 text-xs text-muted">{{ product.colors.length }} สี</span>
      </div>
      <div class="mt-auto pt-3">
        <p class="flex items-baseline gap-2">
          <span class="text-lg font-extrabold tabular-nums" :class="product.compareAt ? 'text-sale' : ''">{{ formatPrice(product.price) }}</span>
          <s v-if="product.compareAt" class="text-sm text-muted">{{ formatPrice(product.compareAt) }}</s>
        </p>
        <p v-if="product.stock < 15" class="text-xs font-semibold text-[#b45309]">เหลือ {{ product.stock }} คู่</p>
        <p v-else class="text-xs text-[#15803d]">มีสินค้า · ส่งพรุ่งนี้</p>
        <button v-if="!picking" type="button" class="mt-2 flex h-10 w-full items-center justify-center gap-1.5 rounded-btn border-2 border-accent font-bold text-accent-text transition-colors hover:bg-accent hover:text-accent-ink" @click="picking = true">
          <AppIcon name="plus" :size="16" /> ใส่ตะกร้า
        </button>
        <div v-else class="mt-2" role="group" :aria-label="`เลือกไซซ์ ${product.name}`">
          <div class="mb-1 flex items-center justify-between text-xs"><span class="font-semibold">เลือกไซซ์</span><button type="button" class="text-muted underline" @click="picking = false">ยกเลิก</button></div>
          <div class="grid grid-cols-5 gap-1">
            <button v-for="z in product.sizes" :key="z" type="button" :disabled="product.soldOutSizes?.includes(z)" class="h-9 rounded-md border border-line text-sm font-semibold tabular-nums hover:border-accent hover:bg-accent hover:text-accent-ink disabled:opacity-30 disabled:line-through" @click="add(z)">{{ z }}</button>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
