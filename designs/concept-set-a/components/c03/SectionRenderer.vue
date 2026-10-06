<script setup lang="ts">
import type { Component } from 'vue'
import type { HomeSection } from '~/types'
import Cover from './Cover.vue'
import Moments from './Moments.vue'
import FeatureStory from './FeatureStory.vue'
import GentleTech from './GentleTech.vue'
import Collections from './Collections.vue'
import Community from './Community.vue'
import Journal from './Journal.vue'
import VisitUs from './VisitUs.vue'

const registry: Record<string, Component> = { Cover, Moments, FeatureStory, GentleTech, Collections, Community, Journal, VisitUs }
defineProps<{ sections: HomeSection[] }>()
</script>

<template>
  <template v-for="s in sections" :key="s.id">
    <component :is="registry[s.type]" v-if="registry[s.type]" v-bind="s.props" />
  </template>
</template>
