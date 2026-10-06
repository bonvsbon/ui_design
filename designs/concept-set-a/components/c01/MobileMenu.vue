<script setup lang="ts">
import { categories } from '~/data/catalog'
import { mainNav } from '~/data/content'
const { menuOpen } = useUi()
const { link } = useConcept()
useOverlay(menuOpen)
const list = categories.filter((c) => ['men', 'women', 'kids', 'sneakers', 'new', 'best'].includes(c.slug))
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="menuOpen" class="theme-c01 fixed inset-0 z-[60] flex flex-col bg-bg text-ink" role="dialog" aria-modal="true" aria-label="เมนู">
        <div class="container-site flex h-nav items-center justify-between border-b border-line">
          <span class="font-display text-sm uppercase tracking-[0.2em]">Menu</span>
          <button type="button" class="-mr-2 grid h-11 w-11 place-items-center" aria-label="ปิดเมนู" @click="menuOpen = false"><AppIcon name="close" :size="22" /></button>
        </div>
        <nav class="container-site flex-1 overflow-y-auto py-6" aria-label="เมนูมือถือ">
          <ul class="divide-y divide-line">
            <li v-for="c in list" :key="c.slug">
              <NuxtLink :to="link(`/products?${toQuery(c.query)}`)" class="flex items-center justify-between py-4" @click="menuOpen = false">
                <span class="font-display text-4xl font-extrabold uppercase" style="font-stretch: 112%">{{ c.label }}</span>
                <span class="text-sm text-muted">{{ c.labelTh }}</span>
              </NuxtLink>
            </li>
          </ul>
          <ul class="mt-8 grid grid-cols-2 gap-3 text-sm">
            <li v-for="n in mainNav.slice(5)" :key="n.label"><a :href="n.to" class="block border border-line px-4 py-3" @click="menuOpen = false">{{ n.label }}</a></li>
            <li><a href="#stores" class="block border border-line px-4 py-3" @click="menuOpen = false">Store Locator</a></li>
            <li><button type="button" class="block w-full border border-line px-4 py-3 text-left">Account</button></li>
          </ul>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>
