<script setup lang="ts">
import { technology } from '~/data/content'
defineProps<{ title: string; subtitle?: string }>()

/** Press-and-hold "squish" demo: compresses a foam block, then releases with each material's rebound. */
const material = ref<'gbold' | 'eva'>('gbold')
const pressed = ref(false)
const pressure = ref(0)
const settled = ref(1)
let raf = 0
let start = 0
const spec = computed(() => (material.value === 'gbold'
  ? { name: 'G-BOLD', rebound: 62, recover: 0.18, ease: 'cubic-bezier(.34,1.56,.64,1)', dur: 450, rest: 1 }
  : { name: 'EVA ทั่วไป', rebound: 44, recover: 0.9, ease: 'cubic-bezier(.22,.61,.36,1)', dur: 1400, rest: 0.94 }))

function down() {
  if (pressed.value) return
  pressed.value = true
  start = performance.now()
  const tick = (t: number) => {
    pressure.value = Math.min(1, (t - start) / 900)
    if (pressed.value) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
}
function up() {
  if (!pressed.value) return
  pressed.value = false
  cancelAnimationFrame(raf)
  settled.value = spec.value.rest
  setTimeout(() => (pressure.value = 0), 10)
}
watch(material, () => (settled.value = 1))
const scale = computed(() => (pressed.value ? 1 - pressure.value * 0.5 : settled.value))

const visible = ref(false)
const root = ref<HTMLElement>()
onMounted(() => {
  const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { visible.value = true; io.disconnect() } }, { threshold: 0.3 })
  if (root.value) io.observe(root.value)
})
</script>

<template>
  <section id="technology" ref="root" class="relative mt-section overflow-hidden bg-inverse text-inverse-ink" aria-labelledby="c02-tech-title">
    <div class="container-site grid gap-12 py-section lg:grid-cols-2">
      <div>
        <p class="inline-block -skew-x-6 bg-accent px-3 py-1 text-sm font-extrabold italic uppercase text-accent-ink">{{ technology.name }} TECHNOLOGY</p>
        <h2 id="c02-tech-title" class="mt-4 font-display text-7xl uppercase leading-[0.85] md:text-9xl">{{ title }}</h2>
        <p class="mt-4 max-w-md text-lg text-white/80">{{ subtitle }}</p>

        <div class="mt-6 inline-flex rounded-full bg-white/10 p-1" role="radiogroup" aria-label="เลือกวัสดุเพื่อเปรียบเทียบ">
          <button v-for="m in (['gbold', 'eva'] as const)" :key="m" type="button" role="radio" :aria-checked="material === m" class="h-10 rounded-full px-5 font-bold" :class="material === m ? 'bg-accent text-accent-ink' : 'text-white/70'" @click="material = m">{{ m === 'gbold' ? 'G-BOLD' : 'EVA ทั่วไป' }}</button>
        </div>

        <!-- Foam block -->
        <div class="mt-8 flex items-end gap-6">
          <div class="relative h-64 w-full max-w-sm select-none" aria-hidden="true">
            <div class="absolute inset-x-0 bottom-0 flex flex-col justify-end" :style="{ height: '100%' }">
              <div class="h-4 rounded-t-xl bg-[#e9e3d6]" />
              <div
                class="relative origin-bottom overflow-hidden rounded-sm"
                :style="{ height: '160px', transform: `scaleY(${scale})`, transition: pressed ? 'transform 60ms linear' : `transform ${spec.dur}ms ${spec.ease}`, background: material === 'gbold' ? 'var(--accent)' : '#bdbdb3' }"
              >
                <div class="absolute inset-0 opacity-40" style="background-image: radial-gradient(circle at 30% 40%, rgba(0,0,0,.35) 0 3px, transparent 4px), radial-gradient(circle at 70% 70%, rgba(0,0,0,.3) 0 2px, transparent 3px); background-size: 22px 22px, 16px 16px" />
              </div>
              <div class="h-6 rounded-b-xl bg-[#2b2b2b]" />
            </div>
            <div class="absolute left-1/2 top-0 -translate-x-1/2 transition-transform" :style="{ transform: `translate(-50%, ${pressed ? pressure * 80 : 0}px)` }">
              <div class="h-10 w-28 rounded-full bg-white/90" />
            </div>
          </div>
          <button
            type="button" class="grid h-32 w-32 shrink-0 select-none place-items-center rounded-full border-4 border-accent text-center font-display text-2xl uppercase leading-none transition-transform active:scale-95"
            :class="pressed ? 'bg-accent text-accent-ink' : ''"
            :aria-label="`กดค้างเพื่อทดสอบการคืนตัวของ ${spec.name}`"
            @pointerdown.prevent="down" @pointerup="up" @pointerleave="up" @pointercancel="up"
            @keydown.space.prevent="down" @keyup.space.prevent="up" @keydown.enter.prevent="down" @keyup.enter.prevent="up"
          >{{ pressed ? 'HOLD…' : 'PRESS & HOLD' }}</button>
        </div>
        <dl class="mt-6 grid max-w-sm grid-cols-2 gap-3" aria-live="polite">
          <div class="rounded-card bg-white/10 p-4"><dt class="text-xs font-bold uppercase text-white/60">Rebound</dt><dd class="font-display text-5xl">{{ spec.rebound }}%</dd></div>
          <div class="rounded-card bg-white/10 p-4"><dt class="text-xs font-bold uppercase text-white/60">คืนตัวใน</dt><dd class="font-display text-5xl">{{ spec.recover }}s</dd></div>
        </dl>
      </div>

      <ul class="grid content-center gap-4">
        <li v-for="(b, n) in technology.benefits" :key="b.id" class="rounded-card bg-white p-5 text-ink" :style="{ transitionDelay: `${n * 120}ms` }" :class="['transition-all duration-700', visible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0']">
          <div class="flex items-baseline justify-between gap-4">
            <div><p class="font-display text-3xl uppercase leading-none">{{ b.label }}</p><p class="text-sm font-semibold text-muted">{{ b.labelTh }} · {{ b.claim }}</p></div>
            <p class="shrink-0 font-display text-5xl leading-none">{{ b.metric }}<span class="ml-1 text-lg">{{ b.unit }}</span></p>
          </div>
          <div class="mt-3 h-4 overflow-hidden rounded-full bg-surface-2" role="img" :aria-label="`ดีกว่า EVA ทั่วไป ${b.vsStandard}% ของค่าอ้างอิง`">
            <div class="h-full rounded-full transition-[width] duration-1000 ease-out" :class="n % 2 ? 'bg-accent-2' : 'bg-accent'" :style="{ width: visible ? `${Math.min(100, Math.abs(100 - b.vsStandard) * 2 + 30)}%` : '0%', transitionDelay: `${300 + n * 150}ms` }" />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
