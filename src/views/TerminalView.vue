<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import FullscreenShell from '@/components/FullscreenShell.vue'
import { terminalScript } from '@/config/site'

const shown = ref('')
let timer = 0
let line = 0
let col = 0

function tick() {
  if (line >= terminalScript.length) return
  const current = terminalScript[line] ?? ''
  if (col <= current.length) {
    const prefix = terminalScript.slice(0, line).join('\n')
    const partial = current.slice(0, col)
    shown.value = prefix ? `${prefix}\n${partial}` : partial
    col += 1
    timer = window.setTimeout(tick, current.startsWith('$') ? 28 : 16)
  } else {
    line += 1
    col = 0
    timer = window.setTimeout(tick, 220)
  }
}

onMounted(() => {
  timer = window.setTimeout(tick, 350)
})

onUnmounted(() => {
  window.clearTimeout(timer)
})
</script>

<template>
  <FullscreenShell title="Sobre mí" eyebrow="Terminal · bash">
    <div class="term">
      <div class="term__bar">
        <span class="term__dots" aria-hidden="true"><i /><i /><i /></span>
        <span class="term__name">carlos@desk:~</span>
      </div>
      <pre class="term__out" aria-live="polite">{{ shown }}</pre>
    </div>
  </FullscreenShell>
</template>

<style scoped>
.term {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0;
  background: #0b0f14;
  font-family: 'SFMono-Regular', 'Cascadia Code', 'Fira Code', ui-monospace, monospace;
}

.term__bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.55rem 0.9rem;
  background: #151b24;
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
  margin: 0;
  padding: 1.25rem 1.35rem 2rem;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: clamp(0.85rem, 1.6vw, 1.05rem);
  line-height: 1.55;
  color: #d2e7d8;
}
</style>
