<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'

const props = withDefaults(defineProps<{ demo?: boolean }>(), { demo: false })
const emit = defineEmits<{ active: [inside: boolean] }>()

const screen = ref<HTMLElement | null>(null)
const { t } = useI18n()
defineExpose({ screen })

let ctx: gsap.Context | null = null
const typeTimers = new Set<number>()

function stopTyping() {
  for (const id of typeTimers) window.clearTimeout(id)
  typeTimers.clear()
}

function typeScene(node: HTMLElement) {
  const gen = String(Number(node.dataset.typeGen ?? '0') + 1)
  node.dataset.typeGen = gen
  const lines = [...node.querySelectorAll<HTMLElement>('.typed')]
  const full = lines.map((el) => {
    el.textContent = ''
    return el.dataset.text ?? ''
  })
  let line = 0
  let col = 0
  const tick = () => {
    if (node.dataset.typeGen !== gen) return
    const el = lines[line]
    const text = full[line]
    if (!el || text == null) return
    col += 1
    el.textContent = text.slice(0, col)
    if (col < text.length) {
      typeTimers.add(window.setTimeout(tick, 32))
      return
    }
    line += 1
    col = 0
    if (line < lines.length) typeTimers.add(window.setTimeout(tick, 140))
  }
  typeTimers.add(window.setTimeout(tick, 80))
}

function clearDock() {
  screen.value?.querySelectorAll('.monitor__app.is-open').forEach((el) => el.classList.remove('is-open'))
}

function stopDemo() {
  stopTyping()
  clearDock()
  ctx?.revert()
  ctx = null
}

function release() {
  stopDemo()
  const nodes = screen.value?.querySelectorAll('.desk-window')
  if (nodes?.length) gsap.set(nodes, { clearProps: 'opacity,transform' })
}

function playDemo() {
  const root = screen.value
  if (!root) return
  if (root.matches(':hover')) {
    emit('active', true)
    return
  }
  stopDemo()
  const nodes = [...root.querySelectorAll<HTMLElement>('.desk-window--scene')]
  const kinds = nodes.map((node) => node.querySelector('.scene')?.className ?? '')
  const slots = [
    { left: '1.5%', width: '47.5%' },
    { left: '51%', width: '47.5%' },
  ]
  function clashes(a: number, b: number) {
    const names = [kinds[a] ?? '', kinds[b] ?? '']
    return names.some((name) => name.includes('netflix')) && names.some((name) => name.includes('youtube'))
  }

  function mark(node: HTMLElement | undefined, open: boolean) {
    if (!node) return
    root?.querySelector(`.monitor__app[data-dock="${node.dataset.dock}"]`)?.classList.toggle('is-open', open)
  }

  function dockOrigin(node: HTMLElement) {
    const icon = root?.querySelector(`.monitor__app[data-dock="${node.dataset.dock}"]`)
    const box = node.getBoundingClientRect()
    const iconBox = icon?.getBoundingClientRect()
    if (!iconBox || !box.width || !box.height) return '50% 130%'
    const x = ((iconBox.left + iconBox.width / 2 - box.left) / box.width) * 100
    const y = ((iconBox.top + iconBox.height / 2 - box.top) / box.height) * 100
    return `${x.toFixed(1)}% ${y.toFixed(1)}%`
  }

  const filled = [-1, -1]

  function place(index: number, slot: number) {
    const node = nodes[index]
    const spot = slots[slot]
    if (!node || !spot) return
    gsap.set(node, { left: spot.left, width: spot.width, scale: 1, opacity: 1 })
    gsap.set(node, { transformOrigin: dockOrigin(node), scale: 0.08 })
    mark(node, true)
    filled[slot] = index
    if (node.querySelector('.typed')) typeScene(node)
  }

  function pickOther(stay: number, leaving: number) {
    const options: number[] = []
    for (let i = 0; i < nodes.length; i++) {
      if (i === stay || i === leaving) continue
      if (stay >= 0 && clashes(i, stay)) continue
      options.push(i)
    }
    return options[Math.floor(Math.random() * options.length)] ?? leaving
  }

  function pickStart() {
    for (let attempt = 0; attempt < 16; attempt++) {
      const a = Math.floor(Math.random() * nodes.length)
      let b = Math.floor(Math.random() * (nodes.length - 1))
      if (b >= a) b += 1
      if (!clashes(a, b)) return [a, b] as const
    }
    return [0, 2] as const
  }

  function swapOne() {
    const scope = ctx
    if (!scope) return
    scope.add(() => {
      const slot = Math.random() < 0.5 ? 0 : 1
      const stay = filled[slot === 0 ? 1 : 0] ?? -1
      const leaving = filled[slot] ?? -1
      const next = pickOther(stay, leaving)
      const outgoing = nodes[leaving]
      const tl = gsap.timeline()
      if (outgoing) {
        tl.to(outgoing, { scale: 0.08, duration: 0.35, ease: 'power2.in' })
        tl.set(outgoing, { opacity: 0 })
        tl.add(() => mark(outgoing, false))
      }
      tl.add(() => place(next, slot))
      const incoming = nodes[next]
      if (incoming) tl.to(incoming, { scale: 1, duration: 0.45, ease: 'power2.out' })
      tl.add(swapOne, '+=4')
    })
  }

  ctx = gsap.context(() => {
    gsap.set(nodes, { opacity: 0, scale: 0.08, transformOrigin: '50% 130%' })
  }, root)
  const [first, second] = pickStart()
  ctx.add(() => {
    place(first, 0)
    const tl = gsap.timeline()
    const opener = nodes[first]
    const follower = nodes[second]
    if (opener) tl.to(opener, { scale: 1, duration: 0.45, ease: 'power2.out' })
    tl.add(() => place(second, 1))
    if (follower) tl.to(follower, { scale: 1, duration: 0.45, ease: 'power2.out' })
    tl.add(swapOne, '+=4')
  })
}

