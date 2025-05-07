<script setup lang="ts">
import Icon from './Icon.vue';

const props = withDefaults(defineProps<{
  text?: string;
  small?: boolean;
  icon?: string;
  primary?: boolean;
  iconOnly?: boolean;
  iconRight?: boolean;
  disabled?: boolean;
  isActive?: boolean;
}>(), {
  text: '',
  small: false,
  icon: '',
  primary: false,
  iconOnly: false,
  iconRight: false,
  disabled: false,
  isActive: false,
});
</script>

<template>
  <button
    :class="[{ 'small': small, 'primary': primary, 'active': isActive, 'disabled': disabled, 'flex-row-reverse': iconRight}]"
    :disabled="disabled"
  >
      <Icon v-if="icon" :name="icon" :size='small ? "base" : "lg"' />
      <span v-if="!iconOnly">{{ text }}</span>
  </button>
</template>

<style lang="scss">
button {
  @apply rounded-md flex items-center gap-2 shadow bg-zinc-700 hover:bg-zinc-700/75 transition duration-200 px-3 py-2 text-base;

  .Icon[data-only="true"] {
    @apply aspect-square w-auto;
  }

  &.small {
    @apply text-base px-2 py-1;
  }

  &.primary {
    @apply bg-rose-500 text-white hover:bg-rose-400 active:bg-rose-600 transition duration-200;
  }

  &.secondary {
    @apply bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-800 transition duration-200;
  }

  &.tabItem {
    @apply bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-800 transition duration-200;
  }

  &.tabItem.active {
    @apply bg-zinc-800;
  }

  &.disabled {
    @apply bg-zinc-700/25 pointer-events-none;
  }
}
</style>
