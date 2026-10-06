<script setup lang="ts">
import type { HomeSection } from '~/types'
defineProps<{ section: HomeSection }>()
const video = ref<HTMLVideoElement>()
const playing = ref(false)
function toggle() {
  if (!video.value) return
  if (playing.value) video.value.pause()
  else video.value.play()
  playing.value = !playing.value
}
</script>
<template>
  <section class="hero-campaign">
    <ResponsiveImage
      v-if="section.media"
      :media="section.media"
      eager
      :width="1536"
      :height="1024"
      class="hero-photo"
    /><video
      v-if="section.media?.video"
      ref="video"
      :src="section.media.video"
      :poster="section.media.src"
      playsinline
      muted
      loop
      preload="none"
      class="hero-video"
    />
    <div class="hero-shade" />
    <div class="hero-content container">
      <p class="hero-kicker"><span />{{ section.eyebrow }}</p>
      <h1>{{ section.title }}</h1>
      <p class="hero-thai" lang="th">{{ section.subtitle }}</p>
      <p class="hero-description">{{ section.body }}</p>
      <div class="button-row">
        <NuxtLink v-if="section.cta" :to="section.cta.href" class="button white"
          >{{ section.cta.label }}<AppIcon name="arrow" :size="18" /></NuxtLink
        ><NuxtLink
          v-if="section.secondaryCta"
          :to="section.secondaryCta.href"
          class="button outline-white"
          >{{ section.secondaryCta.label }}<AppIcon name="arrow" :size="18"
        /></NuxtLink>
      </div>
    </div>
    <div class="hero-footer container">
      <span>COMFORT COMES NATURALLY.</span
      ><a href="#categories" class="hero-explore"
        >FIND YOUR EVERYDAY<AppIcon name="down" :size="17" /></a
      ><button
        v-if="section.media?.video"
        class="icon-button"
        :aria-label="playing ? 'Pause campaign video' : 'Play campaign video'"
        @click="toggle"
      >
        <AppIcon :name="playing ? 'pause' : 'play'" /></button
      ><span v-else class="campaign-mark"><span /> THE EVERYDAY EDIT</span>
    </div>
  </section>
  <div class="brand-promise">
    <span><AppIcon name="footprints" :size="19" />FEEL-GOOD COMFORT</span
    ><span><AppIcon name="feather" :size="19" />LIGHT ON YOUR FEET</span
    ><span><AppIcon name="sun" :size="19" />MADE FOR YOUR EVERYDAY</span
    ><NuxtLink to="/technology"
      >POWERED BY <strong>GBOLD™</strong><AppIcon name="upRight" :size="17"
    /></NuxtLink>
  </div>
</template>
