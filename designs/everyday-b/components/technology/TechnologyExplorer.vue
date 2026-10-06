<script setup lang="ts">
import { benefits } from '~/data/site'
import type { HomeSection } from '~/types'
const props = defineProps<{ section?: HomeSection; standalone?: boolean }>()
const active = ref(0)
const current = computed(() => benefits[active.value]!)
const uid = useId()
async function focusTab(index: number) {
  active.value = index
  await nextTick()
  document.getElementById(`${uid}-tab-${index}`)?.focus()
}
</script>
<template>
  <section class="technology-explorer" :class="{ standalone }">
    <div class="tech-inner container">
      <div class="tech-copy">
        <span class="tech-wordmark">GBOLD<span>TECHNOLOGY™</span></span
        ><component :is="standalone ? 'h1' : 'h2'">{{
          section?.title || 'THE COMFORT\nBEHIND EVERY STEP.'
        }}</component>
        <p class="tech-intro">
          {{
            section?.body ||
            'A better everyday begins under your feet. Explore the comfort, softness, lightness and durability behind GAMBOL.'
          }}
        </p>
        <div class="tech-tabs" role="tablist" aria-label="GBOLD benefits">
          <button
            v-for="(benefit, index) in benefits"
            :id="`${uid}-tab-${index}`"
            :key="benefit.id"
            role="tab"
            :aria-selected="active === index"
            :aria-controls="`${uid}-panel`"
            :tabindex="active === index ? 0 : -1"
            @click="active = index"
            @keydown.right.prevent="focusTab((active + 1) % 4)"
            @keydown.left.prevent="focusTab((active + 3) % 4)"
            @keydown.home.prevent="focusTab(0)"
            @keydown.end.prevent="focusTab(3)"
          >
            <AppIcon :name="benefit.icon" :size="24" /><span>{{ benefit.label }}</span>
          </button>
        </div>
        <div
          :id="`${uid}-panel`"
          class="tech-description"
          role="tabpanel"
          :aria-labelledby="`${uid}-tab-${active}`"
          tabindex="0"
        >
          <h3>{{ current.thai }}</h3>
          <p>{{ current.description }}</p>
        </div>
        <div class="tech-accordion">
          <details v-for="(benefit, index) in benefits" :key="benefit.id" :open="index === active">
            <summary @click.prevent="active = index">
              <AppIcon :name="benefit.icon" /><span>{{ benefit.label }}</span
              ><AppIcon name="plus" :size="18" />
            </summary>
            <p>
              {{ benefit.description }}<br /><span lang="th">{{ benefit.thai }}</span>
            </p>
          </details>
        </div>
        <NuxtLink v-if="!standalone" :to="section?.cta?.href || '/technology'" class="text-link"
          >{{ section?.cta?.label || 'EXPLORE GBOLD' }}<AppIcon name="arrow" :size="19" /></NuxtLink
        ><NuxtLink v-else to="/products?technology=GBOLD" class="button primary"
          >FIND YOUR COMFORT<AppIcon name="arrow" :size="18"
        /></NuxtLink>
      </div>
      <div class="tech-art">
        <span class="tech-background-word">FEEL<br />GOOD.</span
        ><img
          :src="section?.media?.src || '/images/shoe-3-alt.webp'"
          :alt="section?.media?.alt || 'GAMBOL slide construction and contoured footbed'"
          width="800"
          height="800"
          loading="lazy"
        /><button
          v-for="(benefit, index) in benefits"
          :key="benefit.id"
          class="tech-hotspot"
          :class="{ active: active === index }"
          :style="{ left: benefit.x + '%', top: benefit.y + '%' }"
          :aria-label="`Explore ${benefit.label.toLowerCase()}`"
          :aria-pressed="active === index"
          @click="active = index"
          @mouseenter="active = index"
        >
          <AppIcon :name="active === index ? 'minus' : 'plus'" :size="19" /><span>{{
            benefit.label
          }}</span>
        </button>
        <p>Tap a point. Feel the difference.</p>
        <span class="tech-stamp">GAMBOL<br />EVERYDAY<br />COMFORT</span>
      </div>
    </div>
  </section>
</template>
