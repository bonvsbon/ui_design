<script setup lang="ts">
import { mainNav, site } from '~/data/content'
import { activityLabels } from '~/data/catalog'
const { link } = useConcept()
const { searchOpen, menuOpen } = useUi()
const cart = useCart()
const wish = useWishlist()
const route = useRoute()
watch(() => route.fullPath, () => { searchOpen.value = false; menuOpen.value = false })
useOverlay(searchOpen)
useOverlay(menuOpen)
const q = ref('')
const input = ref<HTMLInputElement>()
const router = useRouter()
watch(searchOpen, (v) => v && nextTick(() => input.value?.focus()))
function submit() { if (q.value.trim()) router.push(link(`/products?q=${encodeURIComponent(q.value.trim())}`)) }
const scrolled = ref(false)
onMounted(() => {
  const on = () => (scrolled.value = window.scrollY > 120)
  window.addEventListener('scroll', on, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('scroll', on))
})
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line bg-bg">
    <div class="hidden border-b border-line md:block" :class="scrolled && 'md:hidden'">
      <div class="container-site flex h-9 items-center justify-between text-xs text-muted">
        <span>{{ site.announcements[0] }}</span>
        <span class="italic" style="font-family: var(--font-display)">{{ site.tagline }}</span>
        <a href="#visit" class="inline-flex items-center gap-1 hover:text-ink"><AppIcon name="pin" :size="14" /> ค้นหาร้านใกล้คุณ</a>
      </div>
    </div>
    <div class="container-site grid grid-cols-[1fr_auto_1fr] items-center transition-[height]" :class="scrolled ? 'h-16' : 'h-16 md:h-24'">
      <div class="flex items-center gap-1">
        <button type="button" class="-ml-2 grid h-11 w-11 place-items-center lg:hidden" aria-label="เปิดเมนู" @click="menuOpen = true"><AppIcon name="menu" /></button>
        <button type="button" class="hidden h-10 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted hover:border-ink lg:flex" @click="searchOpen = true"><AppIcon name="search" :size="16" /> ค้นหาสินค้าและเรื่องราว</button>
      </div>
      <NuxtLink :to="link('/')" class="text-center leading-none" :aria-label="`${site.brand} หน้าแรก`">
        <span class="block font-display font-semibold tracking-[0.04em] transition-all" :class="scrolled ? 'text-2xl' : 'text-2xl md:text-5xl'" style="font-variation-settings: 'opsz' 144">{{ site.brand }}</span>
        <span v-if="!scrolled" class="mt-1 hidden text-[11px] uppercase tracking-[0.3em] text-muted md:block">Journal & Shoes</span>
      </NuxtLink>
      <div class="flex items-center justify-end gap-0.5">
        <button type="button" class="grid h-11 w-11 place-items-center lg:hidden" aria-label="ค้นหา" @click="searchOpen = true"><AppIcon name="search" /></button>
        <a href="#visit" class="hidden h-11 w-11 place-items-center lg:grid" aria-label="ค้นหาสาขา"><AppIcon name="pin" /></a>
        <button type="button" class="hidden h-11 w-11 place-items-center lg:grid" aria-label="บัญชีของฉัน"><AppIcon name="user" /></button>
        <NuxtLink :to="link('/products?wishlist=1')" class="hidden h-11 w-11 place-items-center lg:grid" :aria-label="`รายการโปรด ${wish.count.value}`"><AppIcon name="heart" /></NuxtLink>
        <button type="button" class="relative grid h-11 w-11 place-items-center" :aria-label="`ตะกร้า ${cart.count.value} ชิ้น`" @click="cart.open.value = true">
          <AppIcon name="bag" /><span v-if="cart.count.value" class="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] text-accent-ink">{{ cart.count.value }}</span>
        </button>
      </div>
    </div>
    <nav aria-label="หมวดหมู่หลัก" class="hidden border-t border-line lg:block">
      <ul class="flex h-11 items-center justify-center gap-8 text-[15px]">
        <li v-for="item in mainNav" :key="item.label"><NuxtLink :to="link(item.to)" class="py-2 decoration-accent decoration-2 underline-offset-8 hover:underline">{{ item.label }}</NuxtLink></li>
      </ul>
    </nav>

    <!-- Search: a soft centred card -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="searchOpen" class="fixed inset-0 z-[65] overflow-y-auto bg-[rgba(42,33,27,.45)] px-4 py-8 md:py-20" @click.self="searchOpen = false">
          <div class="mx-auto max-w-3xl rounded-[24px] bg-surface p-6 text-ink shadow-pop md:p-10" role="dialog" aria-modal="true" aria-labelledby="c03-search-title">
            <div class="flex items-start justify-between">
              <h2 id="c03-search-title" class="font-display text-3xl italic md:text-4xl">ตามหาคู่ไหนอยู่?</h2>
              <button type="button" class="grid h-10 w-10 place-items-center rounded-full hover:bg-surface-2" aria-label="ปิด" @click="searchOpen = false"><AppIcon name="close" /></button>
            </div>
            <form role="search" class="mt-5" @submit.prevent="submit">
              <label for="c03-search" class="sr-only">ค้นหา</label>
              <div class="flex items-center gap-3 rounded-full border border-ink bg-bg px-5">
                <AppIcon name="search" />
                <input id="c03-search" ref="input" v-model="q" type="search" autocomplete="off" placeholder="ชื่อรุ่น ประเภท หรือโมเมนต์ เช่น “slide”" class="h-14 w-full bg-transparent text-lg outline-none">
              </div>
            </form>
            <SearchResults class="mt-8" :query="q" @select="searchOpen = false" @pick="(s) => (q = s)" />
          </div>
        </div>
      </Transition>
      <Transition name="fade">
        <div v-if="menuOpen" class="fixed inset-0 z-[60] overflow-y-auto bg-bg text-ink" role="dialog" aria-modal="true" aria-label="เมนู">
          <div class="container-site flex h-16 items-center justify-between">
            <span class="font-display text-2xl">{{ site.brand }}</span>
            <button type="button" class="grid h-11 w-11 place-items-center" aria-label="ปิดเมนู" @click="menuOpen = false"><AppIcon name="close" /></button>
          </div>
          <nav class="container-site pb-10">
            <ul class="space-y-1">
              <li v-for="item in mainNav" :key="item.label"><NuxtLink :to="link(item.to)" class="block py-2 font-display text-4xl italic" @click="menuOpen = false">{{ item.label }}</NuxtLink></li>
            </ul>
            <div class="mt-8 grid grid-cols-2 gap-2">
              <NuxtLink v-for="m in ['everyday', 'work', 'travel', 'weekend', 'outdoor', 'family']" :key="m" :to="link(`/products?activity=${m}`)" class="rounded-full border border-line px-4 py-3 text-center" @click="menuOpen = false">{{ activityLabels[m]!.th }}</NuxtLink>
            </div>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>
