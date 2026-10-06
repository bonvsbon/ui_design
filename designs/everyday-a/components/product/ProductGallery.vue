<script setup lang="ts">
import type { Media, Product } from '~/types'
/**
 * PDP gallery: pack-shots + a lifestyle image + a detail crop.
 * Desktop: 2-column editorial grid (first image full width). Mobile: swipe with counter.
 */
const props = defineProps<{ product: Product; color: number; lifestyle: Media }>()

type Slide = { kind: 'product'; src: string; alt: string; detail?: boolean } | { kind: 'media'; media: Media }
const slides = computed<Slide[]>(() => {
  const c = props.product.colors[props.color]
  const name = `${props.product.name} สี ${c.name}`
  const s: Slide[] = [{ kind: 'product', src: c.images[0], alt: `${name} มุมหลัก` }]
  if (c.images[1]) s.push({ kind: 'product', src: c.images[1], alt: `${name} มุมข้าง` })
  s.push({ kind: 'media', media: props.lifestyle })
  s.push({ kind: 'product', src: c.images[0], alt: `${name} ภาพรายละเอียดพื้นรองเท้า`, detail: true })
  return s
})

const rail = ref<HTMLElement | null>(null)
const current = ref(0)
function onScroll() {
  const n = rail.value
  if (n) current.value = Math.round(n.scrollLeft / n.clientWidth)
}
watch(() => props.color, () => { rail.value?.scrollTo({ left: 0 }); current.value = 0 })
</script>

<template>
  <div>
    <!-- Mobile swipe -->
    <div class="relative lg:hidden">
      <ul ref="rail" class="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]" aria-label="ภาพสินค้า" @scroll.passive="onScroll">
        <li v-for="(s, n) in slides" :key="n" class="aspect-square w-full shrink-0 snap-start overflow-hidden bg-paper-2">
          <img v-if="s.kind === 'product'" :src="imageUrl(s.src)" :alt="s.alt" :loading="n === 0 ? 'eager' : 'lazy'" class="h-full w-full object-contain mix-blend-multiply" :class="s.detail ? 'scale-[2.1] object-[30%_60%]' : 'p-6'">
          <AppImage v-else :media="s.media" sizes="100vw" :widths="[480, 768, 1080]" />
        </li>
      </ul>
      <p class="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tabular-nums" aria-hidden="true">{{ current + 1 }} / {{ slides.length }}</p>
    </div>

    <!-- Desktop grid -->
    <ul class="hidden grid-cols-2 gap-2 lg:grid" aria-label="ภาพสินค้า">
      <li v-for="(s, n) in slides" :key="n" class="overflow-hidden bg-paper-2" :class="n === 0 ? 'col-span-2 aspect-[4/3]' : 'aspect-square'">
        <img v-if="s.kind === 'product'" :src="imageUrl(s.src)" :alt="s.alt" :loading="n === 0 ? 'eager' : 'lazy'" :fetchpriority="n === 0 ? 'high' : 'auto'" class="h-full w-full object-contain mix-blend-multiply" :class="s.detail ? 'scale-[2.2] object-[30%_60%]' : 'p-10'">
        <AppImage v-else :media="s.media" sizes="30vw" :widths="[480, 768, 1080]" />
      </li>
    </ul>
  </div>
</template>
