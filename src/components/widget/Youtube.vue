<script setup lang="ts">
import type { Widget } from '@/types/Widget';

defineProps<{
  data: Widget;
}>();
</script>

<template>
  <div class="flex flex-col gap-0" :href="data.specificSettings['id']">
    <span class="text-2xl">{{ data.specificSettings['title'] }}</span>
    <span class="text-zinc-400">{{ data.specificSettings['description'] }}</span>
    <iframe
      class="w-full h-[300px]"
      :src="`https://www.youtube.com/embed/${data.specificSettings['id']}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen></iframe>
  </div>
</template>

<style lang="scss"></style>
