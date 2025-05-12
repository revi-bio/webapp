<script lang="ts" setup>
import Button from '@/components/global/Button.vue';
import Input from '@/components/global/Input.vue';
import Searchbar from '@/components/global/Searchbar.vue';
import Checkbox from '@/components/global/Checkbox.vue';
import { DateTime } from '@/composables/date';
import { useAdminStore } from '@/stores/admin';
import type { UserForAdmin } from '@/stores/admin';
import { onMounted, ref, computed } from 'vue';
import Avatar from '@/components/global/Avatar.vue';

const adminStore = useAdminStore();

const usersList = ref<UserForAdmin[]>([]);
const search = ref('');
const filteredData = ref<UserForAdmin[]>([]);

onMounted(async () => {
  await adminStore.fetchAllUsers();
  usersList.value = [...adminStore.users];
  filteredData.value = [];
});

function changeSearch(filtered: UserForAdmin[]) {
  filteredData.value = filtered;
}

const showNoUsers = computed(() => {
  if (search.value === '') {
    return true;
  }
  return filteredData.value.length === 0;
});

const showUsersList = computed(() => {
  return search.value !== '' && filteredData.value.length > 0;
});
</script>

<template>
  <div class="flex flex-row justify-start content-start items-start w-full h-full gap-5">
    <div class="flex flex-col justify-start content-start items-start w-full h-full gap-5">
      <div class="flex flex-row justify-between content-center items-center w-full rounded-lg p-4 bg-zinc-700/50">
        <Searchbar v-model="search" :basearray="usersList" @filtered="changeSearch"></Searchbar>
      </div>
      <Checkbox text="Send mail to all users"></Checkbox>

      <div v-if="showNoUsers" class="w-full h-full flex flex-col justify-center content-center items-center">
        <h3 class="w-full text-center text-zinc-400">
          {{ search === '' ? 'No users have been selected yet.' : 'No such user.' }}
        </h3>
      </div>

      <div v-else-if="showUsersList" class="w-full h-full flex flex-col gap-2 overflow-y-auto">
    <div v-for="user in filteredData" :key="user?._id" class="w-full flex flex-row justify-between content-center items-center p-4 bg-zinc-700/50 rounded-xl hover:bg-zinc-600/50 transition duration-200">
      <div class="w-full flex flex-row justify-start content-center items-center gap-5">
        <Avatar class="w-16 h-16" :avatar-url="user?.avatar" />
        <div class="flex flex-col justify-center content-start items-start">
          <h3 class="text-xl">{{ user?.displayName }}</h3>
          <h3 class="text-sm text-zinc-400">{{ user?.role }}</h3>
        </div>
        <h3 class="text-sm text-zinc-200">{{ user?.email }}</h3>
        <h3 class="text-sm text-zinc-400">{{ DateTime.formatDate(user?.createdAt) }}</h3>
      </div>
    </div>
      </div>
    </div>

    <div class="flex flex-col justify-start content-start items-start w-full h-full gap-5 bg-zinc-900 p-5 border-zinc-700 rounded-lg">
      <h3 class="text-xl">Write mail</h3>
      <div class="flex flex-col justify-start content-start items-start w-full h-full gap-2">
        <Input type="text" placeholder="Title" class="w-full"/>
        <Input type="textarea" placeholder="Content" class="w-full h-full"/>
      </div>

      <div class="flex flex-row justify-start content-start items-start w-full gap-2">
        <Button text="Send" icon="send" icon-right small primary />
        <Button text="Clear" icon="clear" icon-right small />
      </div>
    </div>
  </div>
</template>
