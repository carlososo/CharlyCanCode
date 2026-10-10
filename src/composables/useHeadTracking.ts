import { onMounted, onUnmounted, ref, type Ref } from 'vue'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount
}

/** Smooth head/hair motion: idle at monitor, look toward pointer, return. */
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

  function onPointerMove(event: PointerEvent) {
    const el = anchor.value
    if (!el) return

    hasPointer = true
    lastPointerAt = performance.now()
    const rect = el.getBoundingClientRect()
    const headX = rect.left + rect.width * 0.5
    const headY = rect.top + rect.height * 0.22
    targetY = clamp((event.clientX - headX) / (rect.width * 0.55), -1, 1)
    targetX = clamp((event.clientY - headY) / (rect.height * 0.7), -0.55, 0.55)
  }

  function onPointerLeave() {
    hasPointer = false
    targetY = 0
    targetX = 0
  }

  function tick(now: number) {
    idlePhase += 0.018
    const idleY = Math.sin(idlePhase) * 0.08
    const idleX = Math.cos(idlePhase * 0.7) * 0.04

    const pointerFresh = hasPointer && now - lastPointerAt < 1600
    const desireY = pointerFresh ? targetY : idleY
    const desireX = pointerFresh ? targetX * 0.65 : idleX

    currentY = lerp(currentY, desireY, 0.08)
    currentX = lerp(currentX, desireX, 0.08)

    rotateY.value = currentY * 18
    rotateX.value = currentX * 10
    sway.value = Math.sin(idlePhase * 0.9) * 1.4

    frame = requestAnimationFrame(tick)
  }

  onMounted(() => {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    frame = requestAnimationFrame(tick)
  })

  onUnmounted(() => {
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerleave', onPointerLeave)
    cancelAnimationFrame(frame)
  })

  return { rotateY, rotateX, sway }
}
