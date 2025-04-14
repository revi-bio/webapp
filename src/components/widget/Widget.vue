<script setup lang="ts">
import type { Widget } from '@/types/Widget';
import Link from '@/components/widget/Link.vue';
import { computed } from 'vue';
import ProfileWidget from './ProfileWidget.vue';

const props = defineProps<{
  data: Widget;
}>();

let style = computed(() =>
  `border-radius: ${props.data.genericSettings.borderRadius}px;` +
  `background-color: hsla(${props.data.genericSettings.background?.tint}, ${props.data.genericSettings.background?.saturation}%, 16%, ${props.data.genericSettings.background?.opacity});`
);
</script>

<template>
  <div class="p-4 relative" :style="style">
    <Link :data="data" v-if="data.type == 'link'" />
    <ProfileWidget :data="data" v-if="data.type == 'profile'" />
    <!-- <span class="absolute right-4 bottom-2 text-zinc-900/80">meta: {{ data.type }} - {{ data.id }} - {{ data.page }}:{{ data.position }}</span> -->
  </div>
</template>

<style lang="scss"></style>
