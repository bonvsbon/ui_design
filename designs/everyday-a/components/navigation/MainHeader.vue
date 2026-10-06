<script setup lang="ts">
/**
 * Sticky header. On the homepage it sits transparent over the hero until the user scrolls
 * or opens the mega menu; everywhere else it is solid.
 */
const route = useRoute()
const site = useSite()
const ui = useUiStore()
const cart = useCartStore()
const wishlist = useWishlistStore()

const scrolled = ref(false)
const openIdx = ref<number | null>(null)
let closeT: ReturnType<typeof setTimeout> | undefined

const onScroll = () => { scrolled.value = window.scrollY > 24 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
watch(() => route.fullPath, () => { openIdx.value = null })

const overlay = computed(() => route.path === '/' && !scrolled.value && openIdx.value === null)

function enter(i: number) { clearTimeout(closeT); openIdx.value = i }
function leave() { clearTimeout(closeT); closeT = setTimeout(() => { openIdx.value = null }, 140) }
function onKey(e: KeyboardEvent) { if (e.key === 'Escape') openIdx.value = null }
</script>

<template>
  <header
    class="sticky top-0 z-header transition-colors duration-300"
    :class="overlay ? 'bg-transparent text-white' : 'bg-paper/95 text-ink backdrop-blur-sm [box-shadow:0_1px_0_var(--line)]'"
    @keydown="onKey" @mouseleave="leave"
  >
    <div class="wrap flex h-header items-center gap-4">
      <!-- Mobile: menu -->
      <button type="button" class="-ml-2 grid h-11 w-11 place-items-center lg:hidden" aria-label="เปิดเมนู" @click="ui.open('menu')">
        <AppIcon name="menu" />
      </button>

      <NuxtLink to="/" class="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0" aria-label="GAMBOL หน้าแรก">
        <GambolLogo :inverted="overlay" />
      </NuxtLink>

      <!-- Desktop nav -->
      <nav aria-label="หลัก" class="ml-8 hidden h-full lg:block">
        <ul class="flex h-full items-center">
          <li v-for="(item, i) in site?.nav" :key="item.label" class="h-full items-center" :class="['New Arrivals', 'Stories'].includes(item.label) ? 'hidden xl:flex' : 'flex'" @mouseenter="item.mega ? enter(i) : (openIdx = null)" @focusin="item.mega ? enter(i) : (openIdx = null)">
            <NuxtLink
              :to="item.to"
              class="relative flex h-full items-center whitespace-nowrap px-3 text-[0.8rem] font-semibold uppercase tracking-[0.1em] xl:px-4"
              :aria-expanded="item.mega ? openIdx === i : undefined"
              :class="item.label === 'GBOLD Technology' ? (overlay ? 'text-sun' : 'text-red') : ''"
            >
              {{ item.label }}
              <span class="absolute inset-x-3 bottom-0 h-[2px] origin-left bg-current transition-transform duration-300 xl:inset-x-4" :class="openIdx === i ? 'scale-x-100' : 'scale-x-0'" />
            </NuxtLink>
            <Transition name="drop">
              <div v-if="item.mega && openIdx === i" class="absolute inset-x-0 top-full text-ink" @mouseenter="enter(i)">
                <MegaMenu :item="item" @navigate="openIdx = null" />
              </div>
            </Transition>
          </li>
        </ul>
      </nav>

      <!-- Utilities -->
      <div class="ml-auto flex items-center">
        <button type="button" class="grid h-11 w-11 place-items-center" aria-label="ค้นหา" @click="ui.open('search')"><AppIcon name="search" /></button>
        <NuxtLink to="/stores" class="hidden h-11 w-11 place-items-center lg:grid" aria-label="ค้นหาร้าน"><AppIcon name="pin" /></NuxtLink>
        <NuxtLink to="/wishlist" class="relative hidden h-11 w-11 place-items-center lg:grid" :aria-label="`รายการโปรด ${wishlist.ids.length} รายการ`">
          <AppIcon name="heart" />
          <ClientOnly><span v-if="wishlist.ids.length" class="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red px-1 text-[0.6rem] font-bold text-white">{{ wishlist.ids.length }}</span></ClientOnly>
        </NuxtLink>
        <button type="button" class="hidden h-11 w-11 place-items-center lg:grid" aria-label="บัญชีของฉัน" @click="ui.notify('ระบบสมาชิกจะเปิดในเฟสถัดไป')"><AppIcon name="user" /></button>
        <button type="button" class="relative -mr-2 grid h-11 w-11 place-items-center lg:mr-0" :aria-label="`ตะกร้าสินค้า ${cart.count} ชิ้น`" @click="ui.open('cart')">
          <AppIcon name="bag" />
          <ClientOnly><span v-if="cart.count" class="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red px-1 text-[0.6rem] font-bold text-white">{{ cart.count }}</span></ClientOnly>
        </button>
      </div>
    </div>
  </header>
</template>
