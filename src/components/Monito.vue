<script setup lang="ts">
import { ref } from 'vue'
import { useHeadTracking } from '@/composables/useHeadTracking'

const props = withDefaults(defineProps<{ nx?: number; ny?: number }>(), { nx: 0, ny: 0 })

const root = ref<HTMLElement | null>(null)
const { rotateY, sway } = useHeadTracking(root)
</script>

<template>
  <div ref="root" class="monito" aria-hidden="true">
    <svg viewBox="36 8 132 206" role="img" class="monito__svg">
      <title>Carlos de espaldas en silla gamer</title>

      <g>
        <path d="M75 195 L125 195" stroke="#222" stroke-width="4" stroke-linecap="round" />
        <circle cx="75" cy="198" r="3" fill="#111" />
        <circle cx="100" cy="198" r="3" fill="#111" />
        <circle cx="125" cy="198" r="3" fill="#111" />
        <line x1="100" y1="160" x2="100" y2="195" stroke="#333" stroke-width="6" />

        <rect x="73" y="160" width="12" height="35" fill="#1E90FF" rx="2" />
        <path d="M73 195 L63 202 L73 202 Z" fill="#ffffff" />
        <rect x="67" y="200" width="18" height="3" fill="#6eb4df" />

        <rect x="115" y="160" width="12" height="35" fill="#1E90FF" rx="2" />
        <path d="M127 195 L137 202 L127 202 Z" fill="#ffffff" />
        <rect x="115" y="200" width="18" height="3" fill="#6eb4df" />

        <rect x="65" y="150" width="70" height="12" fill="#111" rx="4" />
        <rect x="70" y="152" width="60" height="4" fill="#6eb4df" rx="1" />

        <!-- Nuca: queda detrás del respaldo -->
        <rect x="94" y="55" width="12" height="15" fill="#e8b48a" rx="2" />

        <path
          d="M75 60 L63 85 L66 120 L65 150 L135 150 L134 120 L137 85 L125 60 Z"
          fill="#222"
        />

        <path
          d="M76 65 L67 85 L70 120"
          stroke="#6eb4df"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
        />
        <path
          d="M124 65 L133 85 L130 120"
          stroke="#6eb4df"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
        />
        <rect x="82" y="65" width="36" height="12" fill="#111" rx="3" />
        <rect x="85" y="67" width="30" height="3" fill="#6eb4df" rx="1" />

        <rect x="83" y="82" width="11" height="7" fill="#1E90FF" rx="2" />
        <rect x="106" y="82" width="11" height="7" fill="#1E90FF" rx="2" />

        <rect x="46" y="125" width="14" height="6" fill="#111" rx="1" />
        <line x1="53" y1="131" x2="53" y2="150" stroke="#333" stroke-width="4" />
        <rect x="140" y="125" width="14" height="6" fill="#111" rx="1" />
        <line x1="147" y1="131" x2="147" y2="150" stroke="#333" stroke-width="4" />

        <g class="monito__arm">
          <rect x="48" y="95" width="19" height="12" fill="#1E90FF" rx="2" />
          <rect x="48" y="105" width="10" height="20" fill="#1E90FF" rx="2" />
          <circle cx="53" cy="105" r="5" fill="#1E90FF" />
          <rect x="48" y="122" width="10" height="5" fill="#f0c4a0" rx="1" />
        </g>

        <!-- Mano derecha: el mouse es la mano; solo el antebrazo se inclina -->
        <g class="monito__arm">
          <rect x="133" y="95" width="22" height="12" rx="4" fill="#1E90FF" />
          <circle cx="154" cy="101" r="5.5" fill="#1E90FF" />
          <g
            :transform="`translate(${(props.nx * 9).toFixed(2)} ${(props.ny * 4).toFixed(2)}) translate(142.8 58) scale(0.34)`"
          >
            <ellipse cx="32" cy="42" rx="18" ry="28" fill="#3a4552" />
            <ellipse cx="32" cy="42" rx="14" ry="24" fill="#4a5564" />
            <rect x="28" y="22" width="8" height="14" rx="3" fill="#2a3340" />
            <ellipse cx="32" cy="28" rx="3" ry="4" fill="#6a7a8c" />
          </g>
          <rect
            x="148"
            y="76"
            width="12"
            height="28"
            rx="5"
            fill="#1E90FF"
            :transform="`translate(154 104) skewX(${(-props.nx * 16).toFixed(2)}) translate(-154 -104)`"
          />
        </g>

        <g
          class="monito__head"
          :style="{
            transform: `rotate(${(rotateY * 0.85 + sway).toFixed(2)}deg)`,
          }"
        >
          <circle cx="100" cy="42" r="14" fill="#f0c4a0" />
          <circle cx="85" cy="44" r="2.5" fill="#e8b48a" />
          <circle cx="115" cy="44" r="2.5" fill="#e8b48a" />
          <path
            d="M85 42
               C82 25 90 20 100 20
               C110 20 118 25 115 42
               C115 48 112 50 108 50
               C100 46 100 52 92 50
               C88 50 85 48 85 42 Z"
            fill="#4A3728"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.monito {
  width: min(32vw, 260px);
  max-width: 280px;
  pointer-events: none;
  filter: drop-shadow(0 12px 14px rgba(20, 50, 70, 0.18));
}

.monito__svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.monito__head,
.monito__arm {
  will-change: transform;
}

.monito__head {
  transform-box: fill-box;
  transform-origin: 50% 100%;
}

@media (max-width: 700px) {
  .monito {
    width: min(44vw, 190px);
  }
}
</style>
