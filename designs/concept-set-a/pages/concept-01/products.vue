<script setup lang="ts">
import { sortOptions } from '~/composables/useProductFilters'
definePageMeta({ layout: 'c01' })

const f = useProductFilters()
const { link } = useConcept()
const filtersOpen = ref(false)
useOverlay(filtersOpen)
const dense = ref(false)
const tabs = [
  { label: 'All', to: '/products' },
  { label: 'Men', to: '/products?gender=men' },
  { label: 'Women', to: '/products?gender=women' },
  { label: 'Kids', to: '/products?gender=kids' },
  { label: 'Sneakers', to: '/products?category=sneakers' },
  { label: 'Slides', to: '/products?category=slides' },
  { label: 'Flip-flops', to: '/products?category=flip-flops' },
  { label: 'New', to: '/products?badge=new' },
]
const route = useRoute()
const isTab = (to: string) => {
  const q = new URLSearchParams(to.split('?')[1] ?? '')
  const keys = [...q.keys()]
  if (!keys.length) return !Object.keys(route.query).some((k) => ['gender', 'category', 'badge'].includes(k))
  return keys.every((k) => route.query[k] === q.get(k))
}
useHead({ title: () => `${f.heading.value.en} — GAMBOL` })
</script>

<template>
  <div>
    <header class="container-site pb-6 pt-10 md:pt-16">
      <nav aria-label="breadcrumb" class="font-display text-[11px] uppercase tracking-[0.2em] text-muted">
        <NuxtLink :to="link('/')" class="hover:text-ink">Home</NuxtLink> / <span aria-current="page">{{ f.heading.value.en }}</span>
      </nav>
      <div class="mt-4 flex flex-wrap items-end justify-between gap-4">
        <h1 class="font-display font-black uppercase leading-[0.85]" style="font-size: clamp(52px, 10vw, 150px); font-stretch: 120%">{{ f.heading.value.en }}</h1>
        <p class="pb-2 text-muted"><span class="text-ink">{{ f.heading.value.th }}</span> · <span class="tabular-nums" aria-live="polite">{{ f.results.value.length }} รายการ</span></p>
      </div>
    </header>

    <div class="sticky top-nav z-30 border-y border-line bg-bg">
      <div class="container-site flex items-center gap-4">
        <nav aria-label="หมวดหมู่" class="no-scrollbar flex flex-1 gap-5 overflow-x-auto">
          <NuxtLink v-for="t in tabs" :key="t.label" :to="link(t.to)" class="shrink-0 border-b-2 py-4 font-display text-xs font-bold uppercase tracking-[0.14em]" :class="isTab(t.to) ? 'border-ink' : 'border-transparent text-muted hover:text-ink'">{{ t.label }}</NuxtLink>
        </nav>
        <div class="hidden items-center gap-1 border-l border-line pl-4 md:flex">
          <label for="c01-sort" class="sr-only">เรียงตาม</label>
          <select id="c01-sort" :value="f.sort.value" class="h-10 bg-transparent font-display text-xs font-bold uppercase tracking-[0.1em]" @change="f.setSort(($event.target as HTMLSelectElement).value as any)">
            <option v-for="o in sortOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
          </select>
          <button type="button" class="ml-2 hidden h-10 px-2 text-xs lg:block" :aria-pressed="dense" @click="dense = !dense">{{ dense ? '▦ 4' : '▥ 3' }}</button>
        </div>
        <button type="button" class="flex h-10 shrink-0 items-center gap-2 bg-ink px-4 font-display text-xs font-bold uppercase tracking-[0.14em] text-bg" @click="filtersOpen = true">
          <AppIcon name="filter" :size="16" /> Filter<span v-if="f.activeChips.value.length" class="tabular-nums">({{ f.activeChips.value.length }})</span>
        </button>
      </div>
    </div>

    <div class="container-site py-6">
      <ul v-if="f.activeChips.value.length" class="mb-6 flex flex-wrap items-center gap-2" aria-label="ตัวกรองที่เลือก">
        <li v-for="c in f.activeChips.value" :key="c.key + c.value">
          <button type="button" class="inline-flex h-8 items-center gap-2 border border-ink px-3 text-sm" :aria-label="`นำตัวกรอง ${c.label} ออก`" @click="f.removeChip(c)">{{ c.label }} <AppIcon name="close" :size="14" /></button>
        </li>
        <li><button type="button" class="ml-2 text-sm underline" @click="f.clearAll()">ล้างทั้งหมด</button></li>
      </ul>

      <div v-if="!f.results.value.length" class="py-24 text-center">
        <p class="font-display text-3xl font-black uppercase" style="font-stretch: 115%">No matches</p>
        <p class="mt-2 text-muted">ไม่พบสินค้าที่ตรงกับตัวกรอง ลองลดเงื่อนไขลง</p>
        <button type="button" class="mt-6 h-12 bg-ink px-6 font-display text-xs font-bold uppercase tracking-[0.16em] text-bg" @click="f.clearAll()">ล้างตัวกรอง</button>
      </div>
      <ul v-else class="grid grid-cols-2 gap-x-3 gap-y-12 md:gap-x-5" :class="dense ? 'lg:grid-cols-4' : 'lg:grid-cols-3'">
        <template v-for="(p, n) in f.results.value" :key="p.id">
          <li><C01ProductCard :product="p" :eager="n < 4" /></li>
          <li v-if="n === 3 && f.results.value.length > 6" class="col-span-2 lg:col-span-1">
            <NuxtLink :to="link('/products?collection=city-walk-26')" class="group relative block h-full min-h-[320px] overflow-hidden bg-inverse text-inverse-ink">
              <SmartImg id="bangkokSoi" sizes="(min-width:1024px) 33vw, 100vw" img-class="absolute inset-0 grayscale opacity-70 transition-transform duration-700 group-hover:scale-105" />
              <span class="absolute inset-x-5 bottom-5">
                <span class="block font-display text-[11px] uppercase tracking-[0.2em]">Collection</span>
                <span class="mt-1 block font-display text-4xl font-black uppercase leading-none" style="font-stretch: 118%">City Walk ’26</span>
                <span class="mt-3 inline-flex items-center gap-2 text-sm">ดูคอลเลกชัน <AppIcon name="arrow" :size="16" /></span>
              </span>
            </NuxtLink>
          </li>
        </template>
      </ul>
    </div>

    <!-- Filter drawer -->
    <Teleport to="body">
      <Transition name="fade"><div v-if="filtersOpen" class="fixed inset-0 z-[60] bg-black/40" @click="filtersOpen = false" /></Transition>
      <Transition name="slide-r">
        <aside v-if="filtersOpen" role="dialog" aria-modal="true" aria-labelledby="c01-filter-title" class="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-bg text-ink">
          <header class="flex h-nav items-center justify-between border-b border-line px-6">
            <h2 id="c01-filter-title" class="font-display text-sm font-bold uppercase tracking-[0.2em]">Filter & sort</h2>
            <button type="button" class="grid h-10 w-10 place-items-center" aria-label="ปิดตัวกรอง" @click="filtersOpen = false"><AppIcon name="close" /></button>
          </header>
          <div class="flex-1 overflow-y-auto px-6">
            <div class="border-b border-line py-4 md:hidden">
              <p class="mb-2 font-semibold">เรียงตาม</p>
              <div class="flex flex-wrap gap-2">
                <button v-for="o in sortOptions" :key="o.value" type="button" class="h-9 border px-3 text-sm" :class="f.sort.value === o.value ? 'border-ink bg-ink text-bg' : 'border-line'" @click="f.setSort(o.value)">{{ o.label }}</button>
              </div>
            </div>
            <FilterControls />
          </div>
          <footer class="grid grid-cols-2 gap-3 border-t border-line p-6">
            <button type="button" class="h-12 border border-ink font-display text-xs font-bold uppercase tracking-[0.14em]" @click="f.clearAll()">Clear</button>
            <button type="button" class="h-12 bg-ink font-display text-xs font-bold uppercase tracking-[0.14em] text-bg" @click="filtersOpen = false">Show {{ f.results.value.length }}</button>
          </footer>
        </aside>
      </Transition>
    </Teleport>
    <PrototypeBar />
  </div>
</template>
