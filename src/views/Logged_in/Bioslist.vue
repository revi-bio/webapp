<script lang="ts" setup>
import { onMounted, ref, watchEffect, watch, onUnmounted } from 'vue';
import Searchbar from '@/components/global/Searchbar.vue';
import BioListItem from '@/components/global/BioListItem.vue';
import Button from '@/components/global/Button.vue';
import type { Bio } from '@/types/Bio';
import router from '@/router';
import { useBioStore } from '@/stores/bio';
import NewModal from '@/components/global/NewModal.vue';
import Input from '@/components/global/Input.vue';
import Alert from '@/components/global/Alert.vue';
import LoadingCircle from '@/components/global/LoadingCircle.vue';

const bioStore = useBioStore();
const search = ref('');
const biolists = ref<Bio[]>([]);
const filteredData = ref<Bio[]>([]);
const showModal = ref(false);
const alertStatus = ref<number>(0);
const alertError = ref<string>('');
const alertMessage = ref<string>('');
const alertActive = ref<boolean>(false);
const isLoading = ref<boolean>(true);

const pendingBioHandle = ref<string | null>(null);

const isSmallScreen = ref(false);

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 640;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});

const onAlertHide = () => {
  alertActive.value = false;

  if (pendingBioHandle.value) {
    openEditor(pendingBioHandle.value);
    pendingBioHandle.value = null;
  }
};

const showAlert = (status: number, error: string, message: string) => {
  alertStatus.value = status;
  alertError.value = status === 200 ? '' : error;
  alertMessage.value = message;
  alertActive.value = true;
};

const bioName = ref('');
const bioHandle = ref('');

const resetBioInputs = () => {
  bioName.value = '';
  bioHandle.value = '';
};

const openCreateModal = () => {
  resetBioInputs();
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetBioInputs();
};

const createBio = async () => {
  if (!bioName.value || !bioHandle.value) {
    showAlert(400, "Error", "Name and handle are required!");
    return;
  }

  try {
    const newBio = await bioStore.createBio(bioName.value, bioHandle.value);

    if (newBio) {
      closeModal();
      showAlert(200, "Success", "Bio created successfully!");
      await bioStore.fetchBios();
      biolists.value = [...bioStore.bios];
      filteredData.value = [...biolists.value];
      pendingBioHandle.value = newBio.handle;
    }
  } catch (error: any) {
    showAlert(
      error.response?.status || 500,
      error.response?.data?.error || "Error",
      error.response?.data?.message || "Failed to create bio"
    );
  }
};

const openEditor = (id: string) => {
  router.push({ name: 'Editor', params: { id } });
  console.log(`Opening editor for bio with id: ${id}`);
};

function changeSearch(filtered: Bio[]) {
  filteredData.value = filtered;
}

const handleBioDeleted = async (data: { handle: string, name: string }) => {
  showAlert(200, '', `Bio "${data.name}" deleted successfully!`);
  await bioStore.fetchBios();
  biolists.value = [...bioStore.bios];
  filteredData.value = [...biolists.value];
};

watch(() => bioStore.bios, (newBios) => {
  biolists.value = [...newBios];
  filteredData.value = [...biolists.value];
});

onMounted(async () => {
  try {
    isLoading.value = true;
    await bioStore.fetchBios();
    biolists.value = [...bioStore.bios];
    filteredData.value = [...biolists.value];
  } catch (error: any) {
    showAlert(
      error.response?.status || 500,
      error.response?.data?.error || "Error",
      error.response?.data?.message || "Failed to fetch bios"
    );
  }finally{
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="w-full h-full flex flex-col space-y-6 p-6 pt-20">
    <div class="flex flex-row justify-between content-center items-center w-full rounded-[16px] p-4 bg-zinc-700/50 gap-5">
      <Searchbar v-model="search" :basearray="biolists" @filtered="changeSearch"></Searchbar>
      <Button
        primary
        small
        :text="isSmallScreen ? '' : 'Create bio'"
        :iconRight="!isSmallScreen"
        :iconOnly="isSmallScreen"
        icon="add"
        @click="openCreateModal"
      ></Button>
    </div>

    <div class="w-full h-full baseDash overflow-y-auto flex-col space-y-6 pb-20 sm:pb-10 pr-4">
      <div v-for="item in filteredData" :key="item.handle">
        <BioListItem
          :avatar="item.handle"
          :name="item.name"
          :handle="item.handle"
          :views="item.views"
          :widgetsCount="item.widgetsCount"
          :pagesCount="item.pagesCount"
          :createdAt="item.createdAt"
          :updatedAt="item.updatedAt"
          @bioDeleted="handleBioDeleted"
        ></BioListItem>
      </div>
      <div v-if="isLoading" class="w-full flex flex-col justify-center content-center items-center py-8">
        <LoadingCircle />
      </div>
    </div>
  </div>

  <NewModal
    :show="showModal"
    @close="closeModal"
    title="Create a new Bio"
  >
    <div class="flex flex-col gap-4 w-full">
      <p class="text-center text-zinc-400">Set your bio's display name and handle</p>
      <Input v-model="bioName" placeholder="Enter bio name" label="Bio Name" type="text" />
      <Input v-model="bioHandle" placeholder="Enter handle (without @)" label="Bio Handle" type="text" />
      <div class="flex justify-end gap-2">
        <Button text="Cancel" @click="closeModal" />
        <Button primary text="Create" icon="add" @click="createBio" />
      </div>
    </div>
  </NewModal>

  <Alert
    :status="alertStatus"
    :error="alertError"
    :message="alertMessage"
    :active="alertActive"
    @hide="onAlertHide"
  />
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
