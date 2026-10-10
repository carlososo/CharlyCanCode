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

      <!-- Sombra + pedestal central (sin barras laterales) -->
      <ellipse cx="140" cy="298" rx="40" ry="8" fill="#1a2a36" opacity="0.22" />
      <rect x="133" y="250" width="14" height="48" rx="5" fill="#3a4d5c" />
      <ellipse cx="140" cy="298" rx="18" ry="5" fill="#2a3a48" />

      <g :transform="`rotate(${sway} 140 220)`">
        <!--
          Silla gamer: SOLO asiento + respaldo + headrest + pedestal.
          Prohibido: apoyabrazos, handles, barras horizontales laterales.
        -->
        <ellipse cx="140" cy="236" rx="34" ry="16" fill="#1e6f9f" />
        <ellipse cx="140" cy="232" rx="26" ry="10" fill="#176088" />

        <path
          d="M110 128 C106 168 108 204 116 226 L164 226 C172 204 174 168 170 128 C154 118 126 118 110 128 Z"
          fill="#2584bc"
        />
        <path
          d="M118 132 C116 166 118 196 124 218 L156 218 C162 196 164 166 162 132 C148 124 132 124 118 132 Z"
          fill="#1a5f8a"
        />
        <rect x="112" y="96" width="56" height="26" rx="11" fill="#1e6f9f" />
        <rect x="120" y="102" width="40" height="14" rx="7" fill="#ff7a59" />

        <!-- Torso -->
        <ellipse cx="140" cy="204" rx="30" ry="36" fill="#3d2918" />
        <path
          d="M116 178 C120 208 126 228 140 234 C154 228 160 208 164 178 C148 186 132 186 116 178 Z"
          fill="#4a3220"
        />
        <path
          d="M128 174 Q140 184 152 174"
          stroke="#6b4a30"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
        />

        <!--
          Cabeza de espaldas: pelo = occipucio continuo hasta el hoodie.
          Sin anillo de piel entre pelo y cuello/hombros.
        -->
        <g
          class="monito__head"
          :style="{
            transform: `translate(${rotateY * 1.15}px, ${rotateX * 0.9}px) rotate(${rotateY * 0.4}deg)`,
          }"
        >
          <!-- Cuello primero (queda bajo el pelo; sin anillo visible) -->
          <rect x="132" y="160" width="16" height="22" rx="5" fill="#e8b48a" />
          <!-- Occipucio continuo en pelo hasta empalmar con el hoodie -->
          <ellipse cx="140" cy="130" rx="36" ry="44" fill="#2a1a12" />
          <path
            class="monito__hair"
            d="M106 150
               C100 114 116 88 140 86
               C164 88 180 114 174 150
               C168 172 156 184 140 186
               C124 184 112 172 106 150 Z"
            fill="#2a1a12"
          />
          <path
            d="M114 148 C110 118 124 98 140 96 C156 98 170 118 166 148
               C160 166 152 176 140 178 C128 176 120 166 114 148 Z"
            fill="#3d2918"
          />
          <ellipse cx="106" cy="134" rx="6" ry="9" fill="#e8b48a" />
          <ellipse cx="174" cy="134" rx="6" ry="9" fill="#e8b48a" />
          <path
            d="M132 98 C136 88 144 88 148 98 C144 93 136 93 132 98 Z"
            fill="#1a100c"
          />
          <path
            d="M148 96 C153 86 162 90 164 100 C160 94 153 93 148 96 Z"
            fill="#1a100c"
            opacity="0.92"
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
