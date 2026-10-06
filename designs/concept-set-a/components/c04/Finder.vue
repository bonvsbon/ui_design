<script setup lang="ts">
import { activityLabels } from '~/data/catalog'
defineProps<{ title: string; subtitle?: string }>()
const f = useFinder()
const { link } = useConcept()
const steps = [
  { key: 'who', q: 'ซื้อให้ใคร?', options: [
    { v: 'men', label: 'ผู้ชาย', hint: 'ไซซ์ 38–46', icon: 'user' },
    { v: 'women', label: 'ผู้หญิง', hint: 'ไซซ์ 35–41', icon: 'user' },
    { v: 'kids', label: 'เด็ก', hint: 'ไซซ์ 28–35', icon: 'smile' },
  ] },
  { key: 'need', q: 'ใส่ทำอะไรเป็นหลัก?', options: [
    { v: 'everyday', label: 'ใส่ทุกวัน', hint: 'หยิบง่าย ใส่สบาย', icon: 'home' },
    { v: 'walking', label: 'เดินเยอะ', hint: 'วันละ 8,000+ ก้าว', icon: 'arrow' },
    { v: 'travel', label: 'เดินทาง', hint: 'เบา พกง่าย', icon: 'bag' },
    { v: 'casual', label: 'ลำลอง', hint: 'คาเฟ่ ช้อปปิ้ง', icon: 'spark' },
    { v: 'outdoor', label: 'กลางแจ้ง', hint: 'ทะเล ภูเขา', icon: 'pin' },
  ] },
  { key: 'matter', q: 'อะไรสำคัญที่สุด?', options: [
    { v: 'soft', label: 'นุ่ม', hint: 'สัมผัสแรกต้องนุ่ม', icon: 'cloud' },
    { v: 'light', label: 'เบา', hint: 'ไม่ถ่วงขา', icon: 'feather' },
    { v: 'durable', label: 'ทนทาน', hint: 'ใช้ได้นาน', icon: 'shield' },
    { v: 'supportive', label: 'รองรับเท้า', hint: 'ยืน/เดินนานไม่ล้า', icon: 'layers' },
  ] },
] as const
const current = ref(0)
function choose(key: 'who' | 'need' | 'matter', v: string) {
  ;(f as any)[key].value = v
  if (current.value < 2) current.value++
}
const selectedLabel = (k: number) => {
  const val = [f.who.value, f.need.value, f.matter.value][k]
  return steps[k]!.options.find((o) => o.v === val)?.label
}
const top = computed(() => f.scored.value.slice(0, 3))
const count = computed(() => f.scored.value.filter((s) => s.match >= 70).length)
const resultsLink = computed(() => link('/products?' + toQuery(f.query.value)))
function restart() { f.reset(); current.value = 0 }
</script>

