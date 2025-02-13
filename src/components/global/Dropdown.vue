<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';
import Icon from './Icon.vue';
import {animate, inView} from 'motion'

const props = defineProps<{
  baseText?: string;
  type: "iconOnly" | "normal";
  items: {
    name: string;
    event?: () => void;
  }[];
  align: "center" | "start" | "end";
}>();

const selectedText = ref(props.baseText);
const isOpen = ref(false);

watch(() => props.baseText, (newValue) => {
  if (newValue) selectedText.value = newValue;
});

const triggerItems = async () => {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    await nextTick(); 

    const dropdownItems = document.querySelector('.items');
    if (dropdownItems) {
      animate(dropdownItems, { opacity: [0, 1], y: [-10, 0] }, { duration: 0.3 });
    }
  }
};

const selectItem = (item: { name: string; event?: () => void }) => {
  selectedText.value = item.name;
  isOpen.value = false;

  if (item.event) {
    item.event();
  }
};

const closeDropdown = (event: Event) => {
  const dropdown = document.querySelector('.dropdown-container');
  if (dropdown && !dropdown.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

document.addEventListener('click', closeDropdown);
</script>

<template>
  <div class="dropdown-container relative">
    <div :class="`flex flex-col justify-center content-${align} items-${align} gap-2 relative`">
      <span v-if="type === 'iconOnly'" class="dropdown" @click="triggerItems">
      </span>
      <span v-else class="dropdown" @click="triggerItems">
        <Icon type="arrow_drop_down"></Icon>
        <h3>{{ selectedText }}</h3>
      </span>

      <span v-if="isOpen" class="items flex flex-col justify-center content-center items-center px-3 py-2 gap-2 bg-zinc-600 rounded-md z-100 absolute top-16">
        <h3
          v-for="item in items"
          :key="item.name"
          @click="selectItem(item)"
        >
          {{ item.name }}
        </h3>
      </span>
    </div>
  </div>
  <!--How to use
    #1
    If for some reason you wouldn't like to do anything with the items of the dropdown use it like this:

      <Dropdown
        type="normal"
        baseText="Choose one"
        align="end"
        :items="[
          { name: 'First' },
          { name: 'Second' },
          { name: 'Third' }
        ]"
      />

    ----------------------------------------------------------------------------------------------------
    #2
    Using it with functions added to the items:
      <Dropdown
        type="normal"
        baseText="Choose one"
        align="end"
        :items="[
          { name: 'First', event:FirstEvent },
          { name: 'Second', event:SecondEvent },
          { name: 'Third' , event:ThirdEvent}
        ]"
      />


  -->
</template>

<style lang="scss" scoped>
.dropdown {
  @apply flex flex-row px-3 py-2 justify-between content-center items-center gap-2 bg-zinc-600 rounded-full hover:bg-zinc-500 active:bg-zinc-700 cursor-pointer;
}
.items h3 {
  @apply hover:bg-zinc-500 w-full text-center cursor-pointer px-3 py-2 rounded-md;
}
</style>
