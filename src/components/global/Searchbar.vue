<script lang="ts" setup>
  import Input from '@/components/global/Input.vue';
  const search = defineModel()
  /*
  */
</script>

<template>
  <Input class="input" placeholder="Search" v-model="search" type="text"></Input>
</template>

<style>
.input{
  @apply w-80
}
</style>
