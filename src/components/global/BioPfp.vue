<script lang="ts" setup>
import { computed, onMounted, defineProps } from 'vue';
import { useBioStore } from '@/stores/bio';

const props = defineProps({
  bioHandle: {
    type: String,
    default: ''
  }
});

const bioStore = useBioStore();
const defaultPfp = new URL('@/assets/defPfp.png', import.meta.url).href;

const BioPfp = computed(() => {
  const pfpUrl = bioStore.getBioPfpUrl(props.bioHandle);
  return pfpUrl || defaultPfp;
});

const handleImageError = (event: Event) => {
  const imgElement = event.target as HTMLImageElement;
  if (imgElement) {
    imgElement.src = defaultPfp;
  }
};
</script>

<template>
  <img
    :src="BioPfp"
    :key="BioPfp"
    alt="Bio_profile_picture"
    class="rounded-full object-cover"
    @error="handleImageError"
  >
</template>
