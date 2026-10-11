<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(DrawSVGPlugin)

const emit = defineEmits<{ done: [] }>()

const board = ref<HTMLElement | null>(null)
const word = ref<SVGSVGElement | null>(null)
let ctx: gsap.Context | null = null
let failSafe = 0
let finished = false

function finish() {
  if (finished) return
  finished = true
  window.clearTimeout(failSafe)
  emit('done')
}

function play(target: HTMLElement | null) {
  const root = board.value
  const svg = word.value
  if (!root || !svg) {
    finish()
    return
  }

  const paths = svg.querySelectorAll('path')
  const screen = target?.getBoundingClientRect()
  // ponytail: el rect del monitor se mide una vez aquí. Si la ventana cambia de tamaño durante el intro (~2s), el hello cae fuera de la pantalla. Arreglo: volver a medir justo antes del encogido.
  const box =
    screen && screen.width > 0
      ? screen
      : new DOMRect(
          window.innerWidth * 0.22,
          window.innerHeight * 0.3,
          window.innerWidth * 0.56,
          window.innerHeight * 0.3,
        )

  failSafe = window.setTimeout(finish, 8000)
  ctx = gsap.context(() => {
    gsap.set(root, {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
    })
    gsap.set(paths, { drawSVG: 0 })

    const tl = gsap.timeline({ onComplete: finish })
    tl.to(paths, {
      drawSVG: '100%',
      duration: 0.5,
      stagger: 0.2,
      ease: 'power1.inOut',
    })
    tl.to(
      root,
      {
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
        borderRadius: 8,
        duration: 0.72,
        ease: 'power3.inOut',
      },
      '+=0.12',
    )
    tl.to(svg, { scale: 0.36, duration: 0.72, ease: 'power3.inOut' }, '<')
    tl.to(root, { opacity: 0, duration: 0.16 }, '-=0.05')
  }, root)
}

onUnmounted(() => {
  window.clearTimeout(failSafe)
  ctx?.revert()
})

defineExpose({ play })
</script>

<template>
  <div ref="board" class="hello">
    <svg ref="word" class="hello__word" viewBox="0 0 820 360" role="img" aria-label="hello">
      <defs>
        <linearGradient id="hello-ink" gradientUnits="userSpaceOnUse" x1="60" y1="0" x2="760" y2="0">
          <stop offset="0" stop-color="#64d2ff" />
          <stop offset="0.28" stop-color="#30d158" />
          <stop offset="0.52" stop-color="#ffd60a" />
          <stop offset="0.74" stop-color="#ff9f0a" />
          <stop offset="1" stop-color="#ff375f" />
        </linearGradient>
      </defs>
      <path d="M70 50C66 140 68 240 74 310" stroke="url(#hello-ink)" />
      <path d="M74 175C110 120 175 115 190 175C200 215 188 280 184 310" stroke="url(#hello-ink)" />
      <path
        d="M248 208C252 158 325 148 352 192C378 236 340 292 272 278C218 266 214 214 258 204"
        stroke="url(#hello-ink)"
      />
      <path d="M242 206H348" stroke="url(#hello-ink)" />
      <path d="M400 310C396 200 390 90 408 48C422 18 452 28 436 62" stroke="url(#hello-ink)" />
      <path d="M490 310C486 200 480 90 498 48C512 18 542 28 526 62" stroke="url(#hello-ink)" />
      <path
        d="M640 155C720 140 785 185 770 235C755 290 650 315 610 270C575 230 590 160 655 158"
        stroke="url(#hello-ink)"
      />
    </svg>
  </div>
</template>

<style scoped>
.hello {
  position: fixed;
  z-index: 40;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #000;
}

.hello__word {
  width: min(70vw, 640px);
  overflow: visible;
}

.hello__word path {
  fill: none;
  stroke-width: 28;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
