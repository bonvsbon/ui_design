<script setup lang="ts">
import { mainNav, site } from '~/data/content'

const { link } = useConcept()
const { searchOpen, menuOpen } = useUi()
const cart = useCart()
const wish = useWishlist()
const active = ref<string | null>(null)
let closeTimer: ReturnType<typeof setTimeout> | undefined
function openMenu(label: string) { clearTimeout(closeTimer); active.value = label }
function scheduleClose() { closeTimer = setTimeout(() => (active.value = null), 120) }
const route = useRoute()
watch(() => route.fullPath, () => { active.value = null; menuOpen.value = false })
const activeItem = computed(() => mainNav.find((n) => n.label === active.value && n.children))
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line bg-bg" @mouseleave="scheduleClose">
    <div class="container-site grid h-nav grid-cols-[1fr_auto_1fr] items-center gap-4">
      <!-- Left: mobile menu / desktop nav -->
      <div class="flex items-center">
        <button type="button" class="-ml-2 grid h-11 w-11 place-items-center lg:hidden" aria-label="เปิดเมนู" :aria-expanded="menuOpen" @click="menuOpen = true"><AppIcon name="menu" :size="22" /></button>
        <nav aria-label="หมวดหมู่หลัก" class="hidden lg:block">
          <ul class="flex items-center gap-4 whitespace-nowrap font-display xl:gap-6 text-[12px] font-semibold uppercase tracking-[0.12em]" style="font-stretch: 105%">
            <li v-for="(item, n) in mainNav" :key="item.label" :class="n > 4 && 'hidden 2xl:block'" @mouseenter="item.children ? openMenu(item.label) : (active = null)">
              <NuxtLink
                :to="link(item.to)" class="relative py-2 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform hover:after:scale-x-100"
                :aria-expanded="item.children ? active === item.label : undefined"
                @focus="item.children && openMenu(item.label)"
              >{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <NuxtLink :to="link('/')" class="font-display text-[22px] font-extrabold uppercase tracking-[0.32em] md:text-[26px]" style="font-stretch: 125%" :aria-label="`${site.brand} หน้าแรก`">{{ site.brand }}</NuxtLink>

      <div class="flex items-center justify-end gap-1 font-display text-[12px] font-semibold uppercase tracking-[0.12em] xl:gap-5" style="font-stretch: 105%">
        <button type="button" class="grid h-11 w-11 place-items-center xl:w-auto xl:gap-2 xl:flex" aria-label="ค้นหา" @click="searchOpen = true"><AppIcon name="search" /><span class="hidden xl:inline">Search</span></button>
        <a href="#stores" class="hidden h-11 items-center gap-2 lg:flex" aria-label="ค้นหาสาขา"><AppIcon name="pin" /><span class="hidden xl:inline">Stores</span></a>
        <button type="button" class="hidden h-11 items-center gap-2 lg:flex" aria-label="บัญชีของฉัน"><AppIcon name="user" /><span class="hidden xl:inline">Account</span></button>
        <NuxtLink :to="link('/products?wishlist=1')" class="hidden h-11 items-center gap-1 lg:flex" :aria-label="`รายการโปรด ${wish.count.value} รายการ`"><AppIcon name="heart" /><span class="tabular-nums">{{ wish.count.value || '' }}</span></NuxtLink>
        <button type="button" class="flex h-11 items-center gap-1.5 pl-1" :aria-label="`ตะกร้า ${cart.count.value} ชิ้น`" @click="cart.open.value = true">
          <AppIcon name="bag" /><span class="tabular-nums">({{ cart.count.value }})</span>
        </button>
      </div>
    </div>

    <!-- Mega menu -->
    <Transition name="fade">
      <div v-if="activeItem" class="absolute inset-x-0 top-full hidden border-b border-line bg-bg lg:block" @mouseenter="openMenu(activeItem.label)">
        <div class="container-site grid grid-cols-[repeat(3,1fr)_1.4fr] gap-10 py-10">
          <div v-for="col in activeItem.children" :key="col.heading">
            <p class="mb-4 font-display text-[11px] uppercase tracking-[0.2em] text-muted">{{ col.heading }}</p>
            <ul class="space-y-2.5">
              <li v-for="l in col.links" :key="l.label"><NuxtLink :to="link(l.to)" class="text-lg hover:underline hover:underline-offset-4">{{ l.label }}</NuxtLink></li>
            </ul>
          </div>
          <NuxtLink v-if="activeItem.feature" :to="link(activeItem.feature.to)" class="group relative block aspect-[16/10] overflow-hidden">
            <SmartImg :id="activeItem.feature.media" sizes="480px" img-class="grayscale transition-transform duration-700 group-hover:scale-105" />
            <span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 p-5 text-white">{{ activeItem.feature.title }} →</span>
          </NuxtLink>
        </div>
      </div>
    </Transition>
    <C01MobileMenu />
  </header>
</template>
