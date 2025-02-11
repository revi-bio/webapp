<script lang="ts" setup>
  import { ref } from 'vue';
  import Searchbar from '@/components/global/Searchbar.vue';
import BioListItem from '@/components/global/BioListItem.vue';
  const search = ref('');
  /*
  */
</script>

<template>
<div class="w-full h-full flex flex-col space-y-6 p-6 pt-20">
  <div class="w-full rounded-[16px] p-4 bg-zinc-700/50">
    <Searchbar v-model="search"></Searchbar>
  </div>

  <BioListItem></BioListItem>
</div>
</template>

<style>

</style>
