<script lang="ts" setup>
import { onMounted, ref, watchEffect, computed } from 'vue';
import Searchbar from '@/components/global/Searchbar.vue';
import BioListItem from '@/components/global/BioListItem.vue';
import Button from '@/components/global/Button.vue';
import type { Bio } from '@/types/Bio';
import router from '@/router';
import { useBioStore } from '@/stores/bio';
import Modal from '@/components/global/Modal.vue';
import Alert from '@/components/global/Alert.vue';

const bioStore = useBioStore();
const search = ref('');
const biolists = ref<Bio[]>([]);
const filteredData = ref<Bio[]>([]);
const showModal = ref(false);
const alertStatus = ref<number>(0);
const alertError = ref<string>('');
const alertMessage = ref<string>('');
const alertActive = ref<boolean>(false);


const pendingBioHandle = ref<string | null>(null);

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

const modalActions = [
  {
    text: "Create",
    icon: "add",
    rank: "primary",
    callback: "submit"
  },
  {
    text: "Cancel",
    icon: "close",
    rank: "secondary",
    callback: "close"
  }
];

const modalInputs = computed(() => [
  {
    placeholder: "Enter bio name",
    label: "Bio Name",
    modelValue: bioName.value,
    type: "text",
  },
  {
    placeholder: "Enter handle (without @)",
    label: "Bio Handle",
    modelValue: bioHandle.value,
    type: "text",
  }
]);

const handleModelValueUpdate = (data: { index: number, value: string }) => {
  if (data.index === 0) {
    bioName.value = data.value;
  } else if (data.index === 1) {
    bioHandle.value = data.value;
  }
};

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

const handleBioDeleted = (data: { handle: string, name: string }) => {
  showAlert(200, '', `Bio "${data.name}" deleted successfully!`);
};

onMounted(async () => {
  try {
    await bioStore.fetchBios();
    biolists.value = [...bioStore.bios];
    filteredData.value = [...biolists.value];
  } catch (error: any) {
    showAlert(
      error.response?.status || 500,
      error.response?.data?.error || "Error",
      error.response?.data?.message || "Failed to fetch bios"
    );
  }
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
      <Button
        rank="primary"
        size="small"
        text="Create bio"
        icon-position="right"
        icon-type="add"
        @click="openCreateModal"
      ></Button>
    </div>

    <div class="w-full h-full baseDash overflow-y-auto flex-col space-y-6">
      <div v-for="item in filteredData" :key="item.handle">
        <BioListItem
          :name="item.name"
          :handle="item.handle"
          :views="item.views"
          :widgets="item.widgets"
          :createdAt="item.createdAt"
          :updatedAt="item.updatedAt"
          @bioDeleted="handleBioDeleted"
        ></BioListItem>
      </div>
    </div>
  </div>

  <Modal
    v-if="showModal"
    :show="showModal"
    @close="closeModal"
    primaryMsg="Create a new Bio"
    secondaryMsg="Set your bio's display name and handle"
    :inputs="modalInputs"
    :actions="modalActions"
    @update:modelValue="handleModelValueUpdate"
    @submit="createBio"
  ></Modal>

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
