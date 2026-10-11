<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DeskSurface from '@/components/DeskSurface.vue'
import HelloIntro from '@/components/HelloIntro.vue'
import Monito from '@/components/Monito.vue'
import UltrawideMonitor from '@/components/UltrawideMonitor.vue'
import Walker from '@/components/Walker.vue'
import { useMonitorPointer } from '@/composables/useMonitorPointer'
import { roomIsDark, setRoomDark } from '@/state/daylight'
import { hasIntroduced, markIntroduced } from '@/state/session'

const monitor = ref<{ screen: HTMLElement | null } | null>(null)
const intro = ref<{ play: (target: HTMLElement | null) => void } | null>(null)
const walker = ref<{
  play: () => void
  pressSwitch: (target: HTMLElement | null, side?: 'left' | 'right') => void
} | null>(null)
const switchBtn = ref<HTMLButtonElement | null>(null)
const shadeBtn = ref<HTMLButtonElement | null>(null)
const switching = ref(false)
const shadeOpen = ref(false)
const errand = ref<'light' | 'shade' | null>(null)
const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const returning = hasIntroduced()
const introDone = ref(reduceMotion || returning)
const seated = ref(reduceMotion || returning)
const walking = ref(false)
const inside = ref(false)
const dark = ref(roomIsDark())
const talking = ref(false)
const bubbleGen = ref(0)
const { t, locale } = useI18n()
const bubbleWords = computed(() => [t('about'), t('contact'), t('projects'), t('tips')])
const { nx, ny } = useMonitorPointer(() => monitor.value?.screen ?? null)
let talkTimer = 0
let shadeTimer = 0

function onLang() {
  const next = locale.value === 'en' ? 'es' : 'en'
  locale.value = next
  document.documentElement.lang = next
  localStorage.setItem('locale', next)
  talking.value = true
  bubbleGen.value += 1
  window.clearTimeout(talkTimer)
  talkTimer = window.setTimeout(() => {
    talking.value = false
  }, 3200)
}

function startWalk() {
  introDone.value = true
  if (reduceMotion) return
  walking.value = true
  nextTick(() => walker.value?.play())
}

function setDark(next: boolean) {
  dark.value = next
  setRoomDark(next)
}

function onSwitch() {
  if (switching.value) return
  if (reduceMotion || walking.value) {
    setDark(!dark.value)
    return
  }
  errand.value = 'light'
  switching.value = true
  seated.value = false
  walking.value = true
  nextTick(() => walker.value?.pressSwitch(switchBtn.value))
}

function onShade() {
  if (switching.value) return
  if (shadeOpen.value) {
    window.clearTimeout(shadeTimer)
    shadeOpen.value = false
    return
  }
  shadeOpen.value = true
  window.clearTimeout(shadeTimer)
  shadeTimer = window.setTimeout(() => {
    if (!shadeOpen.value || switching.value) {
      shadeOpen.value = false
      return
    }
    if (reduceMotion || walking.value || !seated.value) {
      shadeOpen.value = false
      return
    }
    errand.value = 'shade'
    switching.value = true
    seated.value = false
    walking.value = true
    nextTick(() => walker.value?.pressSwitch(shadeBtn.value, 'right'))
  }, 7000)
}

function onPress() {
  if (errand.value === 'shade') {
    shadeOpen.value = false
    return
  }
  setDark(!dark.value)
}

function onWalkerDone() {
  walking.value = false
  switching.value = false
  errand.value = null
}

const words = ['Code', 'Play', 'Code', 'Debug', 'Code', 'Stream']
const verb = ref('Code')
let timer = 0
let word = 0

function tick() {
  const next = words[word % words.length] ?? 'Play'
  const current = verb.value
  if (current === next) {
    word += 1
    timer = window.setTimeout(tick, current === 'Code' ? 1800 : 1100)
    return
  }
  verb.value = next.startsWith(current) ? next.slice(0, current.length + 1) : current.slice(0, -1)
  timer = window.setTimeout(tick, next.startsWith(current) ? 90 : 50)
}

onMounted(() => {
  document.documentElement.lang = locale.value
  markIntroduced()
  if (!reduceMotion && !returning) intro.value?.play(monitor.value?.screen ?? null)
  timer = window.setTimeout(tick, 900)
})

onUnmounted(() => {
  window.clearTimeout(timer)
  window.clearTimeout(talkTimer)
  window.clearTimeout(shadeTimer)
})
</script>

