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

        <!-- Asiento óvalo simple bajo el cuerpo -->
        <ellipse cx="140" cy="246" rx="17" ry="8" fill="#1e6f9f" />

        <!-- Torso alto: cubre flancos del respaldo (sin lóbulos azules) -->
        <ellipse cx="140" cy="192" rx="28" ry="40" fill="#3d2918" />
        <ellipse cx="140" cy="200" rx="20" ry="26" fill="#4a3220" />

        <!-- Una sola masa de pelo (un fill); orejas a media altura -->
        <g
          class="monito__head"
          :style="{
            transform: `translate(${rotateY * 1.1}px, ${rotateX * 0.85}px) rotate(${rotateY * 0.35}deg)`,
          }"
        >
          <rect x="133" y="152" width="14" height="14" rx="4" fill="#e8b48a" />
          <ellipse class="monito__hair" cx="140" cy="126" rx="33" ry="42" fill="#2a1a12" />
          <ellipse cx="109" cy="128" rx="5" ry="8" fill="#e8b48a" />
          <ellipse cx="171" cy="128" rx="5" ry="8" fill="#e8b48a" />
          <path
            d="M132 92 C137 84 145 84 150 92 C145 88 137 88 132 92 Z"
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
