<script lang="ts" setup>
import Icon from './Icon.vue';
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['change']);

const localChecked = ref(props.checked);

watch(() => props.checked, (newVal) => {
  localChecked.value = newVal;
});


onMounted(() => {
  localChecked.value = props.checked;
});

const handleChange = () => {
  emit('change', localChecked.value);
};
</script>

<template>
  <label class="flex flex-row justify-center items-center gap-3 cursor-pointer select-none">
    <input
      type="checkbox"
      v-model="localChecked"
      class="peer absolute opacity-0 w-0 h-0"
      @change="handleChange"
    />
    <span
      class="flex justify-center items-center w-5 h-5 rounded border-[2px] border-zinc-500 bg-zinc-800 transition-colors duration-200 peer-hover:bg-zinc-700 peer-checked:bg-rose-500 peer-checked:peer-hover:bg-rose-600 peer-checked:border-rose-500"
    >
      <Icon type="check" v-if="localChecked" />
    </span>
    <p class="text-zinc-500 text-base leading-relaxed">{{ text }}</p>
  </label>
</template>

<style lang="scss" scoped>
.peer-checked.peer-hover ~ .checkmark {
  @apply bg-rose-600
}
</style>