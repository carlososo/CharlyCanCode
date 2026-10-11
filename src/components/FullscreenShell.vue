<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

defineProps<{
  title: string
  eyebrow?: string
}>()

const route = useRoute()
const { t } = useI18n()
const transitionName = computed(() => {
  const names: Record<string, string> = {
    terminal: 'win-terminal',
    explorer: 'win-explorer',
    browser: 'win-browser',
    tips: 'win-tips',
  }
  return names[String(route.name)] ?? 'none'
})
</script>

<template>
  <div class="fs" :style="{ 'view-transition-name': transitionName }">
    <header class="fs__chrome">
      <RouterLink class="fs__back" to="/">{{ t('back') }}</RouterLink>
      <div class="fs__meta">
        <p v-if="eyebrow" class="fs__eyebrow">{{ eyebrow }}</p>
        <h1 class="fs__title font-display">{{ title }}</h1>
      </div>
    </header>
    <div class="fs__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.fs {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #0f141a;
  color: #e8eef5;
}

.fs__chrome {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  padding: 0.85rem 1.25rem;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.fs__back {
  font-weight: 700;
  color: #9fd4f5;
  white-space: nowrap;
}

.fs__back:hover,
.fs__back:focus-visible {
  text-decoration: underline;
  outline: none;
}

.fs__meta {
  min-width: 0;
}

.fs__eyebrow {
  margin: 0;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.65;
}

.fs__title {
  margin: 0.1rem 0 0;
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 700;
}

.fs__body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
</style>
