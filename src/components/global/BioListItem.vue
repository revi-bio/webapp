<script lang="ts" setup>
import { ref } from 'vue';
import Icon from './Icon.vue';
import BioPfp from './BioPfp.vue';
import Button from '@/components/global/Button.vue';
import Modal from './Modal.vue';
import { useBioStore } from '@/stores/bio';
import { useRouter } from 'vue-router';
import { DateTime } from '@/composables/date';

const showModal = ref(false);
const bioStore = useBioStore();

const props = defineProps<{
  name: string;
  handle: string;
  views: number;
  widgets: number;
  pages: number;
  avatar: string,
  createdAt: string;
  updatedAt: string;
}>();

const router = useRouter();

function deleteBio() {
  showModal.value = true;
}

function openEditor(handle: string) {
  bioStore.setCurrentHandle(handle)
  router.push({
    name: 'Editor',
    params: { handle }
  });
  console.log('handle from params: ', handle)
  console.log('handle from getCurrentHandle:', bioStore.getCurrentHandle())
}

async function confirmDelete() {
  try {
    const response = await bioStore.deleteBio(props.handle);
    if (response) {
      showModal.value = false;
    }
  } catch (error) {
    console.error("Error deleting bio:", error);
    alert("An error occurred while deleting.");
  }
}
const modalActions = [
  {
    text: "Delete",
    icon: "delete",
    rank: "primary" as const,
    callback: "delete"
  },
  {
    text: "Cancel",
    icon: "close",
    rank: "secondary" as const,
    callback: "close"
  }
];
</script>

<template>
  <div class="flex flex-row justify-between w-full rounded-[16px] p-4 bg-zinc-700/50 hover:bg-zinc-600/50 transition duration-200">
    <div class="flex flex-row space-x-4 items-center">
      <BioPfp class="w-[64px] h-[64px]" :bioHandle="avatar"></BioPfp>
      <div class="flex flex-col">
        <h3 class="text-2xl text-zinc-100 w-full">{{ name }}</h3>
        <h3 class="text-md text-zinc-500">@{{ handle }}</h3>
      </div>
      <div class="flex space-x-1">
        <div class="stats">
          <Icon type="visibility" size="4"></Icon>
          <h3>{{ views }}</h3>
        </div>
        <div class="stats">
          <Icon type="widgets" size="4"></Icon>
          <h3>{{ widgets }}</h3>
        </div>
        <div class="stats">
          <Icon type="wysiwyg" size="4"></Icon>
          <h3>{{ pages }}</h3>
        </div>
      </div>
      <div class="flex space-x-2 justify-evenly">
        <div class="dates text-zinc-500">
          <h3 class="font-medium">Created at</h3>
          <h3 class="text-zinc-600">{{ DateTime.formatDate(createdAt) }}</h3>
        </div>
        <div class="dates text-zinc-500">
          <h3 class="font-medium">Last edited at</h3>
          <h3 class="text-zinc-600">{{ DateTime.formatDate(updatedAt) }}</h3>
        </div>
      </div>
    </div>
    <div class="flex space-x-4 py-4">
      <Button icon-position="left" icon-type="delete" text="Delete" rank="primary" size="small" v-on:click="deleteBio()"></Button>
      <Button icon-position="left" icon-type="edit" text="Edit" rank="primary" size="small" v-on:click="openEditor(handle)"></Button>
    </div>
  </div>

  <Modal
    :show="showModal"
    @close="showModal = false"
    :primaryMsg="`Delete ${name}?`"
    :secondaryMsg="`Are you sure you want to delete ${handle}?`"
    :actions="modalActions"
    @delete="confirmDelete"
  ></Modal>
</template>

<style>
.stats {
  @apply flex flex-row items-center text-zinc-500 space-x-1;
}

.dates {
  @apply flex flex-col space-x-0 justify-center items-start;
}
</style>
