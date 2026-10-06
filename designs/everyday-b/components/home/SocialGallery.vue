<script setup lang="ts">
import type { HomeSection } from '~/types'
defineProps<{ section: HomeSection }>()
</script>
<template>
  <section class="social-section section container">
    <div class="social-heading">
      <h2>{{ section.title }}</h2>
      <p>{{ section.subtitle }}</p>
      <span>Your everyday looks good on you.</span>
    </div>
    <div class="social-grid">
      <NuxtLink v-for="card in section.cards" :key="card.id" :to="card.href"
        ><ResponsiveImage :media="card.image" :width="600" :height="700" />
        <div>
          <span>{{ card.title }}</span
          ><span>VIEW STYLE<AppIcon name="upRight" :size="20" /></span></div
      ></NuxtLink>
    </div>
  </section>
</template>
