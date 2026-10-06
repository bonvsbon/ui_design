<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<template>
  <div class="-rotate-2 overflow-hidden border-y-4 border-ink bg-accent-2 py-3 text-accent-2-ink" role="region" aria-label="โปรโมชัน">
    <p class="sr-only">{{ items.join(' · ') }}</p>
    <div class="flex w-max animate-[c02-marquee_22s_linear_infinite] whitespace-nowrap font-display text-3xl uppercase md:text-5xl" aria-hidden="true">
      <span v-for="n in 2" :key="n" class="flex"><span v-for="t in [...items, ...items]" :key="t + n" class="px-6">{{ t }} <span class="text-accent">✦</span></span></span>
    </div>
  </div>
</template>
