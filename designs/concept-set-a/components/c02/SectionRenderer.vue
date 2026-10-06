<script setup lang="ts">
import type { Component } from 'vue'
import type { HomeSection } from '~/types'
import Hero from './Hero.vue'
import QuickCategories from './QuickCategories.vue'
import Trending from './Trending.vue'
import PromoTicker from './PromoTicker.vue'
import TechViz from './TechViz.vue'
import Segments from './Segments.vue'
import Showcase from './Showcase.vue'

const registry: Record<string, Component> = { HeroCampaign: Hero, QuickCategories, Trending, PromoTicker, TechViz, Segments, Showcase }
defineProps<{ sections: HomeSection[] }>()
</script>

<template>
  <template v-for="s in sections" :key="s.id">
    <component :is="registry[s.type]" v-if="registry[s.type]" v-bind="s.props" />
  </template>
</template>
