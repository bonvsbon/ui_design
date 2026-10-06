<script setup lang="ts">
import { stores } from '~/data/content'
defineProps<{ title: string }>()
const q = ref('')
const list = computed(() => stores.filter((s) => !q.value || `${s.mall} ${s.province} ${s.region}`.includes(q.value)))
const toast = useToast()
const email = ref('')
</script>

<template>
  <section id="visit" class="container-site grid gap-6 py-section lg:grid-cols-[1.3fr_1fr]" aria-labelledby="c03-visit-title">
    <div class="rounded-card bg-surface p-6 md:p-10">
      <h2 id="c03-visit-title" class="font-display text-4xl italic md:text-5xl">{{ title }}</h2>
      <p class="mt-2 text-muted">ลองใส่จริง วัดเท้าฟรี และรับของที่สาขาได้ภายใน 2 ชั่วโมง</p>
      <label for="c03-store-q" class="sr-only">ค้นหาจังหวัดหรือห้าง</label>
      <input id="c03-store-q" v-model="q" type="search" placeholder="พิมพ์จังหวัด เช่น เชียงใหม่" class="mt-6 h-12 w-full rounded-full border border-line bg-bg px-5 outline-none focus:border-ink">
      <ul class="mt-4 max-h-80 divide-y divide-line overflow-y-auto">
        <li v-for="s in list" :key="s.id" class="flex items-start justify-between gap-4 py-4">
          <div><p class="font-semibold">{{ s.mall }}</p><p class="text-sm text-muted">{{ s.province }} · เปิด {{ s.hours }}</p><p class="mt-1 text-xs text-accent-text">{{ s.services.join(' · ') }}</p></div>
          <a :href="`tel:${s.phone.replace(/\s/g, '')}`" class="shrink-0 text-sm underline">{{ s.phone }}</a>
        </li>
        <li v-if="!list.length" class="py-6 text-muted">ยังไม่มีสาขาในพื้นที่นี้ — สั่งออนไลน์ส่งฟรีทั่วไทย</li>
      </ul>
    </div>
    <form class="relative flex flex-col justify-between overflow-hidden rounded-card bg-accent p-6 text-accent-ink md:p-10" @submit.prevent="toast.show('ขอบคุณค่ะ จดหมายฉบับหน้าจะส่งถึงคุณเร็ว ๆ นี้'); email = ''">
      <div>
        <p class="text-sm uppercase tracking-[0.2em] opacity-80">จดหมายจากเรา</p>
        <p class="mt-3 font-display text-4xl italic leading-tight">เรื่องเล่าใหม่ทุกเดือน ส่งตรงถึงกล่องจดหมาย</p>
      </div>
      <div class="mt-8">
        <label for="c03-news" class="text-sm">อีเมลของคุณ</label>
        <input id="c03-news" v-model="email" type="email" required class="mt-2 h-12 w-full rounded-full bg-surface px-5 text-ink outline-none">
        <button type="submit" class="mt-3 h-12 w-full rounded-full bg-ink font-semibold text-bg">สมัครรับจดหมาย</button>
      </div>
    </form>
  </section>
</template>
