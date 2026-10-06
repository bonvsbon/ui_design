<script setup lang="ts">
import { defaultContent } from '~/data/homepage'
import { validateContent } from '~/stores/content'
import type { SiteContent } from '~/types'
const cms = useContentStore()
const { products } = useCatalog()
const draft = ref<SiteContent>(structuredClone(defaultContent))
const selected = ref(0)
const status = ref('')
const invalid = ref(false)
const json = ref('')
const raw = ref(false)
const section = computed(() => draft.value.sections[selected.value])
onNuxtReady(() => {
  draft.value = structuredClone(toRaw(cms.content))
  json.value = JSON.stringify(draft.value, null, 2)
})
function move(index: number, delta: number) {
  const dest = index + delta
  if (dest < 0 || dest >= draft.value.sections.length) return
  const list = draft.value.sections
  ;[list[index], list[dest]] = [list[dest]!, list[index]!]
  selected.value = dest
}
function toggleProduct(id: string) {
  if (!section.value) return
  const ids = section.value.productIds || []
  section.value.productIds = ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]
}
function save() {
  try {
    if (raw.value) {
      const parsed = JSON.parse(json.value)
      validateContent(parsed)
      draft.value = parsed
    }
    cms.save(JSON.parse(JSON.stringify(draft.value)))
    status.value = 'Saved on this device. The homepage now uses this content.'
    invalid.value = false
  } catch (e) {
    invalid.value = true
    status.value = e instanceof Error ? e.message : 'Check your content and try again.'
  }
}
function toggleRaw() {
  if (!raw.value) json.value = JSON.stringify(draft.value, null, 2)
  else {
    try {
      const parsed = JSON.parse(json.value)
      validateContent(parsed)
      draft.value = parsed
      selected.value = 0
    } catch (e) {
      status.value = 'Fix the JSON before returning to the editor.'
      invalid.value = true
      return
    }
  }
  raw.value = !raw.value
}
function reset() {
  cms.reset()
  draft.value = structuredClone(defaultContent)
  selected.value = 0
  json.value = JSON.stringify(draft.value, null, 2)
  status.value = 'Original concept content restored.'
  invalid.value = false
}
function download() {
  const blob = new Blob([JSON.stringify(draft.value, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'gambol-homepage.json'
  a.click()
  URL.revokeObjectURL(url)
}
useSeoMeta({ title: 'Concept content studio | GAMBOL', robots: 'noindex,nofollow' })
function selectSection(index: number) {
  selected.value = index
  raw.value = false
}
</script>
<template>
  <div class="studio-page container">
    <div class="page-heading studio-intro">
      <span class="red-label">LOCAL CONTENT STUDIO</span>
      <h1>MAKE THE DAY<br />YOUR OWN.</h1>
      <p>
        Edit this concept’s homepage, reorder sections, select products and change campaign media.
        Changes save in this browser. This is a local preview editor, with no production publishing
        or authentication.
      </p>
    </div>
    <div class="studio-toolbar">
      <p>14 section types · one flexible homepage</p>
      <div class="button-row">
        <button class="text-link" @click="toggleRaw">
          {{ raw ? 'FORM EDITOR' : 'EDIT ALL JSON' }}</button
        ><NuxtLink to="/" class="text-link"
          >VIEW HOMEPAGE<AppIcon name="upRight" :size="17"
        /></NuxtLink>
      </div>
    </div>
    <div class="studio-layout">
      <aside class="studio-sections">
        <div
          v-for="(s, i) in draft.sections"
          :key="s.id"
          class="studio-section-row"
          :class="{ selected: selected === i }"
        >
          <input v-model="s.enabled" type="checkbox" :aria-label="`Enable ${s.id}`" /><button
            @click="selectSection(i)"
          >
            {{ s.id }}</button
          ><button
            class="icon-button"
            :disabled="i === 0"
            :aria-label="`Move ${s.id} up`"
            @click="move(i, -1)"
          >
            <AppIcon name="up" :size="15" /></button
          ><button
            class="icon-button"
            :disabled="i === draft.sections.length - 1"
            :aria-label="`Move ${s.id} down`"
            @click="move(i, 1)"
          >
            <AppIcon name="moveDown" :size="15" />
          </button>
        </div>
      </aside>
      <div class="studio-editor">
        <template v-if="raw"
          ><h2>COMPLETE PAGE CONTENT</h2>
          <label for="content-json"
            >Valid JSON, including announcement, section cards and all media fields</label
          ><textarea
            id="content-json"
            v-model="json"
            class="json-editor"
            spellcheck="false"
          /></template
        ><template v-else-if="section"
          ><h2>{{ section.id.toUpperCase() }}</h2>
          <label>Announcement text<input v-model="draft.announcement.text" /></label
          ><label>Section title<textarea v-model="section.title" rows="2" /></label
          ><label>Subtitle<input v-model="section.subtitle" /></label
          ><label>Body copy<textarea v-model="section.body" rows="3" /></label
          ><template v-if="section.media"
            ><label>Desktop image URL<input v-model="section.media.src" /></label
            ><label
              >Mobile image URL<input
                v-model="section.media.mobileSrc"
                placeholder="Optional responsive image" /></label
            ><label>Image description<input v-model="section.media.alt" /></label
            ><label v-if="section.type === 'hero'"
              >Campaign video URL<input
                v-model="section.media.video"
                placeholder="Optional HTTPS or local video URL" /></label></template
          ><template v-if="section.cta"
            ><label>Primary CTA label<input v-model="section.cta.label" /></label
            ><label>Primary CTA destination<input v-model="section.cta.href" /></label></template
          ><template v-if="section.secondaryCta"
            ><label>Secondary CTA label<input v-model="section.secondaryCta.label" /></label
            ><label
              >Secondary CTA destination<input
                v-model="section.secondaryCta.href" /></label></template
          ><template v-if="section.productIds"
            ><h3>Featured products</h3>
            <div class="studio-product-picker">
              <label v-for="p in products" :key="p.id"
                ><input
                  type="checkbox"
                  :checked="section.productIds.includes(p.id)"
                  @change="toggleProduct(p.id)"
                />{{ p.name }}</label
              >
            </div>
            <label
              >Or use a collection (clear selected products first)<select
                v-model="section.collection"
              >
                <option value="">No collection</option>
                <option v-for="c in [...new Set(products.map((p) => p.collection))]" :key="c">
                  {{ c }}
                </option>
              </select></label
            ></template
          >
          <p v-if="section.cards?.length" class="studio-status">
            Edit the section's individual cards in “Edit all JSON”.
          </p></template
        >
        <div class="button-row">
          <button class="button primary" @click="save">
            SAVE PREVIEW<AppIcon name="check" :size="17" /></button
          ><button class="button secondary" @click="download">
            EXPORT JSON<AppIcon name="arrow" :size="17" /></button
          ><button class="text-link" @click="reset">RESTORE DEFAULTS</button>
        </div>
        <p
          v-if="status"
          class="studio-status"
          :class="{ 'form-error': invalid }"
          :role="invalid ? 'alert' : 'status'"
        >
          {{ status }}
        </p>
      </div>
    </div>
  </div>
</template>
