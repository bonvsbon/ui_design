<script setup lang="ts">
import { sortOptions } from '~/composables/useProductFilters'
import { benefitLabels, categoryLabels } from '~/data/catalog'
definePageMeta({ layout: 'c05' })
const f = useProductFilters()
const { productLink } = useConcept()
const view = ref<'grid' | 'spec'>('grid')
const panel = ref(false)
useOverlay(panel)
const cart = useCart()
const toast = useToast()
function quick(p: (typeof f.results.value)[number]) {
  const z = p.sizes.find((s) => !p.soldOutSizes?.includes(s))!
  cart.add(p, p.colors[0]!.id, z)
  toast.show(`ADDED ${p.name} · EU ${z} (เปลี่ยนไซซ์ได้ในตะกร้า)`)
}
useHead({ title: () => `${f.heading.value.en} — GAMBOL/LAB` })
</script>

<template>
  <div>
    <header class="border-b border-line">
      <div class="container-site flex flex-wrap items-end justify-between gap-4 py-10">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent">Catalogue / {{ f.heading.value.th }}</p>
          <h1 class="mt-2 font-display text-5xl font-medium tracking-tight md:text-7xl">{{ f.heading.value.en }}</h1>
        </div>
        <p class="font-mono text-sm text-muted" aria-live="polite">[{{ String(f.results.value.length).padStart(2, '0') }}] RESULTS</p>
      </div>
    </header>

    <div class="sticky top-nav z-30 border-b border-line bg-bg">
      <div class="container-site flex flex-wrap items-center gap-2 py-2 font-mono text-xs uppercase">
        <button type="button" class="flex h-9 items-center gap-2 rounded-btn border border-line px-3 hover:border-accent" @click="panel = true"><AppIcon name="filter" :size="14" /> Parameters <span v-if="f.activeChips.value.length" class="text-accent">[{{ f.activeChips.value.length }}]</span></button>
        <div class="no-scrollbar order-last flex w-full gap-1 overflow-x-auto empty:hidden md:order-none md:w-auto md:flex-1">
          <button v-for="c in f.activeChips.value" :key="c.key + c.value" type="button" class="h-9 shrink-0 rounded-btn bg-surface-2 px-3 normal-case" @click="f.removeChip(c)">{{ c.label }} ×</button>
        </div>
        <label for="c05-sort" class="sr-only">เรียงตาม</label>
        <select id="c05-sort" :value="f.sort.value" class="h-9 rounded-btn border border-line bg-bg px-2 normal-case" @change="f.setSort(($event.target as HTMLSelectElement).value as any)"><option v-for="o in sortOptions" :key="o.value" :value="o.value">{{ o.label }}</option></select>
        <div class="flex rounded-btn border border-line p-0.5" role="group" aria-label="มุมมอง">
          <button type="button" class="h-8 rounded-[2px] px-2" :class="view === 'grid' && 'bg-ink text-bg'" :aria-pressed="view === 'grid'" @click="view = 'grid'">Grid</button>
          <button type="button" class="h-8 rounded-[2px] px-2" :class="view === 'spec' && 'bg-ink text-bg'" :aria-pressed="view === 'spec'" @click="view = 'spec'">Spec</button>
        </div>
      </div>
    </div>

    <div class="container-site py-8">
      <div v-if="!f.results.value.length" class="border border-dashed border-line py-20 text-center font-mono">
        <p class="text-2xl">NO RESULT</p><p class="mt-2 text-sm text-muted">ไม่พบสินค้าที่ตรงพารามิเตอร์</p>
        <button type="button" class="mt-6 h-10 rounded-btn bg-accent px-5 text-sm text-accent-ink" @click="f.clearAll()">RESET</button>
      </div>
      <ul v-else-if="view === 'grid'" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <li v-for="(p, n) in f.results.value" :key="p.id"><C05ProductCard :product="p" :index="n" :eager="n < 4" /></li>
      </ul>
      <div v-else class="overflow-x-auto">
        <table class="w-full min-w-[860px] border-collapse font-mono text-sm">
          <caption class="sr-only">ตารางสเปกสินค้า</caption>
          <thead><tr class="border-b border-line text-left text-[11px] uppercase text-muted">
            <th scope="col" class="py-3 font-normal">Model</th><th scope="col" class="font-normal">Type</th><th scope="col" class="font-normal">Weight</th>
            <th v-for="k in ['comfort','soft','light','durable']" :key="k" scope="col" class="font-normal">{{ benefitLabels[k]!.en }}</th>
            <th scope="col" class="text-right font-normal">Price</th><th scope="col"><span class="sr-only">Action</span></th>
          </tr></thead>
          <tbody>
            <tr v-for="p in f.results.value" :key="p.id" class="border-b border-line hover:bg-surface">
              <td class="py-3"><NuxtLink :to="productLink(p.slug)" class="flex items-center gap-3 hover:text-accent"><span class="h-12 w-16 shrink-0 bg-[#ecebe6] p-1"><ProductImg :product="p" alt="" /></span><span class="font-display text-base">{{ p.name }}</span></NuxtLink></td>
              <td class="text-muted">{{ categoryLabels[p.category] }}</td>
              <td class="tabular-nums">{{ p.weightGrams }} g</td>
              <td v-for="k in (['comfort','soft','light','durable'] as const)" :key="k"><span class="flex items-center gap-2"><span class="h-1 w-14 bg-surface-2"><span class="block h-full bg-accent" :style="{ width: p.benefits[k] * 20 + '%' }" /></span>{{ p.benefits[k] }}</span></td>
              <td class="text-right tabular-nums">{{ formatPrice(p.price) }}</td>
              <td class="pl-4 text-right"><button type="button" class="h-8 rounded-btn border border-line px-3 text-xs uppercase hover:border-accent hover:text-accent" :aria-label="`เพิ่ม ${p.name} ลงตะกร้า`" @click="quick(p)">+ Add</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade"><div v-if="panel" class="fixed inset-0 z-[60] bg-black/60" @click="panel = false" /></Transition>
      <Transition name="slide-l">
        <aside v-if="panel" role="dialog" aria-modal="true" aria-labelledby="c05-par-title" class="fixed inset-y-0 left-0 z-[61] flex w-full max-w-sm flex-col border-r border-line bg-bg text-ink">
          <header class="flex h-nav items-center justify-between border-b border-line px-5"><h2 id="c05-par-title" class="font-mono text-sm uppercase">Parameters</h2><button type="button" class="grid h-10 w-10 place-items-center" aria-label="ปิด" @click="panel = false"><AppIcon name="close" /></button></header>
          <div class="flex-1 overflow-y-auto px-5"><FilterControls :open="['tech', 'category', 'size', 'gender']" /></div>
          <footer class="grid grid-cols-2 gap-2 border-t border-line p-4 font-mono text-xs uppercase"><button type="button" class="h-11 rounded-btn border border-line" @click="f.clearAll()">Reset</button><button type="button" class="h-11 rounded-btn bg-accent text-accent-ink" @click="panel = false">Show [{{ f.results.value.length }}]</button></footer>
        </aside>
      </Transition>
    </Teleport>
    <PrototypeBar />
  </div>
</template>
