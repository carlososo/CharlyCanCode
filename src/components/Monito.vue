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

      <!-- Gaming chair base -->
      <ellipse cx="140" cy="292" rx="52" ry="10" fill="#1a2a36" opacity="0.28" />
      <path
        d="M118 250 L140 292 L162 250"
        stroke="#3a4d5c"
        stroke-width="8"
        stroke-linecap="round"
        fill="none"
      />
      <ellipse cx="140" cy="292" rx="18" ry="6" fill="#2a3a48" />

      <!-- Chair seat + back -->
      <g :transform="`rotate(${sway} 140 220)`">
        <path
          d="M78 168 C70 200 74 240 92 248 L188 248 C206 240 210 200 202 168 Z"
          fill="#1e6f9f"
        />
        <path
          d="M88 108 C84 150 86 190 96 220 L184 220 C194 190 196 150 192 108 C170 98 110 98 88 108 Z"
          fill="#2584bc"
        />
        <path
          d="M96 112 C100 150 102 180 108 208 L172 208 C178 180 180 150 184 112 C162 104 118 104 96 112 Z"
          fill="#1a5f8a"
        />
        <!-- Side bolsters -->
        <path d="M78 130 C72 170 74 210 86 228 L96 220 C90 190 88 150 94 120 Z" fill="#176088" />
        <path
          d="M202 130 C208 170 206 210 194 228 L184 220 C190 190 192 150 186 120 Z"
          fill="#176088"
        />
        <!-- Headrest -->
        <rect x="104" y="78" width="72" height="34" rx="14" fill="#1e6f9f" />
        <rect x="112" y="86" width="56" height="18" rx="9" fill="#ff7a59" />

        <!-- Body (back view) -->
        <ellipse cx="140" cy="198" rx="38" ry="46" fill="#3d2918" />
        <path
          d="M108 170 C112 210 118 235 140 242 C162 235 168 210 172 170 C156 178 124 178 108 170 Z"
          fill="#4a3220"
        />
        <!-- Hoodie / hoodie string suggestion -->
        <path
          d="M126 168 Q140 182 154 168"
          stroke="#6b4a30"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
        />

        <!-- Shoulders / arms resting -->
        <path
          d="M102 176 C80 190 70 210 68 228 L96 232 C100 210 108 192 118 180 Z"
          fill="#3d2918"
        />
        <path
          d="M178 176 C200 190 210 210 212 228 L184 232 C180 210 172 192 162 180 Z"
          fill="#3d2918"
        />

        <!-- Head + hair (tracked) -->
        <g
          class="monito__head"
          :style="{
            transform: `translate(${rotateY * 1.15}px, ${rotateX * 0.9}px) rotate(${rotateY * 0.4}deg)`,
          }"
        >
          <!-- Neck -->
          <rect x="128" y="128" width="24" height="22" rx="8" fill="#e8b48a" />
          <!-- Head back -->
          <ellipse cx="140" cy="108" rx="34" ry="38" fill="#f0c4a0" />
          <!-- Ears hint -->
          <ellipse cx="108" cy="112" rx="7" ry="10" fill="#e8b48a" />
          <ellipse cx="172" cy="112" rx="7" ry="10" fill="#e8b48a" />
          <!-- Hair mass -->
          <path
            class="monito__hair"
            d="M106 104
               C104 70 118 52 140 50
               C162 52 176 70 174 104
               C168 86 152 78 140 78
               C128 78 112 86 106 104 Z"
            fill="#2a1a12"
          />
          <path
            d="M112 96 C118 74 130 64 140 62 C150 64 162 74 168 96
               C158 84 148 80 140 80 C132 80 122 84 112 96 Z"
            fill="#3d2918"
          />
          <!-- Soft crown tuft that reads motion -->
          <path
            d="M132 58 C136 44 144 44 148 58 C144 52 136 52 132 58 Z"
            fill="#1a100c"
          />
          <path
            d="M148 56 C154 42 164 46 166 60 C160 52 152 52 148 56 Z"
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
