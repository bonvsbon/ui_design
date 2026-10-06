<script setup lang="ts">
import type { Benefit } from '~/types'
/**
 * Exploded GBOLD™ sole — four stacked layers (Footbed / Core / Arch / Outsole).
 * Pure SVG so it is sharp at any size and can highlight the active layer.
 */
defineProps<{ active?: Benefit | null }>()
const layers: { id: Benefit; y: number; top: string; side: string; pattern?: 'dots' | 'waves' | 'arch' }[] = [
  { id: 'comfort', y: 104, top: '#F4EFE6', side: '#CFC6B6', pattern: 'dots' },
  { id: 'soft', y: 212, top: '#E8463A', side: '#A82C22' },
  { id: 'lite', y: 320, top: '#F3C443', side: '#C0961F', pattern: 'arch' },
  { id: 'durable', y: 428, top: '#262420', side: '#0B0A08', pattern: 'waves' },
]
const sole = 'M0,-195 C52,-195 82,-150 82,-90 C82,-30 60,0 60,45 C60,98 75,128 75,150 C75,184 45,203 0,203 C-45,203 -75,184 -75,150 C-75,120 -52,90 -56,45 C-60,0 -86,-38 -82,-98 C-78,-158 -52,-195 0,-195 Z'
</script>

<template>
  <svg viewBox="0 0 600 540" class="h-auto w-full" role="img" aria-labelledby="sole-t">
    <title id="sole-t">ภาพแยกชั้นพื้นรองเท้า GBOLD™ สี่ชั้น: แผ่นรองเท้า โฟมแกนกลาง โครงรับอุ้งเท้า และพื้นนอก</title>
    <defs>
      <pattern id="p-dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="2.2" fill="#D9D0C0" /></pattern>
      <pattern id="p-waves" width="28" height="16" patternUnits="userSpaceOnUse"><path d="M0 8 Q7 0 14 8 T28 8" fill="none" stroke="#4A463E" stroke-width="3" /></pattern>
      <clipPath id="sole-clip"><path :d="sole" /></clipPath>
    </defs>
    <!-- guide line -->
    <line x1="300" y1="70" x2="300" y2="470" stroke="currentColor" stroke-opacity=".25" stroke-dasharray="4 6" />
    <g v-for="l in [...layers].reverse()" :key="l.id" :transform="`translate(300 ${l.y}) scale(1 .42) rotate(-52)`" class="transition-opacity duration-500" :opacity="!active || active === l.id ? 1 : 0.38">
      <path :d="sole" :fill="l.side" transform="translate(-14 26)" />
      <path :d="sole" :fill="l.side" transform="translate(-7 13)" />
      <path :d="sole" :fill="l.top" />
      <rect v-if="l.pattern === 'dots'" x="-100" y="-210" width="200" height="420" fill="url(#p-dots)" clip-path="url(#sole-clip)" />
      <rect v-if="l.pattern === 'waves'" x="-100" y="-210" width="200" height="420" fill="url(#p-waves)" clip-path="url(#sole-clip)" />
      <path v-if="l.pattern === 'arch'" d="M-30,-60 C-60,0 -40,60 -20,90 L20,90 C10,40 10,-10 30,-60 Z" fill="#FFF3C4" opacity=".7" />
      <path v-if="l.id === 'comfort'" d="M-12,-150 C0,-160 12,-150 0,-120 Z" fill="#D42A1E" />
    </g>
  </svg>
</template>
