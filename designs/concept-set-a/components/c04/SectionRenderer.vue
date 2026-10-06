<script setup lang="ts">
import type { Component } from 'vue'
import type { HomeSection } from '~/types'
import Finder from './Finder.vue'
import TrustBar from './TrustBar.vue'
import QuickShop from './QuickShop.vue'
import Deals from './Deals.vue'
import BestSellers from './BestSellers.vue'
import Compare from './Compare.vue'
import Reviews from './Reviews.vue'
import Stores from './Stores.vue'

const registry: Record<string, Component> = { Finder, TrustBar, QuickShop, Deals, BestSellers, Compare, Reviews, Stores }
defineProps<{ sections: HomeSection[] }>()
</script>

<template>
  <template v-for="s in sections" :key="s.id">
    <component :is="registry[s.type]" v-if="registry[s.type]" v-bind="s.props" />
  </template>
</template>
