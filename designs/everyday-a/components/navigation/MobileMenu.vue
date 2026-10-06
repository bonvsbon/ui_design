<script setup lang="ts">
import { media } from '~/data/media'
/** Mobile/tablet navigation drawer: big category tiles first (thumb-friendly), then accordions. */
const ui = useUiStore()
const site = useSite()
const route = useRoute()
const open = computed(() => ui.overlay === 'menu')
const expanded = ref<number | null>(null)
watch(() => route.fullPath, () => ui.overlay === 'menu' && ui.close())

const tiles = [
  { label: 'Men', to: '/products?gender=men', media: media.gOutdoorMan },
  { label: 'Women', to: '/products?gender=women', media: media.gPinkLegs },
  { label: 'Kids', to: '/products?gender=kids', media: media.kidPaint },
  { label: 'Sneakers', to: '/products?type=sneakers', media: media.crosswalk },
]
</script>

<template>
  <Teleport to="body">
    <Transition name="fade"><div v-if="open" class="fixed inset-0 z-overlay bg-black/45 lg:hidden" @click="ui.close()" /></Transition>
    <Transition name="drawer-l">
      <div v-if="open" role="dialog" aria-modal="true" aria-label="เมนู" class="fixed inset-y-0 left-0 z-overlay flex w-[min(92vw,420px)] flex-col bg-paper lg:hidden" @keydown.esc="ui.close()">
        <div class="flex h-header shrink-0 items-center justify-between border-b border-line px-4">
          <GambolLogo />
          <button type="button" class="grid h-11 w-11 place-items-center" aria-label="ปิดเมนู" autofocus @click="ui.close()"><AppIcon name="close" /></button>
        </div>
        <div class="flex-1 overflow-y-auto pb-10">
          <ul class="grid grid-cols-2 gap-2 p-4">
            <li v-for="t in tiles" :key="t.label">
              <NuxtLink :to="t.to" class="relative block aspect-[4/3] overflow-hidden bg-paper-2">
                <AppImage :media="t.media" sizes="45vw" :widths="[320, 480, 640]" />
                <span class="scrim-b absolute inset-0" />
                <span class="display-s absolute bottom-3 left-3 text-white">{{ t.label }}</span>
              </NuxtLink>
            </li>
          </ul>
          <ul class="border-t border-line">
            <li v-for="(item, i) in site?.nav" :key="item.label" class="border-b border-line">
              <div v-if="item.mega">
                <button type="button" class="flex min-h-[56px] w-full items-center justify-between px-5 text-left text-sm font-semibold uppercase tracking-[0.1em]" :aria-expanded="expanded === i" @click="expanded = expanded === i ? null : i">
                  {{ item.label }} <AppIcon name="chevron-down" :size="18" class="transition-transform" :class="expanded === i ? 'rotate-180' : ''" />
                </button>
                <div v-show="expanded === i" class="grid gap-6 px-5 pb-6">
                  <div v-for="col in item.mega.columns" :key="col.heading">
                    <p class="eyebrow text-muted">{{ col.heading }}</p>
                    <ul class="mt-2">
                      <li v-for="l in col.links" :key="l.label"><NuxtLink :to="l.to" class="block py-2 text-[0.98rem]">{{ l.label }}</NuxtLink></li>
                    </ul>
                  </div>
                </div>
              </div>
              <NuxtLink v-else :to="item.to" class="flex min-h-[56px] items-center px-5 text-sm font-semibold uppercase tracking-[0.1em]" :class="item.label === 'GBOLD Technology' ? 'text-red' : ''">{{ item.label }}</NuxtLink>
            </li>
          </ul>
          <ul class="mt-4 grid gap-1 px-5 font-thai text-[0.95rem]">
            <li><NuxtLink to="/stores" class="flex items-center gap-3 py-3"><AppIcon name="pin" :size="20" /> ค้นหาร้านใกล้คุณ</NuxtLink></li>
            <li><NuxtLink to="/wishlist" class="flex items-center gap-3 py-3"><AppIcon name="heart" :size="20" /> รายการโปรด</NuxtLink></li>
            <li><button type="button" class="flex items-center gap-3 py-3" @click="ui.notify('ระบบสมาชิกจะเปิดในเฟสถัดไป')"><AppIcon name="user" :size="20" /> เข้าสู่ระบบ / สมัครสมาชิก</button></li>
          </ul>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
