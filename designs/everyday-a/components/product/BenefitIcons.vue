<script setup lang="ts">
import type { Benefit } from '~/types'
/** GBOLD benefit row — same four icons everywhere the technology is mentioned. */
const props = withDefaults(defineProps<{ benefits?: Benefit[]; dark?: boolean }>(), { benefits: () => ['comfort', 'soft', 'lite', 'durable'] })
const all: { id: Benefit; label: string; th: string }[] = [
  { id: 'comfort', label: 'Comfort', th: 'รองรับเท้า' },
  { id: 'soft', label: 'Soft', th: 'นุ่ม' },
  { id: 'lite', label: 'Lightweight', th: 'เบา' },
  { id: 'durable', label: 'Durable', th: 'ทนทาน' },
]
const items = computed(() => all.map((b) => ({ ...b, on: props.benefits.includes(b.id) })))
</script>

<template>
  <ul class="grid grid-cols-4 gap-2">
    <li v-for="b in items" :key="b.id" class="flex flex-col items-center gap-2 text-center" :class="b.on ? '' : 'opacity-35'">
      <span class="grid h-12 w-12 place-items-center rounded-full" :class="dark ? 'bg-white/10 text-white' : 'bg-paper-2 text-ink'">
        <AppIcon :name="b.id" :size="24" />
      </span>
      <span class="text-[0.7rem] font-semibold uppercase tracking-[0.1em]">{{ b.label }}</span>
      <span class="sr-only">{{ b.on ? 'มี' : 'ไม่มี' }}</span>
    </li>
  </ul>
</template>
