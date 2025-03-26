<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const userStore = useUserStore();
const defaultPfp = new URL('@/assets/defPfp.png', import.meta.url).href;

const pfpLocation =userStore.getUserData()?.avatar;
const pfpPath = "http://65.87.7.245/file/"+pfpLocation;
const currentPfp =  computed(() => pfpLocation ? pfpPath : defaultPfp);
//revi.bio/files/
</script>

<template>
    <img class="rounded-full bg-cover" :src="currentPfp" alt="Profile Picture">
</template>