function setInside(inside: boolean) {
  emit('active', inside)
}

watch(
  () => props.demo,
  (on) => {
    if (on) playDemo()
    else release()
  },
  { flush: 'post' },
)

onUnmounted(stopDemo)

const windows = computed(() => [
  {
    to: '/terminal',
    title: t('about'),
    subtitle: 'Terminal',
    x: '4%',
    y: '8%',
    w: '28%',
    h: '52%',
    vt: 'win-terminal',
    tint: '#300a24',
    accent: '#8ae234',
    dark: true,
    chat: false,
  },
  {
    to: '/explorer',
    title: t('projects'),
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
    title: t('contact'),
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
    title: t('tips'),
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
])

const scenes = [
  { kind: 'netflix', title: 'Nesflits', tint: '#141414', accent: '#e50914' },
  { kind: 'youtube', title: 'Touyube', tint: '#0f0f0f', accent: '#ff2a2a' },
  { kind: 'code', title: 'Pointer', tint: '#1e1e1e', accent: '#569cd6' },
  { kind: 'term', title: 'Terminal', tint: '#300a24', accent: '#8ae234' },
] as const
</script>

<template>
  <div
    class="monitor"
    :class="{ 'is-demo': demo }"
    role="region"
    aria-label="Monitor ultrawide con ventanas"
  >
    <div class="monitor__bezel">
      <div
        ref="screen"
        class="monitor__screen"
        @pointerenter="setInside(true)"
        @pointerleave="setInside(false)"
      >
        <div class="monitor__wallpaper" />
        <div class="monitor__taskbar" aria-hidden="true">
          <span v-show="!demo" class="monitor__dot" />
          <span v-show="!demo" class="monitor__dot" />
          <span v-show="demo" class="monitor__dock">
            <i
              v-for="scene in scenes"
              :key="scene.kind"
              class="monitor__app"
              :data-dock="scene.kind"
              :style="{ background: scene.accent }"
            />
          </span>
          <span class="monitor__clock">escritorio · 4 apps</span>
        </div>

        <div
          v-for="scene in scenes"
          :key="scene.kind"
          class="desk-window desk-window--scene desk-window--dark"
          :data-dock="scene.kind"
          aria-hidden="true"
          :style="{
            '--win-tint': scene.tint,
            '--win-accent': scene.accent,
          }"
        >
          <span class="desk-window__bar">
            <span class="desk-window__traffic" aria-hidden="true"><i /><i /><i /></span>
            <span class="desk-window__title">{{ scene.title }}</span>
          </span>
          <span class="scene" :class="'scene--' + scene.kind">
            <template v-if="scene.kind === 'netflix'">
              <span class="scene__posters"><i /><i /><i /><i /></span>
            </template>
            <template v-else-if="scene.kind === 'youtube'">
              <span class="scene__player"><i /></span>
            </template>
            <template v-else-if="scene.kind === 'code'">
              <span class="typed scene__code scene__code--key" data-text="const pointer = true" />
              <span class="typed scene__code" data-text="function sit() {" />
              <span class="typed scene__code scene__code--str" data-text="  return 'desk'" />
              <span class="typed scene__code" data-text="}" />
            </template>
            <template v-else>
              <span class="typed" data-text="charly@desk:~$ ls" />
              <span class="typed" data-text="projects/" />
              <span class="typed" data-text="charly@desk:~$ " />
            </template>
          </span>
        </div>

        <RouterLink
          v-for="win in windows"
          :key="win.to"
          :to="win.to"
          class="desk-window"
          :inert="demo"
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
                <span class="desk-window__title">{{ win.title }}</span>
                <span class="chat__status">Charly</span>
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
  background: #1a1d22;
  box-shadow: inset 0 0 0 2px rgba(10, 30, 50, 0.25);
}

