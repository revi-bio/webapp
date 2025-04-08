<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue';
import { useBioStore } from '@/stores/bio';
import BioPfp from '../../components/global/BioPfp.vue';
import Button from '../global/Button.vue';

const props = defineProps({
  bioHandle: {
    type: String,
    default: ''
  }
});

const bioStore = useBioStore();
const currentHandle = ref('');

onMounted(async () => {
  if (bioStore.bios.length === 0) {
    await bioStore.fetchBios();
  }


  if (props.bioHandle) {
    currentHandle.value = props.bioHandle;
  } else if (bioStore.bios.length > 0) {
    currentHandle.value = bioStore.bios[0].handle;
  }

  console.log('Using bio handle:', currentHandle.value);
});

const handleChangePicture = (event) => {

  event.stopPropagation();

  console.log('Change picture button clicked');

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';

  fileInput.onchange = async (event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      try {
        console.log('Uploading file using handle:', currentHandle.value);
        await bioStore.uploadBioPfp(target.files[0], currentHandle.value);
        console.log('Profile picture updated successfully');
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  fileInput.click();
};
</script>

<template>
  <div class="flex flex-col justify-center content-center items-center w-full rounded-lg border border-zinc-100/30 bg-zinc-200/10 hover:bg-zinc-200/20 active:bg-zinc-200/30 duration-200 py-5 px-2 gap-2">

    <BioPfp class="w-20 h-20" :bioHandle="bioHandle" />

    <h3 class="text-xl w-full text-center">
      Set and drag your bio's profile picture in
    </h3>


    <Button
      rank="primary"
      size="small"
      icon-position="right"
      icon-type="edit"
      text="Change"
      @click="handleChangePicture"
    ></Button>
  </div>
</template>
