<script setup lang="ts">
const { searchOpen } = useUi()
const { link } = useConcept()
const router = useRouter()
const q = ref('')
const input = ref<HTMLInputElement>()
useOverlay(searchOpen)
watch(searchOpen, (v) => v && nextTick(() => input.value?.focus()))
function submit() {
  if (!q.value.trim()) return
  searchOpen.value = false
  router.push(link(`/products?q=${encodeURIComponent(q.value.trim())}`))
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="searchOpen" class="theme-c01 fixed inset-0 z-[65] overflow-y-auto bg-bg text-ink" role="dialog" aria-modal="true" aria-label="ค้นหาสินค้า">
        <div class="container-site pb-24 pt-6 md:pt-12">
          <div class="flex justify-end"><button type="button" class="flex items-center gap-2 font-display text-xs uppercase tracking-[0.2em]" @click="searchOpen = false">Close <AppIcon name="close" /></button></div>
          <form role="search" class="mt-6 md:mt-12" @submit.prevent="submit">
            <label for="c01-search" class="font-display text-xs uppercase tracking-[0.2em] text-muted">Search GAMBOL</label>
            <div class="mt-3 flex items-end gap-4 border-b-2 border-ink pb-2">
              <input id="c01-search" ref="input" v-model="q" type="search" autocomplete="off" placeholder="ลองพิมพ์ “slide”" class="w-full bg-transparent font-display text-4xl font-bold uppercase outline-none placeholder:normal-case placeholder:text-muted md:text-7xl" style="font-stretch: 110%">
              <button type="submit" class="mb-2 shrink-0" aria-label="ค้นหา"><AppIcon name="arrow" :size="32" /></button>
            </div>
          </form>
          <SearchResults class="mt-10" :query="q" @select="searchOpen = false" @pick="(s) => (q = s)" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
