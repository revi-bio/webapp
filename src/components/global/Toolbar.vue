<script lang="ts" setup>
import { ref } from 'vue';
import Icon from './Icon.vue';

const activeIcon = ref<string | null>(null);

const toggleIcon = (type: string) => {
  activeIcon.value = activeIcon.value === type ? null : type;
};
</script>

<template>
  <div class="flex flex-col items-center justify-center space-y-14 py-10 rounded-[16px] bg-zinc-900
              transition duration-200 text-lg px-3">
    <Icon
      class="Icon"
      :class="{ 'active': activeIcon === 'widgets' }"
      size="normal"
      type="widgets"
      @click="toggleIcon('widgets')"
    />
    <Icon
      class="Icon"
      :class="{ 'active': activeIcon === 'id_card' }"
      size="normal"
      type="id_card"
      @click="toggleIcon('id_card')"
    />
    <Icon
      class="Icon"
      :class="{ 'active': activeIcon === 'edit' }"
      size="normal"
      type="edit"
      @click="toggleIcon('edit')"
    />
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
