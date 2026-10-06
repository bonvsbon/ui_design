<script setup lang="ts">
import { technology } from '~/data/content'
defineProps<{ title: string }>()

// Comfort — synthetic plantar-pressure map (heel + forefoot peaks); G-BOLD flattens peaks ~32%
const mode = ref<'eva' | 'gbold'>('gbold')
const COLS = 9, ROWS = 20
const cells = computed(() => {
  const out: { on: boolean; v: number }[] = []
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
    const nx = (x - 4) / 4.4, ny = (y - 9.5) / 10
    const width = ny < -0.3 ? 0.95 : ny > 0.5 ? 0.7 : 0.8 - Math.abs(ny) * 0.1
    const on = nx * nx / (width * width) + ny * ny < 1
    const heel = Math.exp(-((nx) ** 2 + ((ny - 0.75) / 0.25) ** 2))
    const fore = Math.exp(-(((nx + 0.1) / 0.7) ** 2 + ((ny + 0.5) / 0.22) ** 2))
    let v = Math.min(1, heel * 1.1 + fore * 0.9 + 0.12)
    if (mode.value === 'gbold') v = 0.12 + (v - 0.12) * 0.62
    out.push({ on, v })
  }
  return out
})
function heat(v: number) {
  const stops = [[38, 40, 44], [90, 110, 120], [255, 181, 71], [255, 110, 64]]
  const t = v * (stops.length - 1), i = Math.min(stops.length - 2, Math.floor(t)), f = t - i
  const c = stops[i]!.map((s, k) => Math.round(s + (stops[i + 1]![k]! - s) * f))
  return `rgb(${c.join(',')})`
}

