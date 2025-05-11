<script setup lang="ts">
import BioListItem from '@/components/global/BioListItem.vue';
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import { useAdminStore } from '@/stores/admin';
import type { Bio } from '@/types/Bio';
import Searchbar from '@/components/global/Searchbar.vue';

const adminStore = useAdminStore();
const biolists = ref<Bio[]>([]);
const search = ref('');
const filteredData = ref<Bio[]>([]);

onMounted(async()=>{
  await adminStore.fetchAllBios();
  biolists.value = [...adminStore.bios];
  filteredData.value = [...biolists.value];
})
watchEffect(() => {
  biolists.value = [...adminStore.bios];
})

function changeSearch(filtered: Bio[]) {
  filteredData.value = filtered;
}
</script>

<template>
  <div class="w-full h-full flex flex-col justify-start content-start items-start gap-5 overflow-y-auto">
    <div class="flex flex-row justify-between content-center items-center w-full rounded-[16px] p-4 bg-zinc-700/50">
      <Searchbar v-model="search" :basearray="biolists" @filtered="changeSearch"></Searchbar>
    </div>

    <div class="w-full" v-for="item in filteredData" :key="item.handle">
        <BioListItem
          :avatar="item.handle"
          :name="item.name"
          :handle="item.handle"
          :views="item.views"
          :widgetsCount="item.widgetsCount"
          :pagesCount="item.pagesCount"
          :createdAt="item.createdAt"
          :updatedAt="item.updatedAt"
          @bioDeleted="adminStore.deleteBio(item._id)"
        ></BioListItem>
      </div>
  </div>
</template>
