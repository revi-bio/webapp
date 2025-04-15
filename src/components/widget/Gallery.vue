<script setup lang="ts">
import type { Widget } from '@/types/Widget';

const props = defineProps<{
  data: Widget,
}>();

</script>

<template>
  <div class="flex flex-col gap-0">
    <p class="text-2xl">{{ data.specificSettings['title'] }}</p>
    <span class="text-zinc-400" v-for="image in data.specificSettings['images']">{{ image }}</span>
  </div>
</template>

<style lang="scss">
</style>
