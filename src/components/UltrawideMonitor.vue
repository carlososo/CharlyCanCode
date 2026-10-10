<script setup lang="ts">
import { RouterLink } from 'vue-router'

const windows = [
  {
    to: '/sobre',
    title: 'Sobre mí',
    x: '6%',
    y: '10%',
    w: '34%',
    h: '48%',
    tint: '#fff8e8',
    accent: '#f0a04b',
  },
  {
    to: '/proyectos',
    title: 'Proyectos',
    x: '38%',
    y: '18%',
    w: '36%',
    h: '54%',
    tint: '#eef8ff',
    accent: '#4aa3d8',
  },
  {
    to: '/contacto',
    title: 'Contacto',
    x: '62%',
    y: '8%',
    w: '32%',
    h: '42%',
    tint: '#f3fff0',
    accent: '#6cbc6a',
  },
] as const
</script>

<template>
  <div class="monitor" role="region" aria-label="Monitor ultrawide con ventanas">
    <div class="monitor__bezel">
      <div class="monitor__screen">
        <div class="monitor__wallpaper" />
        <div class="monitor__taskbar" aria-hidden="true">
          <span class="monitor__dot" />
          <span class="monitor__dot" />
          <span class="monitor__clock">escritorio</span>
        </div>

        <RouterLink
          v-for="win in windows"
          :key="win.to"
          :to="win.to"
          class="desk-window"
          :style="{
            left: win.x,
            top: win.y,
            width: win.w,
            height: win.h,
            '--win-tint': win.tint,
            '--win-accent': win.accent,
          }"
        >
          <span class="desk-window__bar">
            <span class="desk-window__traffic" aria-hidden="true">
              <i /><i /><i />
            </span>
            <span class="desk-window__title">{{ win.title }}</span>
          </span>
          <span class="desk-window__body">
            <span class="desk-window__line" />
            <span class="desk-window__line short" />
            <span class="desk-window__cta">Abrir</span>
          </span>
        </RouterLink>
      </div>
      <div class="monitor__chin" aria-hidden="true" />
    </div>
    <!-- Stand omitted from the desk scene: a wide foot/neck behind the
         monito read as chair armrests. Ultrawide read comes from the bezel. -->
  </div>
</template>

<style scoped>
.monitor {
  width: 85vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.monitor__bezel {
  width: 100%;
  height: 40vh;
  background: linear-gradient(180deg, #3a4654 0%, #243041 100%);
  border-radius: 18px;
  padding: 14px 16px 18px;
  box-shadow:
    0 30px 50px rgba(25, 60, 90, 0.28),
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
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.55), transparent 40%),
    radial-gradient(circle at 80% 30%, rgba(255, 220, 150, 0.35), transparent 35%),
    linear-gradient(160deg, #b7ddf5 0%, #8ec8ef 45%, #7ab8e4 100%);
}

.monitor__wallpaper::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.18;
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.7) 1px, transparent 0);
  background-size: 18px 18px;
}

.monitor__taskbar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 28px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  background: rgba(20, 50, 75, 0.55);
  color: #f4fbff;
  font-size: 0.75rem;
  z-index: 2;
}

.monitor__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9fd4f5;
}

.monitor__clock {
  margin-left: auto;
  opacity: 0.9;
  letter-spacing: 0.02em;
}

.monitor__chin {
  height: 6px;
}

.desk-window {
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  background: var(--win-tint);
  box-shadow:
    0 10px 24px rgba(20, 50, 80, 0.18),
    0 0 0 1px rgba(30, 60, 90, 0.12);
  transform: translateZ(0);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
  z-index: 1;
}

.desk-window:hover,
.desk-window:focus-visible {
  transform: translateY(-4px) scale(1.02);
  box-shadow:
    0 16px 30px rgba(20, 50, 80, 0.24),
    0 0 0 2px var(--win-accent);
  outline: none;
  z-index: 3;
}

.desk-window__bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  background: color-mix(in srgb, var(--win-accent) 22%, white);
  border-bottom: 1px solid rgba(30, 60, 90, 0.08);
}

.desk-window__traffic {
  display: inline-flex;
  gap: 4px;
}

.desk-window__traffic i {
  width: 8px;
  height: 8px;
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
  font-size: clamp(0.8rem, 1.4vw, 1.05rem);
  font-weight: 600;
  color: #23455c;
}

.desk-window__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 12px 14px 14px;
}

.desk-window__line {
  display: block;
  height: 8px;
  width: 78%;
  border-radius: 999px;
  background: rgba(40, 80, 110, 0.12);
}

.desk-window__line.short {
  width: 52%;
}

.desk-window__cta {
  align-self: flex-start;
  margin-top: 4px;
  font-size: 0.78rem;
  font-weight: 700;
  color: #1f4e6d;
  background: color-mix(in srgb, var(--win-accent) 28%, white);
  padding: 4px 10px;
  border-radius: 999px;
}

@media (max-width: 700px) {
  .monitor {
    width: 85vw;
  }

  .monitor__bezel {
    height: 40vh;
    padding: 10px 10px 12px;
    border-radius: 14px;
  }

  .desk-window__line {
    display: none;
  }

  .desk-window__cta {
    font-size: 0.7rem;
  }
}
</style>
