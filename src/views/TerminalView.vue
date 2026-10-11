<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import FullscreenShell from '@/components/FullscreenShell.vue'
import { terminalScript } from '@/config/site'

const { t } = useI18n()

const shown = ref('')
const out = ref<HTMLElement | null>(null)
let timer = 0
let line = 0
let col = 0
let frozen = ''

function scroll() {
  out.value?.scrollIntoView({ block: 'end' })
}

function tick() {
  if (line >= terminalScript.length) return
  const current = terminalScript[line] ?? ''
  if (col < current.length) {
    const command = current.startsWith('$')
    col = Math.min(current.length, col + (command ? 1 : 2))
    const partial = current.slice(0, col)
    shown.value = frozen ? `${frozen}\n${partial}` : partial
    scroll()
    timer = window.setTimeout(tick, 4)
  } else {
    frozen = frozen ? `${frozen}\n${current}` : current
    shown.value = frozen
    line += 1
    col = 0
    scroll()
    timer = window.setTimeout(tick, 4)
  }
}

onMounted(() => {
  timer = window.setTimeout(tick, 120)
})

onUnmounted(() => {
  window.clearTimeout(timer)
})
</script>

<template>
  <FullscreenShell :title="t('about')" eyebrow="Terminal · bash">
    <div class="term">
      <div class="term__bar">
        <span class="term__dots" aria-hidden="true"><i /><i /><i /></span>
        <span class="term__name">charly@desk:~</span>
      </div>
      <pre ref="out" class="term__out">{{ shown }}<span class="caret" aria-hidden="true">▌</span></pre>
    </div>
  </FullscreenShell>
</template>

<style scoped>
.term {
  flex: 1;
  min-height: 0;
  height: calc(100dvh - 4.75rem);
  display: flex;
  flex-direction: column;
  margin: 0;
  background: #300a24;
  font-family: 'SFMono-Regular', 'Cascadia Code', 'Fira Code', ui-monospace, monospace;
}

.term__bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.55rem 0.9rem;
  background: #240818;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.8rem;
  color: #9aa8b8;
}

.term__dots {
  display: inline-flex;
  gap: 5px;
}

.term__dots i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff5f57;
  display: block;
}

.term__dots i:nth-child(2) {
  background: #febc2e;
}

.term__dots i:nth-child(3) {
  background: #28c840;
}

.term__out {
  flex: 1;
  min-height: 0;
  margin: 0;
  padding: 1.25rem 1.35rem 2rem;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: clamp(0.85rem, 1.6vw, 1.05rem);
  line-height: 1.55;
  color: #eeeeec;
}

.caret {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
