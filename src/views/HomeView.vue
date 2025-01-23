<script setup lang="ts">
import Logo from '@/components/global/Logo.vue';
import { RouterLink } from 'vue-router';
import Button from '@/components/global/Button.vue';
import Icon from '@/components/global/Icon.vue';
</script>

<template>
<div class="overflow-y-scroll flex flex-col  snap-mandatory snap-y scroll-container">

<!--Main content-->
  <main class="flex flex-col justify-center content-start items-center w-full min-h-full p-5 snap-center">

    <nav class="flex flex-row justify-between content-center items-center w-full">
      <Logo type="revi"></Logo>
      <div  class="flex flex-row justify-center content-center items-center gap-10">
        <!--RouterLinks-->
        <RouterLink to="login">Log In</RouterLink>
        <RouterLink to="register">Register</RouterLink>
      </div>
    </nav>

    <div class="flex flex-col w-full justify-center content-center h-full items-center gap-5">
      <h3 class="text-2xl font-light text-zinc-50">A place to unfold</h3>
      <h3 class="text-8xl text-zinc-200 animate-pulse animate-infinite animate-duration-[3000ms]">Supercharge</h3>
      <h3 class="text-8xl text-zinc-400 animate-pulse animate-infinite animate-duration-[3000ms]">your online identity</h3>
      <Logo type="revibio"></Logo>
      <span class="flex flex-row justify-center content-center items-center gap-5">
        <Button text="Start your journey" size="normal" rank="primary" icon-position="none"></Button>
        <Button text="Learn more" size="normal" rank="secondary" icon-position="none"></Button>
      </span>
    </div>
  </main>

<!--SVGs-->

<!--Learn more section-->
  <section class="flex flex-col w-full justify-center content-center items-center p-5">


    <!--Pros-->
    <div class="flex flex-col w-full justify-center content-center items-center gap-5 h-screen snap-center">
      <h3 class="text-4xl text-rose-500">Free to use.</h3>
      <h3 class="text-4xl text-zinc-200">Easy to handle.</h3>
      <h3 class="text-4xl text-zinc-300">Made for inviduals like you.</h3>
      <h3 class="text-4xl text-zinc-400">Open source.</h3>
    </div>

    <!--Our goal-->
    <div class="flex flex-col w-full justify-center content-end items-end gap-5 h-screen snap-center">
      <h3 class="text-4xl text-rose-600">Our goal</h3>
      <p class="text-2xl text-right text-rose-100 w-3/5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et distinctio ex rem illum dolorum unde non molestiae ducimus dolorem tempora ut quis obcaecati nobis impedit aperiam, facere enim dignissimos illo! Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>

    <!--Emerge-->
    <div class="flex flex-col w-full justify-center content-start items-start gap-5 h-screen snap-center z-30">
      <h3 class="text-6xl text-zinc-100">Discover your creativity.</h3>
      <h3 class="text-6xl text-zinc-400">Emerge from social media.</h3>
    </div>

    <!--Creating-->
    <div class="flex flex-col w-full justify-center content-end items-end gap-5 h-screen z-10 snap-center">
      <h3 class="text-4xl text-rose-500">Creating a bio site</h3>
      <p class="text-2xl text-right text-rose-100 w-3/4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et distinctio ex rem illum dolorum unde non molestiae ducimus dolorem tempora ut quis obcaecati nobis impedit aperiam, facere enim dignissimos illo! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum tempora excepturi voluptates reiciendis repellat a nihil consectetur. Fuga sapiente expedita doloremque alias unde consequatur velit. Vel odit eveniet fugiat quasi.</p>
    </div>

    <!--Option-->
    <div class="flex flex-col w-full justify-center content-start items-start gap-5 h-screen snap-center">
      <h3 class="text-6xl text-zinc-200">It is not just an option,</h3>
      <h3 class="text-6xl text-zinc-400">but a solution.</h3>
    </div>

    <!--Explore-->
    <div class="flex flex-col w-full justify-center content-end items-end gap-5 h-screen snap-center">
      <h3 class="text-4xl text-rose-400">Explore our services</h3>
      <p class="text-2xl text-right text-rose-50 w-3/4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et distinctio ex rem illum dolorum unde non molestiae ducimus dolorem tempora ut quis obcaecati nobis impedit aperiam, facere enim dignissimos illo! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum tempora excepturi voluptates reiciendis repellat a nihil consectetur. Fuga sapiente expedita doloremque alias unde consequatur velit. Vel odit eveniet fugiat quasi.</p>
    </div>

    <div class="flex flex-col w-full justify-center content-center items-center gap-5 h-screen snap-center">
      <h3 class="text-4xl"><span class="text-rose-500">Revi</span><span class="text-zinc-200">sion</span></h3>
      <h3 class="text-4xl text-zinc-200">You are not just a user.</h3>
      <h3 class="text-4xl text-zinc-400">But a <span class="text-rose-500">true invidual.</span></h3>
      <Button text="Start your journey" size="normal" rank="primary" icon-position="none"></Button>
    </div>
  </section>
</div>

</template>

<style lang="scss" scoped>

.scroll-container {
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;

}
.scroll-container::-webkit-scrollbar {
  display: none;
}

</style>
