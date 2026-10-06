<script setup lang="ts">
import { technology } from '~/data/content'
defineProps<{ title: string; subtitle?: string }>()

/** Scroll-driven exploded view: progress (0→1) through a tall sticky section separates the sole layers. */
const root = ref<HTMLElement>()
const progress = ref(0)
const reduced = ref(false)
let raf = 0
function measure() {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    const el = root.value
    if (!el) return
    const r = el.getBoundingClientRect()
    const total = r.height - window.innerHeight
    progress.value = Math.min(1, Math.max(0, -r.top / total))
  })
}
onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced.value) { progress.value = 1; return }
  window.addEventListener('scroll', measure, { passive: true })
  measure()
})
onBeforeUnmount(() => window.removeEventListener('scroll', measure))
const layers = technology.layers
const spread = computed(() => Math.min(1, progress.value * 1.6))
const active = computed(() => Math.min(layers.length - 1, Math.floor(Math.max(0, progress.value - 0.15) / 0.85 * layers.length)))
</script>

<template>
  <section id="exploded" ref="root" class="relative h-[320vh] border-b border-line" :class="reduced && '!h-auto'" aria-labelledby="c05-exp-title">
    <div class="sticky top-nav flex h-[calc(100vh-var(--nav-h))] items-center overflow-hidden" :class="reduced && '!static !h-auto py-section'">
      <div class="container-site grid w-full items-center gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent">Technology / {{ technology.name }}</p>
          <h2 id="c05-exp-title" class="mt-3 font-display text-5xl font-medium tracking-tight md:text-6xl">{{ title }}</h2>
          <p class="mt-2 text-muted">{{ subtitle }}</p>
          <ol class="mt-8 space-y-1 font-mono text-sm">
            <li v-for="(l, n) in layers" :key="l.id" class="grid grid-cols-[28px_1fr_auto] gap-3 border-l-2 py-2 pl-3 transition-colors duration-300" :class="n === active ? 'border-accent text-ink' : 'border-line text-muted'">
              <span>0{{ n + 1 }}</span>
              <span><span class="block">{{ l.name }} — {{ l.nameTh }}</span><span v-if="n === active" class="mt-1 block font-[var(--font-body)] text-[13px] text-ink-2">{{ l.caption }}</span></span>
              <span>{{ l.thicknessMm }}mm</span>
            </li>
          </ol>
          <div class="mt-6 h-px w-full bg-line" aria-hidden="true"><div class="h-px bg-accent" :style="{ width: progress * 100 + '%' }" /></div>
        </div>

        <div class="relative h-[52vh] min-h-[320px] [perspective:1400px]" aria-hidden="true">
          <div class="absolute left-1/2 top-[58%] h-0 w-0 [transform-style:preserve-3d]" style="transform: rotateX(58deg) rotateZ(-38deg)">
            <div
              v-for="(l, n) in layers" :key="l.id"
              class="absolute -left-[90px] -top-[210px] h-[420px] w-[180px] transition-[opacity] duration-300 [border-radius:48%_52%_44%_46%/30%_30%_70%_70%]"
              :style="{
                background: l.color,
                transform: `translateZ(${(layers.length - 1 - n) * (8 + spread * 46)}px)`,
                boxShadow: `inset 0 0 0 1px rgba(0,0,0,.15), 0 ${4 + spread * 10}px ${12 + spread * 30}px rgba(0,0,0,.45)`,
                opacity: n === active || progress < 0.12 ? 1 : 0.55,
              }"
            >
              <div v-if="l.id === 'core'" class="h-full w-full opacity-30 [border-radius:inherit]" style="background-image: radial-gradient(circle, rgba(0,0,0,.6) 1.2px, transparent 1.6px); background-size: 9px 9px" />
              <div v-if="l.id === 'grip'" class="h-full w-full opacity-40 [border-radius:inherit]" style="background-image: repeating-linear-gradient(35deg, transparent 0 7px, rgba(255,255,255,.35) 7px 9px)" />
            </div>
          </div>
          <p class="absolute bottom-0 right-0 font-mono text-[11px] uppercase text-muted">Total stack {{ layers.reduce((a, l) => a + l.thicknessMm, 0) }} mm · scroll {{ Math.round(progress * 100) }}%</p>
        </div>
      </div>
    </div>
  </section>
</template>
