<script lang="ts" setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const defaultPfp = new URL('@/assets/defPfp.png', import.meta.url).href;

const pfpLocation = userStore.getUserData()?.profilePic;
const currentPfp = (pfpLocation && pfpLocation !== "") ? pfpLocation : defaultPfp;
//revi.bio/files/
</script>

<template>
    <img class="rounded-full" :src="currentPfp" alt="Profile Picture">
</template>
