<script setup lang="ts">
import { concepts } from '~/data/concepts'
definePageMeta({ validate: (route) => concepts.some((c) => c.id === route.params.concept) })
const { concept } = useConcept()
useHead({ title: computed(() => `GAMBOL — ${concept.value.name} | ${concept.value.label}`) })
</script>
<template>
  <main id="main">
    <ConceptsMinimalHome v-if="concept.id === 'concept-01'" /><ConceptsSportHome
      v-else-if="concept.id === 'concept-02'"
    /><ConceptsStoryHome v-else-if="concept.id === 'concept-03'" /><ConceptsCommerceHome
      v-else-if="concept.id === 'concept-04'"
    /><ConceptsFutureHome v-else />
  </main>
</template>
