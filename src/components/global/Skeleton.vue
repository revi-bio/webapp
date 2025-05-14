<script lang="ts" setup>
import { defineProps } from 'vue';

const props = withDefaults(defineProps<{
  height?: number;
}>(), {
  height: 1,
});

</script>

<template>
  <div class="skeleton w-full rounded-lg" :style="{ height: `${height}rem` }"></div>
</template>

<style scoped>
.skeleton {
  background: linear-gradient(90deg, #3f3f46 25%, #52525b 50%, #3f3f46 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>
