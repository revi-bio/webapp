<script lang="ts" setup>
import ProfilePic from '../global/ProfilePic.vue';


const props = defineProps<{
  profile_align?: "left" | "right" | "center" | "left-overlap" | "right-overlap" | "center-overlap";
  name_align: "left" | "right" | "center";
  name: string;
  tag: string;
  badge: string;
  text: string;
}>();

</script>

<template>
    <div class="bg-zinc-700 h-full w-full">
        <h1>{{ name }}</h1>
        <ProfilePic class="w-[64px] h-[64px]"></ProfilePic>
        <p>{{ tag }}</p>
        <p>{{ text }}</p>

    </div>
</template>

<style scoped>

</style>