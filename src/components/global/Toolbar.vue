<script lang="ts" setup>
import { ref, watch } from 'vue';
import { widget } from '@/stores/widget';
import Icon from './Icon.vue';
import Input from '@/components/global/Input.vue';
import ColorPicker from '@/components/global/ColorPicker.vue';
import Button from './Button.vue';
import BioPfpWidget from '../widget/BioPfpWidget.vue';
import Spotify from '../widget/Spotify.vue';
import Youtube from '../widget/Youtube.vue';
import Dropdown from './Dropdown.vue';

const activeIcon = ref<string | null>(null);
var selectedColor = ref<string>();

const handleColorSelection = (baseColor: any, shade: any, opacity: any) => {
  selectedColor.value = `${baseColor}-${shade}/${opacity}`;
  return `${baseColor}-${shade}/${opacity}`;
};

const toggleIcon = (type: string) => {
  if (activeIcon.value === type) {
    activeIcon.value = null;
  } else {
    activeIcon.value = type;
  }

  if(selectedWidget.value) {
    selectedWidget.value={}
  }
};

const widgetStore = widget();
var selectedWidget = ref<Record<string, any>>({});

function updateProp(key: string, newValue: any, id: string) {
  widgetStore.updateWidgetProp(id, key, newValue);
}

watch(() => widgetStore.selectedId, (newId) => {
    if (newId !== null) {
      activeIcon.value = 'Edit';
      selectedWidget.value = widgetStore.getWidget(newId);
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="flex gap-x-2 items-center justify-center">
    <div v-if="activeIcon" class="flex flex-col p-4 rounded-[16px] bg-zinc-900/70 text-lg px-3 w-[400px] h-[500px]">
      <div>{{ activeIcon }}</div>
      <div class="baseDash overflow-y-auto">
        <div v-if="widgetStore.selectedId && activeIcon == 'Edit'" v-for="(value, key) in selectedWidget" :key="key">
          <div class="flex items-center space-y-2 pr-2" v-if="key.split('_')[1] !== 'color' && key !== 'rounded'">
            <p class="flex-1">{{ key }}: </p>
            <Input
              class="flex-[2]"
              type="text"
              :model-value="selectedWidget[key]"
              @update:modelValue="updateProp(key, $event, selectedWidget.id)"
            ></Input>
          </div>

          <div class="flex items-center space-y-2 pr-2" v-else-if="key.split('_')[1] === 'color'">
            <ColorPicker class="w-full" :type="key" @color-selected="
              (baseColor, shade, opacity) => {
                const selectedColor = handleColorSelection(baseColor, shade, opacity);
                updateProp(key, selectedColor, selectedWidget.id)
              }"  ></ColorPicker>
          </div>
          
          <div class="flex flex-row justify-center content-center items-center"
                v-else-if="key === 'rounded'">
                <p class="flex-1">{{ key }}</p>
                <Dropdown
                  class="z-50"
                  type="normal"
                  baseText="Rounded"
                  position="end"
                  :items="[
                    {name: 'xs'},
                    {name: 'sm'},
                    {name: 'md'},
                    {name: 'lg'},
                    {name: 'xl'},
                    {name: '2xl'},
                    {name: '3xl'},
                    {name: '4xl'},
                    {name: 'full'}
                  ]"
                  :selected="selectedWidget[key]"
                  @select="(item) => updateProp(key, item.name, selectedWidget.id)"
                />
          </div>
        </div>

        <div v-else-if="activeIcon == 'Presets'">
        </div>

        <div v-else-if="activeIcon == 'Widgets'" class="flex flex-col justify-center content-center items-center gap-5 p-5">
          <BioPfpWidget></BioPfpWidget>
          <Spotify></Spotify>
          <Youtube></Youtube>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center space-y-14 py-10 rounded-[16px] bg-zinc-900/70 transition duration-200 text-lg px-3 h-full">
      <Icon class="Icon" :class="{ 'active': activeIcon === 'Widgets' }" size="normal" type="widgets" @click="toggleIcon('Widgets')" />
      <Icon class="Icon" :class="{ 'active': activeIcon === 'Presets' }" size="normal" type="id_card" @click="toggleIcon('Presets')" />
      <Icon class="Icon" :class="{ 'active': activeIcon === 'Edit' }" size="normal" type="edit" @click="toggleIcon('Edit')" />
    </div>
  </div>
</template>

<style>
  .Icon {
    @apply p-2 rounded-lg hover:bg-zinc-600 text-zinc-400 cursor-pointer select-none
  }
  .Icon.active {
    @apply bg-zinc-700/75  hover:bg-zinc-600
  }

  /* width */
  .baseDash::-webkit-scrollbar {
    @apply w-2 rounded-full
  }

  /* Track */
  .baseDash::-webkit-scrollbar-track {
    @apply bg-zinc-800  rounded-full
  }

  /* Handle */
  .baseDash::-webkit-scrollbar-thumb {
    @apply bg-zinc-600/50 rounded-full border-4
  }

  /* Handle on hover */
  .baseDash::-webkit-scrollbar-thumb:hover {
    @apply bg-zinc-700 rounded-full
  }
</style>