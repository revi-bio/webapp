<script lang="ts" setup>
import { ref, type Ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Button from '@/components/global/Button.vue';
import Toolbar from '@/components/global/Toolbar.vue';
import ProfileWidget from '@/components/widget/ProfileWidget.vue';
import BioPfpWidget from '@/components/widget/BioPfpWidget.vue';
import type { Widget as IWidget } from '@/types/Widget';
import Widget from '@/components/widget/Widget.vue';
import { v4 as uuidv4 } from 'uuid';
import { useBioStore } from '@/stores/bio';

const route = useRoute();
const bioStore = useBioStore();
const handle = route.params.handle as string;
const visibility = ref("show");

function hiedShow() {
  visibility.value = visibility.value === "show" ? "hide" : "show";
}

const widgetList: Ref<IWidget[]> = ref([
  {
    id: uuidv4(),
    genericSettings: {
      tint: 340,
      saturation: 8,
    },
    page: 0,
    position: 0,
    specificSettings: {
      title: 'hello',
      description: 'asdlkasjdlksajdlksajdklsajdkl',
      link: 'https://youtube.com/'
    },
    type: 'link',
  }
]);

const profileWidgetData: Ref<IWidget[]> = ref([
  {
    id: uuidv4(),
    genericSettings: {
      backgroundColor: "red-500",
      textColor: "zinc-100",
      borderRadius: 8,
    },
    page: 0,
    position: 0,
    specificSettings: {
      fullAlign: "center",
      bioAvatarAndName: "center",
      profileOver: true,
      nameColor: "zinc-100",
      name: "Default Name",
      badgeColor: "violet-500",
      badgeVisible: true,
      handleVisible: true,
      handleColor: "violet-500",
      handle: handle,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    type: 'profile',
  }
]);

onMounted(async () => {
  if (handle) {
    try {
      await bioStore.fetchBios();
      const bio = bioStore.getBioByHandle(handle);

      if (bio) {
        profileWidgetData.value[0].specificSettings.name = bio.name;
        profileWidgetData.value[0].specificSettings.handle = bio.handle;
      } else {
        console.error("Bio not found with handle:", handle);
      }
    } catch (error) {
      console.error("Error loading bio:", error);
    }
  } else {
    console.warn("No handle provided in route params");
  }
});
</script>

<template>
  <div class="flex justify-center items-center h-full w-full relative">
    <div class="absolute left-0 bottom-0 p-6 flex space-x-2 text-zinc-200">
      <Button icon-position="only" icon-type="eye_tracking" size="small" rank="secondary" @click.prevent="hiedShow"></Button>
      <Button icon-position="only" icon-type="info" size="small" rank="secondary" :class="visibility"></Button>
      <Button icon-position="right" icon-type="delete" size="small" rank="secondary" text="Clear all" :class="visibility"></Button>
    </div>

    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 pr-4 flex items-center z-10" :class="visibility">
      <input type="text" v-model="widgetList[0].specificSettings['title']" />
      <input type="text" v-model="widgetList[0].specificSettings['description']" />
      <input type="text" v-model="widgetList[0].specificSettings['link']" />
      <Toolbar/>
    </div>

    <div class="w-[50%] flex flex-col gap-3 justify-center z-0">
      <Widget v-for="widget in widgetList" :key="widget.id" :data="widget" />
      <ProfileWidget :data="profileWidgetData[0]" />
    </div>
  </div>
</template>

<style>
  .hide {
    display: none;
  }
</style>
