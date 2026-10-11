<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import FullscreenShell from '@/components/FullscreenShell.vue'
import { LINKEDIN_URL } from '@/config/site'

const { t } = useI18n()
</script>

<template>
  <FullscreenShell :title="t('contact')" :eyebrow="t('browserEyebrow')">
    <div class="br">
      <div class="br__chrome">
        <div class="br__traffic" aria-hidden="true"><i /><i /><i /></div>
        <div class="br__url">
          <span class="br__lock" aria-hidden="true" />
          <span class="br__address">https://carlos.dev/contacto</span>
        </div>
      </div>

      <main class="br__page">
        <p class="br__kicker font-display">Carlos</p>
        <h2>{{ t('contactHeadline') }}</h2>
        <p class="br__lead">{{ t('contactLead') }}</p>
        <a class="br__link" :href="LINKEDIN_URL" target="_blank" rel="noopener noreferrer">
          {{ t('contactLink') }}
          <span class="br__href">{{ LINKEDIN_URL }}</span>
        </a>
        <p class="br__hint">
          {{ t('contactHint') }} <code>src/config/site.ts</code> → <code>LINKEDIN_URL</code>.
        </p>
      </main>
    </div>
  </FullscreenShell>
</template>

<style scoped>
.br {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f3f6fa;
  color: #1f2a36;
  min-height: 0;
}

.br__chrome {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.65rem 0.9rem;
  background: #e4eaf1;
  border-bottom: 1px solid #c8d2de;
}

.br__traffic {
  display: inline-flex;
  gap: 6px;
}

.br__traffic i {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #ff5f57;
  display: block;
}

.br__traffic i:nth-child(2) {
  background: #febc2e;
}

.br__traffic i:nth-child(3) {
  background: #28c840;
}

.br__url {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  min-width: 0;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #c8d2de;
  font-size: 0.9rem;
  font-weight: 600;
  color: #3a4d60;
}

.br__lock {
  width: 10px;
  height: 12px;
  border: 2px solid #6a7c90;
  border-radius: 3px;
  position: relative;
  flex-shrink: 0;
}

.br__lock::before {
  content: '';
  position: absolute;
  left: 1px;
  top: -6px;
  width: 4px;
  height: 6px;
  border: 2px solid #6a7c90;
  border-bottom: 0;
  border-radius: 6px 6px 0 0;
}

.br__address {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.br__page {
  flex: 1;
  padding: clamp(1.5rem, 5vw, 3.5rem);
  max-width: 40rem;
}

.br__kicker {
  margin: 0;
  font-size: 1.1rem;
  color: #0b4f75;
}

.br__page h2 {
  margin: 0.35rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, 3rem);
  color: #0b4f75;
}

.br__lead {
  margin: 1rem 0 0;
  font-size: 1.1rem;
  line-height: 1.5;
  color: #2d5570;
  font-weight: 600;
}

.br__link {
  display: inline-flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 1.75rem;
  padding: 0.9rem 1.2rem;
  border-radius: 14px;
  background: #0b4f75;
  color: #f4fbff;
  font-weight: 700;
  text-decoration: none;
  max-width: 100%;
}

.br__link:hover,
.br__link:focus-visible {
  background: #083d5a;
  outline: none;
}

.br__href {
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0.8;
  word-break: break-all;
}

.br__hint {
  margin-top: 1.25rem;
  font-size: 0.88rem;
  opacity: 0.7;
}

.br__hint code {
  font-size: 0.84em;
  background: rgba(11, 79, 117, 0.08);
  padding: 0.1em 0.35em;
  border-radius: 4px;
}
</style>
