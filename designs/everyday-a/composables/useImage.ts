/**
 * Image URL helpers. `u:<id>` → Unsplash CDN (on-the-fly resize/format); local paths pass through.
 * Swap this one file for your DAM/CDN (Cloudinary, imgix, Nuxt Image…) later.
 *
 * Portable build: scripts/build-portable.py embeds every image as a data URL in
 * window.__GAMBOL_ASSETS__ (keyed by the same src), so the site runs from a single offline file.
 */
const embedded = () => (globalThis as { __GAMBOL_ASSETS__?: Record<string, string> }).__GAMBOL_ASSETS__

export const isPortable = () => !!embedded()

export function imageUrl(src: string, width = 1200, height?: number): string {
  const inline = embedded()?.[src]
  if (inline) return inline
  if (!src.startsWith('u:')) return src
  const h = height ? `&h=${height}` : ''
  return `https://images.unsplash.com/photo-${src.slice(2)}?auto=format&fit=crop&w=${width}${h}&q=68`
}

export function imageSrcset(src: string, widths: number[], ratio?: number): string | undefined {
  if (!src.startsWith('u:') || isPortable()) return undefined
  return widths.map((w) => `${imageUrl(src, w, ratio ? Math.round(w * ratio) : undefined)} ${w}w`).join(', ')
}
