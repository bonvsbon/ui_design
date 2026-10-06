<script setup lang="ts">
import { sortOptions } from '~/composables/useProductFilters'
import { categoryLabels } from '~/data/catalog'
definePageMeta({ layout: 'c02' })
const f = useProductFilters()
const sheet = ref(false)
useOverlay(sheet)
const quick = [
  { label: 'ทั้งหมด', patch: { category: null, gender: null, badge: null } },
  { label: 'ผู้ชาย', patch: { gender: 'men' } },
  { label: 'ผู้หญิง', patch: { gender: 'women' } },
  { label: 'เด็ก', patch: { gender: 'kids' } },
  ...Object.entries(categoryLabels).map(([k, v]) => ({ label: v, patch: { category: k } })),
  { label: 'ลดราคา', patch: { badge: 'sale' } },
]
useHead({ title: () => `${f.heading.value.en} — GAMBOL` })
</script>

<template>
  <div>
    <header class="relative overflow-hidden bg-inverse text-inverse-ink">
      <div class="absolute -right-20 top-0 h-full w-1/2 -skew-x-[18deg] bg-accent-2" aria-hidden="true" />
      <div class="container-site relative flex flex-wrap items-end justify-between gap-6 py-12 md:py-16">
        <h1 class="font-display uppercase leading-[0.82]" style="font-size: clamp(64px, 12vw, 180px)">{{ f.heading.value.en }}</h1>
        <div class="grid h-28 w-28 shrink-0 -rotate-12 place-items-center rounded-full bg-accent text-center text-accent-ink" aria-live="polite">
          <span><span class="block font-display text-5xl leading-none">{{ f.results.value.length }}</span><span class="text-xs font-bold uppercase">คู่</span></span>
        </div>
      </div>
    </header>

    <div class="sticky top-[calc(var(--nav-h)+30px)] z-30 border-b-[3px] border-ink bg-bg">
      <div class="container-site flex items-center gap-3 py-3">
        <button type="button" class="flex h-11 shrink-0 items-center gap-2 rounded-full bg-ink px-5 font-extrabold italic uppercase text-bg" @click="sheet = true">
          <AppIcon name="filter" :size="18" /> Filters <span v-if="f.activeChips.value.length" class="grid h-6 min-w-6 place-items-center rounded-full bg-accent px-1 text-xs not-italic text-accent-ink">{{ f.activeChips.value.length }}</span>
        </button>
        <div class="no-scrollbar flex flex-1 gap-2 overflow-x-auto">
          <button v-for="q in quick" :key="q.label" type="button" class="h-11 shrink-0 rounded-full border-2 border-ink px-4 font-bold hover:bg-accent" @click="f.setQuery(q.patch as any)">{{ q.label }}</button>
        </div>
        <label for="c02-sort" class="sr-only">เรียงตาม</label>
        <select id="c02-sort" :value="f.sort.value" class="hidden h-11 rounded-full border-2 border-ink bg-surface px-4 font-bold md:block" @change="f.setSort(($event.target as HTMLSelectElement).value as any)">
          <option v-for="o in sortOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
        </select>
      </div>
    </div>

    <div class="container-site py-8">
      <ul v-if="f.activeChips.value.length" class="mb-6 flex flex-wrap gap-2">
        <li v-for="c in f.activeChips.value" :key="c.key + c.value"><button type="button" class="inline-flex h-9 items-center gap-1 rounded-full bg-accent-2 px-4 font-bold text-accent-2-ink" @click="f.removeChip(c)">{{ c.label }} <AppIcon name="close" :size="14" /></button></li>
        <li><button type="button" class="h-9 px-3 font-bold underline" @click="f.clearAll()">ล้าง</button></li>
      </ul>
      <div v-if="!f.results.value.length" class="rounded-card border-[3px] border-dashed border-ink py-20 text-center">
        <p class="font-display text-5xl uppercase">NO MATCH!</p>
        <p class="mt-2 font-semibold">ลองลดตัวกรองหรือค้นหาคำอื่น</p>
        <button type="button" class="mt-6 h-12 rounded-full bg-accent px-6 font-extrabold italic uppercase text-accent-ink" @click="f.clearAll()">ล้างตัวกรอง</button>
      </div>
      <ul v-else class="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
        <li v-for="(p, n) in f.results.value" :key="p.id"><C02ProductCard :product="p" :eager="n < 4" /></li>
      </ul>
    </div>

    <Teleport to="body">
      <Transition name="fade"><div v-if="sheet" class="fixed inset-0 z-[60] bg-black/50" @click="sheet = false" /></Transition>
      <Transition name="slide-up">
        <div v-if="sheet" role="dialog" aria-modal="true" aria-labelledby="c02-sheet-title" class="fixed inset-x-0 bottom-0 z-[61] mx-auto flex max-h-[88vh] max-w-3xl flex-col rounded-t-[32px] border-[3px] border-b-0 border-ink bg-bg text-ink">
          <div class="flex items-center justify-between px-6 pb-2 pt-5">
            <h2 id="c02-sheet-title" class="font-display text-4xl uppercase">Filters</h2>
            <button type="button" class="grid h-11 w-11 place-items-center rounded-full bg-ink text-bg" aria-label="ปิด" @click="sheet = false"><AppIcon name="close" /></button>
          </div>
          <div class="overflow-y-auto px-6">
            <div class="flex flex-wrap gap-2 border-b border-line py-4 md:hidden">
              <button v-for="o in sortOptions" :key="o.value" type="button" class="h-10 rounded-full border-2 px-4 font-bold" :class="f.sort.value === o.value ? 'border-ink bg-ink text-bg' : 'border-line'" @click="f.setSort(o.value)">{{ o.label }}</button>
            </div>
            <FilterControls :open="['gender', 'category', 'activity', 'size', 'color']" />
          </div>
          <div class="grid grid-cols-[auto_1fr] gap-3 border-t-[3px] border-ink p-4">
            <button type="button" class="h-14 rounded-full border-[3px] border-ink px-6 font-bold" @click="f.clearAll()">ล้าง</button>
            <button type="button" class="h-14 rounded-full bg-accent text-lg font-extrabold italic uppercase text-accent-ink" @click="sheet = false">ดู {{ f.results.value.length }} คู่</button>
          </div>
        </div>
      </Transition>
    </Teleport>
    <PrototypeBar />
  </div>
</template>
