<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const props = defineProps<{
  avatarUrl: string
}>();
const userStore = useUserStore();
const defaultPfp = new URL('@/assets/defPfp.png', import.meta.url).href;

const currentPfp = computed(() => {
  const pfpLocation = props.avatarUrl
  return pfpLocation ? `${import.meta.env.VITE_API_BASE_URL}/file/${pfpLocation}` : defaultPfp;
});

</script>

<template>
    <img class="rounded-full object-cover" :key="currentPfp" :src="currentPfp" alt="Profile Picture">
</template>
