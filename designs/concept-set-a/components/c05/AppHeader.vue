<script setup lang="ts">
import { mainNav, site } from '~/data/content'
const { link } = useConcept()
const { searchOpen, menuOpen } = useUi()
const cart = useCart()
const wish = useWishlist()
const route = useRoute()
const router = useRouter()
watch(() => route.fullPath, () => { searchOpen.value = false; menuOpen.value = false })
useOverlay(searchOpen)
useOverlay(menuOpen)
const q = ref('')
const input = ref<HTMLInputElement>()
watch(searchOpen, (v) => v && nextTick(() => input.value?.focus()))
function submit() { if (q.value.trim()) router.push(link(`/products?q=${encodeURIComponent(q.value.trim())}`)) }
function onKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); searchOpen.value = !searchOpen.value }
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line bg-bg">
    <div class="container-site flex h-nav items-center gap-6">
      <button type="button" class="-ml-2 grid h-11 w-11 place-items-center lg:hidden" aria-label="เปิดเมนู" @click="menuOpen = true"><AppIcon name="menu" /></button>
      <NuxtLink :to="link('/')" class="flex items-center gap-2 font-display text-lg font-bold tracking-[0.18em]" :aria-label="`${site.brand} หน้าแรก`">
        <span class="h-3 w-3 bg-accent" aria-hidden="true" />{{ site.brand }}<span class="font-mono text-xs font-normal tracking-normal text-muted">/LAB</span>
      </NuxtLink>
      <nav aria-label="หมวดหมู่หลัก" class="hidden lg:block">
        <ul class="flex gap-5 font-mono text-[12px] uppercase tracking-wider text-ink-2">
          <li v-for="(item, n) in mainNav" :key="item.label"><NuxtLink :to="link(item.to)" class="hover:text-accent"><span class="text-muted">0{{ n + 1 }}</span> {{ item.label }}</NuxtLink></li>
        </ul>
      </nav>
      <div class="ml-auto flex items-center gap-1">
        <button type="button" class="hidden h-9 items-center gap-3 rounded-btn border border-line px-3 font-mono text-xs text-muted hover:border-ink-2 md:flex" @click="searchOpen = true">
          <AppIcon name="search" :size="16" /> Search catalogue <kbd class="rounded-[2px] border border-line px-1">⌘K</kbd>
        </button>
        <button type="button" class="grid h-11 w-11 place-items-center md:hidden" aria-label="ค้นหา" @click="searchOpen = true"><AppIcon name="search" /></button>
        <a href="#stores" class="hidden h-11 w-11 place-items-center lg:grid" aria-label="ค้นหาสาขา"><AppIcon name="pin" /></a>
        <button type="button" class="hidden h-11 w-11 place-items-center lg:grid" aria-label="บัญชีของฉัน"><AppIcon name="user" /></button>
        <NuxtLink :to="link('/products?wishlist=1')" class="hidden h-11 w-11 place-items-center lg:grid" :aria-label="`รายการโปรด ${wish.count.value}`"><AppIcon name="heart" /></NuxtLink>
        <button type="button" class="flex h-9 items-center gap-2 rounded-btn bg-accent px-3 font-mono text-xs font-medium text-accent-ink" :aria-label="`ตะกร้า ${cart.count.value} ชิ้น`" @click="cart.open.value = true"><AppIcon name="bag" :size="16" />[{{ String(cart.count.value).padStart(2, '0') }}]</button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="searchOpen" class="fixed inset-0 z-[65] overflow-y-auto bg-black/70 px-4 pt-[10vh]" @click.self="searchOpen = false">
          <div class="mx-auto max-w-2xl rounded-card border border-line bg-surface text-ink shadow-pop" role="dialog" aria-modal="true" aria-label="ค้นหา (command palette)">
            <form role="search" class="flex items-center gap-3 border-b border-line px-4" @submit.prevent="submit">
              <AppIcon name="search" class="text-accent" />
              <label for="c05-search" class="sr-only">ค้นหา</label>
              <input id="c05-search" ref="input" v-model="q" type="search" autocomplete="off" placeholder="Search products, categories, notes…  ลอง “slide”" class="h-14 w-full bg-transparent font-mono text-sm outline-none">
              <kbd class="rounded-[2px] border border-line px-1.5 font-mono text-xs text-muted">ESC</kbd>
            </form>
            <div class="max-h-[60vh] overflow-y-auto p-4"><SearchResults :query="q" :columns="false" @select="searchOpen = false" @pick="(s) => (q = s)" /></div>
          </div>
        </div>
      </Transition>
      <Transition name="fade">
        <div v-if="menuOpen" class="fixed inset-0 z-[60] overflow-y-auto bg-bg text-ink" role="dialog" aria-modal="true" aria-label="เมนู">
          <div class="container-site flex h-nav items-center justify-between border-b border-line"><span class="font-mono text-xs uppercase text-muted">Index</span><button type="button" class="grid h-11 w-11 place-items-center" aria-label="ปิดเมนู" @click="menuOpen = false"><AppIcon name="close" /></button></div>
          <ul class="container-site divide-y divide-line">
            <li v-for="(item, n) in mainNav" :key="item.label"><NuxtLink :to="link(item.to)" class="flex items-baseline gap-4 py-4 font-display text-3xl" @click="menuOpen = false"><span class="font-mono text-xs text-accent">0{{ n + 1 }}</span>{{ item.label }}</NuxtLink></li>
          </ul>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>
