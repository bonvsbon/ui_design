import { defineStore } from 'pinia'
import { defaultContent } from '~/data/homepage'
import type { SiteContent } from '~/types'
export const useContentStore = defineStore('content', () => {
  const content = ref<SiteContent>(structuredClone(defaultContent))
  const sections = computed(() => content.value.sections.filter((s) => s.enabled))
  function load() {
    try {
      const raw = localStorage.getItem('gambol-reef-content')
      if (raw) {
        const parsed = JSON.parse(raw)
        validateContent(parsed)
        content.value = parsed
      }
    } catch {}
  }
  function save(value: SiteContent) {
    validateContent(value)
    content.value = structuredClone(value)
    localStorage.setItem('gambol-reef-content', JSON.stringify(value))
  }
  function reset() {
    content.value = structuredClone(defaultContent)
    localStorage.removeItem('gambol-reef-content')
  }
  return { content, sections, load, save, reset }
})
export function validateContent(value: unknown): asserts value is SiteContent {
  const v = value as SiteContent
  const allowed = [
    'hero',
    'categories',
    'products',
    'brandStory',
    'lifestyles',
    'collection',
    'technology',
    'featured',
    'heroProduct',
    'kids',
    'stories',
    'stores',
    'social',
  ]
  const safe = (s: unknown) =>
    typeof s === 'string' &&
    ((s.startsWith('/') && !s.startsWith('//')) || s.startsWith('https://'))
  if (
    !v ||
    typeof v.announcement?.text !== 'string' ||
    !safe(v.announcement.link?.href) ||
    typeof v.announcement.link?.label !== 'string' ||
    !Array.isArray(v.sections) ||
    !v.sections.length
  )
    throw new Error('Provide an announcement and a non-empty sections array.')
  const ids = new Set<string>()
  for (const s of v.sections) {
    if (
      !s.id ||
      ids.has(s.id) ||
      !allowed.includes(s.type) ||
      typeof s.enabled !== 'boolean' ||
      typeof s.title !== 'string'
    )
      throw new Error('Each section needs a unique ID, valid type, title, and enabled flag.')
    ids.add(s.id)
    for (const m of [s.media, ...(s.cards || []).map((c) => c.image)])
      if (
        m &&
        (!safe(m.src) ||
          typeof m.alt !== 'string' ||
          (m.mobileSrc && !safe(m.mobileSrc)) ||
          (m.video && !safe(m.video)))
      )
        throw new Error('Media needs a safe path and descriptive alt text.')
    for (const cta of [s.cta, s.secondaryCta])
      if (cta && (!safe(cta.href) || typeof cta.label !== 'string'))
        throw new Error('CTAs need a safe destination and label.')
    if (s.cards?.some((c) => !safe(c.href) || typeof c.title !== 'string' || !c.id))
      throw new Error('Cards need an ID, title, and safe destination.')
    if (
      s.productIds &&
      (!Array.isArray(s.productIds) || s.productIds.some((id) => typeof id !== 'string'))
    )
      throw new Error('Product IDs must be strings.')
  }
  if (v.sections.filter((s) => s.type === 'hero' && s.enabled).length !== 1)
    throw new Error('Keep exactly one enabled hero campaign for the page heading.')
}
