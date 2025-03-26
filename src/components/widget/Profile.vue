<script lang="ts" setup>
import Avatar from '../global/Avatar.vue';
import Icon from '../global/Icon.vue';


const emit = defineEmits(["profile_clicked"]);

const props = defineProps<{
  profile_align: "start" | "center";
  profile_over?: boolean;
  name: string;
  tag: string;
  badge: string[];
  text: string;

  badge_color?: string;
  tag_color?: string;
  name_color?: string;  
  bg_color?: string;
  rounded?: string;

}>();

function clicked(){
  emit('profile_clicked', props);
}

</script>

<template>
    <div class="flex w-full p-2 bg-zinc-700 rounded-lg flex-col" :class="`bg-${bg_color} rounded-[${rounded }] ${profile_over ? 'pt-8 relative' : ''}`" @click="clicked" >
      <div :class="`flex w-full ${profile_over ? 'absolute -top-8 pr-4' : 'static'} justify-${profile_align}`">
        <div :class="`flex `">
          <Avatar class= "w-[64px] h-[64px]"></Avatar>
        </div>
      </div>
      <div class="flex" :class="`justify-${profile_align}`">
        <h1 class="text-2xl" :class="`text-${name_color}`">{{ name }}</h1>
        <div v-if="profile_align != 'center' && badge.length != 0" v-for="badge in badge" :key="badge" class="text-rose-500 flex items-center" :class="`text-${badge_color}`">
          <Icon :type="`${badge}`" size="text-lg" class=""></Icon>
        </div>
      </div>
      <p class="text-sm text-zinc-400 flex" :class="`justify-${profile_align} text${tag_color}`" >{{ tag }}</p>
      
      <div class="flex justify-center w-full">
        <div v-if="profile_align == 'center' && badge.length != 0" v-for="badge in badge" :key="badge" class="text-rose-500 flex items-center" :class="`text-${badge_color}`">
          <Icon :type="`${badge}`" size="text-lg" class=""></Icon>
        </div>
      </div>
      
      <p class="text-md">{{ text }}</p>

    </div>
</template>

<style>

</style>