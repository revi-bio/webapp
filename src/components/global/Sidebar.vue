<script lang="ts" setup>
import Logo from './Logo.vue';
import Icon from './Icon.vue';
import Avatar from './Avatar.vue';
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import { ref } from 'vue';

const userStore = useUserStore();
const toggleLogout = ref(false);

const logoutUser = () => {
  userStore.clearUser();
  router.push('/');
  document.location.reload();
};

const toggleLogoutWindow = (event: Event) => {
  event.stopPropagation();
  toggleLogout.value = !toggleLogout.value;
};
</script>

<template>
  <div
    class="flex flex-col justify-between content-center items-center h-full px-2 text-zinc-400"
    @click="toggleLogout = false"
  >
    <div class="flex flex-col justify-center content-center items-center gap-8">
      <Logo type="revi"></Logo>
      <span class="bg-zinc-800 rounded-full w-full h-[2px]"><!--Separator--></span>
      <RouterLink to="/baseDash/overview" class="navItem">
        <span>
          <Icon size="3xl" type="house"></Icon>
        </span>
      </RouterLink>
      <RouterLink to="/baseDash/bios" class="navItem">
        <span>
          <Icon size="3xl" type="person"></Icon>
        </span>
      </RouterLink>
      <RouterLink v-if="userStore.isAdmin" to="/baseDash/admin" class="navItem">
        <span>
          <Icon size="3xl" type="shield_person"></Icon>
        </span>
      </RouterLink>
    </div>

    <div class="flex flex-col justify-center content-center items-center gap-8">
      <RouterLink to="/baseDash/settings" class="navItem">
        <span>
          <Icon size="3xl" type="settings"></Icon>
        </span>
      </RouterLink>
      <RouterLink to="/baseDash/inbox" class="navItem">
        <span>
          <Icon size="3xl" type="mail"></Icon>
        </span>
      </RouterLink>

      <div class="relative flex flex-col justify-start content-start items-start">
        <div
          v-if="toggleLogout"
          class="absolute border-[1px] border-zinc-700 bottom-[4rem] left-0 transition duration-200 bg-zinc-800 hover:text-zinc-300 active:text-zinc-300 hover:bg-red-500 active:bg-red-600 p-3 rounded-md z-[200] text-red-500 w-[200px]"
        >
          <div
            class="flex flex-row justify-between items-center cursor-pointer"
            @click.stop="logoutUser()"
          >
            <h3 class="text-base">Log out</h3>
            <Icon type="logout"></Icon>
          </div>
        </div>

        <Avatar
          @click.stop="toggleLogoutWindow"
          class="w-[48px] h-[48px] cursor-pointer"
          :avatar-url="userStore.getUserData().avatar"
        ></Avatar>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navItem {
  @apply py-1 px-2 rounded-lg hover:bg-zinc-700/25 transition duration-200 active:bg-zinc-500/25 cursor-pointer;
}
</style>
