<script setup lang="ts">
import type { Component } from 'vue'
import type { HomeSection } from '~/types'
import Hero from './Hero.vue'
import CategoryIndex from './CategoryIndex.vue'
import ProductRail from './ProductRail.vue'
import TechSpotlight from './TechSpotlight.vue'
import BestSellers from './BestSellers.vue'
import LifestyleCampaign from './LifestyleCampaign.vue'
import ShopByLifestyle from './ShopByLifestyle.vue'
import StoreLocator from './StoreLocator.vue'
import SocialGallery from './SocialGallery.vue'

/** Maps CMS section types to this concept's components. Unknown types render nothing. */
const registry: Record<string, Component> = {
  HeroCampaign: Hero, CategoryIndex, ProductRail, TechSpotlight, BestSellers, LifestyleCampaign, ShopByLifestyle, StoreLocator, SocialGallery,
}
defineProps<{ sections: HomeSection[] }>()
</script>

<template>
  <template v-for="s in sections" :key="s.id">
    <component :is="registry[s.type]" v-if="registry[s.type]" v-bind="s.props" />
  </template>
</template>
