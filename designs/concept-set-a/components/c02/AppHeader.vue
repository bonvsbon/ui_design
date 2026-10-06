<script setup lang="ts">
import { mainNav, site } from '~/data/content'
const { link } = useConcept()
const { searchOpen, menuOpen } = useUi()
const cart = useCart()
const wish = useWishlist()
const route = useRoute()
watch(() => route.fullPath, () => { searchOpen.value = false; menuOpen.value = false })
const q = ref('')
const input = ref<HTMLInputElement>()
const router = useRouter()
watch(searchOpen, (v) => v && nextTick(() => input.value?.focus()))
useOverlay(searchOpen)
useOverlay(menuOpen)
function submit() {
  if (!q.value.trim()) return
  router.push(link(`/products?q=${encodeURIComponent(q.value.trim())}`))
}
</script>

<template>
  <div class="sticky top-0 z-40">
    <div class="overflow-hidden bg-accent text-accent-ink" aria-label="ประกาศ" role="region">
      <div class="flex w-max animate-[c02-marquee_28s_linear_infinite] gap-10 whitespace-nowrap py-1.5 text-[13px] font-bold italic uppercase">
        <span v-for="n in 2" :key="n" class="flex gap-10" :aria-hidden="n === 2"><span v-for="a in site.announcements" :key="a">⚡ {{ a }}</span><span v-for="a in site.announcements" :key="a + 'b'">⚡ {{ a }}</span></span>
      </div>
    </div>
    <header class="bg-inverse text-inverse-ink">
      <div class="container-site flex h-nav items-center gap-4">
        <button type="button" class="-ml-2 grid h-11 w-11 place-items-center lg:hidden" aria-label="เปิดเมนู" :aria-expanded="menuOpen" @click="menuOpen = true"><AppIcon name="menu" /></button>
        <NuxtLink :to="link('/')" class="-skew-x-6 bg-accent px-3 py-0.5 font-display text-2xl uppercase leading-tight text-accent-ink md:text-3xl" :aria-label="`${site.brand} หน้าแรก`">{{ site.brand }}</NuxtLink>
        <nav aria-label="หมวดหมู่หลัก" class="ml-4 hidden flex-1 lg:block">
          <ul class="flex items-center gap-1 whitespace-nowrap text-[15px] font-bold italic uppercase">
            <li v-for="item in mainNav" :key="item.label">
              <NuxtLink :to="link(item.to)" class="block rounded-full px-3 py-1.5 transition-colors hover:bg-accent hover:text-accent-ink">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </nav>
        <div class="ml-auto flex items-center gap-1.5">
          <button type="button" class="flex h-10 items-center gap-2 rounded-full bg-white/10 px-3 hover:bg-white/20 xl:w-56" aria-label="ค้นหา" @click="searchOpen = !searchOpen">
            <AppIcon name="search" :size="18" /><span class="hidden text-sm text-white/70 xl:inline">ค้นหารองเท้า…</span>
          </button>
          <a href="#stores" class="hidden h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 lg:grid" aria-label="ค้นหาสาขา"><AppIcon name="pin" :size="18" /></a>
          <button type="button" class="hidden h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 lg:grid" aria-label="บัญชีของฉัน"><AppIcon name="user" :size="18" /></button>
          <NuxtLink :to="link('/products?wishlist=1')" class="relative hidden h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 lg:grid" :aria-label="`รายการโปรด ${wish.count.value}`">
            <AppIcon name="heart" :size="18" /><span v-if="wish.count.value" class="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent-2 px-1 text-[11px] font-bold text-accent-2-ink">{{ wish.count.value }}</span>
          </NuxtLink>
          <button type="button" class="flex h-10 items-center gap-2 rounded-full bg-accent px-4 font-bold text-accent-ink" :aria-label="`ตะกร้า ${cart.count.value} ชิ้น`" @click="cart.open.value = true">
            <AppIcon name="bag" :size="18" /><span class="tabular-nums">{{ cart.count.value }}</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Search drop panel -->
    <Transition name="fade">
      <div v-if="searchOpen" class="absolute inset-x-0 top-full max-h-[80vh] overflow-y-auto border-b-4 border-accent bg-bg shadow-pop" role="dialog" aria-label="ค้นหา">
        <div class="container-site py-8">
          <form role="search" class="flex items-center gap-3 rounded-full border-[3px] border-ink bg-surface px-5" @submit.prevent="submit">
            <AppIcon name="search" :size="24" />
            <label for="c02-search" class="sr-only">ค้นหา</label>
            <input id="c02-search" ref="input" v-model="q" type="search" autocomplete="off" placeholder="พิมพ์ชื่อรุ่น ประเภท หรือ “slide”" class="h-16 w-full bg-transparent text-xl font-semibold outline-none">
            <button type="button" class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-bg" aria-label="ปิดการค้นหา" @click="searchOpen = false"><AppIcon name="close" :size="18" /></button>
          </form>
          <SearchResults class="mt-8" :query="q" @select="searchOpen = false" @pick="(s) => (q = s)" />
        </div>
      </div>
    </Transition>

    <!-- Mobile menu -->
    <Teleport to="body">
      <Transition name="slide-up">
        <div v-if="menuOpen" class="fixed inset-0 z-[60] flex flex-col bg-inverse text-inverse-ink" role="dialog" aria-modal="true" aria-label="เมนู">
          <div class="container-site flex h-nav items-center justify-between">
            <span class="font-display text-2xl uppercase text-accent">MENU</span>
            <button type="button" class="grid h-11 w-11 place-items-center rounded-full bg-accent text-accent-ink" aria-label="ปิดเมนู" @click="menuOpen = false"><AppIcon name="close" /></button>
          </div>
          <nav class="container-site flex-1 overflow-y-auto pb-10">
            <ul>
              <li v-for="(item, n) in mainNav" :key="item.label" class="border-b border-white/15">
                <NuxtLink :to="link(item.to)" class="flex items-center justify-between py-3 font-display text-5xl uppercase" @click="menuOpen = false">
                  <span class="italic">{{ item.label }}</span><span class="text-sm tabular-nums text-accent">0{{ n + 1 }}</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style>
@keyframes c02-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
</style>
