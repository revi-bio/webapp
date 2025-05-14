<script lang="ts" setup>
import Button from './Button.vue';
import Icon from './Icon.vue';
import Input from './Input.vue';

const props = defineProps<{
  show: boolean;
  title: string;
}>();

const emit = defineEmits(['close']);
</script>

<template>
  <Teleport to="body">
    <Transition name="nested">
      <div
        v-show="show"
        @click="$emit('close')"
        class="w-full h-full z-[100] bg-zinc-950/50 flex flex-col justify-center content-center items-center absolute outer">
        <div
          v-on:click.stop
          class="w-full max-w-[20rem] sm:max-w-[28rem] md:max-w-[32rem] h-auto min-h-[150px] bg-zinc-800 flex flex-col justify-center content-center items-center relative rounded-xl gap-2 p-4 modal-container inner">
          <div class="grid grid-cols-[1fr,auto,1fr] sm:grid-cols-3 w-full justify-between">
            <div></div>
            <span class="grid text-base md:text-xl place-self-center">{{ title }}</span>
            <Icon type="close" class="text-zinc-400 cursor-pointer place-self-end self-start" @click="$emit('close')"></Icon>
          </div>
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes fade-opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fade-opacity-reverse {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.nested-enter-active .inner {
  animation: bounce-in 0.8s;
}

.nested-leave-active .inner {
  animation: bounce-out 0.8s;
}

.nested-enter-active {
  animation: fade-opacity 0.5s ease-in-out;
}

.nested-leave-active {
  animation: fade-opacity-reverse 0.5s ease-in-out;
}

.nested-enter,
.nested-leave-to {
  opacity: 0;
}
</style>
