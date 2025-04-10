<script lang="ts" setup>
import { computed, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import Button from '@/components/global/Button.vue';
import Toolbar from '@/components/global/Toolbar.vue';
import Profile from '@/components/widget/Profile.vue';
import { SPECIFIC_SETTINGS_DEFINITIONS, WidgetGenericSettings, type Widget as IWidget } from '@/types/Widget';
import Widget from '@/components/widget/Widget.vue';
import { v4 as uuidv4 } from 'uuid';
import Input from '@/components/global/Input.vue';

const route = useRoute();
const id = route.params.id;
const visible = ref(true);
// const selectedWidgetId: Ref<string | null> = ref(null);
// const selectedWidgetIndex = computed(() => widgetList.value.findIndex(x => x.id == selectedWidgetId.value))
const selectedWidgetIndex: Ref<number | null> = ref(null);

function selectWidget(index: number) {
  selectedWidgetIndex.value = index == selectedWidgetIndex.value ? null : index;
}

const widgetList: Ref<IWidget[]> = ref([
  {
    id: uuidv4(),
    genericSettings: {
      // opacity: 0.6,
      // tint: 240,
      background: {
        tint: 340,
        saturation: 8,
        opacity: 0.8,
      },
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
  {
    id: uuidv4(),
    genericSettings: new WidgetGenericSettings({}),
    page: 0,
    position: 0,
    specificSettings: {
      title: 'big gyatt in your area',
      description: 'hahahahahahahahaha',
      link: 'https://youtube.com/',
    },
    type: 'link',
  },
]);
</script>

<template>
  <div class="flex justify-center items-center h-full w-full relative">
    <div class="absolute left-0 bottom-0 p-6 flex space-x-2 text-zinc-200">
      <Button icon-position="only" icon-type="eye_tracking" size="small" rank="secondary"
        @click.prevent="visible = !visible"></Button>
      <Button icon-position="only" icon-type="info" size="small" rank="secondary"
        :class="visible ? 'hide' : ''"></Button>
      <Button icon-position="right" icon-type="delete" size="small" rank="secondary" text="Clear all"
        :class="visibility"></Button>
    </div>

    <div v-if="selectedWidgetIndex != null"
      class="absolute right-0 top-1/2 transform -translate-y-1/2 pr-4 items-center z-10 flex flex-col"
      :class="visibility">
      <div class="flex flex-col bg-zinc-800/50 p-4">
        <Input v-for="setting in SPECIFIC_SETTINGS_DEFINITIONS[widgetList[selectedWidgetIndex].type]" type="text"
          v-model="widgetList[selectedWidgetIndex].specificSettings[setting.name]"></Input>
      </div>
      <!--
        <Toolbar />
      -->
    </div>

    <div id="widgets" class="w-[50%] flex flex-col gap-3 justify-center z-0">
      <Widget v-for="(widget, i) in widgetList" :key="widget.id" :data="widget" @click="selectWidget(i)" />
    </div>
  </div>
</template>

<style>
.hide {
  display: none;
}
</style>
