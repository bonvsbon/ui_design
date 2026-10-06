<script setup lang="ts">
/** Inline SVG icon set — 24px grid, 1.5px stroke, inherits currentColor. Decorative unless `label` is given. */
const props = withDefaults(defineProps<{ name: string; size?: number | string; label?: string; stroke?: number }>(), { size: 22, stroke: 1.6 })

const paths: Record<string, string> = {
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>',
  user: '<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20.5c1.2-3.8 4-5.6 7.5-5.6s6.3 1.8 7.5 5.6"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.4a4.2 4.2 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20Z"/>',
  bag: '<path d="M5 8h14l-1 12.5H6L5 8Z"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10"/>',
  menu: '<path d="M3.5 7h17M3.5 12h17M3.5 17h11"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  'arrow-right': '<path d="M4 12h15m-5-5 5 5-5 5"/>',
  'arrow-left': '<path d="M20 12H5m5-5-5 5 5 5"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-right': '<path d="m9 6 6 6-6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  home: '<path d="M4 10.5 12 4l8 6.5V20h-5.5v-5.5h-5V20H4v-9.5Z"/>',
  grid: '<rect x="4" y="4" width="6.5" height="6.5"/><rect x="13.5" y="4" width="6.5" height="6.5"/><rect x="4" y="13.5" width="6.5" height="6.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.8"/>',
  truck: '<path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  return: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
  store: '<path d="M4 9.5 5.5 4h13L20 9.5M4 9.5v10.5h16V9.5M4 9.5c0 1.5 1.3 2.5 2.7 2.5s2.6-1 2.6-2.5c0 1.5 1.2 2.5 2.7 2.5s2.7-1 2.7-2.5c0 1.5 1.2 2.5 2.6 2.5S20 11 20 9.5"/><path d="M10 20v-4.5h4V20"/>',
  locate: '<circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3"/>',
  filter: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  star: '<path d="m12 4 2.4 5 5.4.6-4 3.7 1.1 5.3L12 15.9l-4.9 2.7 1.1-5.3-4-3.7 5.4-.6L12 4Z"/>',
  play: '<path d="M8 5.5v13l10.5-6.5L8 5.5Z"/>',
  pause: '<path d="M8 5.5v13M16 5.5v13"/>',
  ruler: '<path d="M3 15.5 15.5 3 21 8.5 8.5 21 3 15.5Z"/><path d="m7 11.5 2 2M10 8.5l1.5 1.5M13 5.5l2 2"/>',
  // GBOLD benefits
  comfort: '<path d="M5 15.5c2.5 2.5 11.5 2.5 14 0"/><path d="M7 12c0-3 2.2-6.5 5-6.5S17 9 17 12"/><path d="M4 19.5h16"/>',
  soft: '<path d="M3.5 14c2-3 4-3 6 0s4 3 6 0 3.5-3 5 0"/><path d="M3.5 9c2-3 4-3 6 0s4 3 6 0 3.5-3 5 0"/>',
  lite: '<path d="M12 3.5c3 3 5.5 6.2 5.5 9.5a5.5 5.5 0 0 1-11 0c0-3.3 2.5-6.5 5.5-9.5Z"/><path d="M12 20v-6l2.5-2.5"/>',
  durable: '<path d="M12 3.5 19.5 6.5v5.2c0 4.3-3.2 7.6-7.5 8.8-4.3-1.2-7.5-4.5-7.5-8.8V6.5L12 3.5Z"/><path d="m8.8 12 2.2 2.2 4.3-4.4"/>',
  // social
  facebook: '<path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 0 1 .5-.5Z" fill="currentColor" stroke="none"/>',
  instagram: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r=".8" fill="currentColor"/>',
  tiktok: '<path d="M14 4v10.5a3.5 3.5 0 1 1-3-3.46M14 4c.4 2.6 2.2 4.3 5 4.5"/>',
  line: '<path d="M12 4.5c-4.7 0-8.5 3-8.5 6.8 0 3.4 3 6.2 7.1 6.7l-.4 2.4 3.8-2.6c3.6-.7 6.5-3.3 6.5-6.5 0-3.8-3.8-6.8-8.5-6.8Z"/>',
  youtube: '<rect x="3" y="6" width="18" height="12" rx="3.5"/><path d="m10.5 9.5 4 2.5-4 2.5v-5Z" fill="currentColor"/>',
}
const svg = computed(() => paths[props.name] ?? '')
</script>

<template>
  <svg
    :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    :stroke-width="stroke" stroke-linecap="round" stroke-linejoin="round"
    :role="label ? 'img' : undefined" :aria-label="label" :aria-hidden="label ? undefined : 'true'"
    focusable="false" class="shrink-0"
    v-html="svg"
  />
</template>
