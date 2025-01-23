<script lang="ts" setup>
  import AuthBanner from '@/components/authentication/AuthBanner.vue';
  import Input from '@/components/global/Input.vue';
  import Button from '@/components/global/Button.vue';
  import Logo from '@/components/global/Logo.vue';
  import { RouterLink } from 'vue-router';
</script>
<template>
  <div class="flex flex-row w-full h-full p-5">
    <div class="w-2/5 h-full flex flex-row justify-center content-center items-center relative">
      <RouterLink to="/"><Logo type="revibio" class="absolute top-4 left-4"></Logo></RouterLink>
      <div class="w-3/4 h-full flex flex-col justify-center content-center items-center gap-[3rem] ">
        <div class="w-full flex flex-col justify-center content-center items-start gap-3">
          <h3 class="text-6xl">Welcome back!</h3>
          <p class="text-[#52525B]">Let’s continue where you left off. Forgot your password? Click here to start the password reset process.</p>
        </div>
        <form class="w-full flex flex-col justify-start content-center items-center gap-3">
          <Input placeholder="Email"></Input>
          <Input placeholder="Password"></Input>
        </form>
        <div class="w-full flex flex-row justify-start content-center items-center gap-3">
          <Button text="Log in" rank="primary" size="normal" icon-position="none"></Button>
          <p class="text-[#71717A]"><RouterLink to="register">- or Create an account</RouterLink></p>
        </div>

      </div>

    </div>
    <AuthBanner class="w-3/5"></AuthBanner>
  </div>

</template>
