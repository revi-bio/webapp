<script setup lang="ts">
import type { Widget } from '@/types/Widget';

const props = defineProps<{
  data: Widget;
}>();
console.log(props.data);
</script>

<template>
  <div class="flex flex-col">
    <h3 class="text-2xl">{{ data.specificSettings['title'] }}</h3>
    <h3 class="text-zinc-400" v-for="image in data.specificSettings['images']">{{ image }}</h3>
  </div>
</template>

<style lang="scss"></style>
