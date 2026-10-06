<script setup lang="ts">
import { stores } from '~/data/content'
defineProps<{ title: string; subtitle?: string }>()
const region = ref('ทั้งหมด')
const regions = ['ทั้งหมด', ...new Set(stores.map((s) => s.region))]
const list = computed(() => stores.filter((s) => region.value === 'ทั้งหมด' || s.region === region.value))
</script>

<template>
  <section id="stores" class="border-y border-line bg-surface" aria-labelledby="c01-store-title">
    <div class="container-site grid gap-10 py-section lg:grid-cols-[1fr_1.6fr]">
      <div>
        <h2 id="c01-store-title" class="font-display text-4xl font-black uppercase leading-none md:text-6xl" style="font-stretch: 118%">{{ title }}</h2>
        <p class="mt-4 max-w-sm text-muted">{{ subtitle }}</p>
        <label for="c01-region" class="mt-8 block font-display text-[11px] uppercase tracking-[0.2em] text-muted">ภูมิภาค</label>
        <div class="relative mt-2 max-w-xs">
          <select id="c01-region" v-model="region" class="h-12 w-full appearance-none border border-ink bg-transparent px-4 pr-10">
            <option v-for="r in regions" :key="r">{{ r }}</option>
          </select>
          <AppIcon name="chevron-down" class="pointer-events-none absolute right-3 top-3.5" />
        </div>
        <p class="mt-4 text-sm tabular-nums text-muted" aria-live="polite">{{ list.length }} สาขา</p>
      </div>
      <ul class="divide-y divide-line border-y border-line">
        <li v-for="s in list" :key="s.id" class="grid gap-2 py-5 sm:grid-cols-[1.4fr_1fr_auto] sm:items-center">
          <div>
            <p class="font-display text-sm font-bold uppercase tracking-[0.08em]">{{ s.name }}</p>
            <p>{{ s.mall }}, {{ s.province }}</p>
          </div>
          <div class="text-sm text-muted"><p>เปิด {{ s.hours }}</p><p>{{ s.services.join(' · ') }}</p></div>
          <a :href="`https://maps.google.com/?q=${encodeURIComponent(s.mall)}`" target="_blank" rel="noopener" class="inline-flex items-center gap-1 font-display text-xs font-bold uppercase tracking-[0.14em] underline underline-offset-4">Directions <AppIcon name="arrow-up-right" :size="14" /></a>
        </li>
      </ul>
    </div>
  </section>
</template>
