<script setup lang="ts">
import Logo from '@/components/global/Logo.vue';
import Button from '@/components/global/Button.vue';
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

</script>

<template>
  <footer class="flex flex-col lg:flex-row w-full justify-center content-center items-center gap-5 snap-center bg-zinc-950 py-6 px-2.5 relative">

    <div class="flex flex-col justify-center con items-center lg:space-y-20 space-y-5 justify-self-auto w-full">
      <div class="flex flex-col sm:flex-row justify-between items-center text-zinc-500  text-2xl space-x-2">

          <RouterLink v-if="!userStore.loggedIn()" to="login" class="px-10 text-lg hover:text-zinc-400">Log In</RouterLink>
          <RouterLink v-if="!userStore.loggedIn()" to="register" class="px-10 text-lg hover:text-zinc-400">Register</RouterLink>
          <RouterLink v-if="userStore.loggedIn()" to="/baseDash/overview"  class="px-10 text-lg hover:text-zinc-400">Go to overview</RouterLink>
        <RouterLink to="/" class="px-10 text-lg hover:text-zinc-400">Home</RouterLink>
      </div>
      <div class="flex flex-col items-center w-full text-3xl space-y-1 relative">
        <h3 class="text-zinc-400 z-30">Made by us,</h3>
        <h3 class="text-zinc-300 z-30">For you to finish</h3>
        <Logo type="revibio" class="z-30"></Logo>
        <span class="bBrighter"></span>
      </div>
      <div class="flex flex-col items-center w-full space-y-4 text-lg">
        <p class="underline hover:text-zinc-400">Contact us</p>
        <p><span class="text-rose-500">revi</span><span class="text-zinc-700">bio</span>@gmail.com</p>
      </div>
    </div>
  </footer>
</template>

<style>

.bBrighter{
  @apply absolute w-64 h-64 rounded-full bg-zinc-900 blur-[100px] z-0 -top-[60px]
}


</style>
