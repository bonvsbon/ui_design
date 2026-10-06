<script setup lang="ts">
const { base } = useConcept()
const lifestyles = [
  {
    name: 'City days',
    filter: 'Everyday',
    image: '/images/city.jpg',
    note: 'From your first coffee to the last train.',
  },
  {
    name: 'Weekend mode',
    filter: 'Weekend',
    image: '/images/product-1.png',
    note: 'A little less rush. A little more you.',
  },
  {
    name: 'Out of office',
    filter: 'Travel',
    image: '/images/beach.jpg',
    note: 'For the plans you haven’t made yet.',
  },
]
</script>
<template>
  <section class="container section-space lifestyle-section">
    <div class="section-heading">
      <h2>Whatever your kind of day.</h2>
      <p>A pair for every plan. And no plans at all.</p>
    </div>
    <div class="lifestyle-grid">
      <NuxtLink
        v-for="l in lifestyles"
        :key="l.name"
        :to="base + '/products?occasion=' + l.filter"
        class="lifestyle-card"
        ><img :src="l.image" :alt="l.name" width="650" height="680" loading="lazy" />
        <div>
          <h3>{{ l.name }}</h3>
          <p>{{ l.note }}</p>
          <span class="text-link">Explore the edit <AppIcon name="arrow" :size="16" /></span></div
      ></NuxtLink>
    </div>
  </section>
</template>
