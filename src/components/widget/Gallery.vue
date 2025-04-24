<script setup lang="ts">
import type { Widget } from '@/types/Widget';

const props = defineProps<{
  data: Widget;
}>();

function getWidgetImg(image: string): string{
  return `${import.meta.env.VITE_API_BASE_URL}/file/${image}`
}
</script>

<template>
  <div class="flex flex-col">
    <h3 class="text-2xl">{{ data.specificSettings['title'] }}</h3>
    <img
        v-for="image in data.specificSettings['images']"
        :key="image"
        :src="getWidgetImg(image)"
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
