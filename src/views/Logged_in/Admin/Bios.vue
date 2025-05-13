<script setup lang="ts">
import BioListItem from '@/components/global/BioListItem.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useAdminStore } from '@/stores/admin';
import type { Bio } from '@/types/Bio';
import Searchbar from '@/components/global/Searchbar.vue';
import Alert from '@/components/global/Alert.vue';
import LoadingCircle from '@/components/global/LoadingCircle.vue';
import { tr } from 'motion/react-client';

const adminStore = useAdminStore();
const biolists = ref<Bio[]>([]);
const search = ref('');
const filteredData = ref<Bio[]>([]);
const alertStatus = ref<number>(0);
const alertError = ref<string>('');
const alertMessage = ref<string>('');
const alertActive = ref<boolean>(false);
const isLoading = ref<boolean>(true);

const showAlert = (status: number, error: string, message: string) => {
  alertStatus.value = status;
  alertError.value = status === 200 ? '' : error;
  alertMessage.value = message;
  alertActive.value = true;
};

onMounted(async()=>{
  try {
    isLoading.value = true;
    await adminStore.fetchAllBios();
    biolists.value = [...adminStore.bios];
    filteredData.value = [...biolists.value];
  }catch (error: any){
    showAlert(
      error.response?.status || 500,
      error.response?.data?.error || "Error",
      error.response?.data?.message || "Failed to fetch bios"
    );
  }finally{
    isLoading.value = false;
  }
})


function changeSearch(filtered: Bio[]) {
  filteredData.value = filtered;
}

async function handleBioDeleted(bio: Bio) {
  try {
    showAlert(200, '', `Bio "${bio.name}" deleted successfully!`);
    await adminStore.fetchAllBios();
    biolists.value = [...adminStore.bios];
    filteredData.value = [...biolists.value];
  } catch (error: any) {
    showAlert(
      error.response?.status || 500,
      error.response?.data?.error || "Error",
      error.response?.data?.message || "Failed to delete bio"
    );
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-col gap-4">
    <div class="flex flex-row justify-between content-center items-center w-full rounded-[16px] p-4 bg-zinc-700/50">
      <Searchbar v-model="search" :basearray="biolists" @filtered="changeSearch"></Searchbar>
    </div>

    <div class="w-full h-full biosList overflow-y-auto flex-col space-y-6 pb-20 pr-4">
      <div class="w-full flex flex-col gap-5">
        <div class="w-full" v-for="item in filteredData" :key="item.handle">
          <BioListItem
            :avatar="item.handle"
            :name="item.name"
            :handle="item.handle"
            :views="item.views"
            :widgetsCount="item.widgetsCount"
            :pagesCount="item.pagesCount"
            :createdAt="item.createdAt || null"
            :updatedAt="item.updatedAt || null"
            @bioDeleted="handleBioDeleted(item)"
          ></BioListItem>
        </div>
        <div v-if="isLoading" class="w-full flex flex-col justify-center content-center items-center py-8">
          <LoadingCircle />
        </div>
      </div>
    </div>
  </div>
  <Alert
    :status="alertStatus"
    :error="alertError"
    :message="alertMessage"
    :active="alertActive"
  />
</template>
<style>
/* width */
.biosList::-webkit-scrollbar {
  @apply w-2 rounded-full
}

/* Track */
.biosList::-webkit-scrollbar-track {
  @apply bg-zinc-800 rounded-full
}

/* Handle */
.biosList::-webkit-scrollbar-thumb {
  @apply bg-zinc-600/50 rounded-full border-4
}

/* Handle on hover */
.biosList::-webkit-scrollbar-thumb:hover {
  @apply bg-zinc-700 rounded-full
}
</style>
