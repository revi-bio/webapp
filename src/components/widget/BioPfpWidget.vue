<script lang="ts" setup>
import { defineProps, ref, onMounted, watch } from 'vue';
import { useBioStore } from '@/stores/bio';
import BioPfp from '../../components/global/BioPfp.vue';

const props = defineProps({
  bioHandle: {
    type: String,
    required: true
  }
});

const bioStore = useBioStore();


onMounted(async () => {
  if (bioStore.bios.length === 0) {
    await bioStore.fetchBios();
  }
});

const handleChangePicture = (event) => {
  event.stopPropagation();
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';

  fileInput.onchange = async (event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      try {
        //console.log('Uploading file using handle:', props.bioHandle);
        await bioStore.uploadBioPfp(target.files[0], props.bioHandle);
        //console.log('Profile picture updated successfully');
      } catch (error) {
        //console.error('Error uploading profile picture:', error);
      }
    }
  };

  fileInput.click();
};
</script>

<template>
  <div class="flex flex-row justify-start content-center items-center w-full rounded-lg border border-zinc-100/30 bg-zinc-200/10 hover:bg-zinc-200/20 active:bg-zinc-200/30 duration-200 py-5 px-2 gap-2" @click="handleChangePicture">
    <BioPfp class="w-20 h-20" :bioHandle="bioHandle" />
    <h3 class="text-lg">Change/Drag profile picture</h3>
  </div>
</template>
