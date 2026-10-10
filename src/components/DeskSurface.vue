<script setup lang="ts">
/** Warm complementary desk under the soft-blue scene. */
</script>

<template>
  <div class="desk-board" aria-hidden="true">
    <div class="desk-board__top">
      <div class="desk-board__keys" aria-hidden="true">
        <span /><span /><span />
      </div>
      <div class="desk-board__cup" aria-hidden="true" />
    </div>
    <div class="desk-board__edge" />
    <div class="desk-board__legs">
      <span />
      <span />
    </div>
    <div class="desk-board__cabinet">
      <i /><i /><i />
    </div>
  </div>
</template>

<style scoped>
.desk-board {
  width: min(78vw, 980px);
  position: relative;
  z-index: 1;
}

.desk-board__top {
  position: relative;
  z-index: 1;
  height: clamp(52px, 8vh, 78px);
  border-radius: 10px 10px 4px 4px;
  /* Complementary warm sand to the childish blue atmosphere */
  background:
    linear-gradient(180deg, #f3d7b8 0%, #e4b98a 55%, #d4a574 100%);
  box-shadow:
    0 10px 24px rgba(80, 50, 20, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.45);
}

.desk-board__edge {
  position: relative;
  z-index: 1;
  height: 10px;
  border-radius: 0 0 8px 8px;
  background: linear-gradient(180deg, #c4925e, #a87848);
}

.desk-board__legs {
  position: absolute;
  z-index: 0;
  left: 7%;
  right: 34%;
  top: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}

.desk-board__legs span {
  width: 18px;
  height: 100%;
  border-radius: 0 0 5px 5px;
  background: linear-gradient(90deg, #8d6238, #c4925e 45%, #8d6238);
}

.desk-board__cabinet {
  position: absolute;
  z-index: 0;
  right: 0;
  top: 46%;
  width: clamp(78px, 11vw, 108px);
  height: 132px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 6px;
  padding: 10px 8px 8px;
  border-radius: 3px 3px 6px 6px;
  background: linear-gradient(90deg, #a87848, #e4b98a 18%, #c4925e 70%, #8d6238);
  box-shadow: 6px 10px 16px rgba(80, 50, 20, 0.16);
  pointer-events: none;
}

.desk-board__cabinet i {
  display: block;
  flex: 1;
  border-radius: 3px;
  background: linear-gradient(180deg, #f3d7b8, #d4a574);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45);
  position: relative;
}

.desk-board__keys {
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 10px;
  width: 17%;
  transform: translateX(-50%);
  height: 13px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 2px 3px;
  border-radius: 5px;
  background: linear-gradient(180deg, #4a5562, #2a313a);
  box-shadow:
    0 3px 0 #1b222a,
    0 6px 8px rgba(40, 24, 10, 0.16);
}

.desk-board__keys span {
  flex: 1;
  border-radius: 1px;
  background: repeating-linear-gradient(90deg, #e4e9ee 0 3px, transparent 3px 4px);
}

.desk-board__keys span:last-child {
  width: 46%;
  align-self: center;
  background: #d5dbe2;
}

.desk-board__cup {
  position: absolute;
  z-index: 2;
  right: 16%;
  bottom: 8px;
  width: 22px;
  height: 18px;
  border-radius: 2px 2px 6px 6px;
  background: linear-gradient(180deg, #fffdf9, #efe6dc);
  box-shadow: 1px 3px 0 rgba(80, 45, 20, 0.18);
}

.desk-board__cup::before {
  content: '';
  position: absolute;
  left: 3px;
  right: 3px;
  top: 2px;
  height: 5px;
  border-radius: 50%;
  background: #6a3f28;
}

.desk-board__cup::after {
  content: '';
  position: absolute;
  right: -6px;
  top: 5px;
  width: 7px;
  height: 8px;
  border: 2px solid #efe6dc;
  border-left: 0;
  border-radius: 0 7px 7px 0;
}

.desk-board__cabinet i::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 22px;
  height: 4px;
  transform: translate(-50%, -50%);
  border-radius: 2px;
  background: #6a4a30;
}
</style>
