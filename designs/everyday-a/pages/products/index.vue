<script setup lang="ts">
import { media } from '~/data/media'
import { typeLabels } from '~/data/products'
/**
 * Product listing (PLP). All state lives in the URL query (see useProductFilters).
 * An editorial campaign card is injected after the second row so the grid never feels like a catalogue.
 */
const { f, results, set, heading, activeCount } = useProductFilters()
const ui = useUiStore()
const sheetOpen = computed(() => ui.overlay === 'filters')

const quick = [{ id: undefined, label: 'All' }, ...Object.entries(typeLabels).map(([id, v]) => ({ id, label: v.en }))]
const EDITORIAL_AT = 8
const sortId = useId()

useHead(() => ({ title: heading.value.title }))

function clearAll() {
  set({ size: undefined, color: undefined, price: undefined, gbold: undefined, collection: undefined, style: undefined, q: undefined, badge: undefined, lifestyle: undefined, kids: undefined })
}
</script>

<template>
  <div class="pb-section">
    <!-- Header -->
    <header class="wrap pb-6 pt-10 lg:pb-8 lg:pt-14">
      <nav aria-label="breadcrumb" class="text-sm text-muted">
        <NuxtLink to="/" class="hover:text-ink">Home</NuxtLink> <span aria-hidden="true">/</span> <span class="text-ink">Shop</span>
      </nav>
      <div class="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 class="display-l">{{ heading.title }}</h1>
          <p class="thai-lead mt-3 text-ink-2">{{ heading.sub }}</p>
        </div>
      </div>
      <!-- Quick category filters -->
      <ul class="-mx-gutter mt-8 flex gap-2 overflow-x-auto px-gutter pb-1 [scrollbar-width:none]" aria-label="ประเภทสินค้า">
        <li v-for="q in quick" :key="q.label" class="shrink-0">
          <button type="button" class="chip" :aria-pressed="f.type === q.id" @click="set({ type: q.id })">{{ q.label }}</button>
        </li>
      </ul>
    </header>

    <!-- Toolbar -->
    <div class="sticky top-header z-30 border-y border-line bg-paper/95 backdrop-blur-sm">
      <div class="wrap flex h-14 items-center justify-between gap-4">
        <p class="text-sm" aria-live="polite"><strong>{{ results.length }}</strong> <span class="font-thai text-muted">รายการ</span></p>
        <div class="flex items-center gap-2">
          <label :for="sortId" class="hidden text-sm text-muted sm:block">Sort</label>
          <select :id="sortId" class="h-10 rounded-full border border-line bg-white pl-4 pr-8 font-thai text-sm" :value="f.sort" @change="set({ sort: ($event.target as HTMLSelectElement).value === 'featured' ? undefined : ($event.target as HTMLSelectElement).value })">
            <option v-for="o in sortOptions" :key="o.id" :value="o.id">{{ o.label }}</option>
          </select>
          <button type="button" class="chip lg:hidden" @click="ui.open('filters')">
            <AppIcon name="filter" :size="18" /> Filter <span v-if="activeCount" class="grid h-5 min-w-5 place-items-center rounded-full bg-red px-1 text-[0.65rem] text-white">{{ activeCount }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="wrap mt-8 grid gap-10 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr]">
      <!-- Desktop sidebar -->
      <aside class="hidden lg:block" aria-label="ตัวกรองสินค้า">
        <div class="sticky top-[calc(var(--header-h)+80px)] max-h-[calc(100vh-var(--header-h)-100px)] overflow-y-auto pr-2">
          <div class="mb-4 flex items-center justify-between">
            <p class="text-xs font-semibold uppercase tracking-[0.14em]">Filter</p>
            <button v-if="activeCount" type="button" class="text-sm underline underline-offset-4" @click="clearAll">ล้างทั้งหมด</button>
          </div>
          <FilterSidebar />
        </div>
      </aside>

      <!-- Grid -->
      <section aria-label="สินค้า">
        <ul v-if="results.length" class="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-3 xl:grid-cols-4">
          <template v-for="(p, n) in results" :key="p.id">
            <li v-if="n === Math.min(EDITORIAL_AT, results.length - 1) && results.length > 4" class="col-span-full">
              <NuxtLink to="/products?collection=everyday-comfort" class="group relative grid min-h-[340px] overflow-hidden bg-ink text-white md:grid-cols-2">
                <div class="relative min-h-[240px] overflow-hidden"><AppImage class="absolute inset-0" :media="media.crosswalk" sizes="(min-width:768px) 50vw, 100vw" :widths="[480, 800, 1200]" img-class="zoom-media" /></div>
                <div class="flex flex-col justify-center gap-4 p-8 lg:p-12">
                  <p class="eyebrow text-sun">Campaign</p>
                  <p class="display-l">Everyday<br>Comfort</p>
                  <p class="max-w-sm font-thai text-white/80">คู่ที่ใส่ได้ทุกวัน ตั้งแต่ประตูบ้านถึงสถานีสุดท้าย ด้วยพื้น GBOLD™ ที่นุ่มและทน</p>
                  <span class="link-arrow text-white">Shop the Edit <AppIcon name="arrow-right" :size="16" class="arrow" /></span>
                </div>
              </NuxtLink>
            </li>
            <li><ProductCard :product="p" :priority="n < 4" /></li>
          </template>
        </ul>
        <div v-else class="py-20 text-center">
          <p class="display-s">No Matches</p>
          <p class="mt-3 font-thai text-ink-2">ไม่พบสินค้าที่ตรงกับตัวกรอง ลองล้างตัวกรองบางรายการ</p>
          <button type="button" class="btn-primary mt-6" @click="clearAll">ล้างตัวกรอง</button>
        </div>
      </section>
    </div>

    <!-- Mobile filter sheet -->
    <Teleport to="body">
      <Transition name="fade"><div v-if="sheetOpen" class="fixed inset-0 z-overlay bg-black/45 lg:hidden" @click="ui.close()" /></Transition>
      <Transition name="sheet">
        <div v-if="sheetOpen" role="dialog" aria-modal="true" aria-label="ตัวกรอง" class="fixed inset-x-0 bottom-0 z-overlay flex max-h-[88dvh] flex-col rounded-t-[18px] bg-paper lg:hidden" @keydown.esc="ui.close()">
          <div class="flex items-center justify-between border-b border-line px-5 py-3">
            <p class="display-s">Filter</p>
            <button type="button" class="grid h-11 w-11 place-items-center" aria-label="ปิด" autofocus @click="ui.close()"><AppIcon name="close" /></button>
          </div>
          <div class="flex-1 overflow-y-auto px-5"><FilterSidebar /></div>
          <div class="pb-safe grid grid-cols-2 gap-3 border-t border-line p-4">
            <button type="button" class="btn-outline" @click="clearAll">ล้างทั้งหมด</button>
            <button type="button" class="btn-primary" @click="ui.close()">ดู {{ results.length }} รายการ</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
