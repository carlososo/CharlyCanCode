import { onMounted, onUnmounted, ref } from 'vue'

/** Pointer offset inside the monitor screen, from -1 to 1. Outside, the last value stays. */
export function useMonitorPointer(getScreen: () => HTMLElement | null) {
  const nx = ref(0)
  const ny = ref(0)

  function onPointerMove(event: PointerEvent) {
    const screen = getScreen()
    if (!screen) return
    const rect = screen.getBoundingClientRect()
    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    if (!inside) return
    nx.value = ((event.clientX - rect.left) / rect.width) * 2 - 1
    ny.value = ((event.clientY - rect.top) / rect.height) * 2 - 1
  }

  onMounted(() => {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('pointermove', onPointerMove)
  })

  return { nx, ny }
}
