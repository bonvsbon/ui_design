<script setup lang="ts">
import { concepts } from '~/data/concepts'
useHead({ title: 'GAMBOL — Design library' })

const entries = [
  { id: 'concept-01', title: 'Modern Minimal', tags: ['Premium', 'Clean'], image: '/images/hero-campaign.jpg' },
  { id: 'concept-03', title: 'Lifestyle Editorial', tags: ['Lifestyle', 'Visual'], image: '/images/product-4.png' },
  { id: 'concept-04', title: 'Smart Commerce', tags: ['Conversion', 'Simple'], image: '' },
].map((e) => ({ ...e, concept: concepts.find((c) => c.id === e.id)! }))
</script>
<template>
  <main id="main" class="overview-page library-page">
    <div class="container">
      <div class="overview-header">
        <div>
          <span class="small-label" style="margin-bottom: 22px">GAMBOL / DESIGN LIBRARY</span>
          <h1>Design library.</h1>
        </div>
        <p>
          Three directions ready for review. Open a preview to walk through the full storefront and
          shopping journey.
        </p>
      </div>
      <ul class="library-grid">
        <li v-for="e in entries" :key="e.id" class="concept-preview-card">
          <div :class="['concept-preview-art', 'preview-' + e.concept.number]" aria-hidden="true">
            <img v-if="e.image" :src="e.image" alt="" width="850" height="500" /><span
              >CONCEPT {{ e.concept.number }}</span
            ><strong>{{ e.concept.name }}</strong>
            <div v-if="!e.image" class="preview-mini-finder">
              <span>Who are you shopping for?</span><b>Men</b><b>Women</b><b>Kids</b>
            </div>
          </div>
          <div class="concept-preview-info library-info">
            <h2>{{ e.title }}</h2>
            <p class="library-tags">
              <span v-for="t in e.tags" :key="t">{{ t }}</span>
            </p>
            <NuxtLink :to="'/' + e.id" class="library-preview" :aria-label="'Preview ' + e.title"
              >Preview<AppIcon name="arrow" :size="16"
            /></NuxtLink>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>