<template>
  <main class="desk" :class="{ 'is-dark': dark }" :aria-hidden="!introDone">
    <span class="desk__ceiling" :class="{ 'is-on': dark }" aria-hidden="true">
      <i class="desk__shade" />
      <i class="desk__beam" />
    </span>
    <div class="desk__atmosphere" aria-hidden="true">
      <span class="blob blob-a" />
      <span class="blob blob-b" />
      <span class="blob blob-c" />
      <span class="dots" />
    </div>

    <header class="desk__brand">
      <h1 class="desk__name">
        Charly Can <span class="desk__verb">{{ verb }}</span>
      </h1>
    </header>

    <button
      ref="switchBtn"
      class="desk__switch"
      type="button"
      :aria-pressed="dark"
      :aria-label="dark ? t('switch.labelOn') : t('switch.label')"
      @click="onSwitch"
    >
      <svg class="desk__mark desk__mark--sun" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="2.5" fill="currentColor" />
        <path
          fill="none"
          stroke="currentColor"
          stroke-width="1.3"
          stroke-linecap="round"
          d="M8 1.2v1.7M8 13.1v1.7M1.2 8h1.7M13.1 8h1.7M3.3 3.3l1.2 1.2M11.5 11.5l1.2 1.2M12.7 3.3l-1.2 1.2M4.5 11.5l-1.2 1.2"
        />
      </svg>
      <span class="desk__lever" />
      <span class="desk__tip">{{ dark ? t('switch.tipOn') : t('switch.tip') }}</span>
      <svg class="desk__mark desk__mark--moon" viewBox="0 0 16 16" aria-hidden="true">
        <path fill="currentColor" d="M9.4 1.5a5.6 5.6 0 1 0 5.1 7.6 4.4 4.4 0 0 1-5.1-7.6z" />
      </svg>
    </button>

    <button class="desk__lang" type="button" :aria-label="t('lang.label')" @click="onLang">
      <span :class="{ 'is-on': locale === 'es' }">ES</span>
      <span :class="{ 'is-on': locale === 'en' }">EN</span>
      <span class="desk__tip">{{ t('lang.tip') }}</span>
    </button>

    <section class="desk__stage" aria-label="Escena del escritorio">
      <button
        v-if="false"
        ref="shadeBtn"
        class="desk__view"
        type="button"
        :class="{ 'is-open': shadeOpen }"
        :aria-pressed="shadeOpen"
        :aria-label="shadeOpen ? t('shadeClose') : t('shadeOpen')"
        @click="onShade"
      >
        <span class="desk__pane" />
        <span class="desk__blind" />
      </button>
      <UltrawideMonitor
        ref="monitor"
        class="desk__monitor"
        :class="{ 'desk__monitor--quiet': !introDone || (!seated && !reduceMotion) }"
        :demo="seated && !inside && !reduceMotion"
        @active="inside = $event"
      />
      <DeskSurface class="desk__board" :lit="dark" />
      <div class="desk__character" :class="{ 'is-seated': seated && !walking, 'is-reaching': switching }">
        <p class="desk__bubble" :class="{ 'is-on': talking }" role="status" :aria-hidden="!talking">
          <span class="desk__cloud" aria-hidden="true"><i /><i /><i /><i /><i /><i /></span>
          <span class="desk__words">
            <span v-for="(word, i) in bubbleWords" :key="`${bubbleGen}-${i}`" class="desk__word">{{ word }}</span>
          </span>
          <i class="desk__puff desk__puff--a" aria-hidden="true" />
          <i class="desk__puff desk__puff--b" aria-hidden="true" />
        </p>
        <Monito :seated="seated" :nx="nx" :ny="ny" />
        <Walker
          v-if="walking"
          ref="walker"
          @sat="seated = true"
          @done="onWalkerDone"
          @press="onPress"
        />
      </div>
    </section>
  </main>

    <HelloIntro v-if="!introDone" ref="intro" @done="startWalk" />
</template>

<style scoped>
.desk {
  position: relative;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  padding: clamp(0.75rem, 2.5vw, 2rem) clamp(0.75rem, 3vw, 2rem) 1.25rem;
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
  opacity: 0.2;
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.85) 1px, transparent 0);
  background-size: 28px 28px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.8), transparent 85%);
}

.desk__brand {
  position: relative;
  z-index: 2;
  text-align: center;
  margin-bottom: clamp(0.35rem, 1.5vh, 1rem);
  animation: rise 280ms ease-out both;
}

.desk__name {
  margin: 1rem 0 0;
  font-family: Poppins, sans-serif;
  font-weight: 100;
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: var(--brand);
  text-shadow: 0 10px 28px rgba(11, 79, 117, 0.12);
  padding-bottom: 0.5rem;
}

.desk__ceiling {
  position: absolute;
  z-index: 3;
  top: 0;
  left: 50%;
  width: calc(72px + 10rem);
  height: 7px;
  transform: translateX(-50%);
  pointer-events: none;
}

