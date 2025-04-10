<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import Button from '@/components/global/Button.vue';
import Toolbar from '@/components/global/Toolbar.vue';
import Profile from '@/components/widget/Profile.vue';
import type { Widget as IWidget } from '@/types/Widget';
import Widget from '@/components/widget/Widget.vue';
import { v4 as uuidv4 } from 'uuid';

const route = useRoute();
const id = route.params.id;
const visibility = ref('show');

const badges = ['download', 'person', 'opened_mail'];

function hiedShow() {
  visibility.value = visibility.value === 'show' ? 'hide' : 'show';
}

const widgetList: Ref<IWidget[]> = ref([
  {
    id: uuidv4(),
    genericSettings: {
      // opacity: 0.6,
      // tint: 240,
      tint: 340,
      saturation: 8,
    },
    page: 0,
    position: 0,
    specificSettings: {
      title: 'hello',
      description: 'asdlkasjdlksajdlksajdklsajdkl',
      link: 'https://youtube.com/',
    },
    type: 'link',
  },
]);
</script>

<template>
  <div class="flex justify-center items-center h-full w-full relative">
    <div class="absolute left-0 bottom-0 p-6 flex space-x-2 text-zinc-200">
      <Button
        icon-position="only"
        icon-type="eye_tracking"
        size="small"
        rank="secondary"
        @click.prevent="hiedShow"></Button>
      <Button icon-position="only" icon-type="info" size="small" rank="secondary" :class="visibility"></Button>
      <Button
        icon-position="right"
        icon-type="delete"
        size="small"
        rank="secondary"
        text="Clear all"
        :class="visibility"></Button>
    </div>

    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 pr-4 flex items-center z-10" :class="visibility">
      <input type="text" v-model="widgetList[0].specificSettings['title']" />
      <input type="text" v-model="widgetList[0].specificSettings['description']" />
      <input type="text" v-model="widgetList[0].specificSettings['link']" />
      <Toolbar />
    </div>

    <div id="widgets" class="w-[50%] flex flex-col gap-3 justify-center z-0">
      <Widget v-for="widget in widgetList" :key="widget.id" :data="widget" />
    </div>
  </div>
</template>

<style>
.hide {
  display: none;
}
</style>
