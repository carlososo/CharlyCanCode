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

      <!-- Base / pedestal -->
      <ellipse cx="140" cy="296" rx="48" ry="9" fill="#1a2a36" opacity="0.25" />
      <rect x="132" y="248" width="16" height="46" rx="6" fill="#3a4d5c" />
      <ellipse cx="140" cy="296" rx="20" ry="6" fill="#2a3a48" />

      <g :transform="`rotate(${sway} 140 220)`">
        <!-- Seat only — sin apoyabrazos ni barras laterales -->
        <ellipse cx="140" cy="228" rx="46" ry="22" fill="#1e6f9f" />
        <ellipse cx="140" cy="222" rx="38" ry="14" fill="#176088" />

        <!-- Respaldo alto gamer -->
        <path
          d="M104 118 C100 160 102 198 110 220 L170 220 C178 198 180 160 176 118 C158 108 122 108 104 118 Z"
          fill="#2584bc"
        />
        <path
          d="M112 122 C110 158 112 188 118 210 L162 210 C168 188 170 158 168 122 C154 114 126 114 112 122 Z"
          fill="#1a5f8a"
        />
        <!-- Headrest -->
        <rect x="108" y="86" width="64" height="30" rx="13" fill="#1e6f9f" />
        <rect x="116" y="93" width="48" height="16" rx="8" fill="#ff7a59" />

        <!-- Cuerpo de espaldas, hombros pegados al torso -->
        <ellipse cx="140" cy="196" rx="34" ry="40" fill="#3d2918" />
        <path
          d="M112 170 C116 204 122 226 140 232 C158 226 164 204 168 170 C152 178 128 178 112 170 Z"
          fill="#4a3220"
        />
        <path
          d="M126 166 Q140 178 154 166"
          stroke="#6b4a30"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
        />

        <!-- Cabeza + cabello (tracking); pelo asentado sobre el cráneo -->
        <g
          class="monito__head"
          :style="{
            transform: `translate(${rotateY * 1.15}px, ${rotateX * 0.9}px) rotate(${rotateY * 0.4}deg)`,
          }"
        >
          <rect x="129" y="134" width="22" height="18" rx="7" fill="#e8b48a" />
          <ellipse cx="140" cy="116" rx="32" ry="34" fill="#f0c4a0" />
          <ellipse cx="110" cy="118" rx="6" ry="9" fill="#e8b48a" />
          <ellipse cx="170" cy="118" rx="6" ry="9" fill="#e8b48a" />

          <!-- Masa de pelo cubriendo la mitad superior de la cabeza -->
          <path
            class="monito__hair"
            d="M110 122
               C108 96 120 80 140 78
               C160 80 172 96 170 122
               C164 108 152 102 140 102
               C128 102 116 108 110 122 Z"
            fill="#2a1a12"
          />
          <path
            d="M116 118 C120 98 130 90 140 88 C150 90 160 98 164 118
               C156 108 148 104 140 104 C132 104 124 108 116 118 Z"
            fill="#3d2918"
          />
          <!-- Mechón bajo, dentro del contorno del cráneo -->
          <path
            d="M134 86 C138 76 144 76 148 86 C144 82 138 82 134 86 Z"
            fill="#1a100c"
          />
          <path
            d="M148 85 C152 74 160 78 162 88 C158 82 152 82 148 85 Z"
            fill="#1a100c"
            opacity="0.9"
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
  filter: drop-shadow(0 18px 18px rgba(20, 50, 70, 0.18));
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
