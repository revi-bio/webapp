<script lang="ts" setup>
  import { ref } from 'vue';
  import Searchbar from '@/components/global/Searchbar.vue';
  import BioListItem from '@/components/global/BioListItem.vue';
  const search = ref('');
  const filteredData = ref<{ name: string, id: string }[]>([]);

  const biolists = [
    { id: "1", name: "Lakatos Dezso", domain: "@lakatosdezso", views: 420, widgets: 7, createdat: "2025-01-09", lastedit: "2025-02-10" },
    { id: "2", name: "Radics Ferenc", domain: "@radicsferenc", views: 420, widgets: 7, createdat: "2025-01-09", lastedit: "2025-02-10" },
    { id: "3", name: "Tzinka Jozsef", domain: "@tzinkajozsef", views: 420, widgets: 7, createdat: "2025-01-09", lastedit: "2025-02-10" },
    { id: "4", name: "Olah Peter", domain: "@olahpeter", views: 420, widgets: 7, createdat: "2025-01-09", lastedit: "2025-02-10" },
    { id: "5", name: "Rostas Armando", domain: "@rostasarmando", views: 420, widgets: 7, createdat: "2025-01-09", lastedit: "2025-02-10" },
  ]

  shoved:[] = biolists
</script>

<template>
<div class="w-full h-full flex flex-col space-y-6 p-6 pt-20">
  <div class="w-full rounded-[16px] p-4 bg-zinc-700/50">
    <Searchbar v-model="search" :basearray="biolists"></Searchbar>
  </div>
  <div v-for="item in biolists">
    <BioListItem :id="item.id" :name="item.name" :domain="item.domain" :views="item.views" :widgets="item.widgets" :createdat="item.createdat" :lastedit="item.lastedit"></BioListItem>
  </div>
</div>
</template>

<style>

</style>