<template>
  <section class="bg-gradient-to-b from-[#eef3ff] to-bg" aria-labelledby="c04-finder-title">
    <div class="container-site grid grid-cols-1 gap-8 py-8 md:py-12 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
      <div class="min-w-0">
        <p class="inline-flex items-center gap-2 rounded-chip bg-bg px-3 py-1 text-sm font-semibold text-accent-text shadow-card"><AppIcon name="spark" :size="14" /> Find Your Pair</p>
        <h1 id="c04-finder-title" class="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">{{ title }}</h1>
        <p class="mt-2 text-lg text-muted">{{ subtitle }}</p>

        <!-- Stepper -->
        <ol class="mt-6 grid grid-cols-3 gap-2" aria-label="ขั้นตอน">
          <li v-for="(s, n) in steps" :key="s.key">
            <button type="button" class="w-full text-left" :aria-current="current === n ? 'step' : undefined" @click="current = n">
              <span class="block h-1.5 rounded-full" :class="n < f.step.value || current === n ? 'bg-accent' : 'bg-surface-2'" />
              <span class="mt-2 block truncate text-xs font-semibold" :class="current === n ? 'text-ink' : 'text-muted'">{{ n + 1 }}. {{ selectedLabel(n) ?? s.q }}</span>
            </button>
          </li>
        </ol>

        <fieldset class="mt-6 rounded-card border border-line bg-bg p-5 shadow-card md:p-6">
          <legend class="sr-only">{{ steps[current]!.q }}</legend>
          <p class="text-xl font-bold" aria-hidden="true">{{ steps[current]!.q }}</p>
          <div class="mt-4 grid gap-2 sm:gap-3" :class="steps[current]!.options.length > 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-3'">
            <label v-for="o in steps[current]!.options" :key="o.v" class="cursor-pointer">
              <input type="radio" :name="steps[current]!.key" class="peer sr-only" :value="o.v" :checked="[f.who.value, f.need.value, f.matter.value][current] === o.v" @change="choose(steps[current]!.key, o.v)">
              <span class="flex h-full min-w-0 flex-col gap-2 rounded-card border-2 border-line p-3 sm:p-4 transition-all hover:border-accent peer-checked:border-accent peer-checked:bg-[#eef3ff] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--focus)]">
                <span class="grid h-10 w-10 place-items-center rounded-full bg-surface text-accent-text"><AppIcon :name="o.icon" :size="20" /></span>
                <span class="font-bold">{{ o.label }}</span>
                <span class="text-xs text-muted">{{ o.hint }}</span>
              </span>
            </label>
          </div>
          <div class="mt-5 flex items-center justify-between">
            <button type="button" class="text-sm font-semibold text-muted underline disabled:opacity-0" :disabled="current === 0" @click="current--">← ย้อนกลับ</button>
            <button type="button" class="text-sm font-semibold text-muted underline" @click="restart">เริ่มใหม่</button>
          </div>
        </fieldset>
      </div>

      <div class="min-w-0 rounded-card bg-bg p-5 shadow-pop md:p-6" aria-live="polite">
        <div class="flex items-center justify-between">
          <p class="font-bold">{{ f.step.value === 0 ? 'ยอดนิยมตอนนี้' : f.step.value === 3 ? 'แนะนำสำหรับคุณ' : 'กำลังคัดให้…' }}</p>
          <p v-if="f.step.value" class="text-sm text-muted">ตรงใจ <span class="font-bold text-accent-text">{{ count }}</span> คู่</p>
        </div>
        <TransitionGroup name="fade" tag="ul" class="mt-4 space-y-3">
          <li v-for="(r, n) in top" :key="r.product.id">
            <NuxtLink :to="link(`/product/${r.product.slug}`)" class="flex items-center gap-4 rounded-card border p-3 transition-colors hover:border-accent" :class="n === 0 && f.step.value === 3 ? 'border-accent bg-[#eef3ff]' : 'border-line'">
              <span class="grid h-20 w-24 shrink-0 place-items-center rounded-media bg-surface p-2"><ProductImg :product="r.product" alt="" /></span>
              <span class="min-w-0 flex-1">
                <span v-if="n === 0 && f.step.value === 3" class="mb-1 inline-block rounded bg-accent px-1.5 text-[11px] font-bold text-accent-ink">ตัวเลือกที่ดีที่สุด</span>
                <span class="block font-bold">{{ r.product.name }}</span>
                <span class="block truncate text-sm text-muted">{{ r.product.shortDescription }}</span>
                <span class="mt-1 flex flex-wrap gap-1"><span v-for="a in r.product.activities.slice(0, 3)" :key="a" class="rounded bg-surface px-1.5 text-[11px]">{{ activityLabels[a]!.th }}</span></span>
              </span>
              <span class="shrink-0 text-right">
                <span v-if="f.step.value" class="block text-lg font-extrabold text-accent-text">{{ r.match }}%</span>
                <span class="block text-sm font-semibold tabular-nums">{{ formatPrice(r.product.price) }}</span>
              </span>
            </NuxtLink>
          </li>
        </TransitionGroup>
        <NuxtLink :to="resultsLink" class="mt-4 flex h-12 items-center justify-center gap-2 rounded-btn bg-accent font-bold text-accent-ink hover:brightness-110">ดูผลลัพธ์ทั้งหมด <AppIcon name="arrow" :size="18" /></NuxtLink>
      </div>
    </div>
  </section>
</template>
