<script setup lang="ts">
import Icon from './Icon.vue';


defineProps<{
  type: string;
  placeholder?: string;
  rank: 'primary' | 'secondary';
  icon?: string;
}>();
</script>

<template>
  <input :type="type" :class="rank">
    <template v-if="icon">
      <Icon v-if="icon" :type="icon" />
      <span>{{ placeholder }}</span>
    </template>
    <template v-else>
      <span>{{ placeholder }}</span>
    </template>
  </input>

</template>

<style>
input {
  @apply rounded-md flex items-center gap-2;
}
.primary {
  @apply bg-rose-500 text-white hover:bg-rose-400 active:bg-rose-600 ;
}
.primary:hover{
  transition: 0.2s ease-in;
}
.secondary {
  @apply bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-800 ;
}
.secondary:hover{
  transition: 0.2s ease-in-out;
}
</style>
