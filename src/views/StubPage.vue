<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const title = computed(() => String(route.meta.title ?? 'Página'))
const blurb = computed(() => String(route.meta.blurb ?? ''))
</script>

<template>
  <main class="page">
    <div class="page__glow" aria-hidden="true" />
    <RouterLink class="page__back" to="/">← Volver al escritorio</RouterLink>
    <h1 class="page__title font-display">{{ title }}</h1>
    <p class="page__blurb">{{ blurb }}</p>
    <p class="page__note">Stub de ruta para la v1 — el contenido completo llegará después.</p>
  </main>
</template>

<style scoped>
.page {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  padding: clamp(1.5rem, 4vw, 3rem);
  background: linear-gradient(180deg, #d7effc 0%, #9ecceb 100%);
  color: #1f3a4d;
}

.page__glow {
  position: absolute;
  width: 50vw;
  height: 50vw;
  top: -10%;
  right: -10%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.55), transparent 70%);
  pointer-events: none;
}

.page__back {
  position: relative;
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  color: #0b4f75;
  margin-bottom: 2rem;
}

.page__back:hover,
.page__back:focus-visible {
  text-decoration: underline;
  outline: none;
}

.page__title {
  position: relative;
  margin: 0;
  font-size: clamp(2.4rem, 7vw, 4rem);
  color: #0b4f75;
}

.page__blurb {
  position: relative;
  margin: 1rem 0 0;
  max-width: 36rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: #2d5570;
}

.page__note {
  position: relative;
  margin-top: 2rem;
  max-width: 32rem;
  opacity: 0.8;
}
</style>
