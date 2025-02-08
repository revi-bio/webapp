<script lang="ts" setup>
  import { RouterLink, RouterView } from 'vue-router'
  import Sidebar from '@/components/global/Sidebar.vue';

</script>
<template>
  <div class="flex flex-row justify-center content-center items-center w-full h-full py-8">
    <Sidebar class="w-1/12"></Sidebar>
    <span class="w-11/12 h-full"></span>
  </div>

</template>
<style lang="scss" scoped>
</style>
