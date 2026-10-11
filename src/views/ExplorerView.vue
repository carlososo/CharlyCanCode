<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import FullscreenShell from '@/components/FullscreenShell.vue'
import { projects } from '@/config/site'

const { t } = useI18n()

const selectedId = ref<string | null>(null)

const selected = computed(() => projects.find((p) => p.id === selectedId.value) ?? null)

function openProject(id: string) {
  selectedId.value = id
}

function closeDetail() {
  selectedId.value = null
}
</script>

<template>
  <FullscreenShell :title="t('projects')" :eyebrow="t('explorerEyebrow')">
    <div class="ex">
      <aside class="ex__side">
        <p class="ex__label">{{ t('pc') }}</p>
        <button type="button" class="ex__nav is-active">{{ t('projects') }}</button>
        <button type="button" class="ex__nav" disabled>{{ t('files') }}</button>
        <button type="button" class="ex__nav" disabled>{{ t('desktop') }}</button>
      </aside>

      <section class="ex__main">
        <header class="ex__toolbar">
          <span>{{ t('projectsPath') }}</span>
        </header>

        <div v-if="!selected" class="ex__grid">
          <button
            v-for="p in projects"
            :key="p.id"
            type="button"
            class="ex__file"
            @click="openProject(p.id)"
          >
            <span class="ex__icon" aria-hidden="true">
              <span class="ex__doc" />
              <span class="ex__ext">.{{ p.ext }}</span>
            </span>
            <span class="ex__fname">{{ p.name }}</span>
          </button>
        </div>

        <article v-else class="ex__detail">
          <button type="button" class="ex__back" @click="closeDetail">{{ t('folder') }}</button>
          <h2 class="font-display">{{ selected.name }}</h2>
          <p class="ex__stack">{{ selected.stack }}</p>
          <p class="ex__summary">{{ selected.summary }}</p>
          <p class="ex__note">{{ t('projectNote') }}</p>
        </article>
      </section>
    </div>
  </FullscreenShell>
</template>

<style scoped>
.ex {
  flex: 1;
  display: grid;
  grid-template-columns: minmax(160px, 220px) 1fr;
  min-height: 0;
  background: #e9eef4;
  color: #1f2a36;
}

.ex__side {
  padding: 1rem 0.75rem;
  background: #dce4ee;
  border-right: 1px solid #c5d0dc;
}

.ex__label {
  margin: 0 0.5rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.65;
}

.ex__nav {
  display: block;
  width: 100%;
  text-align: left;
  border: 0;
  background: transparent;
  padding: 0.45rem 0.6rem;
  border-radius: 8px;
  font: inherit;
  font-weight: 600;
  color: inherit;
  cursor: pointer;
}

.ex__nav.is-active,
.ex__nav:hover:not(:disabled) {
  background: #c9d8ea;
}

.ex__nav:disabled {
  opacity: 0.45;
  cursor: default;
}

.ex__main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.ex__toolbar {
  padding: 0.65rem 1rem;
  background: #f4f7fb;
  border-bottom: 1px solid #c5d0dc;
  font-size: 0.85rem;
  font-weight: 600;
  color: #3a4d60;
}

.ex__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
  padding: 1.25rem;
  align-content: start;
}

.ex__file {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 0.85rem 0.5rem;
  border: 1px solid transparent;
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: inherit;
}

.ex__file:hover,
.ex__file:focus-visible {
  background: #d7e6f7;
  border-color: #9cb8d6;
  outline: none;
}

.ex__icon {
  position: relative;
  width: 48px;
  height: 56px;
  display: grid;
  place-items: end center;
}

.ex__doc {
  position: absolute;
  inset: 0;
  border-radius: 4px 10px 4px 4px;
  background: linear-gradient(160deg, #f7fbff, #d5e6f7);
  border: 1px solid #8fb0cf;
  box-shadow: 0 4px 0 #b7cce0;
}

.ex__doc::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  border-style: solid;
  border-width: 0 12px 12px 0;
  border-color: transparent #7ea0c0 #e8f2fc transparent;
}

.ex__ext {
  position: relative;
  z-index: 1;
  margin-bottom: 6px;
  font-size: 0.65rem;
  font-weight: 800;
  color: #0b4f75;
  background: rgba(255, 255, 255, 0.85);
  padding: 1px 4px;
  border-radius: 4px;
}

.ex__fname {
  font-size: 0.82rem;
  font-weight: 600;
  text-align: center;
  word-break: break-word;
}

.ex__detail {
  padding: 1.5rem 1.75rem 2rem;
  max-width: 40rem;
}

.ex__back {
  border: 0;
  background: transparent;
  font: inherit;
  font-weight: 700;
  color: #0b4f75;
  cursor: pointer;
  padding: 0;
  margin-bottom: 1rem;
}

.ex__detail h2 {
  margin: 0;
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  color: #0b4f75;
}

.ex__stack {
  margin: 0.5rem 0 0;
  font-weight: 700;
  color: #3a6a88;
}

.ex__summary {
  margin: 1rem 0 0;
  font-size: 1.05rem;
  line-height: 1.5;
}

.ex__note {
  margin-top: 1.5rem;
  opacity: 0.7;
  font-size: 0.9rem;
}

@media (max-width: 700px) {
  .ex {
    grid-template-columns: 1fr;
  }

  .ex__side {
    display: flex;
    gap: 0.35rem;
    overflow-x: auto;
    border-right: 0;
    border-bottom: 1px solid #c5d0dc;
  }

  .ex__label {
    display: none;
  }
}
</style>
