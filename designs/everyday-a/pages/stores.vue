<script setup lang="ts">
import { media } from '~/data/media'
import type { Store } from '~/types'
useHead({ title: 'Find a Store · ค้นหาร้าน' })

const route = useRoute()
const router = useRouter()
const { data: stores } = await useAsyncData('stores', () => useApi().getStores(), { default: () => [] as Store[] })
const province = computed(() => (typeof route.query.province === 'string' ? route.query.province : ''))
const district = computed(() => (typeof route.query.district === 'string' ? route.query.district : ''))

const here = ref<{ lat: number; lng: number } | null>(null)
const locating = ref(false)
const geoError = ref('')

const km = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const r = (d: number) => (d * Math.PI) / 180
  const h = Math.sin(r(b.lat - a.lat) / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lng - a.lng) / 2) ** 2
  return 6371 * 2 * Math.asin(Math.sqrt(h))
}
const list = computed(() => {
  const out = stores.value
    .filter((s) => (!province.value || s.province === province.value) && (!district.value || s.district === district.value))
    .map((s) => ({ ...s, distance: here.value ? km(here.value, s) : undefined }))
  return here.value ? out.sort((a, b) => a.distance! - b.distance!) : out
})

function search(v: { province: string; district: string }) {
  here.value = null
  router.replace({ query: { province: v.province || undefined, district: v.district || undefined } })
}
function locate() {
  if (!('geolocation' in navigator)) { geoError.value = 'เบราว์เซอร์นี้ไม่รองรับการระบุตำแหน่ง'; return }
  locating.value = true; geoError.value = ''
  navigator.geolocation.getCurrentPosition(
    (pos) => { here.value = { lat: pos.coords.latitude, lng: pos.coords.longitude }; locating.value = false; router.replace({ query: {} }) },
    () => { geoError.value = 'ไม่สามารถระบุตำแหน่งได้ กรุณาเลือกจังหวัดแทน'; locating.value = false },
    { timeout: 8000 },
  )
}
onMounted(() => { if (route.query.near === '1') locate() })
const mapsUrl = (s: Store) => `https://www.google.com/maps/search/?api=1&query=${s.lat},${s.lng}`
</script>

<template>
  <div>
    <section class="grid bg-ink text-white lg:grid-cols-2">
      <div class="flex flex-col justify-center px-gutter py-14 lg:px-16 lg:py-20 xl:px-24">
        <p class="eyebrow flex items-center gap-2 text-sun"><AppIcon name="pin" :size="16" /> Store Locator</p>
        <h1 class="display-xl mt-4">Find GAMBOL<br>Near You</h1>
        <p class="mt-5 max-w-md font-thai text-white/75">ลองใส่ก่อนตัดสินใจ ที่ห้างสรรพสินค้าและร้านรองเท้ากว่า 300 แห่งทั่วประเทศ</p>
        <div class="mt-8 max-w-lg"><StoreFinderForm dark :navigate="false" :initial-province="province" :initial-district="district" @search="search" @locate="locate" /></div>
        <p v-if="locating" class="mt-4 font-thai text-sm text-white/75" role="status">กำลังค้นหาตำแหน่งของคุณ…</p>
        <p v-if="geoError" class="mt-4 font-thai text-sm text-sun" role="alert">{{ geoError }}</p>
      </div>
      <div class="relative hidden min-h-[480px] lg:block"><AppImage :media="media.bangkokSoi" sizes="50vw" :widths="[640, 960, 1280]" /></div>
    </section>

    <section class="wrap py-section" aria-labelledby="results-title">
      <div class="flex items-end justify-between gap-4">
        <h2 id="results-title" class="display-m">{{ list.length }} Stores</h2>
        <p class="font-thai text-sm text-muted">{{ here ? 'เรียงตามระยะทางจากตำแหน่งของคุณ' : province ? `${province}${district ? ` · ${district}` : ''}` : 'ทุกจังหวัด' }}</p>
      </div>
      <ul class="mt-8 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
        <li v-for="s in list" :key="s.id" class="flex flex-col bg-paper p-6">
          <div class="flex items-start justify-between gap-4">
            <p class="eyebrow" :class="s.type === 'GAMBOL Shop' ? 'text-red' : 'text-muted'">{{ s.type }}</p>
            <p v-if="s.distance !== undefined" class="text-sm font-semibold tabular-nums">{{ s.distance.toFixed(1) }} km</p>
          </div>
          <h3 class="mt-2 font-thai text-lg font-semibold">{{ s.name }}</h3>
          <p class="mt-1 font-thai text-sm text-ink-2">{{ s.address }}, {{ s.district }}, {{ s.province }}</p>
          <p class="mt-3 font-thai text-sm text-muted">เปิด {{ s.hours }} · <a :href="`tel:${s.phone}`" class="underline underline-offset-4">{{ s.phone }}</a></p>
          <a :href="mapsUrl(s)" target="_blank" rel="noopener" class="link-arrow mt-5">Directions <AppIcon name="arrow-right" :size="16" class="arrow" /></a>
        </li>
      </ul>
      <p v-if="!list.length" class="py-12 text-center font-thai text-ink-2">ยังไม่มีร้านในพื้นที่นี้ ลองเลือกจังหวัดใกล้เคียง หรือสั่งออนไลน์พร้อมส่งฟรีเมื่อช้อปครบ ฿599</p>
    </section>

    <section id="contact" class="border-t border-line bg-paper-2 py-16" aria-labelledby="contact-title">
      <div class="wrap grid gap-8 md:grid-cols-3">
        <h2 id="contact-title" class="display-m">Contact</h2>
        <div class="font-thai text-ink-2"><p class="font-semibold text-ink">สำนักงานใหญ่</p><p>จังหวัดสมุทรสาคร</p><p class="mt-2">โทร <a href="tel:024085074" class="underline underline-offset-4">02-408-5074</a></p></div>
        <div class="font-thai text-ink-2"><p class="font-semibold text-ink">อีเมล</p><p><a href="mailto:hello@gambol.co.th" class="underline underline-offset-4">hello@gambol.co.th</a></p><p class="mt-2">จันทร์–ศุกร์ 08:30–17:30</p></div>
      </div>
    </section>
  </div>
</template>
