<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const screen = ref<HTMLElement | null>(null)
defineExpose({ screen })

const windows = [
  {
    to: '/terminal',
    title: 'Sobre mí',
    subtitle: 'Terminal',
    x: '4%',
    y: '8%',
    w: '28%',
    h: '52%',
    vt: 'win-terminal',
    tint: '#1a1e24',
    accent: '#3dd68c',
    dark: true,
    chat: false,
  },
  {
    to: '/explorer',
    title: 'Proyectos',
    subtitle: 'Explorer',
    x: '30%',
    y: '14%',
    w: '30%',
    h: '56%',
    vt: 'win-explorer',
    tint: '#eef8ff',
    accent: '#4aa3d8',
    dark: false,
    chat: false,
  },
  {
    to: '/browser',
    title: 'Contacto',
    subtitle: 'Mensajes',
    x: 'calc(56% )',
    y: '10%',
    w: '18%',
    h: '34%',
    vt: 'win-browser',
    tint: '#f4f7fb',
    accent: '#3d8bfd',
    dark: false,
    chat: true,
  },
  {
    to: '/tips',
    title: 'Dev Tips',
    subtitle: '2026',
    x: 'calc(68%)',
    y: '38%',
    w: '26%',
    h: '42%',
    vt: 'win-tips',
    tint: '#fff6e8',
    accent: '#e8a23c',
    dark: false,
    chat: false,
  },
] as const
</script>

<template>
  <div class="monitor" role="region" aria-label="Monitor ultrawide con ventanas">
    <div class="monitor__bezel">
      <div ref="screen" class="monitor__screen">
        <div class="monitor__wallpaper" />
        <div class="monitor__taskbar" aria-hidden="true">
          <span class="monitor__dot" />
          <span class="monitor__dot" />
          <span class="monitor__clock">escritorio · 4 apps</span>
        </div>

        <RouterLink
          v-for="win in windows"
          :key="win.to"
          :to="win.to"
          class="desk-window"
          :class="{ 'desk-window--dark': win.dark, 'desk-window--chat': win.chat }"
          :style="{
            left: win.x,
            top: win.y,
            width: win.w,
            height: win.h,
            '--win-tint': win.tint,
            '--win-accent': win.accent,
            'view-transition-name': win.vt,
          }"
        >
          <template v-if="win.chat">
            <span class="chat__head">
              <span class="chat__avatar" aria-hidden="true" />
              <span class="chat__who">
                <span class="desk-window__title">Charly</span>
                <span class="chat__status">en línea</span>
              </span>
            </span>
            <span class="chat__thread">
              <span class="chat__bubble">¿Hablamos?</span>
              <span class="chat__bubble chat__bubble--me">Cuando quieras</span>
            </span>
            <span class="chat__input">Mensaje</span>
          </template>
          <template v-else>
            <span class="desk-window__bar">
              <span class="desk-window__traffic" aria-hidden="true">
                <i /><i /><i />
              </span>
              <span class="desk-window__title">{{ win.title }}</span>
            </span>
            <span class="desk-window__body">
              <span class="desk-window__sub">{{ win.subtitle }}</span>
              <span class="desk-window__cta">Abrir</span>
            </span>
          </template>
        </RouterLink>
      </div>
      <div class="monitor__chin" aria-hidden="true" />
    </div>

    <!-- Base del monitor: estrecha y centrada, sobre el escritorio -->
    <div class="monitor__stand" aria-hidden="true">
      <div class="monitor__neck" />
      <div class="monitor__foot" />
    </div>
  </div>
</template>

<style scoped>
.monitor {
  width: 55.84vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

.monitor__bezel {
  width: 100%;
  height: 30vh;
  background: linear-gradient(180deg, #3a4654 0%, #243041 100%);
  border-radius: 18px;
  padding: 12px 14px 14px;
  box-shadow:
    0 24px 40px rgba(25, 60, 90, 0.26),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.monitor__screen {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: #cfe9fb;
  box-shadow: inset 0 0 0 2px rgba(10, 30, 50, 0.25);
}

.monitor__wallpaper {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 18% 22%, rgba(255, 255, 255, 0.55), transparent 40%),
    radial-gradient(circle at 78% 28%, rgba(255, 220, 150, 0.3), transparent 35%),
    linear-gradient(160deg, #b7ddf5 0%, #8ec8ef 45%, #7ab8e4 100%);
}

.monitor__wallpaper::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.16;
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.7) 1px, transparent 0);
  background-size: 18px 18px;
}

