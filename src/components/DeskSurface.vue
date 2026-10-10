<script setup lang="ts">
/** Warm complementary desk under the soft-blue scene + mouse. */
</script>

<template>
  <div class="desk-board" aria-hidden="true">
    <div class="desk-board__top">
      <svg class="desk-board__mouse" viewBox="0 0 64 80" role="presentation">
        <ellipse cx="32" cy="42" rx="18" ry="28" fill="#3a4552" />
        <ellipse cx="32" cy="42" rx="14" ry="24" fill="#4a5564" />
        <rect x="28" y="22" width="8" height="14" rx="3" fill="#2a3340" />
        <ellipse cx="32" cy="28" rx="3" ry="4" fill="#6a7a8c" />
        <path d="M32 18 L32 10" stroke="#2a3340" stroke-width="2" stroke-linecap="round" />
      </svg>
    </div>
    <div class="desk-board__edge" />
  </div>
</template>

<style scoped>
.desk-board {
  width: min(78vw, 980px);
  position: relative;
  z-index: 1;
}

.desk-board__top {
  height: clamp(52px, 8vh, 78px);
  border-radius: 10px 10px 4px 4px;
  /* Complementary warm sand to the childish blue atmosphere */
  background:
    linear-gradient(180deg, #f3d7b8 0%, #e4b98a 55%, #d4a574 100%);
  box-shadow:
    0 10px 24px rgba(80, 50, 20, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.45);
  position: relative;
}

.desk-board__mouse {
  position: absolute;
  right: 12%;
  top: 50%;
  transform: translateY(-52%) rotate(-8deg);
  width: clamp(28px, 3.5vw, 44px);
  height: auto;
  filter: drop-shadow(0 4px 4px rgba(30, 40, 50, 0.25));
}

.desk-board__edge {
  height: 10px;
  border-radius: 0 0 8px 8px;
  background: linear-gradient(180deg, #c4925e, #a87848);
}
</style>
