<script setup lang="ts">
import { stores } from '~/data/content'
defineProps<{ title: string }>()
const region = ref('')
const regions = [...new Set(stores.map((s) => s.region))]
const list = computed(() => stores.filter((s) => !region.value || s.region === region.value))
</script>

<template>
  <section id="stores" class="container-site py-12" aria-labelledby="c04-st-title">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <h2 id="c04-st-title" class="text-2xl font-extrabold md:text-3xl">{{ title }}</h2>
      <div><label for="c04-region" class="mr-2 text-sm text-muted">ภูมิภาค</label>
        <select id="c04-region" v-model="region" class="h-10 rounded-btn border border-line bg-bg px-3"><option value="">ทั้งหมด</option><option v-for="r in regions" :key="r">{{ r }}</option></select>
      </div>
    </div>
    <ul class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="s in list" :key="s.id" class="rounded-card border border-line p-4">
        <p class="font-bold">{{ s.mall }}</p>
        <p class="text-sm text-muted">{{ s.province }} · {{ s.hours }}</p>
        <p class="mt-2 flex flex-wrap gap-1"><span v-for="sv in s.services" :key="sv" class="rounded bg-surface px-2 py-0.5 text-xs">{{ sv }}</span></p>
        <a :href="`https://maps.google.com/?q=${encodeURIComponent(s.mall)}`" target="_blank" rel="noopener" class="mt-3 inline-flex items-center gap-1 text-sm font-bold text-accent-text">นำทาง <AppIcon name="arrow-up-right" :size="14" /></a>
      </li>
    </ul>
  </section>
</template>