.monitor__taskbar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 26px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  background: rgba(20, 50, 75, 0.55);
  color: #f4fbff;
  font-size: 0.72rem;
  z-index: 2;
}

.monitor__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #9fd4f5;
}

.monitor__clock {
  margin-left: auto;
  opacity: 0.9;
}

.monitor__chin {
  height: 4px;
}

.monitor__stand {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -1px;
  z-index: 2;
}

.monitor__neck {
  width: 42px;
  height: 22px;
  background: linear-gradient(90deg, #2a3544, #4a5a6c, #2a3544);
  clip-path: polygon(22% 0, 78% 0, 100% 100%, 0 100%);
}

.monitor__foot {
  width: 120px;
  height: 10px;
  margin-top: -1px;
  border-radius: 999px;
  background: linear-gradient(180deg, #3a4654, #1f2935);
  box-shadow: 0 6px 10px rgba(20, 40, 60, 0.22);
}

.desk-window {
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  background: var(--win-tint);
  box-shadow:
    0 10px 22px rgba(20, 50, 80, 0.18),
    0 0 0 1px rgba(30, 60, 90, 0.12);
  transition:
    transform 90ms ease,
    box-shadow 90ms ease;
  z-index: 1;
  color: #23455c;
}

.desk-window--dark {
  color: #d7e0ea;
}

.desk-window:hover,
.desk-window:focus-visible {
  transform: translateY(-3px) scale(1.02);
  box-shadow:
    0 14px 28px rgba(20, 50, 80, 0.24),
    0 0 0 2px var(--win-accent);
  outline: none;
  z-index: 3;
}

.desk-window__bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: color-mix(in srgb, var(--win-accent) 22%, white);
  border-bottom: 1px solid rgba(30, 60, 90, 0.08);
}

.desk-window--dark .desk-window__bar {
  background: color-mix(in srgb, var(--win-accent) 18%, #12161c);
  border-bottom-color: rgba(255, 255, 255, 0.06);
}

.desk-window__traffic {
  display: inline-flex;
  gap: 4px;
}

.desk-window__traffic i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #f2b8b0;
  display: block;
}

.desk-window__traffic i:nth-child(2) {
  background: #f2d59b;
}

.desk-window__traffic i:nth-child(3) {
  background: #b6dfb4;
}

.desk-window__title {
  font-family: var(--font-display);
  font-size: clamp(0.75rem, 1.3vw, 1rem);
  font-weight: 600;
}

.desk-window__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 10px 12px 12px;
}

.desk-window__sub {
  font-size: 0.72rem;
  opacity: 0.75;
  font-weight: 600;
}

.desk-window__cta {
  align-self: flex-start;
  font-size: 0.72rem;
  font-weight: 700;
  color: inherit;
  background: color-mix(in srgb, var(--win-accent) 30%, white);
  padding: 3px 9px;
  border-radius: 999px;
}

.desk-window--dark .desk-window__cta {
  background: color-mix(in srgb, var(--win-accent) 35%, #0d1117);
  color: #e8fff4;
}

.desk-window--chat {
  border-radius: 16px;
  z-index: 2;
}

.chat__head {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  background: #fff;
  border-bottom: 1px solid rgba(30, 60, 90, 0.08);
}

.chat__avatar {
  width: 16px;
  height: 16px;
  flex: none;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #9ec5ff, var(--win-accent));
}

.chat__who {
  display: flex;
  flex-direction: column;
  min-width: 0;
  line-height: 1.05;
}

.desk-window--chat .desk-window__title {
  font-size: 0.72rem;
}

.chat__status {
  font-size: 0.55rem;
  font-weight: 700;
  color: #3c9a62;
}

.chat__thread {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;
  padding: 6px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.35), transparent 40%),
    var(--win-tint);
}

.chat__bubble {
  align-self: flex-start;
  max-width: 92%;
  padding: 3px 6px;
  border-radius: 8px 8px 8px 3px;
  background: #fff;
  font-size: 0.58rem;
  font-weight: 700;
  line-height: 1.2;
}

.chat__bubble--me {
  align-self: flex-end;
  border-radius: 8px 8px 3px 8px;
  background: var(--win-accent);
  color: #fff;
}

.chat__input {
  margin: 0 6px 6px;
  padding: 3px 8px;
  border-radius: 999px;
  background: #fff;
  font-size: 0.55rem;
  font-weight: 700;
  opacity: 0.7;
}

@media (max-width: 700px) {
  .monitor__bezel {
    padding: 8px 8px 10px;
    border-radius: 14px;
  }

  .monitor__foot {
    width: 72px;
  }

  .desk-window__sub {
    display: none;
  }
}
</style>
