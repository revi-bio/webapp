<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';

const props = defineProps<{
  min: number;
  max: number;
  step?: number;
  modelValue: number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const value = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    value.value = newValue;
  }
);

const updateValue = (newValue: number) => {
  emit('update:modelValue', newValue);
};
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <h3 class="text-lg text-zinc-200">Value: {{ value }}</h3>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step || 1"
      v-model.number="value"
      @input="updateValue(value)"
      class="slider w-full h-2 rounded-full outline-none opacity-100 transition-all duration-200 ease-in-out cursor-pointer focus:outline-none"
    />
  </div>
</template>

<style lang="scss" scoped>
.slider {
  -webkit-appearance: none;
  appearance: none;
  @apply bg-rose-500 rounded-full h-2;

  &:focus {
    @apply outline-none;
  }

  &:hover {
    @apply bg-rose-500/80;
  }
}

/* Webkit browsers (Chrome, Safari, newer Edge) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  @apply w-5 h-5 rounded-full bg-zinc-500 ring-1 ring-zinc-300 cursor-pointer shadow-sm;
}

/* Firefox */
.slider::-moz-range-thumb {
  @apply w-5 h-5 rounded-full bg-zinc-500 cursor-pointer shadow-sm;
  border: 1px solid theme('colors.zinc.300');
  /* Firefox specifikus resetelés */
  background: theme('colors.zinc.500');
}

/* Firefox track */
.slider::-moz-range-track {
  @apply w-full h-2 rounded-full bg-rose-500;
  border: none;
}

/* IE and Edge (non-Chromium) */
.slider::-ms-thumb {
  @apply w-5 h-5 rounded-full bg-zinc-500 ring-1 ring-zinc-300 cursor-pointer shadow-sm;
}

.slider::-ms-track {
  @apply w-full bg-transparent border-transparent;
  color: transparent;
  height: 8px;
}

.slider::-ms-fill-lower,
.slider::-ms-fill-upper {
  @apply bg-rose-500 rounded-full;
}
</style>
