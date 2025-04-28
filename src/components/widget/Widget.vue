<script setup lang="ts">
import type { Widget } from '@/types/Widget';
import Link from '@/components/widget/Link.vue';
import { computed, watchEffect } from 'vue';
import ProfileWidget from './ProfileWidget.vue';
import Markdown from './Markdown.vue';
import Youtube from './Youtube.vue';
import Gallery from './Gallery.vue';
import LinkContainer from './LinkContainer.vue';

const props = withDefaults(defineProps<{
  data: Widget;
  inEditor?: boolean;
}>(), { data: undefined, inEditor: false });

let style = computed(() =>
  `border-radius: ${props.data.genericSettings.borderRadius}px;` +
  `background-color: hsla(${props.data.genericSettings.background?.hue}, ${props.data.genericSettings.background?.saturation}%, ${props.data.genericSettings.background?.value}%, ${props.data.genericSettings.background?.opacity});` +
  `backdrop-filter: blur(${props.data.genericSettings.blurAmount}px);`
);

</script>

<template>
  <div class="p-4 relative w-full" :style="style">
    <Link :data="data" :in-editor="inEditor" v-if="data.type == 'link'" />
    <ProfileWidget :data="data" v-if="data.type == 'profile'" />
    <Markdown :data="data" v-if="data.type == 'markdown'" />
    <Youtube :data="data" v-if="data.type == 'youtube'" />
    <Gallery :data="data" v-if="data.type == 'gallery'" />
    <LinkContainer :data="data" v-if="data.type == 'linkContainer'" />
    <!-- <span class="absolute right-4 bottom-2 text-zinc-900/80">meta: {{ data.type }} - {{ data.id }} - {{ data.page }}:{{ data.position }}</span> -->
  </div>
</template>

<style lang="scss"></style>
