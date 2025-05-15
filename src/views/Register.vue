<script lang="ts" setup>
import AuthBanner from '@/components/authentication/AuthBanner.vue';
import Input from '@/components/global/Input.vue';
import Button from '@/components/global/Button.vue';
import Logo from '@/components/global/Logo.vue';
import Checkbox from '@/components/global/Checkbox.vue';
import { RouterLink } from 'vue-router';
import { ApiWrapper } from '@/composables/ApiWrapper';
import { useUserStore } from '@/stores/user';
import { computed, ref } from 'vue';
import router from '@/router';
import Alert from '@/components/global/Alert.vue';
import { useInboxStore } from '@/stores/inboxMessages';
import type { User } from '@/types/User';

const inboxStore = useInboxStore();
const userStore = useUserStore();
const displayName = ref('');
const email = ref('');
const password = ref('');
const confPassword = ref('');
const errorMsg = ref();
const alertStatus = ref<number>(0);
const alertError = ref<string>('');
const alertMessage = ref<string>('');
const alertActive = ref<boolean>(false);

const errorClass = computed(() => {
  return errorMsg.value ? 'error' : 'none';
});

const onAlertHide = () => {
  alertActive.value = false;
};

const onRegister = async () => {
  try {
    if (confPassword.value !== password.value) {
      alert('The given passwords are not the same!');
      return;
    }

    const res = await ApiWrapper.post<{ jwt: string }>('auth/register', {
      displayName: displayName.value,
      email: email.value,
      password: password.value,
    });

    if (res.status === 201) {
      router.push('verify-your-email');
      userStore.setJwt(res.data.jwt);
    } else {
      console.error('Registration failed:', res);
    }
  } catch (error: any) {
    errorMsg.value = error.status;

    if (error.response && error.response.data) {
      alertStatus.value = error.response.data.statusCode;
      alertError.value = error.response.data.error;
      alertMessage.value = error.response.data.message;
      alertActive.value = true;
    }
  }
};
</script>
<template>
  <div class="flex flex-row w-full h-full p-2">
    <div class="w-full md:w-2/5 h-full flex flex-row justify-center content-center items-center relative">
      <RouterLink to="/"><Logo type="revibio" class="absolute top-4 left-4"></Logo></RouterLink>
      <div class="w-3/4 h-full flex flex-col justify-center content-center items-center gap-12">
        <div class="w-full flex flex-col justify-center content-center items-start gap-3">
          <h3 class="text-4xl md:text-6xl">Create an account</h3>
          <p class="text-[#52525B]">
            Welcome to revi.bio! You can start by completing the form below to register your account.
          </p>
        </div>
        <form class="w-full flex flex-col justify-center content-start items-start gap-3">
          <Input type="text" placeholder="Display name" v-model="displayName" :styleclass="errorClass"></Input>
          <Input type="email" placeholder="Email" v-model="email" :styleclass="errorClass"></Input>
          <Input type="password" placeholder="Password" v-model="password" :styleclass="errorClass"></Input>
          <Input type="password" placeholder="Confirm password" v-model="confPassword" :styleclass="errorClass"></Input>
          <Checkbox text="I agree to use revi.bio :)"></Checkbox>
        </form>
        <div class="w-full flex flex-row justify-start content-center items-center gap-3">
          <Button
            text="Register"
            :primary="true"
            size="normal"
            icon-position="none"
            @click.prevent="onRegister"></Button>
          <p class="text-[#71717A]"><RouterLink to="login">- or Log in</RouterLink></p>
        </div>
      </div>
    </div>
    <AuthBanner class="w-3/5 hidden md:block"></AuthBanner>
    <Alert
      :status="alertStatus"
      :error="alertError"
      :message="alertMessage"
      :active="alertActive"
      @hide="onAlertHide" />
  </div>
</template>
