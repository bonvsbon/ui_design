<script setup lang="ts">
import { categories, products } from '~/data/catalog'
const props = defineProps<{ title: string; items: string[] }>()
const { link } = useConcept()
const list = computed(() => props.items.map((s) => categories.find((c) => c.slug === s)!).filter(Boolean))
const hovered = ref<string | null>(null)
const y = ref(0)
function countFor(c: (typeof categories)[number]) {
  return products.filter((p) => (c.query.gender ? p.genders.includes(c.query.gender as any) : true) && (c.query.category ? p.category === c.query.category : true)).length
}
function href(c: (typeof categories)[number]) { return link(`/products?${toQuery(c.query)}`) }
function onMove(e: MouseEvent) { y.value = e.clientY - (e.currentTarget as HTMLElement).getBoundingClientRect().top }
const preview = computed(() => list.value.find((c) => c.slug === hovered.value))
</script>

<template>
  <section class="container-site py-section" aria-labelledby="c01-cat-title">
    <div class="mb-8 flex items-end justify-between border-b border-ink pb-4">
      <h2 id="c01-cat-title" class="font-display text-xs font-semibold uppercase tracking-[0.24em]">{{ title }}</h2>
      <NuxtLink :to="link('/products')" class="font-display text-xs font-semibold uppercase tracking-[0.18em] underline-offset-4 hover:underline">All products</NuxtLink>
    </div>

    <!-- Desktop: typographic index with floating product preview -->
    <div class="relative hidden md:block" @mousemove="onMove" @mouseleave="hovered = null">
      <ul>
        <li v-for="(c, n) in list" :key="c.slug" class="border-b border-line">
          <NuxtLink :to="href(c)" class="group grid grid-cols-[60px_1fr_auto] items-center gap-6 py-4" @mouseenter="hovered = c.slug" @focus="hovered = c.slug">
            <span class="font-display text-xs tabular-nums text-muted">{{ String(n + 1).padStart(2, '0') }}</span>
            <span class="font-display font-black uppercase leading-none tracking-[-0.01em] transition-[letter-spacing,color] duration-500 group-hover:tracking-[0.02em] group-hover:text-accent-text" style="font-size: clamp(48px, 7vw, 112px); font-stretch: 120%">{{ c.label }}</span>
            <span class="text-right text-sm text-muted"><span class="block text-ink">{{ c.labelTh }}</span>{{ countFor(c) }} styles</span>
          </NuxtLink>
        </li>
      </ul>
      <div
        v-if="preview" aria-hidden="true"
        class="pointer-events-none absolute right-[22%] z-10 aspect-square w-64 -translate-y-1/2 bg-surface p-6 shadow-pop transition-[top] duration-200 ease-out"
        :style="{ top: y + 'px' }"
      ><ProductImg :product="{ image: preview.image, name: preview.label, colors: [] as any }" alt="" /></div>
    </div>

    <!-- Mobile: two-up plates -->
    <ul class="grid grid-cols-2 gap-2 md:hidden">
      <li v-for="c in list" :key="c.slug">
        <NuxtLink :to="href(c)" class="block bg-surface p-3">
          <div class="aspect-square"><ProductImg :product="{ image: c.image, name: c.label, colors: [] as any }" alt="" /></div>
          <p class="mt-2 font-display text-lg font-black uppercase" style="font-stretch: 115%">{{ c.label }}</p>
          <p class="text-xs text-muted">{{ c.labelTh }} · {{ countFor(c) }} styles</p>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
