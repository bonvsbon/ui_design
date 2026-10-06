<script setup lang="ts">
import { concepts } from '~/data/concepts'
useHead({ title: 'GAMBOL — Five original design directions' })
</script>
<template>
  <main id="main" class="overview-page">
    <div class="container">
      <div class="overview-header">
        <div>
          <span class="small-label" style="margin-bottom: 22px"
            >GAMBOL / DESIGN EXPLORATIONS / 2026</span
          >
          <h1>One brand.<br />Five ways forward.</h1>
        </div>
        <p>
          Five original footwear experiences, each with its own personality, layout, and way to find
          your next favourite pair. Explore a direction, then try the full shopping journey.
        </p>
      </div>
      <div class="overview-concepts">
        <article v-for="(c, i) in concepts" :key="c.id" class="concept-preview-card">
          <NuxtLink
            :to="'/' + c.id"
            :class="['concept-preview-art', 'preview-' + c.number]"
            :aria-label="'Explore ' + c.label"
            ><img
              v-if="i !== 3"
              :src="
                [
                  '/images/hero-campaign.jpg',
                  '/images/shoe-3.png',
                  '/images/product-4.png',
                  '',
                  '/images/shoe-1.png',
                ][i]
              "
              alt=""
              width="850"
              height="500"
            /><span>CONCEPT {{ c.number }}</span
            ><strong>{{ c.name }}</strong>
            <div v-if="i === 3" class="preview-mini-finder" aria-hidden="true">
              <span>Who are you shopping for?</span><b>Men</b><b>Women</b><b>Kids</b>
            </div></NuxtLink
          >
          <div class="concept-preview-info">
            <h2>{{ c.label }}</h2>
            <p>{{ c.description }}</p>
            <NuxtLink :to="'/' + c.id" class="text-link"
              >Explore concept {{ c.number }}<AppIcon name="arrow" :size="18"
            /></NuxtLink>
          </div>
        </article>
      </div>
      <section class="overview-table-section">
        <h2>The five directions, side by side.</h2>
        <div
          class="comparison-scroll"
          tabindex="0"
          role="region"
          aria-label="Scrollable comparison table"
        >
          <table class="overview-table">
            <caption class="sr-only">
              Design concept overview
            </caption>
            <thead>
              <tr>
                <th>Concept</th>
                <th>Style</th>
                <th>Target audience</th>
                <th>Strength</th>
                <th>Risk</th>
                <th>Best use case</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in concepts" :key="c.id">
                <td>
                  <NuxtLink :to="'/' + c.id">{{ c.number }} · {{ c.name }}</NuxtLink>
                </td>
                <td>{{ c.label }}</td>
                <td>{{ c.audience }}</td>
                <td>{{ c.strength }}</td>
                <td>{{ c.risk }}</td>
                <td>{{ c.use }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="recommendation-section">
        <div>
          <h2>The recommendation?<br />Lead with feeling.<br />Make finding easy.</h2>
          <p>
            Use Concept 01 as the brand foundation, with the useful shopping tools of Concept 04 and
            the tangible technology story of Concept 05.
          </p>
        </div>
        <ul>
          <li>
            <strong>Strongest for branding: Concept 01.</strong> Confident product imagery,
            memorable campaigns, and a visual system that can grow with the brand. Concept 02 excels
            for a younger, sports-focused repositioning.
          </li>
          <li>
            <strong>Strongest for conversion: Concept 04.</strong> The guided finder reduces
            uncertainty, while clear categories, recommendations, and product information shorten
            the shopping journey.
          </li>
          <li>
            <strong>Easiest to maintain: Concept 01.</strong> A straightforward section system and
            reusable commerce components support regular campaign updates without elaborate motion
            assets.
          </li>
          <li>
            <strong>Production combination: 01 + 04 + 05.</strong> Premium street identity,
            intuitive discovery, and a concise visual explanation of comfort. Bring in Concept 03’s
            stories for community and editorial campaigns.
          </li>
        </ul>
      </section>
      <p class="demo-note">
        Local frontend prototypes. Product names, prices, offers, material variants, and generated
        campaign products are illustrative. Photography is credited in the project’s asset
        documentation. No backend or payment provider is connected.
      </p>
    </div>
  </main>
</template>
