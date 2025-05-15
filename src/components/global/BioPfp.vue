<script lang="ts" setup>
import { computed, onMounted, defineProps, ref, watch } from 'vue';
import { useBioStore } from '@/stores/bio';

const props = defineProps({
  bioHandle: {
    type: String,
    default: ''
  }
});

const bioStore = useBioStore();
const defaultPfp = new URL('@/assets/defPfp.png', import.meta.url).href;
const pfpUrl = ref<string | null>(null);

const fetchPfpUrl = async () => {
  if (!props.bioHandle) return;

  let url = bioStore.getBioPfpUrl(props.bioHandle);

  if (!url) {
    const bio = await bioStore.fetchBio(props.bioHandle);
    if (bio?.avatar) {
      url = `${import.meta.env.VITE_API_BASE_URL}/file/${bio.avatar}`;
    }
  }

  pfpUrl.value = url;
};


onMounted(fetchPfpUrl);

watch(() => props.bioHandle, fetchPfpUrl);

const BioPfp = computed(() => {
  return pfpUrl.value || defaultPfp;
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
