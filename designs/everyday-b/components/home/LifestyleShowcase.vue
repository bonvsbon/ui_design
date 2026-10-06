<script setup lang="ts">
import type { HomeSection } from '~/types'
defineProps<{ section: HomeSection }>()
</script>
<template>
  <section class="section container">
    <SectionHeading :title="section.title" :subtitle="section.subtitle" />
    <div class="lifestyle-track">
      <NuxtLink v-for="card in section.cards" :key="card.id" :to="card.href" class="lifestyle-card"
        ><div>
          <ResponsiveImage :media="card.image" :width="650" :height="800" /><AppIcon
            name="upRight"
            :size="24"
          />
        </div>
        <h3>{{ card.title }}</h3>
        <p lang="th">{{ card.subtitle }}</p></NuxtLink
      >
    </div>
  </section>
</template>
