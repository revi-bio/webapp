<script lang="ts" setup>
import Logo from './Logo.vue';
import Icon from './Icon.vue';
import ProfilePic from './ProfilePic.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="flex flex-col justify-between content-center items-center h-full px-2 text-zinc-400">
    <div class="flex flex-col justify-center content-center items-center gap-8">
      <Logo type="revi"></Logo>
      <span class="bg-zinc-800 rounded-full w-full h-[2px]"><!--Separator--></span>
      <RouterLink to="/overview" class="navItem"><span >
        <Icon size="3xl" type="house"></Icon>
      </span></RouterLink>
      <RouterLink to="/bios" class="navItem"><span >
        <Icon size="3xl" type="person"></Icon>
      </span></RouterLink>
      <RouterLink to="" class="navItem"><span >
        <Icon size="3xl" type="shield_person"></Icon>
      </span></RouterLink>
    </div>
    <div class="flex flex-col justify-center content-center items-center gap-8">
      <RouterLink to="/settings" class="navItem"><span >
        <Icon size="3xl" type="settings"></Icon>
      </span></RouterLink>
      <RouterLink to="" class="navItem"><span>
        <Icon size="3xl" type="mail"></Icon>
      </span></RouterLink>
      <ProfilePic class="w-[48px] h-[48px]"></ProfilePic>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .navItem {
    @apply py-1 px-2 rounded-lg hover:bg-zinc-700/25 transition duration-200 active:bg-zinc-500/25 cursor-pointer;
  }
</style>
