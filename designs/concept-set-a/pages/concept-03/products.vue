<script setup lang="ts">
import { sortOptions } from '~/composables/useProductFilters'
import { activityLabels } from '~/data/catalog'
import { homeC03 } from '~/data/home/c03'
import { testimonials } from '~/data/content'
definePageMeta({ layout: 'c03' })
const f = useProductFilters()
const sheet = ref(false)
useOverlay(sheet)
const moments = (homeC03.find((s) => s.type === 'Moments')!.props.moments as { key: string; th: string; en: string; media: string; story: string }[])
const currentMoment = computed(() => moments.find((m) => f.selected.value.activity.length === 1 && m.key === f.selected.value.activity[0]))
function pickMoment(key: string | null) { f.setQuery({ activity: key }) }
useHead({ title: () => `${currentMoment.value?.th ?? f.heading.value.th} — GAMBOL` })
</script>

<template>
  <div>
    <header class="container-site grid gap-8 pb-8 pt-10 md:grid-cols-[1.2fr_1fr] md:items-end md:pt-14">
      <div>
        <p class="text-sm uppercase tracking-[0.2em] text-accent-text">{{ currentMoment ? currentMoment.en : f.heading.value.en }}</p>
        <h1 class="mt-3 font-display text-5xl leading-tight md:text-7xl">
          <template v-if="currentMoment">รองเท้าสำหรับ<em class="text-accent-text">{{ currentMoment.th }}</em></template>
          <template v-else>{{ f.heading.value.th }}</template>
        </h1>
      </div>
      <p class="max-w-md text-lg italic text-ink-2" style="font-family: var(--font-display)">{{ currentMoment?.story ?? 'ทุกคู่ถูกคัดมาให้เหมาะกับช่วงเวลาหนึ่งในชีวิต — เลือกโมเมนต์ แล้วเราจะช่วยคัดให้แคบลง' }}</p>
    </header>

    <nav aria-label="เลือกตามโมเมนต์" class="container-site">
      <ul class="no-scrollbar flex gap-4 overflow-x-auto pb-4">
        <li><button type="button" class="flex flex-col items-center gap-2" :aria-pressed="!f.selected.value.activity.length" @click="pickMoment(null)"><span class="grid h-20 w-20 place-items-center rounded-full border-2 bg-surface font-display text-lg italic" :class="!f.selected.value.activity.length ? 'border-accent' : 'border-transparent'">ทั้งหมด</span><span class="text-sm">ทุกโมเมนต์</span></button></li>
        <li v-for="m in moments" :key="m.key">
          <button type="button" class="flex flex-col items-center gap-2" :aria-pressed="currentMoment?.key === m.key" @click="pickMoment(m.key)">
            <span class="block h-20 w-20 overflow-hidden rounded-full border-2 p-0.5" :class="currentMoment?.key === m.key ? 'border-accent' : 'border-transparent'"><span class="block h-full w-full overflow-hidden rounded-full"><SmartImg :id="m.media" :ratio="1" sizes="80px" alt="" /></span></span>
            <span class="text-sm">{{ m.th }}</span>
          </button>
        </li>
      </ul>
    </nav>

    <div class="container-site mt-6 grid gap-10 lg:grid-cols-[260px_1fr]">
      <aside class="hidden lg:block" aria-label="ตัวกรอง">
        <div class="sticky top-[calc(var(--nav-h)+70px)] max-h-[calc(100vh-160px)] overflow-y-auto pr-2">
          <p class="font-display text-2xl italic">ปรับให้ตรงใจ</p>
          <FilterControls :open="['gender', 'category', 'size']" />
        </div>
      </aside>
      <div>
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <p class="text-muted" aria-live="polite"><span class="font-semibold text-ink">{{ f.results.value.length }}</span> คู่ที่เหมาะกับคุณ</p>
          <div class="flex items-center gap-2">
            <button type="button" class="flex h-10 items-center gap-2 rounded-full border border-ink px-4 lg:hidden" @click="sheet = true"><AppIcon name="filter" :size="16" /> ปรับตัวเลือก ({{ f.activeChips.value.length }})</button>
            <label for="c03-sort" class="sr-only">เรียงตาม</label>
            <select id="c03-sort" :value="f.sort.value" class="h-10 rounded-full border border-line bg-surface px-4" @change="f.setSort(($event.target as HTMLSelectElement).value as any)">
              <option v-for="o in sortOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
            </select>
          </div>
        </div>
        <ul v-if="f.activeChips.value.length" class="mt-4 flex flex-wrap gap-2">
          <li v-for="c in f.activeChips.value" :key="c.key + c.value"><button type="button" class="inline-flex h-8 items-center gap-1 rounded-full bg-surface-2 px-3 text-sm" @click="f.removeChip(c)">{{ c.label }} <AppIcon name="close" :size="12" /></button></li>
          <li><button type="button" class="h-8 px-2 text-sm underline" @click="f.clearAll()">ล้างทั้งหมด</button></li>
        </ul>
        <div v-if="!f.results.value.length" class="py-20 text-center">
          <p class="font-display text-3xl italic">ยังไม่มีคู่ที่ตรงทุกเงื่อนไข</p>
          <button type="button" class="mt-6 h-12 rounded-full bg-accent px-6 font-semibold text-accent-ink" @click="f.clearAll()">เริ่มใหม่</button>
        </div>
        <ul v-else class="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
          <template v-for="(p, n) in f.results.value" :key="p.id">
            <li><C03ProductCard :product="p" :tint="n" :eager="n < 3" /></li>
            <li v-if="n === 4" class="col-span-2 md:col-span-1">
              <figure class="flex h-full flex-col justify-between rounded-card bg-accent-2 p-6 text-accent-2-ink">
                <blockquote class="font-display text-2xl italic leading-snug">“{{ testimonials[0]!.quote }}”</blockquote>
                <figcaption class="mt-6 text-sm">— {{ testimonials[0]!.name }}, {{ testimonials[0]!.city }}</figcaption>
              </figure>
            </li>
          </template>
        </ul>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade"><div v-if="sheet" class="fixed inset-0 z-[60] bg-[rgba(42,33,27,.45)]" @click="sheet = false" /></Transition>
      <Transition name="slide-up">
        <div v-if="sheet" role="dialog" aria-modal="true" aria-labelledby="c03-sheet-title" class="fixed inset-x-0 bottom-0 z-[61] flex max-h-[88vh] flex-col rounded-t-[24px] bg-bg text-ink">
          <div class="flex items-center justify-between px-6 pt-5"><h2 id="c03-sheet-title" class="font-display text-3xl italic">ปรับให้ตรงใจ</h2><button type="button" class="grid h-10 w-10 place-items-center" aria-label="ปิด" @click="sheet = false"><AppIcon name="close" /></button></div>
          <div class="overflow-y-auto px-6"><FilterControls /></div>
          <div class="border-t border-line p-4"><button type="button" class="h-12 w-full rounded-full bg-accent font-semibold text-accent-ink" @click="sheet = false">ดู {{ f.results.value.length }} คู่</button></div>
        </div>
      </Transition>
    </Teleport>
    <PrototypeBar />
  </div>
</template>
