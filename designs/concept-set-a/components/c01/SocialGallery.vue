<script setup lang="ts">
defineProps<{ handle: string; items: string[] }>()
</script>

<template>
  <section class="py-section" aria-labelledby="c01-social-title">
    <div class="container-site mb-6 flex flex-wrap items-end justify-between gap-3">
      <h2 id="c01-social-title" class="break-all font-display text-4xl font-black uppercase leading-none md:text-6xl" style="font-stretch: 118%">{{ handle }}</h2>
      <a href="#" class="font-display text-xs font-semibold uppercase tracking-[0.18em] underline underline-offset-4">Follow</a>
    </div>
    <ul class="grid grid-cols-3 gap-1 md:grid-cols-6">
      <li v-for="m in items" :key="m" class="group relative aspect-square overflow-hidden">
        <SmartImg :id="m" :ratio="1" sizes="(min-width:768px) 17vw, 33vw" img-class="grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" />
      </li>
    </ul>
  </section>
</template>
