/**
 * In the portable build the router uses hash mode, so plain in-page anchors
 * (<a href="#stores">) would be read as routes. Scroll to the target instead.
 */
export default defineNuxtPlugin(() => {
  if (!isPortable()) return
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null
    if (!a) return
    const href = a.getAttribute('href') || ''
    if (href.startsWith('#/') || href === '#') return
    e.preventDefault()
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, true)
})
