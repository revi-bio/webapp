<script setup lang="ts">
import type { Widget } from '@/types/Widget';
import { useRouter } from 'vue-router';

const props = defineProps<{
  data: Widget,
  inEditor: boolean,
}>();

function click() {
  if (props.inEditor) return;

  window.location.href = props.data.specificSettings['link'];
}
</script>

<template>
  <div @click="click" class="flex flex-col gap-0 cursor-pointer" :href="data.specificSettings['link']">
    <span class="text-2xl">{{ data.specificSettings['title'] }}</span>
    <span class="text-zinc-400">{{ data.specificSettings['description'] }}</span>
    <span class="text-zinc-700">{{ data.specificSettings['link'] }}</span>
  </div>
</template>

<style lang="scss"></style>
