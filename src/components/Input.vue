<script setup lang="ts">
import Icon from './Icon.vue';

const text = defineModel()

defineProps<{
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
    <input :placeholder="placeholder" type="text" v-model="text" :disabled="disabled">
  </span>
</template>

<style>
.input {
  @apply rounded-md flex flex-row justify-between content-center items-center relative gap-2 border-2 border-[#18181b80] bg-[#27272a] rounded w-full text-zinc-400 placeholder-zinc-500 focus:border-[#18181b80] ;
}

input{
  @apply bg-[#27272a] order-2 w-full h-full px-4 py-2
}

</style>
