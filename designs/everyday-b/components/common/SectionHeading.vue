<script setup lang="ts">
import type { CTA } from '~/types'
defineProps<{ title: string; subtitle?: string; cta?: CTA }>()
</script>
<template>
  <div class="section-heading">
    <div>
      <h2>{{ title }}</h2>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    <NuxtLink v-if="cta" :to="cta.href" class="text-link"
      >{{ cta.label }}<AppIcon name="arrow" :size="18" /></NuxtLink
    ><slot />
  </div>
</template>
