<script setup lang="ts">
import { mainNav, promotions, site } from '~/data/content'
const { link } = useConcept()
const { searchOpen } = useUi()
const cart = useCart()
const wish = useWishlist()
const route = useRoute()
const router = useRouter()
const q = ref('')
const focused = ref(false)
const box = ref<HTMLElement>()
const mobileInput = ref<HTMLInputElement>()
watch(() => route.fullPath, () => { focused.value = false; searchOpen.value = false })
// Bottom-nav "Search" focuses the inline field instead of opening an overlay
watch(searchOpen, (v) => {
  if (!v) return
  window.scrollTo({ top: 0, behavior: 'smooth' })
  nextTick(() => mobileInput.value?.focus())
  searchOpen.value = false
})
function submit() {
  if (!q.value.trim()) return
  focused.value = false
  router.push(link(`/products?q=${encodeURIComponent(q.value.trim())}`))
}
function onFocusOut(e: FocusEvent) {
  if (!box.value?.contains(e.relatedTarget as Node)) focused.value = false
}
const open = computed(() => focused.value)
function blurLater() { setTimeout(() => (focused.value = false), 150) }
</script>

<template>
  <header class="sticky top-0 z-40 bg-bg shadow-[0_1px_0_var(--line)]">
    <div class="bg-accent-2 text-accent-2-ink">
      <p class="container-site flex h-9 items-center justify-center gap-2 text-center text-[13px] font-semibold">
        <AppIcon name="spark" :size="14" /> {{ promotions[0]!.label }} · โค้ด <span class="rounded bg-ink px-1.5 text-bg">{{ promotions[0]!.code }}</span><span class="hidden sm:inline">· {{ site.announcements[0] }}</span>
      </p>
    </div>
    <div class="container-site flex h-16 items-center gap-3 md:h-[72px] md:gap-6">
      <NuxtLink :to="link('/')" class="shrink-0 font-display text-2xl font-extrabold tracking-tight" :aria-label="`${site.brand} หน้าแรก`">{{ site.brand.toLowerCase() }}<span class="text-accent">.</span></NuxtLink>

      <div ref="box" class="relative hidden flex-1 md:block" @focusout="onFocusOut">
        <form role="search" @submit.prevent="submit">
          <label for="c04-search" class="sr-only">ค้นหาสินค้า</label>
          <div class="flex h-12 items-center gap-2 rounded-btn border-2 bg-surface px-4 transition-colors" :class="open ? 'border-accent bg-bg' : 'border-transparent'">
            <AppIcon name="search" :size="20" class="text-muted" />
            <input id="c04-search" v-model="q" type="search" autocomplete="off" role="combobox" :aria-expanded="open" aria-controls="c04-search-panel" placeholder="ค้นหา เช่น “slide”, “ICONIC”, “รองเท้าเด็ก”" class="h-full w-full bg-transparent outline-none" @focus="focused = true">
            <kbd class="hidden rounded border border-line px-1.5 text-xs text-muted lg:block">Enter</kbd>
          </div>
        </form>
        <div v-if="open" id="c04-search-panel" class="absolute inset-x-0 top-[calc(100%+8px)] max-h-[70vh] overflow-y-auto rounded-card border border-line bg-bg p-5 shadow-pop" tabindex="-1">
          <SearchResults :query="q" @select="focused = false" @pick="(s) => (q = s)" />
        </div>
      </div>

      <div class="ml-auto flex items-center md:ml-0">
        <a href="#stores" class="hidden flex-col items-center px-3 text-[11px] text-muted hover:text-ink lg:flex"><AppIcon name="pin" :size="22" class="text-ink" />สาขา</a>
        <button type="button" class="hidden flex-col items-center px-3 text-[11px] text-muted hover:text-ink lg:flex"><AppIcon name="user" :size="22" class="text-ink" />บัญชี</button>
        <NuxtLink :to="link('/products?wishlist=1')" class="relative hidden flex-col items-center px-3 text-[11px] text-muted hover:text-ink lg:flex"><AppIcon name="heart" :size="22" class="text-ink" />ถูกใจ<span v-if="wish.count.value" class="absolute right-2 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-sale px-1 text-[10px] font-bold text-white">{{ wish.count.value }}</span></NuxtLink>
        <button type="button" class="flex h-11 items-center gap-2 rounded-btn bg-accent px-3 text-accent-ink md:px-4" :aria-label="`ตะกร้า ${cart.count.value} ชิ้น`" @click="cart.open.value = true">
          <AppIcon name="bag" :size="20" /><span class="text-sm font-bold tabular-nums">{{ cart.count.value }}</span><span class="hidden border-l border-white/30 pl-2 text-sm tabular-nums xl:inline">{{ formatPrice(cart.subtotal.value) }}</span>
        </button>
      </div>
    </div>
    <!-- Mobile search row -->
    <form role="search" class="container-site pb-3 md:hidden" @submit.prevent="submit">
      <label for="c04-search-m" class="sr-only">ค้นหาสินค้า</label>
      <div class="flex h-11 items-center gap-2 rounded-btn bg-surface px-3">
        <AppIcon name="search" :size="18" class="text-muted" />
        <input id="c04-search-m" ref="mobileInput" v-model="q" type="search" autocomplete="off" placeholder="ค้นหารองเท้า…" class="h-full w-full bg-transparent outline-none" @focus="focused = true" @blur="blurLater">
      </div>
      <div v-if="focused && q" class="mt-2 max-h-[60vh] overflow-y-auto rounded-card border border-line bg-bg p-4 shadow-pop">
        <SearchResults :query="q" :columns="false" @select="focused = false" />
      </div>
    </form>
    <nav aria-label="หมวดหมู่หลัก" class="hidden border-t border-line md:block">
      <ul class="container-site no-scrollbar flex h-12 items-center gap-1 overflow-x-auto text-sm font-semibold">
        <li v-for="item in mainNav" :key="item.label"><NuxtLink :to="link(item.to)" class="block whitespace-nowrap rounded-chip px-3 py-1.5 hover:bg-surface" active-class="bg-surface">{{ item.label }}</NuxtLink></li>
        <li class="ml-auto"><NuxtLink :to="link('/products?badge=sale')" class="block whitespace-nowrap rounded-chip bg-[#fee2e2] px-3 py-1.5 text-sale">ลดราคา</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>
