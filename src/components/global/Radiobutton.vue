<script setup lang="ts">

const props = defineProps<{
  text?: string;
  options: {key: string, value: string | number | boolean}[];
  disabled?: boolean;
  icon?: string;
  direction: "col" | "row";
  selected?: string | number | boolean;
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
  <div class="flex flex-col justify-center content-start items-start gap-2">
    <h3 class="text-base">{{ text }}</h3>
    <div :class="direction === 'col' ? 'column' : 'row gap-6'">
      <div class="flex flex-row" v-for="item in options" :key="item.key">
        <div class="radio-button inline-block relative cursor-pointer py-1">
          <input
            class="radio-button__input absolute opacity-0 w-0 h-0"
            :id="item.key+'_'+item.value"
            type="radio"
            :name="text"
            @change="handleChange(item.value)"
            :value="item.value"
            :checked="isSelected(item.value)"
            :disabled="disabled"
          />
          <label
            class="radio-button__label inline-block pl-7 mb-2 relative cursor-pointer transition-all duration-300 ease-in-out"
            :for="item.key+'_'+item.value"
          >
            <span class="radio-button__custom absolute top-1/2 left-0 -translate-y-1/2 w-5 h-5 border-2 border-zinc-500 rounded-full transition-all duration-300 ease-in-out"></span>
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

.radio-button__input:checked + .radio-button__label .radio-button__custom {
  @apply border-[5px] border-rose-500;
}

.radio-button__input:checked + .radio-button__label {
  @apply text-rose-300;
}

.radio-button__label:hover .radio-button__custom {
  @apply scale-110 border-rose-500/90;
}
</style>
