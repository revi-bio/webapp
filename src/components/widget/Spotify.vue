<script lang="ts" setup>
import { computed } from 'vue';

const icons = import.meta.glob('../../assets/LinkIcons/spotify-fill-svgrepo-com.svg', { eager: true, as: 'raw' });

const logo = computed(() => {
  const iconPath = Object.values(icons)[0];
  if (!iconPath) return null;

  return iconPath
    .replace(/<svg/, '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet"')
    .replace(/fill="[^"]*"/g, 'fill="#1DB954"')
    .replace(/stroke="[^"]*"/g, 'stroke="#1DB954"');
});
</script>

<template>
  <div class="w-full py-5
  flex flex-col justify-center content-center items-center rounded-lg
   bg-[#191414] hover:bg-zinc-800/90 active:bg-zinc-950/60 duration-200">
    <div class="w-20 h-20 "v-html="logo"></div>
    <h3 class="text-2xl">
      Spotify playlist
    </h3>
  </div>
</template>
