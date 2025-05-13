<script lang="ts" setup>
import { ref, watch } from 'vue';
import Button from './Button.vue';

const props = defineProps<{
  items: {
    event?: () => void;
    buttonText: string;
    buttonSize: 'small' | 'normal';
    primary?: boolean;
    tabItem?: boolean;
    iconOnly?: boolean;
    iconRight?: boolean;
    disabled?: boolean;
    isActive?: boolean;
  }[];
  activeTabIndex?: number;
}>();

const activeTabIndex = ref<number | null>(props.activeTabIndex !== undefined ? props.activeTabIndex : 0);

const selectTab = (index: number) => {
  if (props.items[index].tabItem) {
    activeTabIndex.value = index;
  }
};

watch(
  () => props.activeTabIndex,
  (newValue) => {
    if (newValue !== undefined) {
      activeTabIndex.value = newValue;
    }
  }
);
</script>

<template>
  <div class="flex flex-row justify-evenly content-center items-center bg-zinc-700 p-2 rounded-lg gap-3">
    <Button
      v-for="(item, index) in props.items"
      :key="index"
      :text="item.buttonText"
      :size="item.buttonSize"
      :tabItem="item.tabItem"
      :primary="item.primary"
      :iconOnly="item.iconOnly"
      :iconRight="item.iconRight"
      :disabled="item.disabled"
      :isActive="activeTabIndex === index"
      @click.prevent="() => { selectTab(index); item.event?.(); }"
    />
  </div>
</template>
