<script setup lang="ts">
import type { Badge } from '~/types'
const props = defineProps<{ badge: Badge }>()
const map: Record<Badge, { label: string; cls: string }> = {
  'best-seller': { label: 'Best Seller', cls: 'bg-ink text-paper' },
  new: { label: 'New', cls: 'bg-red text-white' },
  'online-exclusive': { label: 'Online Exclusive', cls: 'bg-lagoon text-white' },
}
const b = computed(() => map[props.badge])
</script>

<template>
  <span class="inline-block px-2 py-1 text-[0.65rem] font-semibold uppercase leading-none tracking-[0.12em]" :class="b.cls">{{ b.label }}</span>
</template>
