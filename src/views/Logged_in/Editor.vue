<script lang="ts" setup>
import { computed, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import Button from '@/components/global/Button.vue';
import Toolbar from '@/components/global/Toolbar.vue';
import Profile from '@/components/widget/Profile.vue';
import { GENERIC_SETTINGS_DEFINITIONS, SPECIFIC_SETTINGS_DEFINITIONS, WidgetGenericSettings, type Widget as IWidget } from '@/types/Widget';
import Widget from '@/components/widget/Widget.vue';
import { v4 as uuidv4 } from 'uuid';
import Input from '@/components/global/Input.vue';
import Icon from '@/components/global/Icon.vue';

const route = useRoute();
const id = route.params.id;
// const selectedWidgetId: Ref<string | null> = ref(null);
// const selectedWidgetIndex = computed(() => widgetList.value.findIndex(x => x.id == selectedWidgetId.value))
const selectedWidgetIndex: Ref<number | null> = ref(null);
const widgetToolboxOpened = ref(false);
const bioSettingsOpened = ref(false);

function selectWidget(index: number) {
  selectedWidgetIndex.value = index == selectedWidgetIndex.value ? null : index;
  widgetToolboxOpened.value = false;
  bioSettingsOpened.value = false;
}

function openWidgetToolbox() {
  selectedWidgetIndex.value = null;
  widgetToolboxOpened.value = !widgetToolboxOpened.value;
  bioSettingsOpened.value = false;
}

function openBioSettings() {
  selectedWidgetIndex.value = null;
  widgetToolboxOpened.value = false;
  bioSettingsOpened.value = !bioSettingsOpened.value;
}

const widgetList: Ref<IWidget[]> = ref([
  {
    id: uuidv4(),
    genericSettings: new WidgetGenericSettings({
      // opacity: 0.6,
      // tint: 240,
      background: {
        tint: 340,
        saturation: 8,
        opacity: 0.8,
      },
    }),
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

const pages = ref([...new Set(widgetList.value.map(x => x.page))]);
const currentPageIndex = ref(0);

function goLeft() {
  if (currentPageIndex.value == 0) return;

  if (!widgetList.value.find(x => x.page == currentPageIndex.value))
    pages.value.pop();

  currentPageIndex.value--;
}

function goRight() {
  if (pages.value.length == 3) return;

  if (pages.value.includes(currentPageIndex.value + 1)) {
    currentPageIndex.value++;
  } else {
    pages.value.push(currentPageIndex.value + 1);
    currentPageIndex.value++;
  }
}
</script>

<template>
  <div class="flex justify-center items-center h-full w-full relative">
    <div class="absolute w-full bottom-0 p-6 justify-between space-x-2 text-zinc-200 grid grid-cols-3">
      <div class="flex gap-2">
        <Button :onClick="openWidgetToolbox" icon-position="only" icon-type="add" size="small" rank="primary" />
        <Button icon-position="only" icon-type="delete" size="small" rank="secondary" :disabled="selectedWidgetIndex == null"/>
      </div>
      <div class="flex gap-2 items-center justify-center">
        <Button :onClick="goLeft" icon-position="only" icon-type="chevron_left" size="small" rank="secondary" />
        <span v-for="page in pages" :key="page">{{ pages[currentPageIndex] == page ? 'x' : '-' }}</span>
        <Button :onClick="goRight" icon-position="only" icon-type="chevron_right" size="small" rank="secondary" />
      </div>
      <div class="flex justify-end">
        <Button :onClick="openBioSettings" icon-position="only" icon-type="settings" size="small" rank="secondary"/>
      </div>
    </div>
      <Teleport defer to="#sidebar-right-outlet" v-if="widgetToolboxOpened">
        <div class="sidebar">
          <span class="text-2xl">Widget toolbox</span>
        </div>
      </Teleport>
      <Teleport defer to="#sidebar-right-outlet" v-if="bioSettingsOpened">
        <div class="sidebar">
          <span class="text-2xl">Bio settings</span>
        </div>
      </Teleport>
      <Teleport defer to="#sidebar-right-outlet" v-if="selectedWidgetIndex != null">
        <div class="sidebar">
          <span class="text-2xl">Widget settings</span>
          <span>Widget-specific settings</span>
          <span v-for="setting in SPECIFIC_SETTINGS_DEFINITIONS[widgetList[selectedWidgetIndex].type]" :key="setting.name">
            <span class="text-zinc-400">{{ setting.name }}</span>
            <Input type="text"
              v-model="widgetList[selectedWidgetIndex].specificSettings[setting.name]" />
          </span>
          <span>Generic settings</span>
          <span v-for="setting in GENERIC_SETTINGS_DEFINITIONS" :key="setting.name">
            <span class="text-zinc-400">{{ setting.name }}</span>
            <Input type="text"
              v-model="widgetList[selectedWidgetIndex].genericSettings[setting.name]" />
          </span>
        </div>
      </Teleport>
    <div id="widgets" class="w-[50%] flex flex-col gap-3 justify-center z-0">
      <Widget v-for="(widget, i) in widgetList" :key="widget.id" :data="widget" @click="selectWidget(i)" :selected="i == selectedWidgetIndex"/>
    </div>
  </div>
</template>

<style lang="scss">
#widgets > *[selected=true] {
  @apply border-2 border-dashed border-rose-500;
}

.sidebar {
  @apply max-w-[400px] min-w-[300px] h-full bg-zinc-800/80 rounded-2xl z-[20] backdrop-blur-3xl relative p-4 flex flex-col gap-2 overflow-y-auto;

  > span {
    @apply mb-1;
  }
}
</style>