.desk__shade {
  position: absolute;
  z-index: 1;
  inset: 0;
  background: #fff;
  clip-path: polygon(12% 0, 88% 0, 100% 100%, 0 100%);
}

.desk__beam {
  display: none;
}

.desk__ceiling.is-on .desk__shade {
  background: linear-gradient(180deg, #fff1c9, #ffb347);
}

.desk__ceiling.is-on .desk__beam {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 16rem;
  height: 16rem;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 214, 140, 0.55), rgba(255, 176, 70, 0.14) 52%, transparent 70%);
}

.desk__verb {
  display: inline-block;
  min-width: 6.2ch;
  text-align: left;
}

.desk__line {
  margin: 0.45rem auto 0;
  max-width: 32rem;
  font-size: clamp(0.95rem, 2vw, 1.15rem);
  font-weight: 600;
  color: #2d5570;
}

.desk__stage {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  animation: stage-in 320ms 40ms ease-out both;
}

.desk__switch {
  position: absolute;
  z-index: 4;
  left: clamp(0.75rem, 3vw, 2rem);
  top: 53%;
  width: 34px;
  height: 64px;
  padding: 0;
  border: 0;
  border-radius: 12px;
  background: linear-gradient(180deg, #fbf8f2, #d9d2c4);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    0 2px 0 #b7b0a4,
    0 8px 16px rgba(20, 40, 60, 0.14);
  cursor: pointer;
}

.desk__mark {
  position: absolute;
  left: 50%;
  width: 13px;
  height: 13px;
  transform: translateX(-50%);
}

.desk__mark--sun,
.desk__mark--moon {
  top: 5px;
}

.desk__mark--sun {
  color: #e2a320;
}

.desk__mark--moon {
  color: #f0d48a;
  opacity: 0;
}

.desk.is-dark .desk__mark--sun {
  opacity: 0;
}

.desk.is-dark .desk__mark--moon {
  opacity: 1;
}

.desk__tip {
  position: absolute;
  left: calc(100% + 10px);
  top: 50%;
  z-index: 1;
  padding: 0.28rem 0.55rem;
  border-radius: 8px;
  background: #1c2430;
  color: #f7f4ee;
  font-family: Nunito, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-50%);
  transition: opacity 140ms ease;
}

.desk__tip::before {
  content: '';
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border: 5px solid transparent;
  border-right-color: #1c2430;
}

.desk__switch:hover .desk__tip,
.desk__switch:focus-visible .desk__tip {
  opacity: 1;
}

.desk.is-dark .desk__tip {
  background: #f7f4ee;
  color: #1c2430;
}

.desk.is-dark .desk__tip::before {
  border-right-color: #f7f4ee;
}

.desk__lang {
  position: absolute;
  z-index: 4;
  top: 1.15rem;
  right: clamp(0.75rem, 3vw, 2rem);
  display: flex;
  gap: 2px;
  padding: 3px;
  border: 0;
  border-radius: 999px;
  background: #fbf8f2;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    0 2px 0 #b7b0a4,
    0 8px 16px rgba(20, 40, 60, 0.14);
  cursor: pointer;
}

.desk__lang > span:not(.desk__tip) {
  min-width: 1.7rem;
  padding: 0.18rem 0.35rem;
  border-radius: 999px;
  color: #6d655c;
  font-family: Nunito, sans-serif;
  font-size: 0.72rem;
  font-weight: 800;
  line-height: 1.2;
}

.desk__lang > span.is-on {
  background: #1c2430;
  color: #f7f4ee;
}

.desk__lang .desk__tip {
  right: calc(100% + 10px);
  left: auto;
}

.desk__lang .desk__tip::before {
  right: auto;
  left: 100%;
  border-right-color: transparent;
  border-left-color: #1c2430;
}

.desk__lang:hover .desk__tip,
.desk__lang:focus-visible .desk__tip {
  opacity: 1;
}

.desk__lang:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 3px;
}

.desk.is-dark .desk__lang {
  background: #2a3544;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 8px 16px rgba(0, 0, 0, 0.28);
}

.desk.is-dark .desk__lang > span:not(.desk__tip) {
  color: #c5d0dc;
}

.desk.is-dark .desk__lang > span.is-on {
  background: #f7f4ee;
  color: #1c2430;
}

.desk.is-dark .desk__lang .desk__tip::before {
  border-right-color: transparent;
  border-left-color: #f7f4ee;
}

