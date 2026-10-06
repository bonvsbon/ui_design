<script setup lang="ts">
import { categories } from '~/data/catalog'
const props = defineProps<{ items: string[] }>()
const { link } = useConcept()
const list = computed(() => props.items.map((s) => categories.find((c) => c.slug === s)!).filter(Boolean))
const tones = ['var(--accent)', 'var(--accent-2)', '#ff7a45', '#b9a6ff', '#7cf0c5', 'var(--ink)']
const inks = ['var(--accent-ink)', 'var(--accent-2-ink)', '#0a0a0a', '#0a0a0a', '#0a0a0a', 'var(--bg)']
</script>

<template>
  <nav aria-label="หมวดหมู่ด่วน" class="relative z-10 -mt-8">
    <ul class="no-scrollbar flex snap-x gap-3 overflow-x-auto px-gutter pb-4 pt-2">
      <li v-for="(c, n) in list" :key="c.slug" class="snap-start">
        <NuxtLink
          :to="link(`/products?${toQuery(c.query)}`)"
          class="flex h-20 items-center gap-3 rounded-full py-2 pl-2 pr-6 shadow-pop transition-transform hover:-translate-y-1 hover:-rotate-2"
          :style="{ background: tones[n % tones.length], color: inks[n % inks.length] }"
        >
          <span class="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-white p-1.5"><ProductImg :product="{ image: c.image, name: c.label, colors: [] as any }" alt="" /></span>
          <span class="whitespace-nowrap">
            <span class="block font-display text-2xl uppercase leading-none">{{ c.label }}</span>
            <span class="block text-xs font-semibold">{{ c.labelTh }}</span>
          </span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
