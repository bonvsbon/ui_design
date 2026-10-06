<script setup lang="ts">
import type { HomeSection } from '~/types'
defineProps<{ section: HomeSection }>()
</script>
<template>
  <section class="hero-product">
    <div class="container hero-product-inner">
      <div class="hero-product-photo">
        <span class="product-watermark">EZY.</span
        ><ResponsiveImage v-if="section.media" :media="section.media" :width="800" :height="750" />
      </div>
      <div class="hero-product-copy">
        <span class="red-label">GAMBOL EVERYDAY FAVOURITE</span>
        <h2>{{ section.title }}</h2>
        <h3>{{ section.subtitle }}</h3>
        <p>{{ section.body }}</p>
        <div class="benefit-inline">
          <span><AppIcon name="feather" />LIGHTWEIGHT</span
          ><span><AppIcon name="cloud" />SOFT FOOTBED</span
          ><span><AppIcon name="footprints" />EVERYDAY COMFORT</span>
        </div>
        <NuxtLink v-if="section.cta" :to="section.cta.href" class="button primary"
          >{{ section.cta.label }}<AppIcon name="arrow" :size="18"
        /></NuxtLink>
      </div>
    </div>
  </section>
</template>
