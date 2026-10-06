<script setup lang="ts">
const props = defineProps<{ title: string; limit?: number }>()
const { bestSellers } = useCatalog()
const { link } = useConcept()
const list = computed(() => bestSellers.value.slice(0, props.limit ?? 8))
</script>

<template>
  <section class="container-site py-12" aria-labelledby="c04-best-title">
    <div class="flex items-end justify-between">
      <h2 id="c04-best-title" class="text-2xl font-extrabold md:text-3xl">{{ title }}</h2>
      <NuxtLink :to="link('/products?sort=best')" class="text-sm font-bold text-accent-text">ดูทั้งหมด →</NuxtLink>
    </div>
    <ul class="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      <li v-for="p in list" :key="p.id"><C04ProductCard :product="p" /></li>
    </ul>
  </section>
</template>
