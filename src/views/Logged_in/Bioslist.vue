<script lang="ts" setup>
  import { ref } from 'vue';
  import Searchbar from '@/components/global/Searchbar.vue';
  import BioListItem from '@/components/global/BioListItem.vue';
  import type { Bio } from '@/types/Bio';
  const search = ref('');

  const biolists = ref<Bio[]>([
    { id: "1", name: "Lakatos Dezso", domain: "@lakatosdezso", views: 420, widgets: 7, createdat: "2025-01-09", lastedit: "2025-02-10" },
    { id: "2", name: "Radics Ferenc", domain: "@radicsferenc", views: 420, widgets: 7, createdat: "2025-01-09", lastedit: "2025-02-10" },
    { id: "3", name: "Tzinka Jozsef", domain: "@tzinkajozsef", views: 420, widgets: 7, createdat: "2025-01-09", lastedit: "2025-02-10" },
    { id: "4", name: "Olah Peter", domain: "@olahpeter", views: 420, widgets: 7, createdat: "2025-01-09", lastedit: "2025-02-10" },
    { id: "5", name: "Rostas Armando", domain: "@rostasarmando", views: 420, widgets: 7, createdat: "2025-01-09", lastedit: "2025-02-10" },
  ])
  const filteredData = ref<Bio[]>([...biolists.value]);

  function changeSearch(filtered:Bio[]){
    filteredData.value = filtered
  }

</script>

<template>
<div class="w-full h-full flex flex-col space-y-6 p-6 pt-20">
  <div class="w-full rounded-[16px] p-4 bg-zinc-700/50">
    <Searchbar v-model="search" :basearray="biolists" @filtered="changeSearch"></Searchbar>
  </div>
  <div class="w-full h-full baseDash overflow-y-auto flex-col space-y-6 pr-6">
    <div v-for="item in filteredData" >
      <BioListItem :id="item.id" :name="item.name" :domain="item.domain" :views="item.views" :widgets="item.widgets" :createdat="item.createdat" :lastedit="item.lastedit"></BioListItem>
    </div>
  </div>
</div>
</template>

<style>
/* width */
.baseDash::-webkit-scrollbar {
  @apply w-2 rounded-full 
}

/* Track */
.baseDash::-webkit-scrollbar-track {
  @apply bg-zinc-800  rounded-full
}

/* Handle */
.baseDash::-webkit-scrollbar-thumb {
  @apply bg-zinc-600/50 rounded-full border-4
}

/* Handle on hover */
.baseDash::-webkit-scrollbar-thumb:hover {
  @apply bg-zinc-700 rounded-full
}
</style>
