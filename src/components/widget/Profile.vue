<script lang="ts" setup>
import ProfilePic from '../global/ProfilePic.vue';


const props = defineProps<{
  profile_align: "start" | "end" | "center";
  profile_over?: boolean;
  name_align: "left" | "right" | "center";
  name: string;
  tag: string;
  badge: string;
  text: string;
}>();

</script>

<template>
    <div class="flex w-full p-2" :class="`${profile_over ? 'pt-8 relative' : ''}`">
      <div :class="`flex w-full ${profile_over ? 'absolute -top-8 pr-4' : 'static'} justify-${profile_align}`">
        <div :class="`flex `">
          <ProfilePic class= "w-[64px] h-[64px]"></ProfilePic>
        </div>
      </div>
      <h1 class="text-2xl">{{ name }}</h1>
      <p class="text-sm text-zinc-400" >{{ tag }}</p>
      <p class="text-md">{{ text }}</p>
    </div>
</template>

<style>

</style>