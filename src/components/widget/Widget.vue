<script setup lang="ts">
import type { Widget } from '@/types/Widget';
import Link from '@/components/widget/Link.vue';
import { computed } from 'vue';
import ProfileWidget from './ProfileWidget.vue';
import Markdown from './Markdown.vue';
import Youtube from './Youtube.vue';
import Gallery from './Gallery.vue';

const props = defineProps<{
  data: Widget;
}>();

let style = computed(() =>
  `border-radius: ${props.data.genericSettings.borderRadius}px;` +
  `background-color: hsla(${props.data.genericSettings.background?.hue}, ${props.data.genericSettings.background?.saturation}%, ${props.data.genericSettings.background?.value}%, ${props.data.genericSettings.background?.opacity});`
);
</script>

<template>
  <div class="p-4 relative w-full" :style="style">
    <Link :data="data" v-if="data.type == 'link'" />
    <ProfileWidget :data="data" v-if="data.type == 'profile'" />
    <Markdown :data="data" v-if="data.type == 'markdown'" />
    <Youtube :data="data" v-if="data.type == 'youtube'" />
    <Gallery :data="data" v-if="data.type == 'gallery'" />
    <!-- <span class="absolute right-4 bottom-2 text-zinc-900/80">meta: {{ data.type }} - {{ data.id }} - {{ data.page }}:{{ data.position }}</span> -->
  </div>
</template>

<style lang="scss"></style>
