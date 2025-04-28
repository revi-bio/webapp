<script lang="ts" setup>
import Avatar from '@/components/global/Avatar.vue';
import Button from '@/components/global/Button.vue';
import Icon from '@/components/global/Icon.vue';
import { useAdminStore } from '@/stores/admin';
import type { UserForAdmin } from '@/stores/admin';
import { useSettingsStore } from '@/stores/settings';
import type {User} from '@/types/User';
import { onMounted, ref, watch, watchEffect } from 'vue';

const adminStore = useAdminStore();
const usersList = ref<UserForAdmin[]>([]);
const alertStatus = ref<number>(0);
const alertError = ref<string>('');
const alertMessage = ref<string>('');
const alertActive = ref<boolean>(false);

onMounted(async ()=>{
  await adminStore.fetchAllUsers();
  usersList.value = [...adminStore.users];
})

watchEffect(()=>{
  usersList.value = [...adminStore.users];
})

const needsEmailVerification = (user: UserForAdmin): boolean => {
  if (!user || !(user as any).validations || !Array.isArray((user as any).validations)) {
    return false;
  }

  return (user as any).validations.some((validation: any) =>
    validation && typeof validation === 'object' && 'emailVerification' in validation
  );
}
</script>

<template>
  <div class="w-full h-full flex flex-col justify-start content-center items-center overflow-y-auto">
    <div v-for="user in usersList" :key="user?.id" class="w-full flex flex-row justify-between content-center items-center p-4 bg-zinc-700/50 rounded-xl mb-2">
      <div class="w-full flex flex-row justify-start content-center items-center gap-5">
        <Avatar class="w-16 h-16" :avatar-url="user?.avatar"/>
        <div class="flex flex-col justify-center content-start items-start">
          <h3 class="text-xl">{{ user?.displayName }}</h3>
          <h3 class="text-sm text-zinc-400">{{ user?.role }}</h3>
        </div>
        <h3 class="text-sm text-zinc-200">{{ user?.email }}</h3>
        <h3 class="text-sm text-zinc-400">{{ user?.createdAt }}</h3>
        <Icon :type="!needsEmailVerification(user) ? 'verified' : 'verified_off'"></Icon>
      </div>

      <div class="flex flex-row justify-center content-center items-center gap-2">
        <Button v-if="needsEmailVerification(user)" rank="primary" size="small" text="verify" icon-position="right" icon-type="verified"></Button>
        <Button rank="primary" size="small" text="Bios" icon-position="right" icon-type="recent_actors"></Button>
        <Button rank="primary" size="small" text="Mail" icon-position="right" icon-type="mail"></Button>
        <Button rank="primary" size="small" text="Delete" icon-position="right" icon-type="delete"></Button>
      </div>
    </div>
  </div>
</template>
