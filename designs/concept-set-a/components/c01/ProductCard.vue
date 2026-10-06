<script setup lang="ts">
import type { Product } from '~/types'
import { badgeLabels, categoryLabels } from '~/data/catalog'

/** Editorial product card: square plate, uppercase wide name, hover swaps to alternate angle and reveals quick-add sizes. */
const props = withDefaults(defineProps<{ product: Product; index?: number; large?: boolean; eager?: boolean }>(), { large: false })
const { productLink } = useConcept()
const wish = useWishlist()
const cart = useCart()
const toast = useToast()
const colorId = ref(props.product.colors[0]!.id)
const off = computed(() => discountPercent(props.product.price, props.product.compareAt))
function quickAdd(size: number) {
  cart.add(props.product, colorId.value, size)
  toast.show(`เพิ่ม ${props.product.name} ไซซ์ ${size} ลงตะกร้าแล้ว`)
}
</script>

<template>
  <article class="group relative">
    <div class="relative overflow-hidden bg-surface" :class="large ? 'aspect-[4/5] md:aspect-auto md:h-full' : 'aspect-[4/5]'">
      <NuxtLink :to="productLink(product.slug)" class="absolute inset-0 grid place-items-center p-[8%]" :aria-label="`${product.name} ${product.subtitle}`">
        <ProductImg :product="product" :color-id="colorId" :eager="eager" class="transition-opacity duration-500 group-hover:opacity-0" />
        <ProductImg :product="product" :color-id="colorId" view="mirror" alt="" class="absolute inset-0 !h-full !w-full scale-95 p-[8%] opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100" />
      </NuxtLink>
      <ul class="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1">
        <li v-for="b in product.badges" :key="b" class="font-display text-[10px] font-bold uppercase tracking-[0.14em]" :class="b === 'sale' ? 'bg-accent px-1.5 py-0.5 text-accent-ink' : 'bg-ink px-1.5 py-0.5 text-bg'">{{ b === 'sale' && off ? `-${off}%` : badgeLabels[b] }}</li>
      </ul>
      <button
        type="button" class="absolute right-2 top-2 grid h-10 w-10 place-items-center"
        :aria-pressed="wish.has(product.slug)" :aria-label="wish.has(product.slug) ? `นำ ${product.name} ออกจากรายการโปรด` : `เพิ่ม ${product.name} ในรายการโปรด`"
        @click="wish.toggle(product.slug)"
      ><AppIcon name="heart" :class="wish.has(product.slug) && 'fill-ink'" /></button>
      <!-- Quick add (desktop hover / keyboard focus) -->
      <div class="absolute inset-x-0 bottom-0 hidden translate-y-full bg-bg p-3 transition-transform duration-300 group-focus-within:translate-y-0 group-hover:translate-y-0 lg:block">
        <p class="mb-2 font-display text-[10px] uppercase tracking-[0.18em] text-muted">Quick add — EU</p>
        <div class="flex flex-wrap gap-1">
          <button v-for="z in product.sizes" :key="z" type="button" :disabled="product.soldOutSizes?.includes(z)" class="h-8 min-w-9 border border-line px-1.5 text-xs tabular-nums hover:border-ink hover:bg-ink hover:text-bg disabled:line-through disabled:opacity-30" :aria-label="`เพิ่มไซซ์ ${z} ลงตะกร้า`" @click="quickAdd(z)">{{ z }}</button>
        </div>
      </div>
    </div>
    <div class="mt-3 flex items-start justify-between gap-3">
      <div class="min-w-0">
        <p v-if="index != null" class="font-display text-[11px] tabular-nums text-muted">{{ String(index + 1).padStart(2, '0') }}</p>
        <h3 class="font-display text-[15px] font-bold uppercase leading-tight tracking-[0.02em]" style="font-stretch: 110%"><NuxtLink :to="productLink(product.slug)" class="hover:underline">{{ product.name }}</NuxtLink></h3>
        <p class="truncate text-sm text-muted">{{ categoryLabels[product.category] }}</p>
      </div>
      <p class="shrink-0 text-right text-sm tabular-nums">
        <span :class="product.compareAt ? 'text-sale' : ''">{{ formatPrice(product.price) }}</span>
        <s v-if="product.compareAt" class="block text-xs text-muted">{{ formatPrice(product.compareAt) }}</s>
      </p>
    </div>
    <div class="mt-2 flex items-center gap-1.5" role="radiogroup" :aria-label="`สีของ ${product.name}`">
      <button
        v-for="c in product.colors" :key="c.id" type="button" role="radio" :aria-checked="colorId === c.id" :aria-label="c.name" :title="c.name"
        class="h-3.5 w-3.5 rounded-full ring-offset-2 ring-offset-bg" :class="colorId === c.id ? 'ring-1 ring-ink' : ''" :style="{ background: c.hex }"
        @click="colorId = c.id"
      />
      <span class="ml-1 text-xs text-muted">{{ product.colors.length }} สี</span>
    </div>
  </article>
</template>
