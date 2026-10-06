<script setup lang="ts">
useHead({ title: 'GAMBOL 2026 — Design Concept Overview' })

const concepts = [
  {
    n: '01', base: '/concept-01', name: 'Modern Minimal / Premium Street', style: 'Editorial, monochrome + signal orange, wide grotesk type, square geometry',
    audience: 'Urban 20–35, style-led buyers who also follow sneaker culture',
    strength: 'Strongest brand perception lift; product photography and type do the selling',
    risk: 'Needs consistent premium photography; can feel cold to price-sensitive family shoppers',
    useCase: 'Brand repositioning, collection launches, collaborations',
    swatch: ['#0d0d0d', '#f3f1ec', '#ff5a1f'], font: 'Archivo (wide) + IBM Plex Sans Thai',
    signature: 'Typographic category index with floating product preview · campaign carousel · hover alt-angle + quick-add sizes',
  },
  {
    n: '02', base: '/concept-02', name: 'Bold Sport / Energy', style: 'Condensed poster type, volt + cobalt, diagonals, tilt cards, kinetic marquees',
    audience: 'Gen Z / students, active lifestyle, social-first shoppers',
    strength: 'Most memorable & shareable; interactive "squish test" makes G-BOLD tangible',
    risk: 'Motion-heavy (needs strict perf budget); energy can overwhelm older buyers',
    useCase: 'Campaign seasons, sports/recovery lines, youth marketing',
    swatch: ['#0a0a0a', '#d7ff3a', '#2b37ff'], font: 'Anton + Kanit',
    signature: 'Parallax hero with product switcher · press-and-hold foam test · expanding segment panels · spin showcase',
  },
  {
    n: '03', base: '/concept-03', name: 'Lifestyle Storytelling', style: 'Warm paper tones, serif editorial, collage & real-life scenes',
    audience: 'Families, 28–50, comfort-first buyers who shop by occasion',
    strength: 'Discovery by real moments (Work/Travel/Weekend…) — matches how Thai customers actually choose',
    risk: 'Content-hungry: needs ongoing photo + story production to stay fresh',
    useCase: 'Brand warmth, content marketing, SEO articles, family/kids lines',
    swatch: ['#f5eee3', '#a94b25', '#56623a'], font: 'Fraunces + Noto Serif Thai + Anuphan',
    signature: 'Magazine cover collage · moment tabs with shoppable photo hotspots · moment-led listing',
  },
  {
    n: '04', base: '/concept-04', name: 'Product Discovery / Smart Commerce', style: 'Clean white UI, cobalt actions, sunflower promos, dense but calm',
    audience: 'Mass-market, mobile-first, deal-aware, "just help me pick"',
    strength: 'Highest conversion: 3-click finder, inline predictive search, quick-add, delivery ETA, bundles',
    risk: 'Least distinctive visually; risk of looking like a marketplace',
    useCase: 'Always-on e-commerce, sales periods, performance marketing landings',
    swatch: ['#ffffff', '#1d4ed8', '#ffd24a'], font: 'Plus Jakarta Sans + Noto Sans Thai',
    signature: 'Find Your Pair wizard with match % · comparison table · sticky mobile buy bar · postcode ETA',
  },
  {
    n: '05', base: '/concept-05', name: 'Future Footwear / Tech Brand', style: 'Graphite lab, bone "specimen" plates, amber signal, mono annotations',
    audience: 'Comfort/tech enthusiasts, people with foot fatigue, gift researchers',
    strength: 'Explains G-BOLD visually (layers, pressure map, curves) — builds proof, justifies price',
    risk: 'Requires real test data; dark UI is less "everyday Thai family" friendly',
    useCase: 'Technology launches, premium lines, B2B/retail partner storytelling',
    swatch: ['#121315', '#ecebe6', '#ffb547'], font: 'Space Grotesk + IBM Plex Mono + IBM Plex Sans Thai',
    signature: 'Scroll-driven exploded sole · pressure heatmap toggle · radar performance profile · spec-table listing',
  },
]
</script>

