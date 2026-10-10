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
          Orden de pintura: silla primero, torso encima.
          Respaldo más ESTRECHO que el torso → no asoman lóbulos azules
          a los lados. Asiento solo DEBAJO del torso, óvalo simple.
        -->
        <!-- Respaldo estrecho (visible sobre los hombros, tapado al centro) -->
        <rect x="128" y="118" width="24" height="90" rx="12" fill="#2584bc" />
        <rect x="132" y="124" width="16" height="78" rx="8" fill="#1a5f8a" />

        <!-- Headrest = mismo ancho que el respaldo -->
        <rect x="124" y="96" width="32" height="24" rx="10" fill="#1e6f9f" />
        <rect x="128" y="101" width="24" height="12" rx="6" fill="#ff7a59" />

        <!-- Asiento: óvalo simple DEBAJO del torso, sin orejas laterales -->
        <ellipse cx="140" cy="242" rx="22" ry="11" fill="#1e6f9f" />
        <ellipse cx="140" cy="240" rx="16" ry="7" fill="#176088" />

        <!-- Torso más ancho que el respaldo (cubre cualquier azul lateral) -->
        <ellipse cx="140" cy="198" rx="26" ry="34" fill="#3d2918" />
        <path
          d="M118 172 C122 200 128 220 140 228 C152 220 158 200 162 172 C148 180 132 180 118 172 Z"
          fill="#4a3220"
        />
        <path
          d="M128 168 Q140 176 152 168"
          stroke="#6b4a30"
          stroke-width="2.5"
          fill="none"
          stroke-linecap="round"
        />

        <g
          class="monito__head"
          :style="{
            transform: `translate(${rotateY * 1.1}px, ${rotateX * 0.85}px) rotate(${rotateY * 0.35}deg)`,
          }"
        >
          <rect x="133" y="150" width="14" height="16" rx="4" fill="#e8b48a" />
          <ellipse class="monito__hair" cx="140" cy="128" rx="32" ry="40" fill="#2a1a12" />
          <ellipse cx="140" cy="130" rx="24" ry="30" fill="#3d2918" />
          <ellipse cx="110" cy="128" rx="5" ry="8" fill="#e8b48a" />
          <ellipse cx="170" cy="128" rx="5" ry="8" fill="#e8b48a" />
          <path
            d="M133 94 C137 85 145 85 149 94 C145 89 137 89 133 94 Z"
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
