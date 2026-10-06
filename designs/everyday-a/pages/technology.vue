<script setup lang="ts">
import { media } from '~/data/media'
import { techLayers, techPoints, techStats } from '~/data/technology'
useHead({ title: 'GBOLD Technology™' })
const products = useProducts()
const gboldBest = computed(() => sortProducts(products.value.filter((p) => p.gbold && !p.genders.every((g) => g === 'kids')), 'best').slice(0, 10))
</script>

<template>
  <div>
    <!-- Intro -->
    <section class="relative -mt-0 overflow-hidden bg-lagoon text-white">
      <div class="wrap grid min-h-[72svh] items-end gap-10 py-16 lg:grid-cols-12 lg:py-24">
        <div class="lg:col-span-7">
          <p class="eyebrow text-sun">GBOLD Technology™ · by GAMBOL</p>
          <h1 class="display-xl mt-5">Soft.<br>Lite.<br>Built to Last.</h1>
        </div>
        <div class="lg:col-span-4 lg:col-start-9">
          <p class="thai-lead text-white/85">GBOLD™ คือเทคโนโลยีการผลิตพื้นรองเท้าเฉพาะของ GAMBOL ที่ทำให้รองเท้าแตะคู่หนึ่ง นุ่ม เบา และทนทาน ไปพร้อมกัน ออกแบบและผลิตในประเทศไทย สำหรับการใช้ชีวิตจริงทุกวัน</p>
          <ul class="mt-8 grid grid-cols-4 gap-2">
            <li v-for="p in techPoints" :key="p.id" class="flex flex-col items-center gap-2 text-center"><span class="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-sun"><AppIcon :name="p.id" :size="24" /></span><span class="text-[0.68rem] font-semibold uppercase tracking-[0.12em]">{{ p.label }}</span></li>
          </ul>
        </div>
      </div>
    </section>

    <TechnologyExplorer eyebrow="Interactive" :title="['Explore', 'The Sole']" body="แตะหรือเลื่อนเมาส์ไปที่จุดบนพื้นรองเท้า เพื่อดูว่าแต่ละชั้นของ GBOLD™ ช่วยเท้าคุณอย่างไร" />

    <!-- Layers -->
    <section class="py-section" aria-labelledby="layers-title">
      <div class="wrap">
        <SectionHeader id="layers-title" eyebrow="Construction" title="Four Layers, One Feeling" subtitle="สี่ชั้นที่ทำงานร่วมกัน เพื่อความรู้สึกเดียว — สบาย" />
        <ol class="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="(l, n) in techLayers" :key="l.name" v-reveal="n * 80" class="flex flex-col bg-paper p-6 lg:p-8">
            <span class="display-l text-red">{{ String(n + 1).padStart(2, '0') }}</span>
            <p class="mt-10 text-lg font-semibold">{{ l.name }}</p>
            <p class="font-thai text-ink-2">{{ l.th }}</p>
            <p class="mt-3 font-thai text-sm text-muted">{{ l.note }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- Proof -->
    <section class="grid lg:grid-cols-2" aria-labelledby="proof-title">
      <div class="relative min-h-[360px]"><AppImage :media="media.shadowWalk" sizes="(min-width:1024px) 50vw, 100vw" :widths="[640, 960, 1280]" /></div>
      <div class="flex flex-col justify-center bg-ink px-gutter py-14 text-white lg:px-16">
        <h2 id="proof-title" class="display-l">Tested on<br>Real Days</h2>
        <p class="mt-4 max-w-md font-thai text-white/75">เราทดสอบ GBOLD™ กับชีวิตจริงของคนไทย ทั้งพื้นเปียกหน้าฝน ทางเท้าร้อนจัด และวันที่เดินเกินหมื่นก้าว</p>
        <dl class="mt-10 grid gap-6 sm:grid-cols-3">
          <div v-for="s in techStats" :key="s.label"><dt class="sr-only">{{ s.label }}</dt><dd class="display-m text-sun">{{ s.value }}</dd><dd class="mt-2 font-thai text-sm text-white/70">{{ s.label }}</dd></div>
        </dl>
        <p class="mt-8 font-thai text-xs text-white/45">* ตัวเลขตัวอย่างสำหรับคอนเซ็ปต์ — ใช้ผลทดสอบจริงจากฝ่าย R&amp;D ก่อนเผยแพร่</p>
      </div>
    </section>

    <section class="py-section" aria-labelledby="tech-shop">
      <div class="wrap"><SectionHeader id="tech-shop" title="Feel GBOLD™" subtitle="รุ่นขายดีที่ใช้พื้น GBOLD™" :cta="{ label: 'Shop All GBOLD', to: '/products?gbold=1' }" /></div>
      <ProductCarousel class="mt-10" :products="gboldBest" label="สินค้า GBOLD" />
    </section>
  </div>
</template>
