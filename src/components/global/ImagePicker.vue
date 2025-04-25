<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ApiWrapper } from '@/composables/ApiWrapper';
import Icon from './Icon.vue';

const isUploading = ref(false);
const selectedImages = ref<string[]>([]);

const props = defineProps<{
  widgetId: string;
  images: string[];
}>();

const emit = defineEmits<{
  (e: 'change-images', images: string[]): void;
}>();

onMounted(() => {
  selectedImages.value = props.images;
});

function getImg(image: string): string {
  return `${import.meta.env.VITE_API_BASE_URL}/file/${image}`;
}

const handleImageSelection = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.multiple = false;

  fileInput.onchange = async (event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      Array.from(target.files).forEach(async (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target?.result) {
            // Csak előnézethez használható, ha szükséges
          }
        };

        reader.readAsDataURL(file);

        // Kép feltöltése a szerverre
        try {
          isUploading.value = true;
          const formData = new FormData();
          formData.append('file', file);

          const response = await ApiWrapper.post(`bio/widgetImg`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          // Kép URL hozzáadása a widgethez
          const imageUrl = getImg(response.data);
          selectedImages.value.push(imageUrl);
          emit('change-images', selectedImages.value);
        } catch (error) {
          console.error('Failed to upload image:', error);
        } finally {
          isUploading.value = false;
        }
      });
    }
  };

  fileInput.click();
};

const removeImage = async (index: number) => {
  try {
    selectedImages.value.splice(index, 1);
    emit('change-images', selectedImages.value);
  } catch (error) {
    console.error('Failed to delete image:', error);
  }
};

// Kép mozgatása fel
const moveImageUp = (index: number) => {
  if (index > 0) {
    const temp = selectedImages.value[index];
    selectedImages.value[index] = selectedImages.value[index - 1];
    selectedImages.value[index - 1] = temp;
    emit('change-images', selectedImages.value); // Esemény kibocsátása
  }
};

// Kép mozgatása le
const moveImageDown = (index: number) => {
  if (index < selectedImages.value.length - 1) {
    const temp = selectedImages.value[index];
    selectedImages.value[index] = selectedImages.value[index + 1];
    selectedImages.value[index + 1] = temp;
    emit('change-images', selectedImages.value); // Esemény kibocsátása
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full gap-4">
    <div
      class="flex flex-col items-center justify-center w-full rounded-lg border border-zinc-100/30 bg-zinc-200/10 hover:bg-zinc-200/20 active:bg-zinc-200/30 duration-200 py-2 px-4 gap-4 cursor-pointer"
      @click="handleImageSelection">
      <h3 class="text-lg text-center">
        <slot name="label">Click to select images</slot>
      </h3>
    </div>

    <div v-if="isUploading" class="text-center text-zinc-500">Uploading...</div>

    <div v-if="images.length" class="w-full grid grid-row gap-4">
      <div v-for="(image, index) in images" :key="index" class="relative group">
        <img :src="image" alt="Selected Image" class="w-full h-32 object-cover border border-zinc-300 rounded" />
        <button
          class="absolute top-1 right-1 bg-rose-500 text-zinc-200 rounded-full px-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
          @click.prevent="removeImage(index)">
          <Icon type="close"/>
        </button>
        <button
          v-if="index > 0"
          class="absolute top-1 left-1 bg-zinc-700 text-zinc-200 rounded-full px-1 group-hover:opacity-100 transition-opacity"
          @click.prevent="moveImageUp(index)">
          <Icon type="keyboard_arrow_up"/>
        </button>
        <button
          v-if="index < selectedImages.length - 1"
          class="absolute bottom-1 left-1 bg-zinc-700 text-zinc-200 rounded-full px-1 group-hover:opacity-100 transition-opacity"
          @click.prevent="moveImageDown(index)">
          <Icon type="keyboard_arrow_down"/>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>
