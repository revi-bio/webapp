<script lang="ts" setup>
import Icon from './Icon.vue';
import { ref } from 'vue';

defineProps<{
  text: string;
}>();

const checked = ref(false);
</script>

<template>
  <label class="flex flex-row justify-center items-center gap-3 cursor-pointer select-none">
    <input
      type="checkbox"
      v-model="checked"
      class="peer absolute opacity-0 w-0 h-0"
    />
    <span
      class="flex justify-center items-center w-5 h-5 rounded border-[2px] border-zinc-500 bg-zinc-800 transition-colors duration-200 peer-hover:bg-zinc-700 peer-checked:bg-rose-500 peer-checked:peer-hover:bg-rose-600 peer-checked:border-rose-500">
      <Icon type="check" v-if="checked" />
    </span>
    <p class="text-zinc-500 text-base leading-relaxed">{{ text }}</p>
  </label>
</template>

<style lang="scss" scoped>

.peer-checked.peer-hover ~ .checkmark {
  @apply bg-rose-600 
}
</style>
