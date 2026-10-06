<script setup lang="ts">
import { site, stores } from '~/data/content'
const { link } = useConcept()
const toast = useToast()
const email = ref('')
</script>

<template>
  <footer id="stores" class="mt-section bg-inverse text-inverse-ink">
    <div class="container-site grid gap-10 py-16 lg:grid-cols-2">
      <div>
        <p class="font-display text-6xl uppercase leading-[0.9] md:text-8xl">JOIN THE<br><span class="text-accent">BOLD CLUB</span></p>
        <form class="mt-8 flex max-w-md items-center gap-2 rounded-full bg-white p-1.5 text-ink" @submit.prevent="toast.show('ยินดีต้อนรับสู่ BOLD CLUB! เช็กอีเมลเพื่อรับโค้ด 10%'); email = ''">
          <label for="c02-news" class="sr-only">อีเมล</label>
          <input id="c02-news" v-model="email" type="email" required placeholder="อีเมลของคุณ" class="h-11 w-full bg-transparent px-4 outline-none">
          <button type="submit" class="h-11 shrink-0 rounded-full bg-accent-2 px-5 font-bold text-accent-2-ink">สมัคร</button>
        </form>
      </div>
      <div class="grid gap-8 sm:grid-cols-2">
        <div>
          <p class="mb-3 font-display text-2xl uppercase text-accent">STORES</p>
          <ul class="space-y-2 text-sm text-white/80"><li v-for="s in stores.slice(0, 5)" :key="s.id">{{ s.mall }} · {{ s.province }}</li></ul>
          <a href="#" class="mt-3 inline-block text-sm font-bold underline">ดูสาขาทั้งหมด ({{ stores.length }})</a>
        </div>
        <div>
          <p class="mb-3 font-display text-2xl uppercase text-accent">HELP</p>
          <ul class="space-y-2 text-sm text-white/80">
            <li><NuxtLink :to="link('/products')">ช้อปทั้งหมด</NuxtLink></li><li><a href="#">ติดตามคำสั่งซื้อ</a></li><li><a href="#">การคืนสินค้า</a></li><li><a href="#">ตารางไซซ์</a></li><li><a href="#technology">G-BOLD Technology</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container-site flex flex-wrap justify-between gap-2 border-t border-white/15 py-6 text-xs text-white/60">
      <span>© 2026 {{ site.brand }}</span><span>Prototype — Concept 02 · Bold Sport</span>
    </div>
  </footer>
</template>
