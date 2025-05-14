<script lang="ts" setup>
import { ref } from 'vue';
import Icon from './Icon.vue';
import BioPfp from './BioPfp.vue';
import Button from '@/components/global/Button.vue';
import NewModal from './NewModal.vue';
import { useBioStore } from '@/stores/bio';
import { useRouter } from 'vue-router';
import { DateTime } from '@/composables/date';

const showModal = ref(false);
const bioStore = useBioStore();

const props = defineProps<{
  name: string;
  handle: string;
  views: number;
  widgetsCount: number;
  pagesCount: number;
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

const emit = defineEmits(['bioDeleted']);

async function confirmDelete() {
  try {
    await bioStore.deleteBio(props.handle);

    showModal.value = false;

    emit('bioDeleted', { handle: props.handle, name: props.name });
  } catch (error) {
    console.error("Error deleting bio:", error);
    alert("An error occurred while deleting.");
  }
}

function handleModalClose() {
  showModal.value = false;
}
</script>

<template>
  <div class="w-full rounded-2xl p-4 bg-zinc-700/50 hover:bg-zinc-600/50 transition-all duration-200 grid grid-cols-1 sm:grid-cols-[1fr,auto] lg:grid-cols-[1fr,2fr,auto] gap-4 items-center">

    <!-- Avatar and basic info row -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div class="flex items-center gap-4">
        <BioPfp class="w-16 h-16 flex-shrink-0" :bioHandle="avatar" />
        <div class="flex flex-col">
          <h3 class="text-xl lg:text-2xl text-zinc-100 font-medium transition-all duration-200 hover:text-white">{{ name }}</h3>
          <h3 class="text-sm lg:text-base text-zinc-500">@{{ handle }}</h3>
        </div>
      </div>

    </div>

    <div class="flex flex-col md:flex-row justify-start content-start md:items-center items-start gap-3">

      <!-- Stats section -->
      <div class="flex gap-4 mt-3 sm:mt-0">
        <div class="flex items-center gap-1 text-zinc-500 transition-all duration-200 hover:text-zinc-400">
          <Icon type="visibility" size="lg" />
          <span class="text-sm lg:text-base">{{ views }}</span>
        </div>
        <div class="flex items-center gap-1 text-zinc-500 transition-all duration-200 hover:text-zinc-400">
          <Icon type="widgets" size="lg" />
          <span class="text-sm lg:text-base">{{ widgetsCount }}</span>
        </div>
        <div class="flex items-center gap-1 text-zinc-500 transition-all duration-200 hover:text-zinc-400">
          <Icon type="wysiwyg" size="lg" />
          <span class="text-sm lg:text-base">{{ pagesCount }}</span>
        </div>
      </div>
      <!-- Dates section -->
      <div class="flex flex-col sm:flex-row gap-3 text-sm">
        <div class="flex flex-col">
          <span class="text-zinc-500 font-medium">Created</span>
          <span class="text-zinc-600">{{ DateTime.formatDate(createdAt) }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-zinc-500 font-medium">Last edited</span>
          <span class="text-zinc-600">{{ DateTime.formatDate(updatedAt) }}</span>
        </div>
      </div>
    </div>


    <!-- Actions section -->
    <div class="flex flex-row justify-end sm:justify-start content-center items-center gap-3 self-center">
      <Button @click="deleteBio" text="Delete" icon="delete" primary />
      <Button @click="() => openEditor(handle)" text="Edit" icon="edit" primary />
    </div>
  </div>

  <NewModal
    :show="showModal"
    @close="handleModalClose"
    :title="`Delete ${name}?`"
  >
    <div class="flex flex-col gap-4 w-full">
      <p class="text-center text-zinc-400">Are you sure you want to delete @{{ handle }}?</p>
      <div class="flex justify-end gap-2">
        <Button
          text="Cancel"
          @click="handleModalClose"
        />
        <Button
          primary
          text="Delete"
          icon="delete"
          @click="confirmDelete"
        />
      </div>
    </div>
  </NewModal>
</template>

<style>
.stats {
  @apply flex flex-row items-center text-zinc-500 space-x-1;
}

.dates {
  @apply flex flex-col space-x-0 justify-center items-start;
}
</style>
