<script setup lang="ts">
const { products } = useCatalog()
useSeoMeta({ title: 'GBOLD Technology | The comfort behind every step' })
</script>
<template>
  <div>
    <nav class="breadcrumbs container" aria-label="Breadcrumb">
      <NuxtLink to="/">Home</NuxtLink><AppIcon name="right" :size="12" /><span
        >GBOLD Technology</span
      >
    </nav>
    <TechnologyExplorer standalone />
    <section class="technology-story section container">
      <h2>SMALL DETAILS.<br />EVERYDAY DIFFERENCE.</h2>
      <div>
        <p lang="th">เบา นุ่ม สบาย และทนทาน คือสิ่งที่เราอยากให้คุณรู้สึกในทุกก้าว</p>
        <p>
          GBOLD is GAMBOL’s approach to everyday comfort. A soft touch, light construction, and a
          considered shape come together in footwear made for regular wear.
        </p>
        <p>
          Pick a pair that fits your foot and your day. Explore the material, try the shape, and
          make it part of your everyday.
        </p>
        <NuxtLink to="/stores" class="text-link"
          >FEEL IT FOR YOURSELF<AppIcon name="arrow" :size="18"
        /></NuxtLink>
      </div>
    </section>
    <div class="section container">
      <ProductCarousel
        title="FIND YOUR FEEL-GOOD PAIR."
        :products="products.filter((p) => p.technology === 'GBOLD').slice(0, 6)"
        :cta="{ label: 'SHOP GBOLD', href: '/products?technology=GBOLD' }"
      />
    </div>
  </div>
</template>
