<script setup lang="ts">
/** GAMBOL wordmark (concept rendering — replace with the official SVG from brand assets). */
withDefaults(defineProps<{ inverted?: boolean }>(), { inverted: false })
</script>

<template>
  <span class="inline-flex items-center gap-2" :class="inverted ? 'text-white' : 'text-ink'">
    <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true" class="shrink-0">
      <circle cx="16" cy="16" r="16" fill="var(--red)" />
      <path d="M22.6 11.2A8 8 0 1 0 24 16h-7.6" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" />
    </svg>
    <span class="text-[1.35rem] font-extrabold uppercase leading-none tracking-[0.06em]" style="font-stretch: 112%">Gambol</span>
  </span>
</template>
