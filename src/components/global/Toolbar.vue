<script lang="ts" setup>
import { ref } from 'vue';
import Icon from './Icon.vue';

const activeIcon = ref<string | null>(null);

const toggleIcon = (type: string) => {
  activeIcon.value = activeIcon.value === type ? null : type;
};
</script>

<template>
  <div class="flex space-x-2 items-center justify-center">
    <div v-if="activeIcon" class="flex flex-col space-y-14 p-4 rounded-[16px] bg-zinc-900/70 text-lg px-3 w-[400px] h-[500px]">
      <div>{{ activeIcon }}</div>
    </div>

    <div class="flex flex-col items-center justify-center space-y-14 py-10 rounded-[16px] bg-zinc-900/70 transition duration-200 text-lg px-3 h-full">
      <Icon class="Icon" :class="{ 'active': activeIcon === 'Widgets' }" size="normal" type="widgets" @click="toggleIcon('Widgets')" />
      <Icon class="Icon" :class="{ 'active': activeIcon === 'Presets' }" size="normal" type="id_card" @click="toggleIcon('Presets')" />
      <Icon class="Icon" :class="{ 'active': activeIcon === 'Edit' }" size="normal" type="edit" @click="toggleIcon('Edit')" />
    </div>
  </div>
  
</template>

<style>
  .Icon {
    @apply p-2 rounded-lg hover:bg-zinc-600 text-zinc-400 cursor-pointer select-none
  }
  .Icon.active {
    @apply bg-zinc-700/75  hover:bg-zinc-600
  }
</style>
