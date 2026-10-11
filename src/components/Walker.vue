<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import gsap from 'gsap'

const emit = defineEmits<{ sat: []; done: []; press: [] }>()

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

const shoulder = '29px 16px'
const hip = '29px 20px'
const knee = '29px 28px'

function play() {
  const el = root.value
  if (!el) {
    emit('sat')
    emit('done')
    return
  }

  // ponytail: el camino es un translateX hasta el centro de la silla, que hoy coincide con el centro del viewport. Si la silla deja de estar centrada, hay que medir su rect y animar hasta ese x.
  const distance = window.innerWidth * 0.5 + el.offsetWidth
  ctx = gsap.context(() => {
    gsap.set(el, { xPercent: -50, x: -distance, opacity: 1 })
    gsap.set('.arm', { transformOrigin: shoulder })
    gsap.set('.thigh', { transformOrigin: hip })
    gsap.set('.shin', { transformOrigin: knee })

    const step = 0.32
    const swing = (target: string, from: number, to: number, origin: string) => {
      gsap.fromTo(
        target,
        { rotation: from, transformOrigin: origin },
        {
          rotation: to,
          transformOrigin: origin,
          duration: step,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        },
      )
    }

    // Perfil hacia la derecha: negativo lleva el pie o la mano hacia adelante.
    swing('.thigh--near', -32, 26, hip)
    swing('.thigh--far', 26, -32, hip)
    swing('.arm--near', 42, -36, shoulder)
    swing('.arm--far', -36, 42, shoulder)

    const bend = (target: string) => {
      const cycle = gsap.timeline({ repeat: -1 })
      cycle.set(target, { rotation: 8, transformOrigin: knee })
      cycle.to(target, { rotation: 14, duration: 0.16, ease: 'sine.inOut', transformOrigin: knee })
      cycle.to(target, { rotation: 6, duration: 0.16, ease: 'sine.inOut', transformOrigin: knee })
      cycle.to(target, { rotation: 38, duration: 0.18, ease: 'sine.inOut', transformOrigin: knee })
      cycle.to(target, { rotation: 8, duration: 0.14, ease: 'sine.inOut', transformOrigin: knee })
      return cycle
    }
    bend('.shin--near')
    bend('.shin--far').progress(0.5)

    gsap.to('.rig', { y: -6, duration: step, ease: 'sine.inOut', yoyo: true, repeat: -1 })

    const tl = gsap.timeline({ onComplete: () => emit('done') })
    tl.to(el, { x: 0, duration: 3, ease: 'none' })
    tl.add(() => emit('sat'))
    tl.to(el, { opacity: 0, duration: 0.28 }, '<')
  }, el)
}

let strideTweens: gsap.core.Tween[] = []