// Durable — animated flex-cycle counter
const cycles = ref(0)
const root = ref<HTMLElement>()
onMounted(() => {
  const io = new IntersectionObserver(([e]) => {
    if (!e?.isIntersecting) return
    io.disconnect()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { cycles.value = 50000; return }
    const start = performance.now()
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 2200)
      cycles.value = Math.round(50000 * (1 - Math.pow(1 - k, 3)))
      if (k < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, { threshold: 0.3 })
  if (root.value) io.observe(root.value)
})
const weights = technology.comparison.find((c) => c.unit === 'g')!
const b = Object.fromEntries(technology.benefits.map((x) => [x.id, x]))
</script>

<template>
  <section id="technology" ref="root" class="paper py-section" aria-labelledby="c05-ben-title">
    <div class="container-site">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">Performance / visualised</p>
      <h2 id="c05-ben-title" class="mt-3 font-display text-5xl font-medium tracking-tight md:text-6xl">{{ title }}</h2>

      <div class="mt-10 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
        <!-- Comfort -->
        <article class="bg-surface p-6 md:p-8">
          <header class="flex items-start justify-between gap-4">
            <div><p class="font-mono text-xs uppercase text-muted">01 · Comfort · สบาย</p><p class="mt-1 font-display text-4xl">{{ b.comfort.metric }}{{ b.comfort.unit }}</p><p class="text-sm text-muted">{{ b.comfort.claim }}</p></div>
            <div class="inline-flex rounded-btn border border-line p-0.5 font-mono text-xs" role="radiogroup" aria-label="เปรียบเทียบแรงกด">
              <button v-for="m in (['eva', 'gbold'] as const)" :key="m" type="button" role="radio" :aria-checked="mode === m" class="h-8 rounded-[2px] px-3" :class="mode === m ? 'bg-ink text-bg' : ''" @click="mode = m">{{ m === 'eva' ? 'EVA' : 'G-BOLD' }}</button>
            </div>
          </header>
          <div class="mt-6 flex items-end gap-6">
            <div class="grid gap-[2px]" :style="{ gridTemplateColumns: `repeat(${COLS}, 14px)` }" role="img" :aria-label="`แผนที่แรงกดฝ่าเท้า (${mode === 'gbold' ? 'G-BOLD' : 'EVA'})`">
              <span v-for="(c, i) in cells" :key="i" class="h-[14px] w-[14px] rounded-[2px] transition-colors duration-500" :style="{ background: c.on ? heat(c.v) : 'transparent' }" />
            </div>
            <div class="font-mono text-[11px] text-muted">
              <div class="h-28 w-3 rounded-[2px]" style="background: linear-gradient(to top, rgb(38,40,44), rgb(90,110,120), rgb(255,181,71), rgb(255,110,64))" />
              <p class="mt-1">kPa</p>
            </div>
          </div>
        </article>

        <!-- Soft -->
        <article class="bg-surface p-6 md:p-8">
          <p class="font-mono text-xs uppercase text-muted">02 · Soft · นุ่ม</p><p class="mt-1 font-display text-4xl">{{ b.soft.metric }} <span class="text-lg">{{ b.soft.unit }}</span></p><p class="text-sm text-muted">{{ b.soft.claim }}</p>
          <svg viewBox="0 0 300 160" class="mt-6 w-full" role="img" aria-label="กราฟการยุบตัวเทียบแรงกด: G-BOLD ยุบตัวรับแรงได้มากกว่าในช่วงแรกแล้วแน่นขึ้น">
            <g font-family="IBM Plex Mono, monospace" font-size="8" fill="currentColor" class="text-muted">
              <path d="M30 10 V140 H290" stroke="currentColor" stroke-width=".8" fill="none" />
              <text x="30" y="155">0</text><text x="250" y="155">LOAD →</text><text x="2" y="14">DEFORM</text>
            </g>
            <path d="M30 140 C 80 120, 140 100, 290 70" stroke="#9a9993" stroke-width="2" fill="none" stroke-dasharray="4 3" />
            <path d="M30 140 C 60 80, 120 52, 290 38" stroke="#c77700" stroke-width="2.5" fill="none" />
            <g font-family="IBM Plex Mono, monospace" font-size="9"><text x="200" y="32" fill="#8a5300">G-BOLD</text><text x="220" y="88" fill="#55565a">EVA</text></g>
          </svg>
        </article>

        <!-- Light -->
        <article class="bg-surface p-6 md:p-8">
          <p class="font-mono text-xs uppercase text-muted">03 · Lightweight · เบา</p><p class="mt-1 font-display text-4xl">{{ b.light.metric }} <span class="text-lg">{{ b.light.unit }}</span></p><p class="text-sm text-muted">{{ b.light.claim }} — ราว ๆ แอปเปิ้ลหนึ่งลูก</p>
          <ul class="mt-6 space-y-3 font-mono text-sm">
            <li v-for="row in [{ k: 'G-BOLD', v: weights.gbold }, { k: 'EVA', v: weights.eva }, { k: 'RUBBER', v: weights.rubber }]" :key="row.k" class="grid grid-cols-[70px_1fr_56px] items-center gap-3">
              <span :class="row.k === 'G-BOLD' && 'text-accent-text'">{{ row.k }}</span>
              <span class="h-3 rounded-[2px] bg-surface-2"><span class="block h-full rounded-[2px]" :class="row.k === 'G-BOLD' ? 'bg-[#c77700]' : 'bg-[#9a9993]'" :style="{ width: (row.v / weights.rubber) * 100 + '%' }" /></span>
              <span class="text-right tabular-nums">{{ row.v }} g</span>
            </li>
          </ul>
        </article>

        <!-- Durable -->
        <article class="bg-surface p-6 md:p-8">
          <p class="font-mono text-xs uppercase text-muted">04 · Durable · ทนทาน</p><p class="mt-1 font-display text-4xl">{{ b.durable.metric }} <span class="text-lg">{{ b.durable.unit }}</span></p><p class="text-sm text-muted">{{ b.durable.claim }}</p>
          <div class="mt-6 flex items-center gap-6">
            <svg viewBox="0 0 120 120" class="h-32 w-32 -rotate-90" role="img" :aria-label="`ทดสอบงอพับ ${cycles.toLocaleString()} รอบ`">
              <circle cx="60" cy="60" r="50" stroke="var(--surface-2)" stroke-width="10" fill="none" />
              <circle cx="60" cy="60" r="50" stroke="#c77700" stroke-width="10" fill="none" :stroke-dasharray="314" :stroke-dashoffset="314 - (cycles / 50000) * 314" />
            </svg>
            <div class="font-mono"><p class="text-4xl tabular-nums">{{ cycles.toLocaleString() }}</p><p class="text-xs uppercase text-muted">flex cycles · no crack</p></div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
