<script setup lang="ts">
import type { Widget } from '@/types/Widget';

const props = defineProps<{
  data: Widget;
}>();
</script>

<template>
  <div class="flex flex-col">
    <h3 class="text-2xl">{{ data.specificSettings['title'] }}</h3>
    <img
        v-for="image in data.specificSettings['images']"
        :key="image"
        :src="image"
        alt="Gallery image"
        class="rounded-lg shadow-md"
      />
  </div>
</template>

<style lang="scss">
img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
