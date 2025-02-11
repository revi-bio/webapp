<script lang="ts" setup>
  import Icon from './Icon.vue';
  import ProfilePic from './ProfilePic.vue';
  import Button from '@/components/global/Button.vue';

  defineProps<{
    id: string
    name: string;
    domain: string;
    views: number;
    widgets: number;
    createdat: string;
    lastedit: string;
  }>();


  function dilit(id: string){
    confirm(id)
  }

</script>

<template>
  <div class="flex flex-row justify-between w-full rounded-[16px]  p-4 bg-zinc-700/50">
    <div class="flex flex-row space-x-4 items-center">
      <ProfilePic class="w-[64px] h-[64px]"></ProfilePic>
      <div class="flex flex-col">
        <h3 class="text-2xl text-zinc-100 w-full">{{ name }}</h3>
        <h3 class="text-md text-zinc-500">{{ domain }}</h3>
      </div>
      <div class="flex space-x-1">
        <div class="stats">
          <Icon type="visibility" size="4"></Icon>
          <h3>{{ views }}</h3>
        </div>
        <div class="stats">
          <Icon type="widgets" size="4"></Icon>
          <h3>{{ widgets }}</h3>
        </div>
      </div>
      <div class="flex space-x-2 justify-evenly">
        <div class="dates text-zinc-500">
          <h3 class="font-medium">Created at</h3>
          <h3 class="text-zinc-600">{{ createdat }}</h3>
        </div>
        <div class="dates text-zinc-500">
          <h3 class="font-medium">Last edited at</h3>
          <h3 class="text-zinc-600">{{ lastedit }}</h3>
        </div>
      </div>
    </div>
    <div class="flex space-x-4 py-4">
      <Button icon-position="left" icon-type="delete" text="Delete" rank="primary" size="small" v-on:click="dilit(id)"></Button>
      <Button icon-position="left" icon-type="edit" text="Edit" rank="primary" size="small"></Button>
    </div>
  </div>
</template>

<style>
.stats{
  @apply flex flex-row items-center text-zinc-500 space-x-1
}

.dates{
  @apply flex flex-col  space-x-0 justify-center items-start
}
</style>
