<script setup lang="ts">
import type { Product } from '~/types'
import { collections, typeLabels } from '~/data/products'

/** Colour + size selection and purchase actions. Used by the PDP (full) and Quick View (compact). */
const props = withDefaults(defineProps<{ product: Product; compact?: boolean }>(), { compact: false })
const colorIndex = defineModel<number>('color', { default: 0 })

const cart = useCartStore()
const ui = useUiStore()
const size = ref<number | null>(null)
const sizeError = ref(false)
const color = computed(() => props.product.colors[colorIndex.value])
const collection = computed(() => collections.find((c) => props.product.collections.includes(c.slug)))
const soldOut = (s: number) => props.product.soldOutSizes?.includes(s) ?? false
const uid = useId()

function add(buyNow = false) {
  if (size.value === null) { sizeError.value = true; return }
  cart.add({ productId: props.product.id, colorId: color.value.id, size: size.value })
  ui.notify(`เพิ่ม ${props.product.name} ไซซ์ ${size.value} ลงตะกร้าแล้ว`)
  if (buyNow) ui.open('cart')
  else if (props.compact) ui.close()
}
watch(size, () => { sizeError.value = false })
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <p class="eyebrow text-muted">
        <NuxtLink v-if="collection" :to="`/products?collection=${collection.slug}`" class="hover:text-ink">{{ collection.name }}</NuxtLink>
        <span v-if="collection"> · </span>{{ typeLabels[product.type].en }} · {{ product.code }}
      </p>
      <h1 v-if="!compact" class="display-m mt-3">{{ product.name }}</h1>
      <h2 v-else class="display-s mt-2">{{ product.name }}</h2>
      <p class="mt-2 font-thai text-ink-2">{{ product.subtitle }}</p>
      <div class="mt-4 flex items-center gap-4">
        <p class="text-xl font-semibold">
          <span :class="product.compareAt ? 'text-red' : ''">{{ formatPrice(product.price) }}</span>
          <s v-if="product.compareAt" class="ml-2 text-base font-normal text-muted">{{ formatPrice(product.compareAt) }}</s>
        </p>
        <p class="flex items-center gap-1 text-sm text-muted">
          <AppIcon name="star" :size="16" class="fill-ink text-ink" />
          <span class="font-medium text-ink">{{ product.rating }}</span> ({{ product.reviewCount.toLocaleString() }} รีวิว)
        </p>
      </div>
    </div>

    <!-- Colour -->
    <fieldset>
      <legend class="mb-3 text-sm"><span class="font-semibold">สี:</span> {{ color.name }}</legend>
      <div class="flex flex-wrap gap-2">
        <label v-for="(c, i) in product.colors" :key="c.id" class="relative cursor-pointer">
          <input v-model="colorIndex" type="radio" :name="`${uid}-color`" :value="i" class="peer sr-only">
          <span class="block h-10 w-10 rounded-full ring-1 ring-inset ring-black/15 transition peer-checked:outline peer-checked:outline-2 peer-checked:outline-offset-2 peer-checked:outline-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red" :style="{ background: c.hex }" />
          <span class="sr-only">{{ c.name }}</span>
        </label>
      </div>
    </fieldset>

    <!-- Size -->
    <fieldset :aria-describedby="sizeError ? `${uid}-err` : undefined">
      <div class="mb-3 flex items-center justify-between">
        <legend class="text-sm font-semibold">เลือกไซซ์ (EU)</legend>
        <NuxtLink to="/stories/size-guide" class="flex items-center gap-1 text-sm underline underline-offset-4"><AppIcon name="ruler" :size="16" /> Size Guide</NuxtLink>
      </div>
      <div class="grid grid-cols-5 gap-2 sm:grid-cols-6" :class="compact ? '' : 'lg:grid-cols-5 xl:grid-cols-6'">
        <label v-for="s in product.sizes" :key="s" class="relative">
          <input v-model="size" type="radio" :name="`${uid}-size`" :value="s" :disabled="soldOut(s)" class="peer sr-only">
          <span
            class="grid h-12 cursor-pointer place-items-center rounded-[2px] border text-sm font-medium transition peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red peer-disabled:cursor-not-allowed peer-disabled:text-muted peer-disabled:line-through"
            :class="sizeError ? 'border-red' : 'border-line bg-white hover:border-ink'"
          >{{ s }}</span>
        </label>
      </div>
      <p v-if="sizeError" :id="`${uid}-err`" class="mt-2 font-thai text-sm text-red" role="alert">กรุณาเลือกไซซ์ก่อนเพิ่มลงตะกร้า</p>
      <p v-else class="mt-2 flex items-center gap-2 font-thai text-sm text-ink-2">
        <span class="h-2 w-2 rounded-full bg-[#2E8B57]" aria-hidden="true" /> มีสินค้าพร้อมส่ง · จัดส่งภายใน 1–3 วัน
      </p>
    </fieldset>

    <div class="grid gap-3" :class="compact ? 'grid-cols-1' : 'sm:grid-cols-2'">
      <button type="button" class="btn-accent w-full" @click="add(false)"><AppIcon name="bag" :size="18" /> Add to Cart</button>
      <button v-if="!compact" type="button" class="btn-outline w-full" @click="add(true)">Buy Now</button>
      <NuxtLink v-else :to="`/product/${product.slug}`" class="link-arrow justify-center py-2" @click="ui.close()">ดูรายละเอียดสินค้า <AppIcon name="arrow-right" :size="16" class="arrow" /></NuxtLink>
    </div>

    <ul v-if="!compact" class="divide-y divide-line border-y border-line font-thai text-sm">
      <li class="flex items-start gap-3 py-4"><AppIcon name="store" :size="20" class="mt-0.5" /><div><p class="font-semibold">มีที่ร้านใกล้คุณ</p><p class="text-ink-2">พร้อมให้ลองที่ 6 สาขาในกรุงเทพฯ · <NuxtLink to="/stores" class="underline underline-offset-4">ดูสาขา</NuxtLink></p></div></li>
      <li class="flex items-start gap-3 py-4"><AppIcon name="truck" :size="20" class="mt-0.5" /><div><p class="font-semibold">ส่งฟรีเมื่อช้อปครบ ฿599</p><p class="text-ink-2">กรุงเทพฯ 1–2 วัน · ต่างจังหวัด 2–4 วัน</p></div></li>
      <li class="flex items-start gap-3 py-4"><AppIcon name="return" :size="20" class="mt-0.5" /><div><p class="font-semibold">เปลี่ยนไซซ์ได้ภายใน 14 วัน</p><p class="text-ink-2">เปลี่ยนที่ร้านหรือส่งกลับฟรี</p></div></li>
    </ul>
  </div>
</template>
