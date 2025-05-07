<script setup lang="ts">
defineProps<{
  type?: string;
  // same as type but more kezre all
  name?: string;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | `${number}xl`;
}>();
</script>

<template>
  <span
    class="material-symbols-outlined align-middle"
    :class="size ? `text-${size}` : 'text-lg'"
  >
    {{ type || name }}
  </span>
</template>
