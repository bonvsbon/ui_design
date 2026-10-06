/**
 * Portable (single-file, offline) build support.
 * scripts/build-portable.py injects these globals; in the normal app they are undefined
 * and every helper falls back to regular URLs.
 */
type PortableGlobals = {
  __GAMBOL_PORTABLE__?: boolean
  __GAMBOL_IMAGES__?: Record<string, string>
  __GAMBOL_MEDIA__?: Record<string, string>
}
const g = () => globalThis as unknown as PortableGlobals

export function isPortable() {
  return !!g().__GAMBOL_PORTABLE__
}

export function productImageUrl(image: string) {
  return g().__GAMBOL_IMAGES__?.[image] ?? `/images/products/${image}.webp`
}

export function portableMedia(id: string) {
  return g().__GAMBOL_MEDIA__?.[id]
}

/** Loads a Google Fonts stylesheet unless the fonts are already embedded. */
export function useFontStylesheet(href: string) {
  if (isPortable()) return
  useHead({ link: [{ rel: 'stylesheet', href }] })
}
