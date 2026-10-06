<script setup lang="ts">
import type { Product } from '~/types'
/**
 * Horizontal product rail: native scroll-snap (touch) + drag & arrow buttons (mouse/keyboard).
 * `peek` controls card width per breakpoint.
 */
const props = withDefaults(defineProps<{ products: Product[]; label: string; variant?: 'default' | 'wide' }>(), { variant: 'default' })
const rail = ref<HTMLElement | null>(null)
const { scrollByPage } = useDragScroll(rail)

const atStart = ref(true)
const atEnd = ref(false)
function update() {
  const n = rail.value
  if (!n) return
  atStart.value = n.scrollLeft < 8
  atEnd.value = n.scrollLeft + n.clientWidth > n.scrollWidth - 8
}
onMounted(update)
const itemCls = computed(() => props.variant === 'wide'
  ? 'w-[64vw] sm:w-[40vw] md:w-[30vw] lg:w-[calc((100%-3*1.25rem)/3.4)]'
  : 'w-[62vw] sm:w-[38vw] md:w-[29vw] lg:w-[calc((min(100vw,1440px)-2*var(--gutter)-3*1.25rem)/4.3)]')
</script>

<template>
  <div class="relative">
    <ul ref="rail" class="rail gap-5 pb-2" :aria-label="label" @scroll.passive="update">
      <li v-for="(p, i) in products" :key="p.id" :class="itemCls">
        <ProductCard :product="p" />
      </li>
    </ul>
    <div class="wrap mt-6 hidden justify-end gap-2 lg:flex">
      <button type="button" class="grid h-11 w-11 place-items-center rounded-full border border-ink/25 transition hover:border-ink disabled:opacity-30" :disabled="atStart" aria-label="เลื่อนไปก่อนหน้า" @click="scrollByPage(-1)">
        <AppIcon name="arrow-left" :size="18" />
      </button>
      <button type="button" class="grid h-11 w-11 place-items-center rounded-full border border-ink/25 transition hover:border-ink disabled:opacity-30" :disabled="atEnd" aria-label="เลื่อนไปถัดไป" @click="scrollByPage(1)">
        <AppIcon name="arrow-right" :size="18" />
      </button>
    </div>
  </div>
</template>
