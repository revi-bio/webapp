<script lang="ts" setup>
import { ref, watch } from 'vue';
import { widget } from '@/stores/widget';
import { storeToRefs } from "pinia";
import Icon from './Icon.vue';
import Input from '@/components/global/Input.vue';

const activeIcon = ref<string | null>(null);
  const emit = defineEmits(['clearSelectedProps']);

const props = defineProps<{
  selectedProps : Record<string, any>
}>();


const toggleIcon = (type: string) => {
  if (activeIcon.value === type) {
    activeIcon.value = null;
    emit('clearSelectedProps');
  } else {
    activeIcon.value = type;
  }
};

const widgetStore = widget();

function updateProp(key: string, newValue: any) {
  widgetStore.setSelectedProp(key, newValue);
}


/*
watch(() => props.selectedProps, (newProps) => {
  if (Object.keys(newProps).length !== 0 && activeIcon.value !== 'Edit') {
    activeIcon.value = 'Edit';
  }
}, { deep: true });
*/

watch(() => widgetStore.selectedWidget, (newProps) => {
  if (Object.keys(newProps).length !== 0 && activeIcon.value !== 'Edit') {
    activeIcon.value = 'Edit';
  }
}, { deep: true });

</script>

<template>
  <div class="flex gap-x-2 items-center justify-center">
    <div v-if="activeIcon" class="flex flex-col p-4 rounded-[16px] bg-zinc-900/70 text-lg px-3 w-[400px] h-[500px]">
      <div>{{ activeIcon }}</div>
      <div class="baseDash overflow-y-auto" v-if="Object.keys(widgetStore.selectedWidget).length > 0">
        <div  v-for="(value, key) in widgetStore.selectedWidget" :key="key">
          <div class="flex items-center space-y-2 pr-2">
            <p class="flex-1">{{ key }}: </p>
            <Input
              class="flex-[2]"
              type="text"
              :model-value="widgetStore.selectedWidget[key]"
              @update:modelValue="updateProp(key, $event)"
            ></Input>
          </div>
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