function stride(step: number) {
  const swing = (target: string, from: number, to: number, origin: string) => {
    strideTweens.push(
      gsap.fromTo(
        target,
        { rotation: from, transformOrigin: origin },
        {
          rotation: to,
          transformOrigin: origin,
          duration: step,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        },
      ),
    )
  }
  swing('.thigh--near', -32, 26, hip)
  swing('.thigh--far', 26, -32, hip)
  swing('.arm--near', 42, -36, shoulder)
  swing('.arm--far', -36, 42, shoulder)
  strideTweens.push(gsap.to('.rig', { y: -6, duration: step, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
}

function still() {
  strideTweens.forEach((tween) => tween.kill())
  strideTweens = []
  gsap.set('.thigh, .shin, .arm--far, .rig', { rotation: 0, y: 0 })
}

function pressSwitch(target: HTMLElement | null, side: 'left' | 'right' = 'left') {
  const el = root.value
  if (!el || !target) {
    emit('press')
    emit('sat')
    emit('done')
    return
  }

  const face = side === 'left' ? -1 : 1
  ctx?.revert()
  ctx = gsap.context(() => {
    gsap.set(el, { xPercent: -50, x: 0, opacity: 1 })
    gsap.set('.walker__figure', { scaleX: face, transformOrigin: '50% 70%' })
    const from = el.getBoundingClientRect()
    const plate = target.getBoundingClientRect()
    // ponytail: para a un cuerpo de distancia. Si el botón se mueve, se vuelve a medir aquí.
    const dx =
      plate.left + plate.width / 2 - (from.left + from.width / 2) + el.offsetWidth * 0.42 * face * -1

    stride(0.32)
    const tl = gsap.timeline({
      onComplete: () => {
        still()
        emit('done')
      },
    })
    tl.to(el, { x: dx, duration: 1.35, ease: 'none' })
    tl.add(still)
    tl.to('.arm--near', { rotation: -108, duration: 0.4, transformOrigin: shoulder, ease: 'power2.out' })
    tl.to('.arm--near', { rotation: -128, duration: 0.22, transformOrigin: shoulder, ease: 'power2.in' })
    tl.add(() => emit('press'))
    tl.to('.arm--near', { rotation: -40, duration: 0.18, transformOrigin: shoulder })
    tl.set('.walker__figure', { scaleX: -face })
    tl.add(() => stride(0.28))
    tl.to(el, { x: 0, duration: 1.05, ease: 'none' })
    tl.add(() => {
      still()
      emit('sat')
    })
    tl.to(el, { opacity: 0, duration: 0.2 }, '<')
  }, el)
}

onUnmounted(() => ctx?.revert())

defineExpose({ play, pressSwitch })
</script>

<template>
  <div ref="root" class="walker" aria-hidden="true">
    <svg class="walker__figure" viewBox="0 0 300 520">
      <defs>
        <clipPath id="walker-head">
          <circle cx="160" cy="80" r="40" />
        </clipPath>
      </defs>
      <g class="rig">
        <g transform="translate(150 156)">
          <g class="arm arm--far">
            <rect x="-21" y="-8" width="42" height="176" rx="21" />
            <rect class="shirt" x="-29" y="-16" width="58" height="78" rx="20" />
          </g>
        </g>
        <g transform="translate(150 300)">
          <g class="thigh thigh--far">
            <rect x="-21" y="-12" width="42" height="96" rx="21" />
            <rect class="pants" x="-29" y="-20" width="58" height="120" rx="20" />
            <g transform="translate(0 76)">
              <g class="shin shin--far">
                <rect x="-21" y="-16" width="42" height="118" rx="21" />
                <rect class="pants" x="-29" y="-28" width="58" height="122" rx="20" />
              </g>
            </g>
          </g>
        </g>
        <g class="body">
          <rect x="125" y="112" width="50" height="200" rx="25" />
          <rect class="shirt" x="117" y="116" width="66" height="202" rx="22" />
          <circle cx="160" cy="80" r="40" />
          <g clip-path="url(#walker-head)">
            <path
              class="hair"
              d="M100 108 L100 20 L210 20 L210 66 C194 58 178 74 164 82 C148 72 132 90 116 112 Z"
            />
          </g>
          <g class="glasses">
            <line x1="174" y1="80" x2="136" y2="74" />
            <rect x="174" y="72" width="22" height="16" rx="7" />
          </g>
        </g>
        <g transform="translate(150 300)">
          <g class="thigh thigh--near">
            <rect x="-21" y="-12" width="42" height="96" rx="21" />
            <rect class="pants" x="-29" y="-20" width="58" height="120" rx="20" />
            <g transform="translate(0 76)">
              <g class="shin shin--near">
                <rect x="-21" y="-16" width="42" height="118" rx="21" />
                <rect class="pants" x="-29" y="-28" width="58" height="122" rx="20" />
              </g>
            </g>
          </g>
        </g>
        <g transform="translate(150 156)">
          <g class="arm arm--near">
            <rect x="-21" y="-8" width="42" height="176" rx="21" />
            <rect class="shirt" x="-29" y="-16" width="58" height="78" rx="20" />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.walker {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: min(calc(18vw + 1.75rem), calc(168px + 1.75rem));
  opacity: 0;
  pointer-events: none;
}

.walker__figure {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
  fill: #f0c4a0;
  filter: drop-shadow(0 12px 14px rgba(20, 50, 70, 0.22));
}

.arm,
.thigh,
.shin {
  transform-box: fill-box;
}

.arm {
  transform-origin: 29px 16px;
}

.thigh {
  transform-origin: 29px 20px;
}

.shin {
  transform-origin: 29px 28px;
}

.hair {
  fill: #4a3728;
}

.glasses {
  fill: none;
  stroke: #2c241c;
  stroke-width: 4;
  stroke-linecap: round;
}

.shirt {
  fill: #f4efe6;
}

.pants {
  fill: #1e90ff;
}
</style>
