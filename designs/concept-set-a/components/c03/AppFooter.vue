<script setup lang="ts">
import { site } from '~/data/content'
const { link } = useConcept()
</script>

<template>
  <footer class="mt-section border-t border-line bg-surface-2">
    <div class="container-site grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
      <div>
        <p class="font-display text-4xl font-semibold">{{ site.brand }}</p>
        <p class="mt-2 max-w-xs italic text-muted" style="font-family: var(--font-display)">รองเท้าสำหรับทุกเรื่องราวในชีวิตประจำวัน ผลิตในประเทศไทยตั้งแต่ปี 2003</p>
      </div>
      <div><p class="mb-3 font-semibold">ช้อป</p><ul class="space-y-2 text-muted"><li><NuxtLink :to="link('/products?gender=men')">ผู้ชาย</NuxtLink></li><li><NuxtLink :to="link('/products?gender=women')">ผู้หญิง</NuxtLink></li><li><NuxtLink :to="link('/products?gender=kids')">เด็ก</NuxtLink></li><li><NuxtLink :to="link('/products?badge=new')">สินค้าใหม่</NuxtLink></li></ul></div>
      <div><p class="mb-3 font-semibold">เรื่องราว</p><ul class="space-y-2 text-muted"><li><a href="#stories">Journal</a></li><li><a href="#technology">G-BOLD</a></li><li><a href="#community">ผู้ใส่จริง</a></li></ul></div>
      <div><p class="mb-3 font-semibold">ช่วยเหลือ</p><ul class="space-y-2 text-muted"><li><a href="#">ติดตามพัสดุ</a></li><li><a href="#">การคืนสินค้า</a></li><li><a href="#visit">ค้นหาร้าน</a></li></ul></div>
    </div>
    <p class="container-site border-t border-line py-5 text-xs text-muted">© 2026 {{ site.brand }} · Prototype — Concept 03 · Lifestyle Storytelling</p>
  </footer>
</template>
