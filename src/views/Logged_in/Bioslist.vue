<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue';
import Searchbar from '@/components/global/Searchbar.vue';
import BioListItem from '@/components/global/BioListItem.vue';
import Button from '@/components/global/Button.vue';
import type { Bio } from '@/types/Bio';
import router from '@/router';
import { useBioStore } from '@/stores/bio';

const bioStore = useBioStore();
const search = ref('');
const biolists = ref<Bio[]>([]);
const filteredData = ref<Bio[]>([]);

const createBio = async () => {
  const name = prompt("Enter the name for the new bio:");
  if (!name) return; 

  const handle = prompt("Enter the handle for the new bio (e.g., @username):");
  if (!handle) return;

  const newBio = await bioStore.createBio(name, handle);

  if (newBio) {
    biolists.value.push(newBio);
    filteredData.value = [...biolists.value];
    openEditor(newBio.handle);
  }
};

const openEditor = (id: string) => {
  router.push({ name: 'Editor', params: { id } });
  console.log(`Opening editor for bio with id: ${id}`);
};

function changeSearch(filtered: Bio[]) {
  filteredData.value = filtered;
}

onMounted(async () => {
  await bioStore.fetchBios();
  biolists.value = [...bioStore.bios];
  filteredData.value = [...biolists.value];
});

watchEffect(() => {
  biolists.value = [...bioStore.bios];
  filteredData.value = [...biolists.value];
});
</script>

<template>
  <div class="w-full h-full flex flex-col space-y-6 p-6 pt-20">
    <div class="flex flex-row justify-between content-center items-center w-full rounded-[16px] p-4 bg-zinc-700/50">
      <Searchbar v-model="search" :basearray="biolists" @filtered="changeSearch"></Searchbar>
      <Button @click.prevent="createBio" rank="primary" size="small" text="Create bio" icon-position="right" icon-type="add"></Button>
    </div>

    <div class="w-full h-full baseDash overflow-y-auto flex-col space-y-6 pr-6">
      <div v-for="item in filteredData" :key="item.handle">
        <BioListItem
          :name="item.name"
          :handle="item.handle"
          :views="item.views"
          :widgets="item.widgets"
          :createdAt="item.createdAt"
          :updatedAt="item.updatedAt"
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
  @apply bg-zinc-800 rounded-full
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
