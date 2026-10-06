/** Mouse drag-to-scroll for horizontal rails (touch uses native scrolling). */
export function useDragScroll(el: Ref<HTMLElement | null>) {
  let startX = 0
  let startLeft = 0
  let moved = false
  let down = false

  const onDown = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || !el.value) return
    down = true; moved = false
    startX = e.clientX; startLeft = el.value.scrollLeft
  }
  const onMove = (e: PointerEvent) => {
    if (!down || !el.value) return
    const dx = e.clientX - startX
    if (!moved && Math.abs(dx) > 6) { moved = true; el.value.classList.add('is-dragging') }
    if (moved) el.value.scrollLeft = startLeft - dx
  }
  const onUp = () => {
    if (!down || !el.value) return
    down = false
    el.value.classList.remove('is-dragging')
  }
  // Swallow the click that ends a drag so cards don't navigate
  const onClick = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false } }

  onMounted(() => {
    const n = el.value
    if (!n) return
    n.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    n.addEventListener('click', onClick, true)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onUp)
  })

  const scrollByPage = (dir: 1 | -1) => {
    const n = el.value
    if (!n) return
    n.scrollBy({ left: dir * n.clientWidth * 0.85, behavior: 'smooth' })
  }
  return { scrollByPage }
}
