<script setup lang="ts">
import type { Product } from '~/types'
import { badgeLabels, categoryLabels } from '~/data/catalog'

/** Energetic card: 3D tilt on pointer, colour blob behind product, pill price and in-card quick add. */
const props = withDefaults(defineProps<{ product: Product; tone?: string; big?: boolean; eager?: boolean }>(), { big: false })
const { productLink } = useConcept()
const wish = useWishlist()
const cart = useCart()
const toast = useToast()
const el = ref<HTMLElement>()
const tilt = ref({ x: 0, y: 0 })
const quick = ref(false)
const colorId = ref(props.product.colors[0]!.id)
function onMove(e: PointerEvent) {
  if (e.pointerType !== 'mouse' || !el.value) return
  const r = el.value.getBoundingClientRect()
  tilt.value = { x: ((e.clientY - r.top) / r.height - 0.5) * -10, y: ((e.clientX - r.left) / r.width - 0.5) * 12 }
}
function add(z: number) {
  cart.add(props.product, colorId.value, z)
  toast.show(`⚡ เพิ่ม ${props.product.name} ไซซ์ ${z} แล้ว`)
  quick.value = false
}
const off = computed(() => discountPercent(props.product.price, props.product.compareAt))
const blob = computed(() => props.tone ?? props.product.colors.find((c) => c.id === colorId.value)!.hex)
</script>

<template>
  <article
    ref="el" class="group relative flex h-full flex-col overflow-hidden rounded-card bg-surface p-3 transition-transform duration-200 ease-out will-change-transform md:p-4"
    :style="{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }"
    @pointermove="onMove" @pointerleave="tilt = { x: 0, y: 0 }"
  >
    <div class="relative grid flex-1 place-items-center overflow-hidden rounded-media" :class="big ? 'min-h-[300px] md:min-h-[420px]' : 'aspect-square'">
      <span class="absolute inset-[12%] rounded-full opacity-35 blur-2xl transition-all duration-500 group-hover:inset-[4%] group-hover:opacity-60" :style="{ background: blob }" aria-hidden="true" />
      <NuxtLink :to="productLink(product.slug)" class="relative z-[1] block w-[86%] -rotate-6 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110" :aria-label="product.name">
        <ProductImg :product="product" :color-id="colorId" :eager="eager" />
      </NuxtLink>
      <ul class="absolute left-0 top-0 z-[2] flex flex-wrap gap-1">
        <li v-for="b in product.badges" :key="b" class="rounded-full px-2.5 py-1 text-[11px] font-extrabold italic uppercase" :class="b === 'sale' ? 'bg-sale text-white' : b === 'new' ? 'bg-accent text-accent-ink' : 'bg-ink text-bg'">{{ b === 'sale' ? `-${off}%` : badgeLabels[b] }}</li>
      </ul>
      <button type="button" class="absolute right-0 top-0 z-[2] grid h-10 w-10 place-items-center rounded-full bg-white" :aria-pressed="wish.has(product.slug)" :aria-label="`รายการโปรด ${product.name}`" @click="wish.toggle(product.slug)">
        <AppIcon name="heart" :size="18" :class="wish.has(product.slug) && 'fill-sale text-sale'" />
      </button>
    </div>
    <div class="mt-3 flex items-end justify-between gap-2">
      <div class="min-w-0">
        <p class="text-xs font-semibold uppercase text-muted">{{ categoryLabels[product.category] }}</p>
        <h3 class="truncate font-display text-2xl uppercase leading-none md:text-3xl"><NuxtLink :to="productLink(product.slug)">{{ product.name }}</NuxtLink></h3>
        <div class="mt-2 flex gap-1">
          <button v-for="c in product.colors" :key="c.id" type="button" class="h-5 w-5 rounded-full border-2" :class="colorId === c.id ? 'border-ink' : 'border-white'" :style="{ background: c.hex }" :aria-label="c.name" :aria-pressed="colorId === c.id" @click="colorId = c.id" />
        </div>
      </div>
      <div class="flex shrink-0 flex-col items-end gap-1">
        <s v-if="product.compareAt" class="text-xs text-muted">{{ formatPrice(product.compareAt) }}</s>
        <span class="rounded-full px-3 py-1 font-bold tabular-nums" :class="product.compareAt ? 'bg-sale text-white' : 'bg-accent text-accent-ink'">{{ formatPrice(product.price) }}</span>
      </div>
    </div>
    <button type="button" class="mt-3 flex h-11 items-center justify-center gap-2 rounded-btn bg-ink font-bold text-bg transition-colors hover:bg-accent-2" :aria-expanded="quick" @click="quick = !quick">
      <AppIcon :name="quick ? 'close' : 'plus'" :size="18" /> {{ quick ? 'ปิด' : 'เลือกไซซ์ด่วน' }}
    </button>
    <Transition name="fade">
      <div v-if="quick" class="mt-2 flex flex-wrap gap-1.5">
        <button v-for="z in product.sizes" :key="z" type="button" :disabled="product.soldOutSizes?.includes(z)" class="h-9 min-w-10 rounded-full border-2 border-ink px-2 text-sm font-bold tabular-nums hover:bg-accent disabled:border-line disabled:text-muted disabled:line-through" @click="add(z)">{{ z }}</button>
      </div>
    </Transition>
  </article>
</template>
