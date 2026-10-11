import { onMounted, onUnmounted, ref } from 'vue'

function ease(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
}

function aim(fromX: number, fromY: number) {
  let x = fromX
  let y = fromY
  for (let i = 0; i < 4; i++) {
    x = Math.random() * 1.7 - 0.85
    y = Math.random() * 1.6 - 0.8
    if (Math.hypot(x - fromX, y - fromY) > 0.4) break
  }
  return { x, y }
}

if (ease(0) !== 0 || ease(1) !== 1) throw new Error('monitor wander ease')

/**
 * Pointer offset inside the monitor, from -1 to 1.
 * Outside, the mouse and forearm wander on their own.
 * ponytail: el paseo es a puntos al azar, no hacia la ventana abierta. Si debe señalar la app, leer el slot activo.
 */
export function useMonitorPointer(getScreen: () => HTMLElement | null) {
  const nx = ref(0)
  const ny = ref(0)
  let hovering = false
  let frame = 0
  let fromX = 0
  let fromY = 0
  let toX = 0
  let toY = 0
  let moveStart = 0
  let moveEnd = 0
  let holdUntil = 0

  function retarget(now: number) {
    fromX = nx.value
    fromY = ny.value
    const next = aim(fromX, fromY)
    toX = next.x
    toY = next.y
    moveStart = now
    moveEnd = now + 320 + Math.random() * 480
    holdUntil = moveEnd + 280 + Math.random() * 900
  }

  function onPointerMove(event: PointerEvent) {
    const screen = getScreen()
    if (!screen) return
    const rect = screen.getBoundingClientRect()
    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    if (!inside) {
      if (hovering) {
        hovering = false
        retarget(performance.now())
      }
      return
    }
    hovering = true
    nx.value = ((event.clientX - rect.left) / rect.width) * 2 - 1
    ny.value = ((event.clientY - rect.top) / rect.height) * 2 - 1
  }

  function tick(now: number) {
    if (!hovering) {
      if (now >= holdUntil) retarget(now)
      else if (now < moveEnd && moveEnd > moveStart) {
        const t = ease((now - moveStart) / (moveEnd - moveStart))
        nx.value = fromX + (toX - fromX) * t
        ny.value = fromY + (toY - fromY) * t
      }
    }
    frame = requestAnimationFrame(tick)
  }

  onMounted(() => {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    retarget(performance.now())
    frame = requestAnimationFrame(tick)
  })

  onUnmounted(() => {
    window.removeEventListener('pointermove', onPointerMove)
    cancelAnimationFrame(frame)
  })

  return { nx, ny }
}
