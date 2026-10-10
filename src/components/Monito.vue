<script setup lang="ts">
import { ref } from 'vue'
import { useHeadTracking } from '@/composables/useHeadTracking'

const root = ref<HTMLElement | null>(null)
const { rotateY, rotateX, sway } = useHeadTracking(root)
</script>

<template>
  <div ref="root" class="monito" aria-hidden="true">
    <svg viewBox="0 0 280 340" role="img" class="monito__svg">
      <title>Carlos de espaldas en silla gamer, con manitas</title>

      <!-- Pedestal silla (estrecho; no confundir con stand del monitor) -->
      <ellipse cx="140" cy="318" rx="34" ry="7" fill="#1a2a36" opacity="0.22" />
      <rect x="134" y="268" width="12" height="50" rx="4" fill="#2f4050" />
      <ellipse cx="140" cy="318" rx="16" ry="5" fill="#243442" />

      <g :transform="`rotate(${sway} 140 210)`">
        <!-- Silla gamer: respaldo ALTO visible, sin apoyabrazos -->
        <ellipse cx="140" cy="255" rx="32" ry="12" fill="#1a6fa3" />
        <path
          d="M108 120
             C102 160 104 210 112 248
             L168 248
             C176 210 178 160 172 120
             C158 108 122 108 108 120 Z"
          fill="#2b8fc4"
        />
        <path
          d="M118 128
             C114 168 116 210 122 240
             L158 240
             C164 210 166 168 162 128
             C150 118 130 118 118 128 Z"
          fill="#1f6f9c"
        />
        <!-- Headrest gamer -->
        <rect x="112" y="88" width="56" height="32" rx="14" fill="#2b8fc4" />
        <rect x="120" y="96" width="40" height="16" rx="8" fill="#ff7a59" />
        <!-- Costuras / look gamer -->
        <path
          d="M140 130 L140 235"
          stroke="#165a82"
          stroke-width="2"
          stroke-dasharray="4 6"
          opacity="0.5"
        />

        <!-- Torso -->
        <ellipse cx="140" cy="210" rx="30" ry="36" fill="#3a2818" />
        <path
          d="M116 185 C120 215 128 238 140 244 C152 238 160 215 164 185 C150 194 130 194 116 185 Z"
          fill="#4a3422"
        />

        <!-- Manitas (desde atrás, apoyadas delante) -->
        <ellipse cx="98" cy="248" rx="14" ry="9" fill="#3a2818" />
        <ellipse cx="182" cy="248" rx="14" ry="9" fill="#3a2818" />
        <ellipse cx="92" cy="252" rx="10" ry="7" fill="#f0c4a0" />
        <ellipse cx="188" cy="252" rx="10" ry="7" fill="#f0c4a0" />
        <!-- Deditos sutiles -->
        <path
          d="M86 250 Q88 246 90 250 M90 252 Q92 247 94 252 M94 253 Q96 248 98 253"
          stroke="#e0b090"
          stroke-width="1.5"
          fill="none"
          stroke-linecap="round"
        />
        <path
          d="M182 250 Q184 246 186 250 M186 252 Q188 247 190 252 M190 253 Q192 248 194 253"
          stroke="#e0b090"
          stroke-width="1.5"
          fill="none"
          stroke-linecap="round"
        />

        <!-- Cabeza: pelo a media altura + nuca visible (mira al monitor) -->
        <g
          class="monito__head"
          :style="{
            transform: `translate(${rotateY * 1.1}px, ${rotateX * 0.8}px) rotate(${rotateY * 0.35}deg)`,
          }"
        >
          <!-- Nuca / piel (mitad inferior de la cabeza) -->
          <ellipse cx="140" cy="132" rx="30" ry="34" fill="#f0c4a0" />
          <!-- Pelo solo en la mitad superior (como visto de espaldas mirando al monitor) -->
          <path
            class="monito__hair"
            d="M112 128
               C108 96 120 78 140 76
               C160 78 172 96 168 128
               C160 118 150 114 140 114
               C130 114 120 118 112 128 Z"
            fill="#2a1a12"
          />
          <path
            d="M118 124 C116 102 128 88 140 86 C152 88 164 102 162 124
               C154 114 147 110 140 110 C133 110 126 114 118 124 Z"
            fill="#3d2918"
          />
          <!-- Mechón -->
          <path
            d="M132 84 C136 74 144 74 148 84 C144 79 136 79 132 84 Z"
            fill="#1a100c"
          />
          <!-- Orejas a la altura del pelo/nuca -->
          <ellipse cx="112" cy="130" rx="5" ry="8" fill="#e8b48a" />
          <ellipse cx="168" cy="130" rx="5" ry="8" fill="#e8b48a" />
          <!-- Cuello corto bajo la nuca -->
          <rect x="132" y="158" width="16" height="14" rx="5" fill="#e8b48a" />
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

.monito__head {
  transform-box: fill-box;
  transform-origin: 50% 70%;
  will-change: transform;
}

@media (max-width: 700px) {
  .monito {
    width: min(44vw, 190px);
  }
}
</style>
