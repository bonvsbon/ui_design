<script setup lang="ts">
const { base } = useConcept()
const selected = ref(0)
const benefits = [
  {
    icon: 'steps',
    title: 'Comfort',
    copy: 'A contoured footbed that supports your natural stride.',
  },
  {
    icon: 'layers',
    title: 'Softness',
    copy: 'A cushioned surface that makes every landing feel softer.',
  },
  {
    icon: 'feather',
    title: 'Lightweight',
    copy: 'Easy on your feet, from your morning commute to your evening walk.',
  },
  {
    icon: 'shield',
    title: 'Durability',
    copy: 'Resilient materials for the everyday miles ahead.',
  },
]
</script>
<template>
  <section id="technology" class="technology-section">
    <div class="container technology-grid">
      <div class="technology-art">
        <span class="tech-watermark">GBOLD</span
        ><img
          src="/images/slide-color-2.png"
          alt="Black GAMBOL slide with contoured comfort footbed"
          width="800"
          height="700"
          loading="lazy"
        />
        <div class="technology-tag"><span></span>THE FEEL-GOOD FORMULA</div>
      </div>
      <div class="technology-copy">
        <span class="small-label">GAMBOL INNOVATION</span>
        <h2>Feels different.<br />Because it is.</h2>
        <p>
          Meet GBOLD™. Our signature material brings a little more softness, support, and ease to
          every step.
        </p>
        <div class="benefit-tabs" role="tablist" aria-label="GBOLD benefits">
          <button
            v-for="(b, i) in benefits"
            :id="'benefit-tab-' + i"
            :key="b.title"
            :aria-selected="selected === i"
            :aria-controls="'benefit-copy-' + i"
            role="tab"
            :tabindex="selected === i ? 0 : -1"
            :class="{ active: selected === i }"
            @click="selected = i"
            @keydown.right.prevent="
              ($event) => {
                selected = (selected + 1) % 4
                ;($event.currentTarget as HTMLElement).parentElement
                  ?.querySelectorAll('button')
                  [selected]?.focus()
              }
            "
            @keydown.left.prevent="
              ($event) => {
                selected = (selected + 3) % 4
                ;($event.currentTarget as HTMLElement).parentElement
                  ?.querySelectorAll('button')
                  [selected]?.focus()
              }
            "
          >
            <AppIcon :name="b.icon" :size="24" /><span>{{ b.title }}</span>
          </button>
        </div>
        <p
          :id="'benefit-copy-' + selected"
          role="tabpanel"
          :aria-labelledby="'benefit-tab-' + selected"
          class="benefit-description"
        >
          {{ benefits[selected]?.copy }}
        </p>
        <NuxtLink :to="base + '/products?technology=GBOLD'" class="text-link"
          >Discover the comfort<AppIcon name="right" :size="18"
        /></NuxtLink>
      </div>
    </div>
  </section>
</template>
