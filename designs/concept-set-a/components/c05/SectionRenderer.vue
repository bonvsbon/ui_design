<script setup lang="ts">
import type { Component } from 'vue'
import type { HomeSection } from '~/types'
import HeroSpec from './HeroSpec.vue'
import Exploded from './Exploded.vue'
import BenefitLab from './BenefitLab.vue'
import Comparison from './Comparison.vue'
import Lineup from './Lineup.vue'
import LabNotes from './LabNotes.vue'

const registry: Record<string, Component> = { HeroSpec, Exploded, BenefitLab, Comparison, Lineup, LabNotes }
defineProps<{ sections: HomeSection[] }>()
</script>

<template>
  <template v-for="s in sections" :key="s.id">
    <component :is="registry[s.type]" v-if="registry[s.type]" v-bind="s.props" />
  </template>
</template>
