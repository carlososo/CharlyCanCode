import { onMounted, onUnmounted, ref, type Ref } from 'vue'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount
}

/** Snappy head/hair motion: idle + look toward pointer. */
export function useHeadTracking(anchor: Ref<HTMLElement | null>) {
  const rotateY = ref(0)
  const rotateX = ref(0)
  const sway = ref(0)

  let targetY = 0
  let targetX = 0
  let currentY = 0
  let currentX = 0
  let idlePhase = 0
  let hasPointer = false
  let frame = 0
  let lastPointerAt = 0

  // Cache layout — avoid getBoundingClientRect on every pointermove (layout thrash).
  let headX = 0
  let headY = 0
  let scaleX = 1
  let scaleY = 1

  function refreshAnchorMetrics() {
    const el = anchor.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    headX = rect.left + rect.width * 0.5
    headY = rect.top + rect.height * 0.22
    scaleX = 1 / Math.max(rect.width * 0.55, 1)
    scaleY = 1 / Math.max(rect.height * 0.7, 1)
  }

  function onPointerMove(event: PointerEvent) {
    hasPointer = true
    lastPointerAt = performance.now()
    targetY = clamp((event.clientX - headX) * scaleX, -1, 1)
    targetX = clamp((event.clientY - headY) * scaleY, -0.55, 0.55)
  }

  function onPointerLeave() {
    hasPointer = false
    targetY = 0
    targetX = 0
  }

  function tick(now: number) {
    idlePhase += 0.028
    const idleY = Math.sin(idlePhase) * 0.06
    const idleX = Math.cos(idlePhase * 0.7) * 0.03

    const pointerFresh = hasPointer && now - lastPointerAt < 900
    const desireY = pointerFresh ? targetY : idleY
    const desireX = pointerFresh ? targetX * 0.7 : idleX

    // ~0.28 ≈ snappy follow; was 0.08 (noticeable lag).
    currentY = lerp(currentY, desireY, 0.28)
    currentX = lerp(currentX, desireX, 0.28)

    const nextY = currentY * 18
    const nextX = currentX * 10
    const nextSway = Math.sin(idlePhase * 0.9) * 1.1

    // Skip trivial Vue writes to cut style thrash.
    if (Math.abs(nextY - rotateY.value) > 0.08) rotateY.value = nextY
    if (Math.abs(nextX - rotateX.value) > 0.08) rotateX.value = nextX
    if (Math.abs(nextSway - sway.value) > 0.05) sway.value = nextSway

    frame = requestAnimationFrame(tick)
  }

  onMounted(() => {
    refreshAnchorMetrics()
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('resize', refreshAnchorMetrics, { passive: true })
    // One layout pass after fonts/paint settle.
    requestAnimationFrame(refreshAnchorMetrics)
    frame = requestAnimationFrame(tick)
  })

  onUnmounted(() => {
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerleave', onPointerLeave)
    window.removeEventListener('resize', refreshAnchorMetrics)
    cancelAnimationFrame(frame)
  })

  return { rotateY, rotateX, sway }
}
