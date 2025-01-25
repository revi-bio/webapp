<script setup lang="ts">
import Logo from '@/components/global/Logo.vue';
import Button from '@/components/global/Button.vue';
import Icon from './Icon.vue';

</script>

<template>
  <footer class="flex flex-row w-full justify-evenly content-center items-center gap-5 snap-center bg-zinc-950 py-6 px-2.5">
    <div class="flex flex-col items-center space-y-4 text-lg text-zinc-300 w-full">
      <p>Have any questions?</p>
      <p>Check out <span class="underline">FAQ</span></p>
      <Button size="small" icon-position="none" rank="primary" text="Take me there"></Button>
    </div>
    <div class="flex flex-col items-center space-y-20 justify-self-auto w-full">
      <div class="flex flex-row justify-between items-center text-zinc-500 text-2xl space-x-2.5">
        <RouterLink to="login" class="px-10">Log In</RouterLink>
        <RouterLink to="register" class="px-10">Register</RouterLink>
        <RouterLink to="/" class="px-10">Home</RouterLink>
      </div>
      <div class="flex flex-col items-center w-full text-4xl space-y-1 relative">
        <h3 class="text-zinc-400 z-30">Made by us,</h3>
        <h3 class="text-zinc-300 z-30">For you to finish</h3>
        <Logo type="revibio" class="z-30"></Logo>
        <span class="bBrighter"></span>
      </div>
      <div class="flex flex-col items-center w-full space-y-4 text-lg">
        <p class="underline">Contact us</p>
        <p><span class="text-rose-500">revi</span><span class="text-zinc-700">bio</span>@gmail.com</p>
        <span class="w-full h-0.5 rounded-full bg-zinc-500"></span>
        <p class="text-zinc-500 text-xs"><span class="text-rose-500">Copyright©2025.</span> All right reserved</p>
      </div>
    </div>
    <div class="flex flex-col items-center text-lg text-zinc-300 space-y-4 w-full">
      <p>Follow our footsteps</p>
      <p><span class="text-rose-500">xX_Itz_revibio_OG_Xx</span>.revi</p>
      <div class="flex flex-row content-center space-x-4">
        <Icon type="add"></Icon>
        <Icon type="delete"></Icon>
        <Icon type="apps"></Icon>
      </div>
    </div>
  </footer>
</template>

<style>

.bBrighter{
  @apply absolute w-64 h-64 rounded-full bg-zinc-900 blur-[100px] z-0 -top-[60px]
}

</style>
