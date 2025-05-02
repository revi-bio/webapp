<script setup lang="ts">
import Icon from './Icon.vue';

const props = defineProps<{
  text?: string;
  size: 'small' | 'normal';
  rank: 'primary' | 'secondary' | 'tabItem';
  iconPosition: 'none' | 'only' | 'left' | 'right';
  disabled?: boolean;
  iconType?: string;
  onClick?: () => void;
  isActive?: boolean;
}>();

</script>

<template>
  <button
    :class="[size, rank, { 'active': isActive, 'disabled': disabled }]"
    @click="onClick"
  >
    <template v-if="iconPosition === 'left'">
      <Icon v-if="iconType" :type="iconType" />
      <span>{{ text }}</span>
    </template>
    <template v-else-if="iconPosition === 'right'">
      <span>{{ text }}</span>
      <Icon v-if="iconType" :type="iconType" />
    </template>
    <template v-else-if="iconPosition === 'only'">
      <Icon v-if="iconType" :type="iconType" />
    </template>
    <template v-else>
      <span>{{ text }}</span>
    </template>
  </button>
</template>

<style>
button {
  @apply rounded-md flex items-center gap-2 shadow;
}

.primary {
  @apply bg-rose-500 text-white hover:bg-rose-400 active:bg-rose-600 transition duration-200;
}

.secondary {
  @apply bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-800 transition duration-200;
}

.small {
  @apply text-base px-2 py-1;
}

.normal {
  @apply text-lg px-3 py-2;
}

.tabItem {
  @apply bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-800 transition duration-200;
}

.tabItem.active {
  @apply bg-zinc-800;
}

.disabled {
@apply bg-zinc-700/25 pointer-events-none;
}
</style>
