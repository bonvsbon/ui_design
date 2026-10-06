<script setup lang="ts">
import type { HomeSection } from '~/types'
defineProps<{ section?: HomeSection; standalone?: boolean }>()
const { stores } = useCatalog()
const province = ref('')
const district = ref('')
const searched = ref(false)
const searchingLocation = ref(false)
const locationMessage = ref('')
const coordinates = ref<{ lat: number; lng: number }>()
const provinces = [...new Set(stores.map((s) => s.province))]
const districts = computed(() => [
  ...new Set(stores.filter((s) => s.province === province.value).map((s) => s.district)),
])
watch(province, () => {
  district.value = ''
  searched.value = false
  coordinates.value = undefined
})
function distance(lat: number, lng: number) {
  if (!coordinates.value) return 0
  const rad = (n: number) => (n * Math.PI) / 180
  const a =
    Math.sin(rad(lat - coordinates.value.lat) / 2) ** 2 +
    Math.cos(rad(lat)) *
      Math.cos(rad(coordinates.value.lat)) *
      Math.sin(rad(lng - coordinates.value.lng) / 2) ** 2
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}
const results = computed(() =>
  stores
    .filter(
      (s) =>
        (!province.value || s.province === province.value) &&
        (!district.value || s.district === district.value)
    )
    .map((s) => ({ ...s, distance: distance(s.lat, s.lng) }))
    .sort((a, b) => a.distance - b.distance)
)
function search() {
  searched.value = true
  locationMessage.value = ''
}
function locate() {
  locationMessage.value = ''
  if (!navigator.geolocation) {
    locationMessage.value = 'Location is unavailable. Choose a province instead.'
    return
  }
  searchingLocation.value = true
  navigator.geolocation.getCurrentPosition(
    (p) => {
      province.value = ''
      nextTick(() => {
        coordinates.value = { lat: p.coords.latitude, lng: p.coords.longitude }
        searched.value = true
        searchingLocation.value = false
        locationMessage.value = 'Showing sample stockists by distance from your location.'
      })
    },
    () => {
      searchingLocation.value = false
      locationMessage.value = 'We couldn’t access your location. You can still search by province.'
    },
    { timeout: 10000, maximumAge: 60000 }
  )
}
</script>
<template>
  <section class="store-locator" :class="{ standalone }">
    <div class="store-locator-inner">
      <div class="store-photo">
        <ResponsiveImage
          :media="
            section?.media || {
              src: '/images/city-life.webp',
              alt: 'Discover comfortable footwear in your neighbourhood',
            }
          "
          :width="1024"
          :height="1536"
        /><span>TRY THEM. FEEL IT. GO PLACES.</span>
      </div>
      <div class="store-copy">
        <AppIcon name="pin" :size="32" /><span class="store-label">{{
          section?.subtitle || 'FIND GAMBOL NEAR YOU'
        }}</span
        ><component :is="standalone ? 'h1' : 'h2'">{{
          section?.title || 'GOOD COMFORT.\nCLOSER THAN YOU THINK.'
        }}</component>
        <p lang="th">{{ section?.body || 'ลองคู่ที่ใช่ สัมผัสความสบายด้วยตัวคุณเอง' }}</p>
        <form class="store-form" @submit.prevent="search">
          <div class="store-form-fields">
            <label
              >จังหวัด / Province<select v-model="province">
                <option value="">All provinces</option>
                <option v-for="p in provinces" :key="p">{{ p }}</option>
              </select></label
            ><label
              >เขต / District<select v-model="district" :disabled="!province">
                <option value="">All districts</option>
                <option v-for="d in districts" :key="d">{{ d }}</option>
              </select></label
            >
          </div>
          <button class="button primary">ค้นหาร้านใกล้คุณ<AppIcon name="arrow" :size="19" /></button
          ><button type="button" class="text-link" :disabled="searchingLocation" @click="locate">
            <AppIcon name="location" :size="16" />{{
              searchingLocation ? 'FINDING YOUR LOCATION…' : 'USE MY LOCATION'
            }}
          </button>
        </form>
        <p v-if="locationMessage" role="status" class="location-message">{{ locationMessage }}</p>
        <p class="store-preview-note">
          Explore sample locations in this concept. For confirmed stockists, visit the
          <a href="https://www.gambol.co.th/find-our-store/" target="_blank" rel="noopener"
            >official GAMBOL store locator <AppIcon name="upRight" :size="13" /></a
          >.
        </p>
      </div>
    </div>
    <div v-if="searched" class="store-results container">
      <div class="section-heading">
        <h3>{{ results.length }} sample {{ results.length === 1 ? 'location' : 'locations' }}</h3>
        <span role="status"
          >{{ province || 'All provinces' }}{{ district ? ' · ' + district : '' }}</span
        >
      </div>
      <div class="store-results-grid">
        <article v-for="s in results" :key="s.id">
          <AppIcon name="pin" />
          <h3>{{ s.name }}</h3>
          <p>{{ s.address }}</p>
          <p>{{ s.hours }}</p>
          <p v-if="coordinates">Approx. {{ s.distance.toFixed(1) }} km away</p>
          <a
            :href="`https://www.google.com/maps/search/?api=1&query=${s.lat},${s.lng}`"
            target="_blank"
            rel="noopener"
            class="text-link"
            >VIEW AREA ON MAP<AppIcon name="upRight" :size="17"
          /></a>
        </article>
      </div>
      <p v-if="!results.length">
        No sample stockists in this area. Try another province or the official locator.
      </p>
    </div>
  </section>
</template>
