<script lang="ts" setup>
import Button from '@/components/global/Button.vue';
import Input from '@/components/global/Input.vue';
import Searchbar from '@/components/global/Searchbar.vue';
import Checkbox from '@/components/global/Checkbox.vue';
import { ref } from 'vue';

const allUsers = ref<[]>([]);
const filteredUsers = ref<[]>([]);
</script>
<template>
  <div class="flex flex-row justify-start content-start items-start w-full h-full">
    <div class="flex flex-col justify-start content-start items-start w-full h-full gap-5">
      <h3>Select user(s)</h3>
      <Searchbar :basearray="filteredUsers" class="w-full"></Searchbar>
      <Checkbox text="Send mail to all users"></Checkbox>
      <div class="w-full h-full flex-col justify-center content-center items-center">
        <h3 class="w-full text-center">No users have been selected yet.</h3>
      </div>
    </div>

    <div class="flex flex-col justify-start content-start items-start w-full h-full gap-5 bg-zinc-900 p-5 border-zinc-700 rounded-lg">
        <h3 class="text-xl">Write mail</h3>
        <div class="flex flex-col justify-start content-start items-start w-full gap-2">
          <Input type="text" placeholder="Title" class="w-full"/>
          <Input type="text" placeholder="Content" class="w-full"/>
        </div>

        <div class="flex flex-row justify-start content-start items-start w-full gap-2">
          <Button rank="primary" size="small" text="Send" icon-position="right" icon-type="send"></Button>
          <Button rank="secondary" size="small" text="Clear" icon-position="right" icon-type="clear"></Button>
        </div>
    </div>


  </div>
</template>
