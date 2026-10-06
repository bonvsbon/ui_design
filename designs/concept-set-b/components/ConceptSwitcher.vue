<script setup lang="ts">
import { concepts } from '~/data/concepts'
const { concept } = useConcept()
const route = useRoute()
</script>
<template>
  <div class="concept-switcher">
    <NuxtLink to="/overview" class="studio-mark"
      ><span class="studio-dot"></span> DESIGN EXPLORATIONS
      <span class="prototype-label">/ Prototype</span></NuxtLink
    >
    <nav aria-label="Design concepts" class="concept-tabs">
      <NuxtLink
        v-for="c in concepts"
        :key="c.id"
        :to="'/' + c.id"
        :class="{
          active: concept.id === c.id && !['/overview', '/library', '/studio'].includes(route.path),
        }"
        ><span>{{ c.number }}</span> {{ c.label }}</NuxtLink
      >
    </nav>
    <select
      aria-label="Choose design concept"
      class="concept-select"
      :value="concept.id"
      @change="navigateTo('/' + ($event.target as HTMLSelectElement).value)"
    >
      <option v-for="c in concepts" :key="c.id" :value="c.id">
        {{ c.number }} · {{ c.label }}
      </option>
    </select>
    <NuxtLink to="/library" class="studio-link" aria-label="Open design library"
      ><AppIcon name="grid" :size="16"
    /></NuxtLink>
    <NuxtLink to="/studio" class="studio-link" aria-label="Open content studio"
      ><AppIcon name="settings" :size="16"
    /></NuxtLink>
  </div>
</template>
