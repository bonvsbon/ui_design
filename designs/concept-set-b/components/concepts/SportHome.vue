<script setup lang="ts">
import { products } from '~/data/products'
const { base } = useConcept()
const { campaign, visibleSections } = useContent()
const angle = ref(0)
const color = ref(0)
const images = [
  '/images/slide-color-2.png',
  '/images/slide-color-4.png',
  '/images/slide-color-3.png',
]
const names = ['Black', 'Signal red', 'Electric blue']
</script>
<template>
  <div class="sport-home">
    <section class="sport-hero">
      <div class="sport-hero-copy">
        <span class="sport-label">THE EVERYDAY ATHLETE</span>
        <h1>{{ campaign.title }}</h1>
        <p>{{ campaign.subtitle }}</p>
        <NuxtLink :to="base + '/products'" class="button button-light"
          >{{ campaign.cta }}<AppIcon name="arrow"
        /></NuxtLink>
        <div class="sport-campaign-index"><span>2026 COLLECTION</span><span>01 / 05</span></div>
      </div>
      <div class="sport-hero-art">
        <span class="sport-outline-word" aria-hidden="true">MOVE</span
        ><img
          :src="campaign.image"
          alt="Black GAMBOL slides made for all-day movement"
          width="900"
          height="900"
          fetchpriority="high"
        />
        <div class="sport-art-caption">
          <span>SOFT LANDINGS.<br />BOLD MOVES.</span
          ><span class="sport-seal">G<br /><small>BUILT FOR YOU</small></span>
        </div>
      </div>
      <div class="sport-photo-strip">
        <img
          src="/images/product-2.png"
          alt="GAMBOL streetwear campaign with yellow and black footwear"
          width="400"
          height="750"
        /><span>MAKE YOUR<br />OWN PACE.</span>
      </div>
    </section>
    <div class="energy-ticker" aria-label="Move your way. Everyday comfort.">
      <div>
        MOVE YOUR WAY <span>↗</span> EVERYDAY COMFORT <span>↗</span> NO OFF DAYS <span>↗</span> MOVE
        YOUR WAY <span>↗</span> EVERYDAY COMFORT <span>↗</span>
      </div>
    </div>
    <template v-for="section in visibleSections" :key="section.id">
      <section v-if="section.id === 'categories'" class="sport-categories container section-space">
        <h2>PICK YOUR<br />PLAYGROUND.</h2>
        <nav aria-label="Quick shop categories">
          <NuxtLink
            v-for="(cat, i) in ['Men', 'Women', 'Kids', 'Sneakers', 'Slides']"
            :key="cat"
            :to="base + '/products?category=' + cat"
            ><span>0{{ i + 1 }}</span
            ><strong>{{ cat }}</strong
            ><AppIcon name="arrow" :size="25"
          /></NuxtLink>
        </nav>
      </section>
      <ProductSection
        v-if="section.id === 'trending'"
        title="IN HEAVY ROTATION."
        subtitle="The everyday line-up. Pick your next favourite."
        filter="Best Sellers"
      />
      <section v-if="section.id === 'technology'" id="technology" class="sport-showcase">
        <div class="container sport-showcase-grid">
          <div class="sport-showcase-art">
            <img
              :src="images[color]"
              :style="{ transform: 'rotate(' + angle + 'deg)' }"
              :alt="'GAMBOL slide in ' + names[color]"
              width="700"
              height="700"
              loading="lazy"
            /><label for="sport-angle">GIVE IT A SPIN <AppIcon name="returns" :size="16" /></label
            ><input
              id="sport-angle"
              v-model="angle"
              type="range"
              min="-45"
              max="45"
              aria-label="Rotate product preview"
            />
          </div>
          <div>
            <span class="small-label">GBOLD™ UNDER YOUR FEET</span>
            <h2>BIG ENERGY.<br />SOFT LANDING.</h2>
            <p>
              Light enough to forget. Comfortable enough to keep going. Explore the everyday slide
              from every angle.
            </p>
            <div class="sport-color-options">
              <button
                v-for="(name, i) in names"
                :key="name"
                :aria-pressed="color === i"
                :class="{ active: color === i }"
                @click="color = i"
              >
                {{ name }}
              </button>
            </div>
            <NuxtLink :to="base + '/product/' + products[0]!.id" class="button button-accent"
              >Make it yours<AppIcon name="arrow"
            /></NuxtLink>
          </div>
        </div>
      </section>
      <section
        v-if="section.id === 'lifestyles'"
        id="stories"
        class="sport-edits container section-space"
      >
        <NuxtLink :to="base + '/products?occasion=Everyday'"
          ><img
            src="/images/product-2.png"
            alt="Urban GAMBOL style"
            width="800"
            height="600"
            loading="lazy" />
          <div>
            <span>FROM THE STREETS</span>
            <h2>CITY MODE.</h2>
            <span class="round-arrow"><AppIcon name="arrow" /></span></div></NuxtLink
        ><NuxtLink :to="base + '/products?occasion=Outdoor'"
          ><img
            src="/images/product-4.png"
            alt="Outdoor GAMBOL style"
            width="800"
            height="600"
            loading="lazy" />
          <div>
            <span>TO YOUR NEXT ADVENTURE</span>
            <h2>OFF GRID.</h2>
            <span class="round-arrow"><AppIcon name="arrow" /></span></div
        ></NuxtLink>
      </section>
    </template>
  </div>
</template>
