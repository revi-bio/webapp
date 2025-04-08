<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  text: string;
  options: {key: string, value: string | number}[];
  disabled?: boolean;
  icon?: string;
  direction: "col" | "row";
  selected?: string | number; 
}>();


const emit = defineEmits(['change', 'selected']);


const handleChange = (value: string | number) => {

  emit('change', value);
  emit('selected', value);
  console.log('Radio selection changed:', value);
};

const isSelected = (value: string | number) => {
  return props.selected === value;
};
</script>

<template>
  <div>
    <h3 class="text-base">{{ text }}</h3>
    <div :class="direction === 'col' ? 'column' : 'row'">
      <div class="flex flex-row" v-for="item in options" :key="item.key">
        <div class="flex items-center flex-row hover:bg-zinc-700/50 rounded-md p-1">
          <input 
            class="h-4 w-4 m-1 order-1 text-rose-600 ring-rose-500 focus:ring-rose-500 focus:ring-2"
            :id="item.key+'_'+item.value" 
            type="radio" 
            :name="text" 
            @change="handleChange(item.value)" 
            :value="item.value"
            :checked="isSelected(item.value)"
            :disabled="disabled"
          />
          <label 
            class="order-2 py-1 px-1 text-zinc-200"
            :for="item.key+'_'+item.value"
          >
            {{ item.key }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.row {
  @apply flex flex-row
}
.column {
  @apply flex flex-col
}
</style>