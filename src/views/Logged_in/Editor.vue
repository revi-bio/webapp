<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Button from '@/components/global/Button.vue';
import Toolbar from '@/components/global/Toolbar.vue';
import Profile from '@/components/widget/Profile.vue';

const route = useRoute();
const id = route.params.id;
const visibility = ref("show");

function hiedShow() {
  visibility.value = visibility.value === "show" ? "hide" : "show";
}
</script>

<template>
  <div class="flex justify-center items-center h-full w-full relative">

    <div class="absolute left-0 bottom-0 p-6 flex space-x-2 text-zinc-200">
      <Button icon-position="only" icon-type="eye_tracking" size="small" rank="secondary" @click.prevent="hiedShow"></Button>
      <Button icon-position="only" icon-type="info" size="small" rank="secondary" :class="visibility"></Button>
      <Button icon-position="right" icon-type="delete" size="small" rank="secondary" text="Clear all" :class="visibility"></Button>
    </div>

    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 pr-4 flex items-center" :class="visibility">
      <Toolbar/>
    </div>

    <div class="w-[50%] h-full items-center ">
      <Profile name="Lakatos Dezso" name_align="left" badge="view" profile_align="left" tag="@lakatosdezso" text="Lakatosdezsővagyok cigány"></Profile>
    </div>
  </div>
</template>

<style>
  .hide {
    display: none;
  }
</style>
