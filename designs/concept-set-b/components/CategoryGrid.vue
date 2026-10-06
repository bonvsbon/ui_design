<script setup lang="ts">
const { base } = useConcept()
const categories = [
  { name: 'Men', note: 'Your everyday essentials', image: '/images/product-2.png' },
  { name: 'Women', note: 'Comfort, your way', image: '/images/product-4.png' },
  { name: 'Kids', note: 'Little feet, big adventures', image: '/images/kids.jpg' },
  { name: 'Sneakers', note: 'Made for the city', image: '/images/gambol-sneaker.png' },
]
</script>
<template>
  <section class="category-section container section-space">
    <div class="section-heading">
      <h2>Good days start here.</h2>
      <NuxtLink :to="base + '/products'" class="text-link"
        >Find your pair<AppIcon name="right" :size="18"
      /></NuxtLink>
    </div>
    <div class="category-grid">
      <NuxtLink
        v-for="c in categories"
        :key="c.name"
        :to="base + '/products?category=' + c.name"
        class="category-card"
        ><img
          :src="c.image"
          :alt="c.name + ' footwear collection'"
          width="650"
          height="750"
          loading="lazy" />
        <div class="category-caption">
          <div>
            <h3>{{ c.name }}</h3>
            <p>{{ c.note }}</p>
          </div>
          <span class="round-arrow"><AppIcon name="arrow" /></span></div
      ></NuxtLink>
    </div>
  </section>
</template>
