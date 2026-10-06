<script setup lang="ts">
import { site } from '~/data/content'
const { link } = useConcept()
const toast = useToast()
const email = ref('')
const cols = [
  { h: 'Shop', links: [['Men', '/products?gender=men'], ['Women', '/products?gender=women'], ['Kids', '/products?gender=kids'], ['New Arrivals', '/products?badge=new']] },
  { h: 'Help', links: [['ติดตามคำสั่งซื้อ', '#'], ['การจัดส่ง', '#'], ['คืนสินค้า', '#'], ['ตารางไซซ์', '#']] },
  { h: 'Brand', links: [['G-BOLD Technology', '#technology'], ['Stories', '#stories'], ['Store Locator', '#stores'], ['ร่วมงานกับเรา', '#']] },
]
</script>

<template>
  <footer class="mt-section border-t border-line">
    <div class="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
      <form class="max-w-sm" @submit.prevent="toast.show('ขอบคุณ! เราจะส่งข่าวสารคอลเลกชันใหม่ให้คุณก่อนใคร'); email = ''">
        <p class="font-display text-xl font-bold uppercase" style="font-stretch: 112%">First to know.</p>
        <p class="mt-2 text-sm text-muted">รับข่าวคอลเลกชันใหม่และสิทธิ์ซื้อก่อนใคร</p>
        <label for="c01-news" class="sr-only">อีเมล</label>
        <div class="mt-4 flex border-b border-ink">
          <input id="c01-news" v-model="email" type="email" required placeholder="อีเมลของคุณ" class="w-full bg-transparent py-3 outline-none">
          <button type="submit" class="font-display text-xs font-semibold uppercase tracking-[0.2em]">Join</button>
        </div>
      </form>
      <nav v-for="c in cols" :key="c.h" :aria-label="c.h">
        <p class="mb-4 font-display text-[11px] uppercase tracking-[0.2em] text-muted">{{ c.h }}</p>
        <ul class="space-y-2 text-sm"><li v-for="[l, to] in c.links" :key="l"><NuxtLink :to="link(to!)" class="hover:underline">{{ l }}</NuxtLink></li></ul>
      </nav>
    </div>
    <div class="overflow-hidden border-t border-line">
      <p class="container-site select-none py-4 text-center font-display font-black uppercase leading-[0.8] tracking-[-0.02em]" style="font-size: clamp(64px, 19vw, 300px); font-stretch: 125%" aria-hidden="true">{{ site.brand }}</p>
    </div>
    <div class="container-site flex flex-col justify-between gap-2 py-6 text-xs text-muted md:flex-row">
      <p>© 2026 {{ site.brand }} · {{ site.tagline }}</p>
      <p>Prototype — Concept 01 · Premium Street</p>
    </div>
  </footer>
</template>
