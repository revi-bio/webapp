<script lang="ts" setup>
import Logo from './Logo.vue';
import Icon from './Icon.vue';
import Avatar from './Avatar.vue';
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import { computed, onMounted, ref, nextTick } from 'vue';
import type { InboxMessage } from '@/types/InboxMessage';
import { useInboxStore } from '@/stores/inboxMessages';
import { animate } from 'motion';

const inboxStore = useInboxStore();
const userStore = useUserStore();
const toggleLogout = ref(false);

const msgs = ref<InboxMessage[]>([]);

onMounted(async () => {
  await inboxStore.fetchInbox();
  msgs.value = inboxStore.getInboxMessages();
  mobileMenuOpen.value = false;
});

const logoutUser = () => {
  userStore.clearUser();
  router.push('/');
  document.location.reload();
};

const toggleLogoutWindow = (event: Event) => {
  event.stopPropagation();
  toggleLogout.value = !toggleLogout.value;
};

const countOfUnreaded = computed(() => msgs.value.filter((msg) => !msg.isRead).length);

const mobileMenuOpen = ref<boolean>(false);

const toggleMenu = async () => {
  if (mobileMenuOpen.value) {
    mobileMenuOpen.value = false;
  } else {
    mobileMenuOpen.value = true;
    await nextTick();
    const mobileMenu = document.querySelector('.mobileMenu');
    if (mobileMenu) {
      await animate(mobileMenu, { y: [20, 0] }, { duration: 0.2 });
    }
  }
}
</script>

<template>
  <div
    class="hidden md:flex flex-col justify-between content-center items-center h-full px-2 text-zinc-400"
    @click="toggleLogout = false"
  >
    <div class="flex flex-col justify-center content-center items-center gap-8">
      <RouterLink to="/baseDash/overview">
        <Logo type="revi" :animated="true"></Logo>
      </RouterLink>
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
      <RouterLink v-if="userStore.isAdmin()" to="/baseDash/admin" class="navItem">
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
          <Icon v-if="countOfUnreaded <= 0" size="3xl" type="mail"></Icon>
          <Icon v-if="countOfUnreaded > 0" size="3xl" type="mark_email_unread"></Icon>
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

  <!--Bottom bar-->
  <div class="w-full md:hidden flex flex-col justify-center content-center items-center absolute bottom-0 z-[100] mobileMenu">

    <div class="w-full p-2 md:hidden flex flex-row justify-evenly content-center items-center bg-zinc-900 transition-transform duration-300">
      <span @click.prevent="toggleMenu" class="py-1 px-3 flex justify-center content-center items-center rounded-md bg-zinc-950 hover:bg-zinc-950/80 active:bg-zinc-800 transition-colors duration-200">
        <Icon :type="mobileMenuOpen ? 'close': 'menu'"></Icon>
      </span>
      <Logo type="revi" :animated="true"></Logo>
      <Avatar
        @click.stop="toggleLogoutWindow"
        class="w-[48px] h-[48px] cursor-pointer"
        :avatar-url="userStore.getUserData().avatar"
      ></Avatar>

      <div
        v-if="toggleLogout"
        class="absolute border-[1px] border-zinc-700 bottom-[4rem] right-2 transition duration-200 bg-zinc-800 hover:text-zinc-300 active:text-zinc-300 hover:bg-red-500 active:bg-red-600 p-3 rounded-md z-[200] text-red-500 w-[200px]"
      >
        <div
          class="flex flex-row justify-between items-center cursor-pointer"
          @click.stop="logoutUser()"
        >
          <h3 class="text-base">Log out</h3>
          <Icon type="logout"></Icon>
        </div>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class=" w-full p-4 gap-4 md:hidden flex flex-row flex-wrap justify-evenly content-center items-center bg-zinc-950 text-zinc-400 z-[100] transition-all duration-300">
      <div class="w-full flex flex-row justify-evenly content-center items-center">
        <RouterLink to="/baseDash/overview" class="navItem" @click="toggleMenu">
          <span>
            <Icon size="3xl" type="house"></Icon>
          </span>
        </RouterLink>
        <RouterLink to="/baseDash/bios" class="navItem" @click="toggleMenu">
          <span>
            <Icon size="3xl" type="person"></Icon>
          </span>
        </RouterLink>
        <RouterLink v-if="userStore.isAdmin()" to="/baseDash/admin" class="navItem" @click="toggleMenu">
          <span>
            <Icon size="3xl" type="shield_person"></Icon>
          </span>
        </RouterLink>
      </div>

      <div class="w-full flex flex-row justify-evenly content-center items-center">
        <RouterLink to="/baseDash/settings" class="navItem" @click="toggleMenu">
          <span>
            <Icon size="3xl" type="settings"></Icon>
          </span>
        </RouterLink>
        <RouterLink to="/baseDash/inbox" class="navItem" @click="toggleMenu">
          <span>
            <Icon v-if="countOfUnreaded <= 0" size="3xl" type="mail"></Icon>
            <Icon v-if="countOfUnreaded > 0" size="3xl" type="mark_email_unread"></Icon>
          </span>
        </RouterLink>
      </div>
    </div>

  </div>

</template>

<style lang="scss" scoped>
.navItem {
  @apply py-1 px-2 rounded-lg hover:bg-zinc-700/25 transition duration-200 active:bg-zinc-500/25 cursor-pointer;
}
</style>
