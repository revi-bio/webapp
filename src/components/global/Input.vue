<script setup lang="ts">
import Icon from './Icon.vue';

const text = defineModel()

defineProps<{
  type: "text" | "password" | "email",
  placeholder?: string;
  disabled?: boolean;
  icon?: string;
}>();
</script>

<template>
  <span class="input">
    <template v-if="icon">
      <span class="relative aspect-square px-1">
        <Icon class="absolute left-2 -top-2.5" :type="icon"/>
      </span>
    </template>
    <input :placeholder="placeholder" :type="type" v-model="text" :disabled="disabled">
  </span>
</template>

<style>
.input {
  @apply rounded-md flex flex-row justify-between content-center items-center relative gap-2 border-2 border-zinc-900/80 bg-zinc-800 rounded w-full text-zinc-400 placeholder-zinc-500 focus:border-zinc-900/80 hover:border-zinc-800 transition-colors duration-200;
}

input {
  @apply bg-zinc-800 order-2 w-full h-full px-4 py-2 hover:bg-zinc-700 rounded transition-colors duration-200
}

</style>
