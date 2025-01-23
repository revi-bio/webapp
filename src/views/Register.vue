<script lang="ts" setup>
  import AuthBanner from '@/components/authentication/AuthBanner.vue';
  import Input from '@/components/global/Input.vue';
  import Button from '@/components/global/Button.vue';
  import Logo from '@/components/global/Logo.vue';
  import Checkbox from '@/components/global/Checkbox.vue';
  import { RouterLink } from 'vue-router';
</script>
<template>
  <div class="flex flex-row w-full h-full p-5">
    <div class="w-2/5 h-full ">

      <div class="w-full h-full flex flex-col justify-center content-center items-center gap-[3rem] p-[7rem] relative">
        <RouterLink to="/"><Logo type="revibio" class="absolute top-4 left-4"></Logo></RouterLink>
        <div class="w-full flex flex-col justify-center content-center items-start gap-3">
          <h3 class="text-6xl">Create an account</h3>
          <p class="text-[#52525B]">Welcome to revi.bio! You can start by completing the form below to register your account.</p>
        </div>
        <form class="w-full flex flex-col justify-center content-start items-start gap-3">
          <Input placeholder="Display name"></Input>
          <Input placeholder="Email"></Input>
          <Input placeholder="Password"></Input>
          <Input placeholder="Confirm password"></Input>
          <Checkbox text="I agree to sell my insides to revi.bio"></Checkbox>
        </form>
        <div class="w-full flex flex-row justify-start content-center items-center gap-3">
          <Button text="Register" rank="primary" size="normal" icon-position="none"></Button>
          <p class="text-[#71717A]"><RouterLink to="login">- or Log in</RouterLink></p>
        </div>

      </div>

    </div>
    <AuthBanner class="w-3/5"></AuthBanner>
  </div>

</template>
