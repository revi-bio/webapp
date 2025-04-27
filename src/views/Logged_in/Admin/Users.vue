<script lang="ts" setup>
import Avatar from '@/components/global/Avatar.vue';
import Button from '@/components/global/Button.vue';
import { useAdminStore } from '@/stores/admin';
import { useSettingsStore } from '@/stores/settings';
import { onMounted } from 'vue';
const adminStore = useAdminStore();
const settingStore = useSettingsStore();

onMounted(()=>{
  adminStore.fetchAllUsers();
})
</script>
<template>
<div class="w-full h-full flex flex-col justify-start content-center items-center overflow-y-auto">
  <div v-for="user in adminStore.users" class="w-full flex flex-row justify-between content-center items-center p-4 bg-zinc-700/50 rounded-xl">
    <div class="w-full flex flex-row justify-start content-center items-center gap-5">
      <Avatar class="w-16 h-16" :avatar-url="user.data.avatar"/>
      <div class="flex flex-col justify-center content-start items-start">
        <h3 class="text-xl">{{user.data.displayName}} <span class="text-base text-zinc-400">(cheese/cheddar)</span></h3>
        <h3 class="text-sm text-zinc-400">{{ user.data.email }}</h3>
      </div>
    </div>
    <div class="flex flex-row justify-center content-center items-center gap-2 ">
      <Button rank="primary" size="small" text="verify" icon-position="right" icon-type="verified"></Button>
      <Button rank="primary" size="small" text="Bios" icon-position="right" icon-type="recent_actors"></Button>
      <Button rank="primary" size="small" text="Mail" icon-position="right" icon-type="mail"></Button>
      <Button rank="primary" size="small" text="Delete" icon-position="right" icon-type="delete"></Button>
    </div>
  </div>
</div>

</template>
