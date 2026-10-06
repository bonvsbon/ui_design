<script setup lang="ts">
import { concepts, defaultCampaigns, defaultSections } from '~/data/concepts'
const { campaigns, sections } = useContent()
const { toast } = useShop()
const selected = ref('concept-01')
const campaign = computed(() => campaigns.value[selected.value]!)
const sectionList = computed(() => sections.value[selected.value]!)
function move(index: number, direction: number) {
  const list = sectionList.value
  const dest = index + direction
  if (dest < 0 || dest >= list.length) return
  const item = list.splice(index, 1)[0]!
  list.splice(dest, 0, item)
}
function reset() {
  campaigns.value[selected.value] = structuredClone(defaultCampaigns[selected.value]!)
  sections.value[selected.value] = structuredClone(defaultSections[selected.value]!)
  toast('This concept has been reset to its original content')
}
function download() {
  const json = JSON.stringify(
    { schemaVersion: 1, campaigns: campaigns.value, sections: sections.value },
    null,
    2
  )
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'gambol-homepage-content.json'
  a.click()
  URL.revokeObjectURL(url)
  toast('Content exported as JSON')
}
useHead({ title: 'GAMBOL — Local content studio' })
</script>
<template>
  <main id="main" class="content-studio">
    <div class="container">
      <div class="studio-heading">
        <div>
          <h1>Make it your campaign.</h1>
          <p>
            Update a hero, switch sections on or off, and change their order. Changes are saved
            automatically in this browser, so you can try a new direction without a backend.
          </p>
        </div>
        <NuxtLink to="/overview" class="text-link"
          >All concepts<AppIcon name="arrow" :size="18"
        /></NuxtLink>
      </div>
      <div class="studio-layout">
        <nav class="studio-navigation" aria-label="Select concept to edit">
          <button
            v-for="c in concepts"
            :key="c.id"
            :class="{ active: selected === c.id }"
            @click="selected = c.id"
          >
            <span>{{ c.number }}</span
            >{{ c.label }}</button
          ><NuxtLink :to="'/' + selected" class="text-link"
            >Preview this concept<AppIcon name="eye" :size="17"
          /></NuxtLink>
        </nav>
        <section class="studio-editor">
          <h2>Hero campaign</h2>
          <div class="studio-campaign-form">
            <label class="form-label"
              >Campaign headline<textarea
                v-model="campaign.title"
                maxlength="65"
                rows="2"
              ></textarea></label
            ><label class="form-label"
              >Supporting copy<textarea
                v-model="campaign.subtitle"
                maxlength="180"
                rows="3"
              ></textarea></label
            ><label class="form-label"
              >Button label<input v-model="campaign.cta" maxlength="35" /></label
            ><label class="form-label"
              >Campaign image<select v-model="campaign.image">
                <option
                  v-for="path in [
                    '/images/hero-campaign.jpg',
                    '/images/product-1.png',
                    '/images/product-2.png',
                    '/images/product-4.png',
                    '/images/shoe-1.png',
                    '/images/shoe-3.png',
                    '/images/beach.jpg',
                  ]"
                  :key="path"
                  :value="path"
                >
                  {{ path.split('/').pop() }}
                </option>
              </select></label
            >
          </div>
          <div class="studio-section-list">
            <h3>Homepage sections</h3>
            <div v-for="(s, i) in sectionList" :key="s.id" class="studio-section-row">
              <input v-model="s.enabled" type="checkbox" :aria-label="'Show ' + s.label" /><span>{{
                s.label
              }}</span
              ><button
                class="icon-button"
                :disabled="i === 0"
                :aria-label="'Move ' + s.label + ' up'"
                @click="move(i, -1)"
              >
                <AppIcon name="up" :size="16" /></button
              ><button
                class="icon-button"
                :disabled="i === sectionList.length - 1"
                :aria-label="'Move ' + s.label + ' down'"
                @click="move(i, 1)"
              >
                <AppIcon name="moveDown" :size="16" />
              </button>
            </div>
          </div>
          <p class="studio-save-note">
            Saved automatically on this device. The campaign hero stays first; enabled sections
            follow the order above.
          </p>
          <div class="studio-actions">
            <button class="button button-dark" @click="download">
              Export content JSON<AppIcon name="down" :size="16" /></button
            ><button class="button button-outline" @click="reset">Reset this concept</button>
          </div>
          <div class="studio-cms-note">
            <strong>Ready for a future CMS.</strong><br />Campaigns and section order use structured
            content in <code>data/concepts.ts</code>. Products, categories, collections, and
            technology attributes live in <code>data/products.ts</code>. The complete content model
            and fields for articles and promotions are documented in <code>docs/CMS.md</code>. This
            local editor demonstrates homepage management; product administration and publishing
            need a CMS connection.
          </div>
        </section>
      </div>
    </div>
  </main>
</template>
