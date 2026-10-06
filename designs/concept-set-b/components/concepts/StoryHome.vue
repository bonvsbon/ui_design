<script setup lang="ts">
const { base } = useConcept()
const { campaign, visibleSections } = useContent()
const { panel, selectedStory } = useShop()
const current = ref('Everyday')
const days = [
  {
    name: 'Everyday',
    image: '/images/product-1.png',
    title: 'Room for the little things.',
    copy: 'A coffee around the corner. A familiar face. Comfort for the moments in between.',
  },
  {
    name: 'Work',
    image: '/images/city.jpg',
    title: 'A softer nine to five.',
    copy: 'For the commute, the coffee run, and every step after clocking out.',
  },
  {
    name: 'Travel',
    image: '/images/beach.jpg',
    title: 'Bring less. Feel more.',
    copy: 'A light bag, a comfortable pair, and a destination you’ve never been.',
  },
  {
    name: 'Weekend',
    image: '/images/product-4.png',
    title: 'Take your time.',
    copy: 'Some days are better without a plan. Go wherever the afternoon takes you.',
  },
  {
    name: 'Outdoor',
    image: '/images/outdoor.jpg',
    title: 'Follow the open air.',
    copy: 'Fresh air, a new trail, and a little time to find your own pace.',
  },
  {
    name: 'Family',
    image: '/images/weekend.jpg',
    title: 'Better, together.',
    copy: 'Little feet. Big adventures. A comfortable pair for everyone you love.',
  },
]
const day = computed(() => days.find((d) => d.name === current.value)!)
</script>
<template>
  <div class="story-home">
    <section class="story-hero container-wide">
      <div class="story-hero-title">
        <span>THE GAMBOL JOURNAL · VOL. 01</span>
        <h1>{{ campaign.title }}</h1>
        <p>{{ campaign.subtitle }}</p>
        <NuxtLink :to="base + '/products?occasion=Everyday'" class="story-text-link"
          >{{ campaign.cta }}<AppIcon name="right" :size="24" /></NuxtLink
        ><span class="story-thai" lang="th">ทุกก้าว มีเรื่องราว</span>
      </div>
      <div class="story-hero-photo">
        <img
          :src="campaign.image"
          alt="An unhurried day outdoors in GAMBOL sandals"
          width="1000"
          height="900"
          fetchpriority="high"
        />
        <div class="story-photo-caption">
          <span>A LITTLE MORE OUTSIDE.</span><span>Thailand, 2026</span>
        </div>
        <span class="story-circle">Made for<br /><em>real life.</em></span>
      </div>
    </section>
    <template v-for="section in visibleSections" :key="section.id">
      <section v-if="section.id === 'lifestyles'" class="story-day-section container section-space">
        <div class="section-heading">
          <h2>What does your day look like?</h2>
          <span>There’s a pair for that.</span>
        </div>
        <nav class="day-tabs" aria-label="Shop by occasion">
          <button
            v-for="d in days"
            :key="d.name"
            :class="{ active: current === d.name }"
            :aria-pressed="current === d.name"
            @click="current = d.name"
          >
            {{ d.name }}
          </button>
        </nav>
        <div class="day-editorial">
          <img
            :src="day.image"
            :alt="day.name + ' lifestyle inspiration'"
            width="1000"
            height="650"
            loading="lazy"
          />
          <div>
            <span class="small-label">THE {{ day.name.toUpperCase() }} EDIT</span>
            <h3>{{ day.title }}</h3>
            <p>{{ day.copy }}</p>
            <NuxtLink :to="base + '/products?occasion=' + day.name" class="story-text-link"
              >Shop the {{ day.name.toLowerCase() }} edit<AppIcon name="right"
            /></NuxtLink>
          </div>
        </div>
      </section>
      <section v-if="section.id === 'story'" id="stories" class="journal-story">
        <div class="container journal-story-grid">
          <div>
            <span class="small-label">PLACES & PEOPLE</span>
            <h2>A weekend<br />without a clock.</h2>
            <p>
              From the riverside lanes of Bangkok to a quiet stretch of coast, we’re finding a
              little joy in slowing down.
            </p>
            <button
              class="story-text-link"
              @click="
                ($event) => {
                  selectedStory = 'A weekend without a clock'
                  panel = 'story'
                }
              "
            >
              Read the story<AppIcon name="right" />
            </button>
          </div>
          <img
            src="/images/beach.jpg"
            alt="An open stretch of turquoise coast in Thailand"
            width="1000"
            height="800"
            loading="lazy"
          /><span class="journal-note">Less rushing.<br />More living.</span>
        </div>
      </section>
      <ProductSection
        v-if="section.id === 'arrivals'"
        title="Your everyday companions."
        subtitle="Easy favourites for wherever life takes you."
      />
      <StoreLocator v-if="section.id === 'stores'" />
    </template>
    <section id="technology" class="story-comfort container section-space">
      <AppIcon name="steps" :size="40" />
      <h2>A little comfort goes a long way.</h2>
      <p>
        Our GBOLD™ material brings softness, lightness, and lasting comfort to your everyday
        stories.
      </p>
      <NuxtLink :to="base + '/products?technology=GBOLD'" class="story-text-link"
        >Meet the feeling<AppIcon name="right"
      /></NuxtLink>
    </section>
  </div>
</template>
