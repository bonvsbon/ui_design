<script setup lang="ts">
import { products } from '~/data/products'
const step = ref(0),
  answers = ref<string[]>([]),
  done = ref(false)
const questions = [
  {
    title: 'Who are you shopping for?',
    options: ['Men', 'Women', 'Kids'],
    icons: ['user', 'user', 'steps'],
  },
  {
    title: 'Where will your pair take you?',
    options: ['Everyday', 'Walking', 'Travel', 'Casual', 'Outdoor'],
    icons: ['home', 'steps', 'wind', 'user', 'pin'],
  },
  {
    title: 'What feels most important?',
    options: ['Soft', 'Lightweight', 'Durable', 'Supportive'],
    icons: ['layers', 'feather', 'shield', 'steps'],
  },
]
const matches = computed(() =>
  products
    .filter((p) => p.gender.includes(answers.value[0]!))
    .map((p) => ({
      p,
      score:
        (p.occasions.includes(answers.value[1]!) ? 2 : 0) +
        (p.benefits.includes(answers.value[2]!) ? 3 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.p)
)
function choose(value: string) {
  answers.value[step.value] = value
  if (step.value < 2) step.value++
  else done.value = true
}
function reset() {
  step.value = 0
  answers.value = []
  done.value = false
}
</script>
<template>
  <section id="pair-finder" class="pair-finder" aria-label="Find your pair">
    <div class="finder-heading">
      <span><AppIcon name="steps" :size="22" /> FIND YOUR PAIR</span
      ><button v-if="step > 0 || done" class="text-link" @click="reset">
        Start again<AppIcon name="returns" :size="14" />
      </button>
    </div>
    <template v-if="!done"
      ><div class="finder-progress">
        <span v-for="(q, i) in questions" :key="q.title" :class="{ complete: i <= step }"></span>
      </div>
      <span class="finder-step"
        >Step {{ step + 1 }} of 3 · {{ ['Your people', 'Your day', 'Your comfort'][step] }}</span
      >
      <h2 aria-live="polite">{{ questions[step]?.title }}</h2>
      <div class="finder-options">
        <button v-for="(opt, i) in questions[step]?.options" :key="opt" @click="choose(opt)">
          <AppIcon :name="questions[step]?.icons[i] || 'steps'" :size="26" /><span>{{ opt }}</span
          ><AppIcon name="next" :size="18" />
        </button>
      </div>
      <div class="finder-bottom">
        <button v-if="step > 0" class="text-link" @click="step--">
          <AppIcon name="left" :size="16" />Back</button
        ><span>Three easy choices. A softer everyday.</span>
      </div></template
    ><template v-else
      ><div class="finder-result-heading" aria-live="polite">
        <AppIcon name="success" :size="28" />
        <div>
          <h2>Your kind of comfort.</h2>
          <p>{{ answers.join(' · ') }} · {{ matches.length }} recommended pairs</p>
        </div>
      </div>
      <div class="finder-results">
        <ProductCard v-for="product in matches" :key="product.id" :product="product" />
      </div>
      <p class="finder-match-note">
        Matched by who you’re shopping for, your plans, and your comfort preference.
      </p></template
    >
  </section>
</template>
