<script setup lang="ts">
import { ref } from 'vue'
import { useHeadTracking } from '@/composables/useHeadTracking'

const root = ref<HTMLElement | null>(null)
const { rotateY, rotateX, sway } = useHeadTracking(root)
</script>

<template>
  <div ref="root" class="monito" aria-hidden="true">
    <svg viewBox="0 0 280 320" role="img" class="monito__svg">
      <title>Monito de espaldas en silla gamer</title>

      <ellipse cx="140" cy="304" rx="28" ry="6" fill="#1a2a36" opacity="0.2" />
      <rect x="135" y="252" width="10" height="52" rx="4" fill="#3a4d5c" />
      <ellipse cx="140" cy="304" rx="13" ry="4" fill="#2a3a48" />

      <g :transform="`rotate(${sway} 140 220)`">
        <!--
          Silla (detrás del cuerpo): headrest + respaldo cápsula + asiento óvalo.
          Anchos: headrest ≈ respaldo; asiento ≤ torso → sin lóbulos laterales.
        -->
        <!-- Respaldo estrecho; el torso lo tapa a los lados -->
        <rect x="130" y="100" width="20" height="108" rx="10" fill="#2584bc" />
        <rect x="134" y="108" width="12" height="92" rx="6" fill="#1a5f8a" />
        <rect x="122" y="88" width="36" height="24" rx="10" fill="#1e6f9f" />
        <rect x="126" y="93" width="28" height="12" rx="6" fill="#ff7a59" />

        <!-- Asiento ≤ torso (no sobresale a los lados) -->
        <ellipse cx="140" cy="248" rx="14" ry="7" fill="#1e6f9f" />

        <!-- Torso alto: cubre flancos del respaldo y empalma con el pelo -->
        <ellipse cx="140" cy="188" rx="28" ry="44" fill="#3d2918" />
        <ellipse cx="140" cy="198" rx="20" ry="28" fill="#4a3220" />

        <!-- Masa única de pelo que llega al torso; orejas a media altura -->
        <g
          class="monito__head"
          :style="{
            transform: `translate(${rotateY * 1.1}px, ${rotateX * 0.85}px) rotate(${rotateY * 0.35}deg)`,
          }"
        >
          <ellipse class="monito__hair" cx="140" cy="130" rx="32" ry="46" fill="#2a1a12" />
          <ellipse cx="110" cy="130" rx="5" ry="8" fill="#e8b48a" />
          <ellipse cx="170" cy="130" rx="5" ry="8" fill="#e8b48a" />
          <path
            d="M132 94 C137 86 145 86 150 94 C145 90 137 90 132 94 Z"
            fill="#1a100c"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.monito {
  width: min(34vw, 280px);
  max-width: 300px;
  pointer-events: none;
  filter: drop-shadow(0 14px 14px rgba(20, 50, 70, 0.16));
}

.monito__svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.monito__head {
  transform-box: fill-box;
  transform-origin: 50% 70%;
  transition: none;
  will-change: transform;
}

@media (max-width: 700px) {
  .monito {
    width: min(46vw, 200px);
  }
}
</style>
