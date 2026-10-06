<script setup lang="ts">
import { categories, products } from '~/data/catalog'
const props = defineProps<{ title: string; items: string[] }>()
const { link } = useConcept()
const list = computed(() => props.items.map((s) => categories.find((c) => c.slug === s)!).filter(Boolean))
function count(c: (typeof categories)[number]) {
  return products.filter((p) => (!c.query.gender || p.genders.includes(c.query.gender as any)) && (!c.query.category || p.category === c.query.category) && (!c.query.badge || p.badges.includes(c.query.badge as any))).length
}
</script>

<template>
  <section class="container-site py-12" aria-labelledby="c04-qs-title">
    <h2 id="c04-qs-title" class="text-2xl font-extrabold md:text-3xl">{{ title }}</h2>
    <ul class="mt-6 grid grid-cols-4 gap-2 sm:gap-3 lg:grid-cols-8">
      <li v-for="c in list" :key="c.slug">
        <NuxtLink :to="link(`/products?${toQuery(c.query)}`)" class="group flex flex-col items-center gap-2 rounded-card p-2 text-center hover:bg-surface">
          <span class="grid aspect-square w-full place-items-center rounded-full bg-surface p-3 transition-transform group-hover:scale-105"><ProductImg :product="{ image: c.image, name: c.label, colors: [] as any }" alt="" /></span>
          <span class="text-sm font-bold leading-tight">{{ c.labelTh }}</span>
          <span class="-mt-1 text-xs text-muted">{{ count(c) }} รุ่น</span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
