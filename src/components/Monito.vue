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
        <!-- Silla gamer: respaldo ALTO, asiento estrecho, sin apoyabrazos -->
        <ellipse cx="140" cy="258" rx="24" ry="10" fill="#1a6fa3" />
        <path
          d="M112 118
             C108 160 110 210 116 250
             L164 250
             C170 210 172 160 168 118
             C156 108 124 108 112 118 Z"
          fill="#2b8fc4"
        />
        <path
          d="M120 126
             C118 168 120 208 124 242
             L156 242
             C160 208 162 168 160 126
             C150 118 130 118 120 126 Z"
          fill="#1f6f9c"
        />
        <rect x="112" y="88" width="56" height="32" rx="14" fill="#2b8fc4" />
        <rect x="120" y="96" width="40" height="16" rx="8" fill="#ff7a59" />
        <path
          d="M140 130 L140 235"
          stroke="#165a82"
          stroke-width="2"
          stroke-dasharray="4 6"
          opacity="0.5"
        />

        <!-- Torso -->
        <ellipse cx="140" cy="208" rx="28" ry="34" fill="#3a2818" />
        <path
          d="M118 184 C122 214 130 236 140 242 C150 236 158 214 162 184 C148 192 132 192 118 184 Z"
          fill="#4a3422"
        />

        <!-- Manitas delante del asiento (sobre el escritorio), no a los costados -->
        <ellipse cx="118" cy="262" rx="11" ry="7" fill="#3a2818" />
        <ellipse cx="162" cy="262" rx="11" ry="7" fill="#3a2818" />
        <ellipse cx="114" cy="266" rx="9" ry="6" fill="#f0c4a0" />
        <ellipse cx="166" cy="266" rx="9" ry="6" fill="#f0c4a0" />
        <path
          d="M108 265 Q110 261 112 265 M112 267 Q114 262 116 267 M116 268 Q118 263 120 268"
          stroke="#e0b090"
          stroke-width="1.4"
          fill="none"
          stroke-linecap="round"
        />
        <path
          d="M160 265 Q162 261 164 265 M164 267 Q166 262 168 267 M168 268 Q170 263 172 268"
          stroke="#e0b090"
          stroke-width="1.4"
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
