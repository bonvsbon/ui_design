<script setup lang="ts">
const { base } = useConcept()
const { campaign, visibleSections } = useContent()
const { panel } = useShop()
</script>
<template>
  <div class="commerce-home">
    <section class="commerce-hero container">
      <div class="commerce-hero-copy">
        <span class="commerce-tag"
          ><AppIcon name="check" :size="14" /> A GOOD FIT FOR REAL LIFE</span
        >
        <h1>{{ campaign.title }}</h1>
        <p>{{ campaign.subtitle }}</p>
        <div class="commerce-hero-product">
          <img
            :src="campaign.image"
            alt="White GAMBOL everyday slides"
            width="500"
            height="350"
            fetchpriority="high"
          /><span>Everyday comfort,<br /><strong>from ฿250.</strong></span>
        </div>
        <div class="commerce-proof">
          <span><AppIcon name="truck" :size="18" />Free delivery over ฿599</span
          ><span><AppIcon name="returns" :size="18" />7-day easy returns</span>
        </div>
      </div>
      <PairFinder />
    </section>
    <template v-for="section in visibleSections" :key="section.id">
      <section v-if="section.id === 'categories'" class="commerce-categories container">
        <div class="section-heading">
          <h2>Know what you’re looking for?</h2>
          <NuxtLink :to="base + '/products'" class="text-link"
            >Shop everything<AppIcon name="right" :size="18"
          /></NuxtLink>
        </div>
        <div class="commerce-category-grid">
          <NuxtLink
            v-for="(c, i) in ['Men', 'Women', 'Kids', 'Slides', 'Flip-flops', 'Sneakers']"
            :key="c"
            :to="base + '/products?category=' + c"
            ><img
              :src="
                '/images/' +
                [
                  'shoe-3.png',
                  'shoe-2.png',
                  'shoe-7.png',
                  'shoe-1.png',
                  'shoe-5.png',
                  'gambol-sneaker.png',
                ][i]
              "
              :alt="c + ' footwear'"
              width="240"
              height="200"
              loading="lazy" /><span>{{ c }}<AppIcon name="next" :size="16" /></span
          ></NuxtLink>
        </div>
      </section>
      <ProductSection
        v-if="section.id === 'arrivals'"
        title="A few favourites to get you started."
        subtitle="Everyday comfort, with an easy-going price."
        filter="Best Sellers"
      />
      <section
        v-if="section.id === 'technology'"
        id="technology"
        class="commerce-benefits container section-space"
      >
        <div>
          <h2>What makes a good pair?</h2>
          <p>Comfort you can feel. Details you can count on.</p>
        </div>
        <div class="commerce-benefit-list">
          <article
            v-for="b in [
              {
                icon: 'layers',
                title: 'Soft from the first step',
                text: 'Our GBOLD footbed cushions your everyday.',
              },
              {
                icon: 'feather',
                title: 'A little lighter',
                text: 'Easy to wear, wherever the day takes you.',
              },
              {
                icon: 'shield',
                title: 'Made for the long run',
                text: 'Resilient materials and a dependable grip.',
              },
            ]"
            :key="b.title"
          >
            <AppIcon :name="b.icon" :size="28" />
            <h3>{{ b.title }}</h3>
            <p>{{ b.text }}</p>
          </article>
        </div>
      </section>
    </template>
    <section id="stories" class="commerce-help container">
      <div>
        <h2>A little help finding your fit?</h2>
        <p>Check your measurements or try your next pair in person.</p>
      </div>
      <button class="button button-outline" @click="panel = 'size'">Open size guide</button
      ><button class="button button-dark" @click="panel = 'stores'">
        Find a store<AppIcon name="pin" :size="18" />
      </button>
    </section>
  </div>
</template>
