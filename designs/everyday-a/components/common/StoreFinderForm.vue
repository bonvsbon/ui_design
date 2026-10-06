<script setup lang="ts">
import { districtsOf, provinces } from '~/data/stores'
/**
 * Province → district store search. On the homepage it routes to /stores;
 * on /stores it emits so the page can filter in place.
 */
const props = withDefaults(defineProps<{ dark?: boolean; navigate?: boolean; initialProvince?: string; initialDistrict?: string }>(), { dark: false, navigate: true })
const emit = defineEmits<{ search: [{ province: string; district: string }]; locate: [] }>()

const province = ref(props.initialProvince ?? '')
const district = ref(props.initialDistrict ?? '')
const districts = computed(() => (province.value ? districtsOf(province.value) : []))
watch(province, () => { district.value = '' })

function submit() {
  if (props.navigate) navigateTo({ path: '/stores', query: { province: province.value || undefined, district: district.value || undefined } })
  else emit('search', { province: province.value, district: district.value })
}
function locate() {
  if (props.navigate) navigateTo({ path: '/stores', query: { near: '1' } })
  else emit('locate')
}
const uid = useId()
</script>

<template>
  <form class="grid gap-3" @submit.prevent="submit">
    <div class="grid gap-3 sm:grid-cols-2">
      <label :for="`${uid}-p`" class="grid gap-1.5">
        <span class="eyebrow" :class="dark ? 'text-white/70' : 'text-muted'">จังหวัด</span>
        <select :id="`${uid}-p`" v-model="province" class="field font-thai">
          <option value="">ทุกจังหวัด</option>
          <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
        </select>
      </label>
      <label :for="`${uid}-d`" class="grid gap-1.5">
        <span class="eyebrow" :class="dark ? 'text-white/70' : 'text-muted'">เขต / อำเภอ</span>
        <select :id="`${uid}-d`" v-model="district" class="field font-thai" :disabled="!province">
          <option value="">{{ province ? 'ทุกเขต / อำเภอ' : 'เลือกจังหวัดก่อน' }}</option>
          <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
        </select>
      </label>
    </div>
    <div class="flex flex-wrap items-center gap-3 pt-1">
      <button type="submit" class="btn-accent font-thai !normal-case !tracking-normal !text-[0.95rem]">
        <AppIcon name="search" :size="18" /> ค้นหาร้านใกล้คุณ
      </button>
      <button type="button" class="link-arrow" :class="dark ? 'text-white' : 'text-ink'" @click="locate">
        <AppIcon name="locate" :size="18" /> Use my location
      </button>
    </div>
  </form>
</template>
