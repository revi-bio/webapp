<script lang="ts" setup>
import Button from '@/components/global/Button.vue';
import Input from '@/components/global/Input.vue';
import Searchbar from '@/components/global/Searchbar.vue';
import Checkbox from '@/components/global/Checkbox.vue';
import { useAdminStore } from '@/stores/admin';
import { ref } from 'vue';

const adminStore = useAdminStore();

const allUsers = ref<[]>([]);
const search = ref('');
const filteredUsers = ref<[]>([]);
</script>
<template>
  <div class="flex flex-row justify-start content-start items-start w-full h-full gap-5">
    <div class="flex flex-col justify-start content-start items-start w-full h-full gap-5">
          <div class="flex flex-row justify-between content-center items-center w-full rounded-lg p-4 bg-zinc-700/50">
            <Searchbar v-model="search" :basearray="filteredUsers"></Searchbar>
          </div>
      <Checkbox text="Send mail to all users"></Checkbox>
      <div class="w-full h-full flex-col justify-center content-center items-center">
        <h3 class="w-full text-center">No users have been selected yet.</h3>
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
