<script setup lang="ts">
import { site } from '~/data/content'
const { link } = useConcept()
</script>

<template>
  <footer class="mt-section border-t border-line bg-surface">
    <div class="container-site grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-5">
      <div class="lg:col-span-2">
        <p class="font-display text-2xl font-extrabold">{{ site.brand.toLowerCase() }}<span class="text-accent">.</span></p>
        <p class="mt-2 max-w-xs text-sm text-muted">{{ site.tagline }} · ชำระเงินปลอดภัย · บัตร / QR PromptPay / เก็บเงินปลายทาง</p>
        <div class="mt-4 flex gap-2 text-xs font-bold"><span class="rounded border border-line bg-bg px-2 py-1">VISA</span><span class="rounded border border-line bg-bg px-2 py-1">Mastercard</span><span class="rounded border border-line bg-bg px-2 py-1">PromptPay</span><span class="rounded border border-line bg-bg px-2 py-1">COD</span></div>
      </div>
      <div><p class="font-bold">ช้อป</p><ul class="mt-3 space-y-2 text-sm text-muted"><li><NuxtLink :to="link('/products?gender=men')">ผู้ชาย</NuxtLink></li><li><NuxtLink :to="link('/products?gender=women')">ผู้หญิง</NuxtLink></li><li><NuxtLink :to="link('/products?gender=kids')">เด็ก</NuxtLink></li><li><NuxtLink :to="link('/products?badge=sale')">ลดราคา</NuxtLink></li></ul></div>
      <div><p class="font-bold">บริการลูกค้า</p><ul class="mt-3 space-y-2 text-sm text-muted"><li>ติดตามคำสั่งซื้อ</li><li>เปลี่ยน/คืนสินค้า 30 วัน</li><li>ตารางไซซ์</li><li>Call center 02 000 1000</li></ul></div>
      <div><p class="font-bold">เกี่ยวกับเรา</p><ul class="mt-3 space-y-2 text-sm text-muted"><li><a href="#technology">G-BOLD</a></li><li><a href="#stores">สาขา</a></li><li>Stories</li></ul></div>
    </div>
    <p class="container-site border-t border-line py-5 text-xs text-muted">© 2026 {{ site.brand }} · Prototype — Concept 04 · Smart Commerce</p>
  </footer>
</template>
