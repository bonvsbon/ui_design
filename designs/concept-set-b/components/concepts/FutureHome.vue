<script setup lang="ts">
const { base } = useConcept()
const { campaign, visibleSections } = useContent()
const material = ref(0)
const layers = [
  {
    name: 'Soft touch',
    label: 'THE FIRST FEEL',
    title: 'Softness you can feel.',
    copy: 'A gently textured surface cushions your foot from the moment you step in.',
    icon: 'layers',
    image: '/images/shoe-1.png',
  },
  {
    name: 'Light core',
    label: 'LESS TO CARRY',
    title: 'Move a little lighter.',
    copy: 'A lightweight construction keeps the focus on your day, not on your feet.',
    icon: 'feather',
    image: '/images/shoe-1-alt.png',
  },
  {
    name: 'Lasting grip',
    label: 'MADE FOR EVERYDAY',
    title: 'Confidence underfoot.',
    copy: 'A durable outsole and textured tread support the everyday miles ahead.',
    icon: 'shield',
    image: '/images/slide-color-6.png',
  },
]
const layer = computed(() => layers[material.value]!)
</script>
<template>
  <div class="future-home">
    <section class="future-hero">
      <div class="future-hero-top">
        <span><span class="status-dot"></span> GAMBOL MATERIAL LAB</span
        ><span>BUILT AROUND THE WAY YOU MOVE.</span>
      </div>
      <div class="future-hero-grid">
        <div class="future-hero-copy">
          <span class="future-version">GBOLD™ / MATERIAL SYSTEM</span>
          <h1>{{ campaign.title }}</h1>
          <p>{{ campaign.subtitle }}</p>
          <a href="#technology" class="button button-accent"
            >{{ campaign.cta }}<AppIcon name="arrow"
          /></a>
        </div>
        <div class="future-product-stage">
          <div class="orbital-line orbit-one"></div>
          <div class="orbital-line orbit-two"></div>
          <img
            :src="campaign.image"
            alt="GAMBOL slide with lightweight foam construction"
            width="900"
            height="900"
            fetchpriority="high"
          /><button
            class="product-hotspot hotspot-1"
            aria-label="Explore soft touch footbed"
            @click="
              ($event) => {
                material = 0
                navigateTo(base + '#technology')
              }
            "
          >
            <span>+</span><span>SOFT TOUCH</span></button
          ><button
            class="product-hotspot hotspot-2"
            aria-label="Explore lightweight core"
            @click="
              ($event) => {
                material = 1
                navigateTo(base + '#technology')
              }
            "
          >
            <span>+</span><span>LIGHT CORE</span></button
          ><span class="product-coordinates">FORM: EVERYDAY SLIDE<br />MATERIAL: GBOLD™</span>
        </div>
      </div>
      <div class="future-benefit-strip">
        <span><AppIcon name="steps" />CONTOURED COMFORT</span
        ><span><AppIcon name="layers" />SOFT BY DESIGN</span
        ><span><AppIcon name="feather" />LIGHT IN MOTION</span
        ><span><AppIcon name="shield" />BUILT TO LAST</span>
      </div>
    </section>
    <template v-for="section in visibleSections" :key="section.id">
      <section
        v-if="section.id === 'technology'"
        id="technology"
        class="material-lab container section-space"
      >
        <div class="section-heading">
          <h2>Good design.<br />You can feel it.</h2>
          <p>Explore the elements behind your everyday comfort.</p>
        </div>
        <div class="material-tabs" role="tablist" aria-label="Product material layers">
          <button
            v-for="(l, i) in layers"
            :id="'material-tab-' + i"
            :key="l.name"
            role="tab"
            :aria-selected="material === i"
            aria-controls="material-panel"
            :tabindex="material === i ? 0 : -1"
            :class="{ active: material === i }"
            @click="material = i"
            @keydown.right.prevent="
              ($event) => {
                material = (material + 1) % 3
                ;($event.currentTarget as HTMLElement).parentElement
                  ?.querySelectorAll('button')
                  [material]?.focus()
              }
            "
            @keydown.left.prevent="
              ($event) => {
                material = (material + 2) % 3
                ;($event.currentTarget as HTMLElement).parentElement
                  ?.querySelectorAll('button')
                  [material]?.focus()
              }
            "
          >
            <span>0{{ i + 1 }}</span
            >{{ l.name }}<AppIcon :name="l.icon" />
          </button>
        </div>
        <div
          id="material-panel"
          class="material-panel"
          role="tabpanel"
          :aria-labelledby="'material-tab-' + material"
        >
          <div class="material-visual">
            <img :src="layer.image" :alt="layer.title" width="700" height="700" loading="lazy" />
            <div class="material-detail-line"><span></span>{{ layer.name }}</div>
          </div>
          <div>
            <AppIcon :name="layer.icon" :size="38" /><span class="small-label">{{
              layer.label
            }}</span>
            <h3>{{ layer.title }}</h3>
            <p>{{ layer.copy }}</p>
            <NuxtLink :to="base + '/product/demo'" class="text-link"
              >Experience the Cloud Slide<AppIcon name="right"
            /></NuxtLink>
          </div>
        </div>
      </section>
      <section
        v-if="section.id === 'comparison'"
        id="stories"
        class="technology-comparison container section-space"
      >
        <div class="section-heading">
          <h2>Find your feeling.</h2>
          <p>Three expressions of everyday comfort.</p>
        </div>
        <div
          class="comparison-scroll"
          tabindex="0"
          role="region"
          aria-label="Scrollable comparison table"
        >
          <table>
            <caption class="sr-only">
              GBOLD technology benefit comparison
            </caption>
            <thead>
              <tr>
                <th>Made for your day</th>
                <th>GBOLD™<span>Everyday balance</span></th>
                <th>GBOLD Lite<span>Travel light</span></th>
                <th>GBOLD Grip<span>Keep exploring</span></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, i) in [
                  ['Softness', 'Cushioned', 'Cushioned', 'Supportive'],
                  ['Weight', 'Light', 'Lightest feel', 'Balanced'],
                  ['Durability', 'Daily wear', 'Daily wear', 'Outdoor focus'],
                  ['Best for', 'Everyday', 'Travel & walking', 'Outdoor & weekends'],
                ]"
                :key="i"
              >
                <th>{{ row[0] }}</th>
                <td v-for="cell in row.slice(1)" :key="cell">{{ cell }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="comparison-note">
          Concept benefit descriptions. Production specifications require brand validation.
        </p>
      </section>
      <ProductSection
        v-if="section.id === 'arrivals'"
        title="FEEL THE DIFFERENCE."
        subtitle="Material innovation. Made for your everyday."
      />
    </template>
  </div>
</template>
