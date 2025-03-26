<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const userStore = useUserStore();
const defaultPfp = new URL('@/assets/defPfp.png', import.meta.url).href;

const currentPfp = computed(() => {
  const pfpLocation = userStore.getUserData()?.avatar;
  return pfpLocation ? `http://65.87.7.245/file/${pfpLocation}` : defaultPfp;
});

</script>

<template>
    <img class="rounded-full object-cover" :key="currentPfp" :src="currentPfp" alt="Profile Picture">
</template>
