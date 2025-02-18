<script lang="ts" setup>
import Button from './Button.vue';
import Icon from './Icon.vue';
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{

  show: boolean
  primaryMsg?: string
  secondaryMsg?: string
}>();

const emit = defineEmits(['close']);

const handleOutsideClick = (event: MouseEvent) => {
  const modal = document.querySelector('.modal-container');
  if (modal && !modal.contains(event.target as Node)) {
    emit('close');
  }
};

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      setTimeout(() => document.addEventListener('click', handleOutsideClick), 0);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
  }
);


onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});
</script>

<template>
<Teleport to="body">    
  <div v-if="show" class="w-full h-full z-[100] bg-zinc-950/30 flex flex-col justify-center content-center items-center absolute">
    <div class="w-1/3 h-1/3 bg-zinc-800 flex flex-col justify-center content-center items-center relative rounded-lg gap-2 modal-container">
      <h3 class="text-xl text-zinc-200">{{ primaryMsg }}</h3>
      <h3 class="text-base text-zinc-300">{{ secondaryMsg }}</h3>
      <span class="flex flex-col justify-center items-center content-center">
        <!--Inputs-->
      </span>
      <span>
        <!--Buttons-->
        <Button 
          size="normal" 
          icon-position="left" 
          icon-type="delete" 
          text="Delete" 
          rank="primary"
          @click="$emit('close')"
        ></Button>
      </span>
      <h3 class="text-sm text-zinc-300 underline absolute left-3 bottom-3 cursor-pointer">Have any questions?</h3>

        <h3 
        class="text-base text-rose-400 absolute right-3 bottom-3 cursor-pointer"
        @click="$emit('close')"
        >
        Exit
        </h3>

        <Icon 
        type="close" 
        class="text-red-400 absolute right-3 top-3 cursor-pointer"
        @click="$emit('close')"
        ></Icon>
    </div>
  </div>
</Teleport>
</template>