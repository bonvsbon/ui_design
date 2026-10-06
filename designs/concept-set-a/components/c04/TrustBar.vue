<script setup lang="ts">
const items = [
  { icon: 'truck', t: 'ส่งฟรีครบ ฿499', d: 'กรุงเทพฯ ถึงพรุ่งนี้' },
  { icon: 'return', t: 'คืนได้ 30 วัน', d: 'เปลี่ยนไซซ์ฟรีครั้งแรก' },
  { icon: 'store', t: 'รับที่สาขา', d: 'พร้อมใน 2 ชั่วโมง' },
  { icon: 'shield', t: 'ของแท้ 100%', d: 'ผลิตในประเทศไทย' },
]
</script>

<template>
  <section aria-label="บริการของเรา" class="border-y border-line">
    <ul class="container-site grid grid-cols-2 gap-4 py-5 lg:grid-cols-4">
      <li v-for="i in items" :key="i.t" class="flex items-center gap-3">
        <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface text-accent-text"><AppIcon :name="i.icon" :size="22" /></span>
        <span><span class="block text-sm font-bold">{{ i.t }}</span><span class="block text-xs text-muted">{{ i.d }}</span></span>
      </li>
    </ul>
  </section>
</template>
