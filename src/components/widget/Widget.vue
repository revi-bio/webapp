<script setup lang="ts">
import type { Widget } from '@/types/Widget';
import Link from '@/components/widget/Link.vue';

const props = defineProps<{
  data: Widget;
}>();

const style =
  `border-radius: ${props.data.genericSettings.borderRadius ?? 16}px;` +
  `background-color: hsla(${props.data.genericSettings.tint ?? 240}, ${props.data.genericSettings.saturation ?? 4}%, 16%, ${props.data.genericSettings.opacity ?? 0.8});`;
</script>

<template>
  <div class="p-4 relative" :style="style">
    <Link :data="data" v-if="data.type == 'link'" />
    <span class="absolute right-4 bottom-2 text-zinc-900/80">meta: {{ data.type }} - {{ data.id }}</span>
  </div>
</template>

<style lang="scss"></style>
