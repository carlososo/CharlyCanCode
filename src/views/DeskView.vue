<script setup lang="ts">
import Monito from '@/components/Monito.vue'
import UltrawideMonitor from '@/components/UltrawideMonitor.vue'
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
      <h1 class="desk__name">Carlos</h1>
      <p class="desk__line">Mi escritorio vivo: asómate a las ventanas.</p>
    </header>

    <section class="desk__stage" aria-label="Escena del escritorio">
      <UltrawideMonitor class="desk__monitor" />
      <div class="desk__character">
        <Monito />
      </div>
      <div class="desk__surface" aria-hidden="true" />
    </section>
  </main>
</template>

<style scoped>
.desk {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  padding: clamp(1rem, 3vw, 2.5rem) clamp(0.75rem, 3vw, 2rem) 2rem;
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
  opacity: 0.22;
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.85) 1px, transparent 0);
  background-size: 28px 28px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.8), transparent 85%);
}

.desk__brand {
  position: relative;
  z-index: 2;
  text-align: center;
  margin-bottom: clamp(0.5rem, 2vh, 1.25rem);
  animation: rise 700ms ease-out both;
}

.desk__name {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(3.4rem, 9vw, 6.5rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: var(--brand);
  text-shadow: 0 8px 0 rgba(255, 255, 255, 0.35);
}

.desk__line {
  margin: 0.55rem auto 0;
  max-width: 28rem;
  font-size: clamp(1rem, 2.2vw, 1.25rem);
  font-weight: 600;
  color: #2d5570;
}

.desk__stage {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  min-height: min(78vh, 720px);
  animation: rise 900ms 80ms ease-out both;
}

.desk__monitor {
  position: relative;
  z-index: 1;
}

.desk__character {
  position: absolute;
  left: 50%;
  bottom: clamp(1.5rem, 6vh, 3.5rem);
  transform: translateX(-50%);
  z-index: 3;
  animation: bob 4.5s ease-in-out infinite;
}

.desk__surface {
  position: absolute;
  left: 50%;
  bottom: 0.4rem;
  width: min(70vw, 640px);
  height: 28px;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(40, 90, 120, 0.18), transparent 70%);
  z-index: 0;
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

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bob {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-6px);
  }
}

@media (max-width: 700px) {
  .desk {
    padding-top: 1rem;
  }

  .desk__stage {
    min-height: auto;
    padding-bottom: 7rem;
  }

  .desk__character {
    bottom: 0.25rem;
  }
}
</style>
