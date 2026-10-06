<script setup lang="ts">
import type { Cta } from '~/types'
/** Shared section heading: English display title + Thai subtitle + optional CTA (right on desktop). */
defineProps<{ title: string; subtitle?: string; cta?: Cta; eyebrow?: string; id?: string; dark?: boolean }>()
</script>

<template>
  <div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
    <div>
      <p v-if="eyebrow" class="eyebrow mb-3" :class="dark ? 'text-white/70' : 'text-red'">{{ eyebrow }}</p>
      <h2 :id="id" class="display-m text-balance">{{ title }}</h2>
      <p v-if="subtitle" class="thai-lead mt-3" :class="dark ? 'text-white/75' : 'text-ink-2'">{{ subtitle }}</p>
    </div>
    <NuxtLink v-if="cta" :to="cta.to" class="link-arrow shrink-0" :class="dark ? 'text-white' : ''">
      {{ cta.label }} <AppIcon name="arrow-right" :size="16" class="arrow" />
    </NuxtLink>
  </div>
</template>
