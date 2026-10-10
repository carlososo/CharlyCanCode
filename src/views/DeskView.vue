<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import DeskSurface from '@/components/DeskSurface.vue'
import Monito from '@/components/Monito.vue'
import UltrawideMonitor from '@/components/UltrawideMonitor.vue'
import { useMonitorPointer } from '@/composables/useMonitorPointer'

const monitor = ref<{ screen: HTMLElement | null } | null>(null)
const { nx, ny } = useMonitorPointer(() => monitor.value?.screen ?? null)

const words = ['Code', 'Play', 'Code', 'Debug', 'Code', 'Stream']
const verb = ref('Code')
let timer = 0
let word = 0

function tick() {
  const next = words[word % words.length] ?? 'Play'
  const current = verb.value
  if (current === next) {
    word += 1
    timer = window.setTimeout(tick, current === 'Code' ? 1800 : 1100)
    return
  }
  verb.value = next.startsWith(current) ? next.slice(0, current.length + 1) : current.slice(0, -1)
  timer = window.setTimeout(tick, next.startsWith(current) ? 90 : 50)
}

onMounted(() => {
  timer = window.setTimeout(tick, 900)
})

onUnmounted(() => {
  window.clearTimeout(timer)
})
</script>

<template>
  <main class="desk">
    <div class="desk__atmosphere" aria-hidden="true">
      <span class="blob blob-a" />
      <span class="blob blob-b" />
      <span class="blob blob-c" />
      <span class="dots" />
    </div>

    <header class="desk__brand">
      <h1 class="desk__name">Charly Can <span class="desk__verb">{{ verb }}</span></h1>
    </header>

    <section class="desk__stage" aria-label="Escena del escritorio">
      <UltrawideMonitor ref="monitor" class="desk__monitor" />
      <DeskSurface class="desk__board" />
      <div class="desk__character">
        <Monito :nx="nx" :ny="ny" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.desk {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  padding: clamp(0.75rem, 2.5vw, 2rem) clamp(0.75rem, 3vw, 2rem) 1.25rem;
  background:
    radial-gradient(ellipse 80% 50% at 50% -10%, #eaf7ff 0%, transparent 55%),
    linear-gradient(180deg, var(--sky-top) 0%, var(--sky-mid) 48%, #6eb4df 100%);
}

.desk__atmosphere {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(8px);
  opacity: 0.55;
  animation: floaty 12s ease-in-out infinite;
}

.blob-a {
  width: 42vw;
  height: 42vw;
  left: -8%;
  top: 8%;
  background: radial-gradient(circle, #dff2ff, transparent 70%);
}

.blob-b {
  width: 34vw;
  height: 34vw;
  right: -6%;
  top: 18%;
  background: radial-gradient(circle, #ffe8b8, transparent 70%);
  animation-delay: -4s;
}

.blob-c {
  width: 50vw;
  height: 28vw;
  left: 20%;
  bottom: -10%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.55), transparent 70%);
  animation-delay: -7s;
}

.dots {
  position: absolute;
  inset: 0;
  opacity: 0.2;
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.85) 1px, transparent 0);
  background-size: 28px 28px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.8), transparent 85%);
}

.desk__brand {
  position: relative;
  z-index: 2;
  text-align: center;
  margin-bottom: clamp(0.35rem, 1.5vh, 1rem);
  animation: rise 280ms ease-out both;
}

.desk__name {
  margin: 0;
  font-family: Poppins, sans-serif;
  font-weight: 100;
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: var(--brand);
  text-shadow: 0 8px 0 rgba(255, 255, 255, 0.35);
  padding-bottom: 3rem;
}

.desk__verb {
  display: inline-block;
  min-width: 6.2ch;
  text-align: left;
}

.desk__line {
  margin: 0.45rem auto 0;
  max-width: 32rem;
  font-size: clamp(0.95rem, 2vw, 1.15rem);
  font-weight: 600;
  color: #2d5570;
}

.desk__stage {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: stage-in 320ms 40ms ease-out both;
}

.desk__monitor {
  position: relative;
  z-index: 2;
}

.desk__board {
  margin-top: -6px;
  z-index: 1;
}

.desk__character {
  position: relative;
  z-index: 3;
  margin-top: -10.5rem;
  animation: bob 3.2s ease-in-out infinite;
}

@keyframes floaty {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(2%, -3%, 0) scale(1.04);
  }
}

@keyframes stage-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
  }
}

@keyframes bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

@media (max-width: 700px) {
  .desk__character {
    margin-top: -6rem;
  }
}
</style>
