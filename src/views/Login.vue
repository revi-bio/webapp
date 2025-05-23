<script lang="ts" setup>
  import AuthBanner from '@/components/authentication/AuthBanner.vue';
  import Input from '@/components/global/Input.vue';
  import Button from '@/components/global/Button.vue';
  import Logo from '@/components/global/Logo.vue';
  import { RouterLink } from 'vue-router';
  import axios, { AxiosError } from 'axios';
  import { useUserStore } from '@/stores/user';
  import { ApiWrapper } from '@/composables/ApiWrapper';
  import { computed, reactive, ref, watch } from 'vue';
  import router from '@/router';
  import Alert from '@/components/global/Alert.vue';

  const userStore = useUserStore();
  const email = ref('');
  const password = ref('');

  const alertStatus = ref<number>(0);
  const alertError = ref<string>('');
  const alertMessage = ref<string>('');
  const alertActive = ref<boolean>(false);

  const onAlertHide = () => {
    alertActive.value = false;
  };

  const onLogIn = async () => {
    try {
      const res = await ApiWrapper.post<{ jwt: string }>('auth/login', {
        email: email.value,
        password: password.value
      });

      if (res.status === 200) {
        userStore.setJwt(res.data.jwt);
        userStore.setStatus(200);
        alertStatus.value = res.status
        alertError.value = '';
        alertMessage.value = 'Login successful!';
        alertActive.value = true;

        setTimeout(() => {
          router.push('/baseDash/overview');
        }, 1000);
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        alertStatus.value = error.response.data.statusCode;
        alertError.value = error.response.data.statusCode === 200 ? '' : error.response.data.error;
        alertMessage.value = error.response.data.message;
        alertActive.value = true;
      }
    }
  }
</script>

<template>
  <div class="flex flex-row w-full h-full p-2">
    <div class="w-full md:w-2/5 h-full flex flex-row justify-center content-center items-center relative">
      <RouterLink to="/"><Logo type="revibio" class="absolute top-4 left-4"></Logo></RouterLink>
      <div class="w-3/4 h-full flex flex-col justify-center content-center items-center gap-12 ">
        <div class="w-full flex flex-col justify-center content-center items-start gap-3">
          <h3 class="text-4xl md:text-6xl">Welcome back!</h3>
          <p class="text-[#52525B]">Let's continue where you left off. Forgot your password? Click here to start the password reset process.</p>
        </div>
        <form class="w-full flex flex-col justify-start content-center items-center gap-3">
          <Input placeholder="Email" v-model="email" type="email"></Input>
          <Input placeholder="Password" v-model="password" type="password"></Input>
        </form>
        <div class="w-full flex flex-row justify-start content-center items-center gap-3">
          <Button text="Log in" rank="primary" size="normal" icon-position="none" @click.prevent="onLogIn" :primary="true"></Button>
          <p class="text-[#71717A]"><RouterLink to="register">- or Create an account</RouterLink></p>
        </div>
      </div>
    </div>
    <AuthBanner class="w-3/5 hidden md:block"></AuthBanner>
    <Alert
      :status="alertStatus"
      :error="alertError"
      :message="alertMessage"
      :active="alertActive"
      @hide="onAlertHide"
    />
  </div>
</template>
