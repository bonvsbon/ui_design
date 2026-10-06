<script setup lang="ts">
import { sortOptions } from '~/composables/useProductFilters'
definePageMeta({ layout: 'c04' })
const f = useProductFilters()
const { link } = useConcept()
const sheet = ref(false)
useOverlay(sheet)
const listView = ref(false)
useHead({ title: () => `${f.heading.value.th} — GAMBOL` })
</script>

<template>
  <div class="container-site pb-12">
    <nav aria-label="breadcrumb" class="py-4 text-sm text-muted">
      <NuxtLink :to="link('/')" class="hover:text-ink">หน้าแรก</NuxtLink> / <span aria-current="page" class="text-ink">{{ f.heading.value.th }}</span>
    </nav>
    <div class="flex flex-wrap items-end justify-between gap-3">
      <h1 class="text-3xl font-extrabold tracking-tight md:text-4xl">{{ f.heading.value.th }} <span class="text-lg font-semibold text-muted">({{ f.results.value.length }})</span></h1>
    </div>

    <div class="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside class="hidden lg:block" aria-label="ตัวกรอง">
        <div class="sticky top-[150px] max-h-[calc(100vh-170px)] overflow-y-auto pr-2">
          <div class="flex items-center justify-between"><p class="font-bold">ตัวกรอง</p><button v-if="f.activeChips.value.length" type="button" class="text-sm font-semibold text-accent-text" @click="f.clearAll()">ล้างทั้งหมด</button></div>
          <FilterControls :open="['gender', 'category', 'activity', 'size', 'color', 'tech', 'collection']" />
        </div>
      </aside>

      <div>
        <div class="sticky top-[118px] z-20 -mx-gutter flex items-center gap-2 border-b border-line bg-bg px-gutter py-2 md:static md:mx-0 md:border-0 md:px-0 md:py-0">
          <button type="button" class="flex h-10 flex-1 items-center justify-center gap-2 rounded-btn border border-line font-semibold lg:hidden" @click="sheet = true"><AppIcon name="filter" :size="16" /> ตัวกรอง <span v-if="f.activeChips.value.length" class="rounded-full bg-accent px-1.5 text-xs text-accent-ink">{{ f.activeChips.value.length }}</span></button>
          <p class="hidden text-sm text-muted md:block" aria-live="polite">แสดง {{ f.results.value.length }} รายการ</p>
          <div class="ml-auto flex flex-1 items-center justify-end gap-2 md:flex-none">
            <label for="c04-sort" class="hidden text-sm text-muted md:block">เรียงตาม</label>
            <select id="c04-sort" :value="f.sort.value" class="h-10 w-full rounded-btn border border-line bg-bg px-3 font-semibold md:w-auto" @change="f.setSort(($event.target as HTMLSelectElement).value as any)">
              <option v-for="o in sortOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
            </select>
            <div class="hidden rounded-btn border border-line p-0.5 md:flex" role="group" aria-label="มุมมอง">
              <button type="button" class="grid h-8 w-8 place-items-center rounded-md" :class="!listView && 'bg-surface'" :aria-pressed="!listView" aria-label="ตาราง" @click="listView = false"><AppIcon name="grid" :size="16" /></button>
              <button type="button" class="grid h-8 w-8 place-items-center rounded-md" :class="listView && 'bg-surface'" :aria-pressed="listView" aria-label="รายการ" @click="listView = true"><AppIcon name="menu" :size="16" /></button>
            </div>
          </div>
        </div>
        <ul v-if="f.activeChips.value.length" class="mt-4 flex flex-wrap gap-2">
          <li v-for="c in f.activeChips.value" :key="c.key + c.value"><button type="button" class="inline-flex h-8 items-center gap-1 rounded-chip border border-accent bg-[#eef3ff] px-3 text-sm font-semibold text-accent-text" @click="f.removeChip(c)">{{ c.label }} <AppIcon name="close" :size="12" /></button></li>
        </ul>
        <div v-if="!f.results.value.length" class="mt-10 rounded-card border border-dashed border-line p-10 text-center">
          <p class="text-xl font-bold">ไม่พบสินค้าที่ตรงกับตัวกรอง</p>
          <p class="mt-1 text-muted">ลองเอาตัวกรองบางอันออก หรือใช้ “Find Your Pair” ให้เราแนะนำ</p>
          <div class="mt-5 flex justify-center gap-2"><button type="button" class="h-11 rounded-btn border border-line px-5 font-semibold" @click="f.clearAll()">ล้างตัวกรอง</button><NuxtLink :to="link('/')" class="inline-flex h-11 items-center rounded-btn bg-accent px-5 font-semibold text-accent-ink">Find Your Pair</NuxtLink></div>
        </div>
        <ul v-else class="mt-4 grid gap-3" :class="listView ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'">
          <li v-for="(p, n) in f.results.value" :key="p.id"><C04ProductCard :product="p" :list="listView" :eager="n < 4" /></li>
        </ul>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade"><div v-if="sheet" class="fixed inset-0 z-[60] bg-black/40" @click="sheet = false" /></Transition>
      <Transition name="slide-up">
        <div v-if="sheet" role="dialog" aria-modal="true" aria-labelledby="c04-sheet-title" class="fixed inset-x-0 bottom-0 z-[61] flex max-h-[90vh] flex-col rounded-t-card bg-bg text-ink">
          <div class="flex items-center justify-between border-b border-line px-5 py-4"><h2 id="c04-sheet-title" class="text-lg font-bold">ตัวกรอง</h2><button type="button" class="grid h-10 w-10 place-items-center" aria-label="ปิด" @click="sheet = false"><AppIcon name="close" /></button></div>
          <div class="overflow-y-auto px-5"><FilterControls :open="['gender', 'category', 'size']" /></div>
          <div class="grid grid-cols-2 gap-2 border-t border-line p-4"><button type="button" class="h-12 rounded-btn border border-line font-semibold" @click="f.clearAll()">ล้าง</button><button type="button" class="h-12 rounded-btn bg-accent font-bold text-accent-ink" @click="sheet = false">ดู {{ f.results.value.length }} รายการ</button></div>
        </div>
      </Transition>
    </Teleport>
    <PrototypeBar />
  </div>
</template>
