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
        <!-- Asiento compacto — sin apoyabrazos -->
        <ellipse cx="140" cy="232" rx="36" ry="18" fill="#1e6f9f" />
        <ellipse cx="140" cy="228" rx="28" ry="11" fill="#176088" />

        <!-- Respaldo alto gamer -->
        <path
          d="M108 124 C104 164 106 200 114 222 L166 222 C174 200 176 164 172 124 C156 114 124 114 108 124 Z"
          fill="#2584bc"
        />
        <path
          d="M116 128 C114 162 116 190 122 212 L158 212 C164 190 166 162 164 128 C150 120 130 120 116 128 Z"
          fill="#1a5f8a"
        />
        <!-- Headrest -->
        <rect x="110" y="92" width="60" height="28" rx="12" fill="#1e6f9f" />
        <rect x="118" y="98" width="44" height="15" rx="7" fill="#ff7a59" />

        <!-- Cuerpo de espaldas -->
        <ellipse cx="140" cy="200" rx="32" ry="38" fill="#3d2918" />
        <path
          d="M114 174 C118 206 124 228 140 234 C156 228 162 206 166 174 C150 182 130 182 114 174 Z"
          fill="#4a3220"
        />
        <path
          d="M128 170 Q140 182 152 170"
          stroke="#6b4a30"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
        />

        <!-- Cabeza + cabello: pelo envuelve el cráneo (vista de espalda) -->
        <g
          class="monito__head"
          :style="{
            transform: `translate(${rotateY * 1.15}px, ${rotateX * 0.9}px) rotate(${rotateY * 0.4}deg)`,
          }"
        >
          <rect x="130" y="138" width="20" height="16" rx="6" fill="#e8b48a" />
          <ellipse cx="140" cy="120" rx="30" ry="32" fill="#f0c4a0" />
          <!-- Pelo cubre casi todo el occipucio; piel solo en cuello/orejas -->
          <path
            class="monito__hair"
            d="M112 136
               C108 108 118 90 140 88
               C162 90 172 108 168 136
               C160 148 150 152 140 152
               C130 152 120 148 112 136 Z"
            fill="#2a1a12"
          />
          <path
            d="M118 132 C116 108 126 96 140 94 C154 96 164 108 162 132
               C154 142 147 146 140 146 C133 146 126 142 118 132 Z"
            fill="#3d2918"
          />
          <ellipse cx="112" cy="124" rx="5" ry="8" fill="#e8b48a" />
          <ellipse cx="168" cy="124" rx="5" ry="8" fill="#e8b48a" />
          <path
            d="M134 98 C138 90 144 90 148 98 C144 94 138 94 134 98 Z"
            fill="#1a100c"
          />
          <path
            d="M147 97 C151 88 158 91 160 100 C156 95 151 95 147 97 Z"
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
