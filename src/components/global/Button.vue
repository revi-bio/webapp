<script setup lang="ts">
import Icon from './Icon.vue';


defineProps<{
  text?: string;
  size: 'small' | 'normal';
  rank: 'primary' | 'secondary';
  iconPosition: 'none' | 'only' | 'left' | 'right';
  iconType?: string;
  onClick?:()=> void;
}>();
</script>

<template>
  <button :class="[size, rank]" @click="onClick">
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
  <!--
    HOW TO USE:
      ⚪ text and iconType is NOT required
      ⚪ size, rank, iconPosition IS REQUIRED

      Examples:
      ⚪With text, no icon
    <Button text="Start your journey" size="normal" rank="primary" icon-position="none"></Button>
      ⚪With text and icon
    <Button text="Start your journey" size="normal" rank="primary" icon-position="left" icon-type="check"></Button>
      ⚪Only icon
    <Button size="normal" rank="primary" icon-position="only" icon-type="check"></Button>
  ---->
</template>

<style>
button {
  @apply rounded-md flex items-center gap-2;
}
.primary {
  @apply bg-rose-500 text-white hover:bg-rose-400 active:bg-rose-600 transition  duration-200;
}

.secondary {
  @apply bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-800 transition duration-200 ;
}

.small {
  @apply text-base px-2 py-1;
}
.normal {
  @apply text-lg px-3 py-2;
}
</style>
