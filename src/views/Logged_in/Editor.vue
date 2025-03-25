<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Button from '@/components/global/Button.vue';
import Toolbar from '@/components/global/Toolbar.vue';
import Profile from '@/components/widget/Profile.vue';

const route = useRoute();
const id = route.params.id;
const visibility = ref("show");

const badges = [ "download", "person", "opened_mail" ]

var selectWidgetProps : any

/*
function selectWidgetProps(props: any) {
  Object.entries(props).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
}
*/

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
      <Toolbar :selectedProps="selectWidgetProps"/>
    </div>

    <div id="widgets" class="w-[50%] flex flex-col gap-3 justify-center">
      <Profile @profile_clicked="selectWidgetProps" name="Lakatos Dezso" :badge="badges" profile_align="center" :profile_over="true" tag="@lakatosdezso" text="Lakatosdezsővagyok cigány"/>
    </div>
  </div>
</template>

<style>
  .hide {
    display: none;
  }
</style>
