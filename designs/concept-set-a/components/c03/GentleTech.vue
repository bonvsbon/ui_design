<script setup lang="ts">
import { technology } from '~/data/content'
defineProps<{ title: string; subtitle?: string }>()
const icons: Record<string, string> = { comfort: 'smile', soft: 'cloud', light: 'feather', durable: 'shield' }
const plain: Record<string, string> = {
  comfort: 'เหมือนมีเบาะเล็ก ๆ ใต้ส้นเท้า แรงกดตอนเดินจึงลดลงเกือบหนึ่งในสาม',
  soft: 'นุ่มพอให้เท้าจม แต่ไม่ยวบจนเดินเหนื่อย เพราะโฟมคืนตัวทันที',
  light: 'เบากว่าแอปเปิ้ลหนึ่งลูก ใส่ทั้งวันก็ไม่รู้สึกถ่วงขา',
  durable: 'ผ่านการงอพับห้าหมื่นรอบโดยไม่แตก — ใช้ได้หลายหน้าร้อน',
}
</script>

<template>
  <section id="technology" class="container-site py-section" aria-labelledby="c03-tech-title">
    <div class="grid gap-10 lg:grid-cols-[1fr_2fr]">
      <div>
        <p class="text-sm uppercase tracking-[0.2em] text-accent-text">{{ technology.name }}</p>
        <h2 id="c03-tech-title" class="mt-3 font-display text-5xl italic leading-tight md:text-6xl">{{ title }}</h2>
        <p class="mt-4 text-lg text-muted">{{ subtitle }}</p>
        <p class="mt-6 text-ink-2">{{ technology.summary }}</p>
      </div>
      <ul class="grid gap-4 sm:grid-cols-2">
        <li v-for="(b, n) in technology.benefits" :key="b.id" class="group rounded-card border border-line bg-surface p-6 transition-colors hover:border-accent" :class="n % 2 ? 'sm:translate-y-8' : ''">
          <span class="grid h-14 w-14 place-items-center rounded-full bg-surface-2 text-accent-text transition-transform group-hover:scale-110 group-hover:-rotate-6"><AppIcon :name="icons[b.id]!" :size="28" /></span>
          <p class="mt-5 font-display text-3xl">{{ b.labelTh }} <span class="text-lg italic text-muted">{{ b.label }}</span></p>
          <p class="mt-2 text-ink-2">{{ plain[b.id] }}</p>
          <p class="mt-4 font-display text-4xl text-accent-text">{{ b.metric }}<span class="ml-1 text-base text-muted">{{ b.unit }}</span></p>
        </li>
      </ul>
    </div>
  </section>
</template>