<template>
  <div class="min-h-screen">
    <header class="border-b border-[#ddd]">
      <div class="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">
        <p class="font-display text-xl font-extrabold tracking-[0.3em]" style="font-stretch: 125%">GAMBOL</p>
        <p class="text-sm text-[#555]">Website redesign · 5 concepts · Nuxt 3 prototype · ต.ค. 2026</p>
      </div>
    </header>

    <main class="mx-auto max-w-[1400px] px-6 pb-24">
      <section class="py-14">
        <p class="text-sm uppercase tracking-[0.2em] text-[#666]">Design concept overview</p>
        <h1 class="mt-3 max-w-4xl font-display text-5xl font-black leading-[0.95] md:text-7xl" style="font-stretch: 112%">Five ways to sell comfort.</h1>
        <p class="mt-5 max-w-2xl text-lg text-[#333]">ห้าแนวคิดที่ต่างกันทั้งระบบเลย์เอาต์ โครงสร้าง hero วิธีค้นหาสินค้า การนำทาง ตัวอักษร ภาพ และบุคลิกแบรนด์ — ทุกแนวคิดใช้ข้อมูลสินค้าและ CMS ชุดเดียวกัน คลิกเข้าไปดูหน้าแรก หน้ารายการสินค้า และหน้าสินค้าได้</p>
      </section>

      <!-- Comparison table -->
      <section aria-labelledby="cmp" class="overflow-x-auto rounded-xl border border-[#ddd] bg-white">
        <h2 id="cmp" class="sr-only">ตารางเปรียบเทียบแนวคิด</h2>
        <table class="w-full min-w-[1100px] text-left text-sm">
          <thead class="bg-[#f1efea] text-xs uppercase tracking-wider text-[#555]">
            <tr><th scope="col" class="p-4">Concept</th><th scope="col" class="p-4">Style</th><th scope="col" class="p-4">Target audience</th><th scope="col" class="p-4">Strength</th><th scope="col" class="p-4">Risk</th><th scope="col" class="p-4">Best use case</th></tr>
          </thead>
          <tbody class="divide-y divide-[#eee] align-top">
            <tr v-for="c in concepts" :key="c.n">
              <th scope="row" class="p-4"><NuxtLink :to="c.base" class="font-bold hover:underline">{{ c.n }} · {{ c.name }}</NuxtLink></th>
              <td class="p-4 text-[#333]">{{ c.style }}</td>
              <td class="p-4 text-[#333]">{{ c.audience }}</td>
              <td class="p-4 text-[#333]">{{ c.strength }}</td>
              <td class="p-4 text-[#333]">{{ c.risk }}</td>
              <td class="p-4 text-[#333]">{{ c.useCase }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Concept cards -->
      <section aria-label="เปิดแนวคิด" class="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article v-for="c in concepts" :key="c.n" class="flex flex-col rounded-xl border border-[#ddd] bg-white p-6">
          <div class="flex items-center justify-between">
            <p class="font-display text-5xl font-black" style="font-stretch: 120%">{{ c.n }}</p>
            <div class="flex"><span v-for="s in c.swatch" :key="s" class="-ml-2 h-8 w-8 rounded-full border-2 border-white shadow" :style="{ background: s }" /></div>
          </div>
          <h3 class="mt-3 text-xl font-bold">{{ c.name }}</h3>
          <p class="mt-1 text-sm text-[#666]">{{ c.font }}</p>
          <p class="mt-4 text-sm text-[#333]">{{ c.signature }}</p>
          <div class="mt-auto grid grid-cols-3 gap-2 pt-6 text-sm font-semibold">
            <NuxtLink :to="c.base" class="rounded-lg bg-[#111] px-3 py-2.5 text-center text-white hover:bg-[#333]">Home</NuxtLink>
            <NuxtLink :to="`${c.base}/products`" class="rounded-lg border border-[#ccc] px-3 py-2.5 text-center hover:border-[#111]">Listing</NuxtLink>
            <NuxtLink :to="`${c.base}/product/demo`" class="rounded-lg border border-[#ccc] px-3 py-2.5 text-center hover:border-[#111]">Product</NuxtLink>
          </div>
        </article>
        <article class="flex flex-col justify-between rounded-xl bg-[#111] p-6 text-white">
          <div>
            <p class="text-sm uppercase tracking-[0.2em] text-white/60">Shared system</p>
            <ul class="mt-4 space-y-2 text-sm text-white/85">
              <li>• One content model (types/) + mock CMS (data/)</li>
              <li>• Homepage = ordered CMS sections → per-concept renderer</li>
              <li>• Try the <b>CMS</b> button on any homepage to toggle/reorder sections</li>
              <li>• Shared logic: filters, predictive search, cart, wishlist, recently viewed</li>
              <li>• Design tokens via CSS variables → one Tailwind vocabulary, five themes</li>
            </ul>
          </div>
          <p class="mt-6 text-xs text-white/50">Search tip: open search in any concept and type “slide”.</p>
        </article>
      </section>
    </main>
  </div>
</template>
