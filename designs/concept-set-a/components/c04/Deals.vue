<script setup lang="ts">
import { promotions } from '~/data/content'
import { products as catalog } from '~/data/catalog'
defineProps<{ title: string }>()
const now = ref(Date.now())
let t: ReturnType<typeof setInterval> | undefined
onMounted(() => (t = setInterval(() => (now.value = Date.now()), 1000)))
onBeforeUnmount(() => clearInterval(t))
const promo = promotions[0]!
const left = computed(() => {
  const ms = Math.max(0, new Date(promo.endsAt!).getTime() - now.value)
  const d = Math.floor(ms / 864e5), h = Math.floor((ms % 864e5) / 36e5), m = Math.floor((ms % 36e5) / 6e4), s = Math.floor((ms % 6e4) / 1000)
  return [{ v: d, l: 'วัน' }, { v: h, l: 'ชม.' }, { v: m, l: 'นาที' }, { v: s, l: 'วิ' }]
})
const sale = catalog.filter((p) => p.compareAt)
const toast = useToast()
function copy(code: string) {
  navigator.clipboard?.writeText(code).catch(() => {})
  toast.show(`คัดลอกโค้ด ${code} แล้ว`)
}
</script>

<template>
  <section class="container-site py-12" aria-labelledby="c04-deal-title">
    <h2 id="c04-deal-title" class="text-2xl font-extrabold md:text-3xl">{{ title }}</h2>
    <div class="mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
      <div class="flex flex-col justify-between rounded-card bg-accent p-6 text-accent-ink">
        <div>
          <p class="text-sm font-semibold opacity-80">โปรโมชันจำกัดเวลา</p>
          <p class="mt-1 text-3xl font-extrabold">{{ promo.label }}</p>
          <p class="mt-1 text-sm opacity-90">{{ promo.detail }}</p>
        </div>
        <div class="mt-6">
          <ul class="flex gap-2" aria-label="เวลาที่เหลือ">
            <li v-for="u in left" :key="u.l" class="w-16 rounded-md bg-white/15 py-2 text-center"><span class="block text-2xl font-extrabold tabular-nums">{{ String(u.v).padStart(2, '0') }}</span><span class="text-xs">{{ u.l }}</span></li>
          </ul>
          <button type="button" class="mt-4 inline-flex h-11 items-center gap-2 rounded-btn border-2 border-dashed border-white px-4 font-bold" @click="copy(promo.code!)">โค้ด {{ promo.code }} · คัดลอก</button>
        </div>
      </div>
      <C04ProductCard v-for="p in sale.slice(0, 2)" :key="p.id" :product="p" />
    </div>
    <ul class="mt-4 grid gap-3 sm:grid-cols-2">
      <li v-for="p in promotions.slice(1)" :key="p.id" class="flex items-center justify-between rounded-card border border-dashed border-line p-4">
        <span><span class="block font-bold">{{ p.label }}</span><span class="text-sm text-muted">{{ p.detail }}</span></span>
        <button v-if="p.code" type="button" class="rounded-md bg-surface px-3 py-1.5 text-sm font-bold" @click="copy(p.code)">{{ p.code }}</button>
      </li>
    </ul>
  </section>
</template>
