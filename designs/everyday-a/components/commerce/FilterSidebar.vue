<script setup lang="ts">
import { collections, styleLines, typeLabels } from '~/data/products'
/** Facet filters. Same component powers the desktop sidebar and the mobile bottom sheet. */
const { f, set, toggleIn, all } = useProductFilters()
const uid = useId()

const sizeOptions = computed(() => {
  const pool = all.value.filter((p) => (f.value.gender === 'kids' ? p.genders.includes('kids') : !p.genders.every((g) => g === 'kids')))
  return [...new Set(pool.flatMap((p) => p.sizes))].sort((a, b) => a - b)
})
const genders = [{ id: undefined, label: 'ทั้งหมด' }, { id: 'men', label: 'Men · ผู้ชาย' }, { id: 'women', label: 'Women · ผู้หญิง' }, { id: 'kids', label: 'Kids · เด็ก' }]
const types = [{ id: undefined, label: 'ทั้งหมด' }, ...Object.entries(typeLabels).map(([id, v]) => ({ id, label: v.en }))]
</script>

<template>
  <div class="divide-y divide-line border-y border-line text-[0.95rem]">
    <details open class="group py-5">
      <summary class="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-[0.14em]">Gender <AppIcon name="chevron-down" :size="16" class="transition-transform group-open:rotate-180" /></summary>
      <fieldset class="mt-4 grid gap-1">
        <legend class="sr-only">เพศ</legend>
        <label v-for="g in genders" :key="g.label" class="flex min-h-[36px] cursor-pointer items-center gap-3">
          <input type="radio" :name="`${uid}-g`" class="h-4 w-4 accent-[#17150F]" :checked="f.gender === g.id" @change="set({ gender: g.id, kids: undefined, size: undefined })"> <span class="font-thai">{{ g.label }}</span>
        </label>
      </fieldset>
    </details>

    <details open class="group py-5">
      <summary class="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-[0.14em]">Type <AppIcon name="chevron-down" :size="16" class="transition-transform group-open:rotate-180" /></summary>
      <fieldset class="mt-4 grid gap-1">
        <legend class="sr-only">ประเภท</legend>
        <label v-for="t in types" :key="t.label" class="flex min-h-[36px] cursor-pointer items-center gap-3">
          <input type="radio" :name="`${uid}-t`" class="h-4 w-4 accent-[#17150F]" :checked="f.type === t.id" @change="set({ type: t.id })"> <span class="font-thai">{{ t.label }}</span>
        </label>
      </fieldset>
    </details>

    <details open class="group py-5">
      <summary class="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-[0.14em]">Size (EU) <AppIcon name="chevron-down" :size="16" class="transition-transform group-open:rotate-180" /></summary>
      <div class="mt-4 grid grid-cols-5 gap-1.5">
        <button v-for="s in sizeOptions" :key="s" type="button" class="h-10 rounded-[2px] border text-sm transition" :class="f.sizes.includes(s) ? 'border-ink bg-ink text-paper' : 'border-line bg-white hover:border-ink'" :aria-pressed="f.sizes.includes(s)" @click="toggleIn('size', s)">{{ s }}</button>
      </div>
    </details>

    <details open class="group py-5">
      <summary class="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-[0.14em]">Color <AppIcon name="chevron-down" :size="16" class="transition-transform group-open:rotate-180" /></summary>
      <div class="mt-4 grid grid-cols-3 gap-x-2 gap-y-3">
        <button v-for="c in colorFamilies" :key="c.id" type="button" class="flex items-center gap-2 text-left text-sm" :aria-pressed="f.colors.includes(c.id)" @click="toggleIn('color', c.id)">
          <span class="grid h-6 w-6 shrink-0 place-items-center rounded-full ring-1 ring-inset ring-black/15" :class="f.colors.includes(c.id) ? 'outline outline-2 outline-offset-2 outline-ink' : ''" :style="{ background: c.hex }">
            <AppIcon v-if="f.colors.includes(c.id)" name="check" :size="14" :class="['white', 'yellow'].includes(c.id) ? 'text-ink' : 'text-white'" />
          </span>{{ c.label }}
        </button>
      </div>
    </details>

    <details open class="group py-5">
      <summary class="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-[0.14em]">Price <AppIcon name="chevron-down" :size="16" class="transition-transform group-open:rotate-180" /></summary>
      <fieldset class="mt-4 grid gap-1">
        <legend class="sr-only">ราคา</legend>
        <label class="flex min-h-[36px] cursor-pointer items-center gap-3"><input type="radio" :name="`${uid}-p`" class="h-4 w-4 accent-[#17150F]" :checked="!f.price" @change="set({ price: undefined })"> <span class="font-thai">ทุกราคา</span></label>
        <label v-for="r in priceRanges" :key="r.id" class="flex min-h-[36px] cursor-pointer items-center gap-3">
          <input type="radio" :name="`${uid}-p`" class="h-4 w-4 accent-[#17150F]" :checked="f.price === r.id" @change="set({ price: r.id })"> <span class="font-thai">{{ r.label }}</span>
        </label>
      </fieldset>
    </details>

    <details open class="group py-5">
      <summary class="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-[0.14em]">Technology <AppIcon name="chevron-down" :size="16" class="transition-transform group-open:rotate-180" /></summary>
      <label class="mt-4 flex min-h-[36px] cursor-pointer items-center gap-3">
        <input type="checkbox" class="h-4 w-4 accent-[#D42A1E]" :checked="f.gbold" @change="set({ gbold: f.gbold ? undefined : '1' })">
        <span>GBOLD™ <span class="font-thai text-muted">นุ่ม เบา ทน</span></span>
      </label>
    </details>

    <details class="group py-5" :open="!!(f.collection || f.style)">
      <summary class="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-[0.14em]">Collection <AppIcon name="chevron-down" :size="16" class="transition-transform group-open:rotate-180" /></summary>
      <ul class="mt-4 grid gap-1">
        <li v-for="c in collections" :key="c.slug">
          <button type="button" class="flex min-h-[36px] w-full items-center justify-between text-left" :aria-pressed="f.collection === c.slug" @click="set({ collection: f.collection === c.slug ? undefined : c.slug })">
            {{ c.name }} <AppIcon v-if="f.collection === c.slug" name="check" :size="16" />
          </button>
        </li>
      </ul>
      <p class="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Style Lines</p>
      <div class="mt-3 flex flex-wrap gap-2">
        <button v-for="s in styleLines" :key="s.id" type="button" class="chip" :aria-pressed="f.style === s.id" :title="s.desc" @click="set({ style: f.style === s.id ? undefined : s.id })">{{ s.label }}</button>
      </div>
    </details>
  </div>
</template>
