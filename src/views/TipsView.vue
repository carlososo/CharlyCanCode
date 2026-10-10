<script setup lang="ts">
import FullscreenShell from '@/components/FullscreenShell.vue'
import { devTips } from '@/config/site'
</script>

<template>
  <FullscreenShell title="Dev Tips" eyebrow="Ideas 2026 · desarrollo e IA">
    <div class="tips">
      <p class="tips__intro">
        Apuntes cortos para trabajar con IA sin perder criterio. Contenido real — no lorem.
      </p>
      <ol class="tips__list">
        <li v-for="(tip, i) in devTips" :key="tip.title" class="tips__item">
          <span class="tips__num">{{ i + 1 }}</span>
          <div>
            <h2 class="font-display">{{ tip.title }}</h2>
            <p>{{ tip.body }}</p>
          </div>
        </li>
      </ol>
    </div>
  </FullscreenShell>
</template>

<style scoped>
.tips {
  flex: 1;
  padding: clamp(1.25rem, 4vw, 2.5rem);
  background:
    radial-gradient(circle at 90% 0%, rgba(255, 200, 120, 0.18), transparent 40%),
    #141a22;
  overflow: auto;
}

.tips__intro {
  margin: 0 0 1.5rem;
  max-width: 40rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: #c5d4e4;
}

.tips__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
  max-width: 48rem;
}

.tips__item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem 1rem;
  padding: 1rem 1.15rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.tips__num {
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 0.85rem;
  background: #e8a23c;
  color: #1a1208;
}

.tips__item h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #ffe2a8;
}

.tips__item p {
  margin: 0.4rem 0 0;
  line-height: 1.5;
  color: #d5e0ec;
  font-weight: 500;
}
</style>
