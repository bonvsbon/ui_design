<script setup lang="ts">
const { base } = useConcept()
const { campaign, visibleSections } = useContent()
const { selectedStory, panel } = useShop()
const slide = ref(0)
const { alternateCampaign } = useContent()
const activeCampaign = computed(() => (slide.value === 0 ? campaign.value : alternateCampaign))
</script>
<template>
  <div class="minimal-home">
    <section class="minimal-hero">
      <img
        class="hero-campaign-image"
        :src="activeCampaign.image"
        :srcset="
          activeCampaign.image === '/images/hero-campaign.jpg'
            ? '/images/hero-campaign-small.jpg 768w, /images/hero-campaign.jpg 1536w'
            : undefined
        "
        sizes="100vw"
        alt="Citron and chalk GAMBOL foam slides suspended above a silver studio floor"
        width="1536"
        height="1024"
        fetchpriority="high"
      />
      <div class="hero-copy">
        <span class="campaign-eyebrow"><span></span> EVERYDAY, REIMAGINED. / 2026</span>
        <h1>{{ activeCampaign.title }}</h1>
        <p>{{ activeCampaign.subtitle }}</p>
        <NuxtLink :to="base + '/products?collection=New Arrivals'" class="button button-dark"
          >{{ activeCampaign.cta }}<AppIcon name="arrow" :size="19" /></NuxtLink
        ><span class="hero-thai" lang="th">ทุกก้าว เป็นคุณ</span>
      </div>
      <div class="hero-bottom">
        <div class="campaign-pagination">
          <button
            v-for="i in 2"
            :key="i"
            :class="{ active: slide === i - 1 }"
            :aria-label="'Show campaign ' + i"
            :aria-pressed="slide === i - 1"
            @click="slide = i - 1"
          >
            0{{ i }}</button
          ><span class="pagination-line"></span>
        </div>
        <span>LESS WEIGHT. MORE LIFE.</span
        ><NuxtLink :to="base + '/product/demo'" class="hero-product-link"
          ><span>THE EVERYDAY COLLECTION<br /><strong>Meet your new go-to</strong></span
          ><span class="round-arrow"><AppIcon name="arrow" /></span
        ></NuxtLink>
      </div>
    </section>
    <div class="promise-bar">
      <span><AppIcon name="feather" :size="18" /> LIGHT ON YOUR FEET</span
      ><span><AppIcon name="layers" :size="18" /> BIG ON COMFORT</span
      ><span><AppIcon name="shield" :size="18" /> MADE FOR EVERYDAY</span
      ><span class="promise-brand">GAMBOL. GO YOUR OWN WAY.</span>
    </div>
    <template v-for="section in visibleSections" :key="section.id">
      <CategoryGrid v-if="section.id === 'categories'" />
      <ProductSection
        v-if="section.id === 'arrivals'"
        title="Fresh arrivals. New favourites."
        subtitle="Your next everyday pair just landed."
      />
      <TechnologySection v-if="section.id === 'technology'" />
      <ProductSection
        v-if="section.id === 'bestsellers'"
        title="Good company for your feet."
        subtitle="The pairs you keep coming back for."
        filter="Best Sellers"
      />
      <section v-if="section.id === 'campaign'" id="stories" class="minimal-story">
        <img
          src="/images/product-4.png"
          alt="GAMBOL sandals worn on a sunlit outdoor adventure"
          width="1200"
          height="750"
          loading="lazy"
        />
        <div>
          <span class="small-label">THE OPEN-AIR EDIT</span>
          <h2>Take the<br />long way home.</h2>
          <p>No rush. No wrong turns. Just a little more room to wander.</p>
          <button
            class="button button-light"
            @click="
              ($event) => {
                selectedStory = 'Take the long way home'
                panel = 'story'
              }
            "
          >
            Explore the story<AppIcon name="arrow" :size="18" />
          </button>
        </div>
      </section>
      <LifestyleGrid v-if="section.id === 'lifestyles'" />
      <StoreLocator v-if="section.id === 'stores'" />
      <section v-if="section.id === 'social'" class="social-section container section-space">
        <div class="section-heading">
          <div>
            <h2>Life looks good on you.</h2>
            <p>Your everyday. Your GAMBOL. <strong>#GoWithGambol</strong></p>
          </div>
          <a
            href="https://www.instagram.com/gambolthailand/"
            target="_blank"
            rel="noopener"
            class="text-link"
            >@gambolthailand<AppIcon name="arrow" :size="18"
          /></a>
        </div>
        <div class="social-grid">
          <img
            v-for="(photo, i) in ['product-1.png', 'product-2.png', 'product-4.png', 'beach.jpg']"
            :key="photo"
            :src="'/images/' + photo"
            :alt="
              [
                'Everyday colour with GAMBOL',
                'Street style in black and yellow',
                'A little outdoor adventure',
                'Slow days by the sea',
              ][i]
            "
            width="600"
            height="600"
            loading="lazy"
          />
        </div>
      </section>
    </template>
  </div>
</template>
