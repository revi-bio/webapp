<script lang="ts" setup>
import { computed } from 'vue';

const icons = import.meta.glob('../../assets/LinkIcons/youtube-fill-svgrepo-com.svg', { eager: true, as: 'raw' });

const logo = computed(() => {
  const iconPath = Object.values(icons)[0];
  if (!iconPath) return null;

  return iconPath
    .replace(/<svg/, '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet"')
    .replace(/fill="[^"]*"/g, 'fill="#ee0f0f"')
    .replace(/stroke="[^"]*"/g, 'stroke="#ee0f0f"');
});
</script>

<template>
  <div class="w-full py-5 gap-2
  flex flex-row justify-start content-center items-center rounded-lg px-2
  border border-zinc-100/30 bg-zinc-200/10 hover:bg-zinc-200/20 active:bg-zinc-200/30 duration-200">
    <div class="w-20 h-20 "v-html="logo"></div>
    <h3 class="text-lg">
      Youtube playlist
    </h3>
  </div>
</template>
