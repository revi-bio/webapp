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
      <Toolbar/>
    </div>

    <div id="widgets" class="w-[50%] flex flex-col gap-3 justify-center z-0">
      <Profile id="jshglfgka" name="Lakatos Dezso" :badge="badges" profile_align="center" :profile_over="true" handle="lakatosdezso" text="Lakatosdezsővagyok cigány"/>
      <Profile id="kjshgfkjg" name="Ferencz" :badge="badges" profile_align="start" :profile_over="false" handle="Ferimeri" text="feri bemutatkozó szövege tökre sokminden meg tökre szöveg csak hogy legyen olyan ami legalább egy sort kitölt, szerintem ez már meglesz egy sor de azért nyomom még hogy legyen azért kettő vagy akár három sor na mostmár meguntamhelloköszi"/>
      <Profile id="lsgjldfhg" name="Zöld" :badge="badges" profile_align="center" :profile_over="false" handle="zold" text="Kék"/>
    </div>
  </div>
</template>

<style>
  .hide {
    display: none;
  }
</style>
