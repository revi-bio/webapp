<script lang="ts" setup>
  import AuthBanner from '@/components/authentication/AuthBanner.vue';
  import Input from '@/components/global/Input.vue';
  import Button from '@/components/global/Button.vue';
  import Logo from '@/components/global/Logo.vue';
  import Checkbox from '@/components/global/Checkbox.vue';
  import { RouterLink } from 'vue-router';
  import { ApiWrapper } from '@/composables/ApiWrapper';
  import { useUserStore } from '@/stores/user';
  import { ref } from 'vue'
import router from '@/router';

  const userStore = useUserStore();
  const displayName = ref('');
  const email = ref('');
  const password = ref('');
  const confPassword = ref('');

  const onRegister = async () => {
  try {
    if (confPassword.value !== password.value) {
      alert("The given passwords are not the same!");
      return;
    }

    console.log(displayName.value, email.value, password.value, confPassword.value);

    const res = await ApiWrapper.post<{jwt: string }>('auth/register', {
      displayName: displayName.value,
      email: email.value,
      password: password.value
    });

    if (res.status === 201 && res.data.jwt) {
      userStore.setJwt(res.data.jwt);
      router.push('baseDash/overview');
    } else {
      console.error("Registration failed:", res);
    }

  } catch (error) {
    console.error("Error during registration:", error);
  }
};

</script>
<template>
  <div class="flex flex-row w-full h-full p-5">
    <div class="w-2/5 h-full flex flex-row justify-center content-center items-center relative">
      <RouterLink to="/"><Logo type="revibio" class="absolute top-4 left-4"></Logo></RouterLink>
      <div class="w-3/4 h-full flex flex-col justify-center content-center items-center gap-[3rem]">

        <div class="w-full flex flex-col justify-center content-center items-start gap-3">
          <h3 class="text-6xl">Create an account</h3>
          <p class="text-[#52525B]">Welcome to revi.bio! You can start by completing the form below to register your account.</p>
        </div>
        <form class="w-full flex flex-col justify-center content-start items-start gap-3">
          <Input type="text" placeholder="Display name" v-model="displayName"></Input>
          <Input type="email" placeholder="Email" v-model="email"></Input>
          <Input type="password" placeholder="Password" v-model="password"></Input>
          <Input type="password" placeholder="Confirm password" v-model="confPassword"></Input>
          <Checkbox text="I agree to sell my insides to revi.bio"></Checkbox>
        </form>
        <div class="w-full flex flex-row justify-start content-center items-center gap-3">
          <Button text="Register" rank="primary" size="normal" icon-position="none" @click.prevent="onRegister"></Button>
          <p class="text-[#71717A]"><RouterLink to="login">- or Log in</RouterLink></p>
        </div>

      </div>

    </div>
    <AuthBanner class="w-3/5"></AuthBanner>
  </div>

</template>
