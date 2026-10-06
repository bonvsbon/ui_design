<script setup lang="ts">
import type { HomeSection } from '~/types'
defineProps<{ section: HomeSection }>()
</script>
<template>
  <section :id="section.id" class="section container category-section">
    <SectionHeading :title="section.title" :subtitle="section.subtitle" />
    <div class="category-grid">
      <NuxtLink
        v-for="card in section.cards"
        :key="card.id"
        :to="card.href"
        class="category-card"
        :class="`category-${card.id}`"
        ><div class="category-photo">
          <ResponsiveImage :media="card.image" :width="650" :height="800" />
        </div>
        <div class="category-caption">
          <h3>{{ card.title }}</h3>
          <span>SHOP NOW<AppIcon name="upRight" :size="19" /></span></div
      ></NuxtLink>
    </div>
  </section>
</template>
