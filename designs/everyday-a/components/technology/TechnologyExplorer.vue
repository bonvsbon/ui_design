<script setup lang="ts">
import type { Benefit, Cta } from '~/types'
import { techPoints } from '~/data/technology'
/**
 * Interactive GBOLD™ presentation.
 * Desktop: split screen — exploded sole with hotspots | headline + benefit detail.
 * Mobile: sole with tappable hotspots + swipe cards synced to the active hotspot.
 * Hover, focus, tap and arrow keys all change the active benefit.
 */
withDefaults(defineProps<{ eyebrow?: string; title?: string[]; body?: string; cta?: Cta; headingLevel?: 'h1' | 'h2' }>(), {
  eyebrow: 'GBOLD Technology™', title: () => ['The Comfort', 'Behind', 'Every Step'], headingLevel: 'h2',
})
const active = ref<Benefit>('comfort')
const touched = ref(false)
const point = computed(() => techPoints.find((p) => p.id === active.value)!)
const rail = ref<HTMLElement | null>(null)
const uid = useId()

function select(id: Benefit, scroll = false) {
  active.value = id
  touched.value = true
  if (scroll && rail.value) {
    const idx = techPoints.findIndex((p) => p.id === id)
    const card = rail.value.children[idx] as HTMLElement | undefined
    if (card) rail.value.scrollTo({ left: card.offsetLeft - rail.value.offsetLeft - 16, behavior: 'smooth' })
  }
}
function onKey(e: KeyboardEvent) {
  const idx = techPoints.findIndex((p) => p.id === active.value)
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); select(techPoints[(idx + 1) % 4].id); focusTab((idx + 1) % 4) }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); select(techPoints[(idx + 3) % 4].id); focusTab((idx + 3) % 4) }
}
const tabs = ref<HTMLElement[]>([])
const focusTab = (n: number) => nextTick(() => tabs.value[n]?.focus())

// Mobile: update active card from swipe position
let st: ReturnType<typeof setTimeout> | undefined
function onRailScroll() {
  clearTimeout(st)
  st = setTimeout(() => {
    const n = rail.value
    if (!n) return
    const idx = Math.round(n.scrollLeft / ((n.children[0] as HTMLElement)?.offsetWidth + 12 || 1))
    const p = techPoints[Math.min(3, Math.max(0, idx))]
    if (p) active.value = p.id
  }, 80)
}
</script>

<template>
  <section class="overflow-hidden bg-lagoon py-section text-white" :aria-labelledby="uid">
    <div class="wrap grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-12 lg:gap-8">
      <!-- Copy (top on mobile) -->
      <div class="lg:order-2 lg:col-span-5 lg:col-start-8">
        <p class="eyebrow text-sun">{{ eyebrow }}</p>
        <component :is="headingLevel" :id="uid" class="display-l mt-4">
          <span v-for="l in title" :key="l" class="block">{{ l }}</span>
        </component>
        <p v-if="body" class="mt-6 max-w-md font-thai leading-relaxed text-white/80">{{ body }}</p>

        <!-- Desktop benefit tabs + detail -->
        <div class="mt-10 hidden lg:block">
          <div role="tablist" aria-label="ประโยชน์ของ GBOLD" class="grid grid-cols-4 border-b border-white/20" @keydown="onKey">
            <button
              v-for="(p, n) in techPoints" :id="`${uid}-tab-${p.id}`" :key="p.id" ref="tabs" type="button" role="tab"
              :aria-selected="active === p.id" :aria-controls="`${uid}-panel`" :tabindex="active === p.id ? 0 : -1"
              class="relative flex flex-col items-start gap-2 pb-4 text-left transition-colors" :class="active === p.id ? 'text-white' : 'text-white/55 hover:text-white'"
              @click="select(p.id)" @mouseenter="select(p.id)"
            >
              <AppIcon :name="p.id" :size="26" />
              <span class="text-xs font-semibold uppercase tracking-[0.14em]">{{ p.label }}</span>
              <span class="absolute inset-x-0 -bottom-px h-[2px] bg-sun transition-transform duration-300" :class="active === p.id ? 'scale-x-100' : 'scale-x-0'" />
              <span class="sr-only">{{ n + 1 }} / 4</span>
            </button>
          </div>
          <div :id="`${uid}-panel`" role="tabpanel" :aria-labelledby="`${uid}-tab-${active}`" class="min-h-[140px] pt-6">
            <Transition name="fade" mode="out-in">
              <div :key="active">
                <p class="display-s text-sun">{{ point.label }}</p>
                <p class="mt-2 font-thai text-xl font-semibold">{{ point.title }}</p>
                <p class="mt-2 max-w-md font-thai text-white/75">{{ point.body }}</p>
              </div>
            </Transition>
          </div>
        </div>
        <NuxtLink v-if="cta" :to="cta.to" class="btn-light mt-8 hidden lg:inline-flex">{{ cta.label }}</NuxtLink>
      </div>

      <!-- Visual -->
      <div class="relative lg:order-1 lg:col-span-7">
        <div class="relative mx-auto max-w-[640px] text-white">
          <SoleIllustration :active="touched ? active : null" />
          <button
            v-for="p in techPoints" :key="p.id" type="button"
            class="group absolute -translate-x-1/2 -translate-y-1/2" :style="{ left: `${p.x}%`, top: `${p.y}%` }"
            :aria-label="`${p.label}: ${p.title}`" :aria-pressed="active === p.id"
            @click="select(p.id, true)" @mouseenter="select(p.id)" @focus="select(p.id)"
          >
            <span class="relative grid h-11 w-11 place-items-center">
              <span v-if="!touched" class="hotspot-ring absolute inset-0 rounded-full bg-sun/60" aria-hidden="true" />
              <span class="relative grid h-8 w-8 place-items-center rounded-full border-2 transition-all duration-300" :class="active === p.id ? 'scale-110 border-sun bg-sun text-ink' : 'border-white bg-lagoon text-white group-hover:bg-white group-hover:text-ink'">
                <AppIcon name="plus" :size="16" :stroke="2.2" :class="active === p.id ? 'rotate-45' : ''" class="transition-transform" />
              </span>
            </span>
            <span class="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-[0.14em]" :class="active === p.id ? 'text-sun' : 'text-white/80'">{{ p.label }}</span>
          </button>
        </div>
      </div>

      <!-- Mobile swipe cards -->
      <div class="-mx-gutter lg:hidden">
        <ul ref="rail" class="rail gap-3" aria-label="ประโยชน์ของ GBOLD" @scroll.passive="onRailScroll">
          <li v-for="p in techPoints" :key="p.id" class="w-[78vw] max-w-[340px] rounded-[2px] border p-5 transition-colors" :class="active === p.id ? 'border-sun bg-white/5' : 'border-white/20'">
            <div class="flex items-center gap-3 text-sun"><AppIcon :name="p.id" :size="26" /><span class="display-s">{{ p.label }}</span></div>
            <p class="mt-3 font-thai text-lg font-semibold">{{ p.title }}</p>
            <p class="mt-1 font-thai text-sm text-white/75">{{ p.body }}</p>
          </li>
        </ul>
        <div class="wrap">
          <NuxtLink v-if="cta" :to="cta.to" class="btn-light mt-8 w-full">{{ cta.label }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
