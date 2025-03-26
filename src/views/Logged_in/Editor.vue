<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Button from '@/components/global/Button.vue';
import Toolbar from '@/components/global/Toolbar.vue';
import Profile from '@/components/widget/Profile.vue';
import { widget } from '@/stores/widget';

const route = useRoute();
const id = route.params.id;
const visibility = ref("show");

const badges = [ "download", "person", "opened_mail" ]

const selectWidgetProps = ref<Record<string, any>>({});
/*
function selectWidgetPropsHandler(props: Record<string, any>) {
  selectWidgetProps.value = props;
}

function clearSelectedProps() {
  selectWidgetProps.value = {};
}
*/
/*
function selectWidgetProps(props: any) {
  Object.entries(props).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
}
*/

const widgetStore = widget();

function selectWidgetPropsHandler(props: Record<string, any>) {
  widgetStore.setSelectedProps(props);
}

function clearSelectedProps() {
  widgetStore.clearSelectedProps();
}

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

    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 pr-4 flex items-center z-10" :class="visibility">
      <Toolbar :selectedProps="selectWidgetProps" @clearSelectedProps="clearSelectedProps"/>
    </div>

    <div id="widgets" class="w-[50%] flex flex-col gap-3 justify-center z-0">
      <Profile @profile_clicked="selectWidgetPropsHandler" name="Lakatos Dezso" :badge="badges" profile_align="center" :profile_over="true" tag="@lakatosdezso" text="Lakatosdezsővagyok cigány"/>
      <Profile @profile_clicked="selectWidgetPropsHandler" name="Fazs" :badge="badges" profile_align="start" :profile_over="false" tag="@gecifasz" text="gecifasz"/>
      <Profile @profile_clicked="selectWidgetPropsHandler" name="Zöld" :badge="badges" profile_align="center" :profile_over="false" tag="@zold" text="Kék"/>
    </div>
  </div>
</template>

<style>
  .hide {
    display: none;
  }
</style>
