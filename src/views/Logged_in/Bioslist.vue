<script lang="ts" setup>
  import { ref } from 'vue';
  import Searchbar from '@/components/global/Searchbar.vue';
  import BioListItem from '@/components/global/BioListItem.vue';
  import Button from '@/components/global/Button.vue';
  import type { Bio } from '@/types/Bio';
import router from '@/router';
  const search = ref('');

  const biolists = ref<Bio[]>([
    { id: "1", name: "Lakatos Dezso", domain: "@lakatosdezso", views: 420, widgets: 7, createdat: "2025-01-09", lastedit: "2025-02-10" },
    { id: "2", name: "Radics Ferenc", domain: "@radicsferenc", views: 420, widgets: 7, createdat: "2025-01-09", lastedit: "2025-02-10" },
    { id: "3", name: "Tzinka Jozsef", domain: "@tzinkajozsef", views: 420, widgets: 7, createdat: "2025-01-09", lastedit: "2025-02-10" },
    { id: "4", name: "Olah Peter", domain: "@olahpeter", views: 420, widgets: 7, createdat: "2025-01-09", lastedit: "2025-02-10" },
    { id: "5", name: "Rostas Armando", domain: "@rostasarmando", views: 420, widgets: 7, createdat: "2025-01-09", lastedit: "2025-02-10" },
  ])

  const filteredData = ref<Bio[]>([...biolists.value]);

  // Az új bio létrehozása
  const createBio = () => {
    const newBio: Bio = {
      id: (biolists.value.length + 1).toString(),
      name: 'unknown',
      domain: '@unknown',
      views: 0,
      widgets: 0,
      createdat: new Date().toLocaleDateString(),
      lastedit: new Date().toLocaleDateString()
    };
    biolists.value.push(newBio);
    filteredData.value = [...biolists.value];


    openEditor(newBio.id);
  };


  const openEditor = (id: string) => {
    router.push({ name: 'Editor', params: { id } });
    console.log(`Opening editor for bio with id: ${id}`);
  };


  function changeSearch(filtered: Bio[]) {
    filteredData.value = filtered;
  }
</script>

<template>
  <div class="w-full h-full flex flex-col space-y-6 p-6 pt-20">
    <div class="flex flex-row justify-between content-center items-center w-full rounded-[16px] p-4 bg-zinc-700/50">
      <Searchbar v-model="search" :basearray="biolists" @filtered="changeSearch"></Searchbar>
      <Button @click.prevent="createBio" rank="primary" size="small" text="Create bio" icon-position="right" icon-type="add"></Button>
    </div>

    <div class="w-full h-full baseDash overflow-y-auto flex-col space-y-6 pr-6">
      <div v-for="item in filteredData" :key="item.id">
        <BioListItem
          :id="item.id"
          :name="item.name"
          :domain="item.domain"
          :views="item.views"
          :widgets="item.widgets"
          :createdat="item.createdat"
          :lastedit="item.lastedit"
        ></BioListItem>
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
