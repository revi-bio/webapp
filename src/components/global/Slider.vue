<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';

// Props deklaráció
const props = defineProps<{
  min: number; // Minimum érték
  max: number; // Maximum érték
  step?: number; // Lépésköz (opcionális, alapértelmezett: 1)
  modelValue: number; // A slider aktuális értéke
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

// Lokális állapot
const value = ref(props.modelValue);

// Figyeljük a modelValue változását
watch(
  () => props.modelValue,
  (newValue) => {
    value.value = newValue;
  }
);

// Frissítjük az értéket és emitáljuk a változást
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
      class="w-full bg-zinc-800 hover:bg-rose-500 rounded-xl appearance-auto cursor-pointer accent-rose-500"
    />
  </div>
</template>

<style scoped>
</style>