.desk__view {
  position: absolute;
  z-index: 0;
  right: -2rem;
  bottom: 14rem;
  width: 336px;
  height: 204px;
  padding: 0;
  border: 7px solid #f4efe6;
  border-radius: 3px;
  background: #d5e4f0;
  box-shadow:
    inset 0 0 0 2px #c9bba6,
    0 8px 16px rgba(20, 40, 60, 0.14);
  cursor: pointer;
  overflow: hidden;
}

.desk__pane {
  position: absolute;
  inset: 0;
  background: url('/landscape.jpg') left center / 200% 100% no-repeat;
}

.desk.is-dark .desk__pane {
  background-position: right center;
}

.desk__blind {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  transition: height 650ms ease;
}

.desk__view.is-open .desk__blind {
  height: 0;
}

.desk__view:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .desk__blind {
    transition: none;
  }
}

.desk__bubble {
  position: absolute;
  z-index: 6;
  left: 86px;
  top: -28px;
  width: 168px;
  height: 74px;
  margin: 0;
  color: #1c2430;
  opacity: 0;
  pointer-events: none;
  filter: drop-shadow(0 6px 8px rgba(20, 40, 60, 0.16));
  transform: translate(-100%, 0) scale(0.92);
  transition:
    opacity 180ms ease,
    transform 220ms ease;
}

.desk__bubble.is-on {
  opacity: 1;
  transform: translate(-100%, 0) scale(1);
}

.desk__cloud,
.desk__cloud i,
.desk__puff {
  position: absolute;
  border-radius: 50%;
  background: #fff;
}

.desk__cloud {
  inset: 0;
  background: none;
}

.desk__cloud i:nth-child(1) {
  width: 48px;
  height: 48px;
  left: 0;
  top: 24px;
}

.desk__cloud i:nth-child(2) {
  width: 58px;
  height: 58px;
  left: 24px;
  top: 2px;
}

.desk__cloud i:nth-child(3) {
  width: 64px;
  height: 64px;
  left: 56px;
  top: 0;
}

.desk__cloud i:nth-child(4) {
  width: 54px;
  height: 54px;
  left: 108px;
  top: 8px;
}

.desk__cloud i:nth-child(5) {
  width: 46px;
  height: 46px;
  left: 16px;
  top: 28px;
}

.desk__cloud i:nth-child(6) {
  width: 52px;
  height: 52px;
  left: 76px;
  top: 22px;
}

.desk__words {
  position: absolute;
  z-index: 1;
  left: 12px;
  right: 14px;
  top: 18px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.12rem 0.35rem;
}

.desk__puff--a {
  width: 16px;
  height: 16px;
  right: -8px;
  bottom: 2px;
}

.desk__puff--b {
  width: 8px;
  height: 8px;
  right: -22px;
  bottom: -14px;
}

.desk__word {
  font-family: Nunito, sans-serif;
  font-size: 0.68rem;
  font-weight: 800;
  line-height: 1.1;
  animation: drift 1.6s ease-in-out infinite;
}

.desk__word:nth-child(2) {
  animation-delay: 160ms;
}

.desk__word:nth-child(3) {
  animation-delay: 320ms;
}

@media (prefers-reduced-motion: reduce) {
  .desk__word {
    animation: none;
  }
}

.desk__switch:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 3px;
}

.desk__lever {
  position: absolute;
  left: 11px;
  top: 22px;
  width: 12px;
  height: 14px;
  border-radius: 3px;
  background: #2a3542;
  transition: transform 160ms ease;
}

.desk.is-dark {
  background:
    radial-gradient(ellipse 36% 32% at 18% 62%, rgba(255, 176, 80, 0.16), transparent 62%),
    radial-gradient(ellipse 30% 34% at 84% 70%, rgba(255, 176, 80, 0.14), transparent 64%),
    linear-gradient(180deg, #10161f 0%, #1a2433 52%, #243044 100%);
}

.desk.is-dark .desk__name {
  color: #d5e6f2;
  text-shadow: none;
}

.desk.is-dark .blob,
.desk.is-dark .dots {
  opacity: 0.12;
}

.desk.is-dark .desk__lever {
  transform: translateY(16px);
}

.desk__monitor {
  position: relative;
  z-index: 2;
}

.desk__monitor--quiet :deep(.desk-window) {
  visibility: hidden;
}

.desk__board {
  margin-top: -6px;
  z-index: 1;
}

.desk__character {
  position: relative;
  z-index: 3;
  margin-top: -10.5rem;
}

.desk__character.is-seated {
  animation: bob 3.2s ease-in-out infinite;
}

.desk__character.is-reaching {
  z-index: 5;
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

@keyframes stage-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
  }
}

@keyframes bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

@keyframes drift {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@media (max-width: 700px) {
  .desk__character {
    margin-top: -6rem;
  }
}
</style>
