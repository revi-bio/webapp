<script setup lang="ts">
import type { Widget } from '@/types/Widget';

defineProps<{
  data: Widget,
}>();
</script>

<template>
  <a class="flex flex-col gap-0" :href="data.specificSettings['link']">
    <span class="text-2xl">{{ data.specificSettings['title'] }}</span>
    <span class="text-zinc-400">{{ data.specificSettings['description'] }}</span>
    <span class="text-zinc-700">{{ data.specificSettings['link'] }}</span>
  </a>
</template>

<style lang="scss">
</style>
