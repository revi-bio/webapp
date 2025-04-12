<script setup lang="ts">
defineProps<{
  type: string;
  size?: string;
}>();
</script>

<template>
  <span
    class="material-symbols-outlined align-middle"
    :class="size ? `text-${size}` : 'text-lg'"
  >
    {{ type }}
  </span>
</template>