.monitor__wallpaper {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #22262c 0%, #1a1d22 55%);
}

.monitor__wallpaper::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 1px 1px, rgba(183, 192, 204, 0.08) 1px, transparent 0);
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
  background: #121418;
  color: #c5ced6;
  font-size: 0.72rem;
  z-index: 2;
}

.monitor__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #b7c0cc;
}

.monitor__dock {
  display: none;
  align-items: center;
  gap: 6px;
}

.is-demo .monitor__dock {
  display: flex;
}

.monitor__app {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  opacity: 0.4;
}

.monitor__app.is-open {
  opacity: 1;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.45);
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

.desk-window.desk-window--scene {
  display: none;
  top: 8px;
  height: calc(100% - 38px);
  pointer-events: none;
}

.is-demo .desk-window.desk-window--scene {
  display: flex;
}

.is-demo .desk-window {
  opacity: 0;
  pointer-events: none;
  transition: none;
}

.scene {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  min-height: 0;
  padding: 8px 10px 10px;
  font-family: ui-monospace, monospace;
  font-size: 0.62rem;
  font-weight: 700;
}

.scene--netflix {
  justify-content: flex-end;
}

.scene__posters {
  display: flex;
  gap: 6px;
  height: 58%;
}

.scene__posters i {
  flex: 1;
  border-radius: 4px;
  background: #3a1218;
}

.scene__posters i:nth-child(2) {
  background: #5c1a24;
}

.scene__posters i:nth-child(3) {
  background: #2a2a2a;
}

.scene__posters i:nth-child(4) {
  background: #7a2030;
}

.scene__player {
  display: grid;
  place-items: center;
  height: 70%;
  border-radius: 6px;
  background: #1a1a1a;
}

.scene__player i {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 0 8px 14px;
  border-color: transparent transparent transparent var(--win-accent);
}

.scene--code {
  gap: 5px;
  justify-content: flex-start;
  padding-top: 10px;
}

.typed {
  display: block;
  min-height: 1.2em;
  white-space: pre;
}

.scene__code {
  color: #d4d4d4;
}

.scene__code--key {
  color: #c586c0;
}

.scene__code--str {
  color: #ce9178;
}

.scene--term {
  color: var(--win-accent);
  justify-content: flex-start;
  line-height: 1.35;
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
  background: color-mix(in srgb, white 10%, var(--win-tint));
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
  font-family: Poppins, sans-serif;
  font-size: clamp(0.75rem, 1.3vw, 1rem);
  font-weight: 500;
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
  background: color-mix(in srgb, var(--win-accent) 28%, var(--win-tint));
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
