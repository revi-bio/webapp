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
</script>

<template>
    <Teleport to="body">
        <Transition name="nested">
        <div v-show="show" @click="$emit('close')" class="w-full h-full z-[100] bg-zinc-950/50 flex flex-col justify-center content-center items-center absolute outer">
            <div v-on:click.stop class="w-1/3 h-1/3 bg-zinc-800 flex flex-col justify-center content-center items-center relative rounded-lg gap-2 modal-container inner">
            <h3 class="text-xl text-zinc-200">{{ primaryMsg }}</h3>
            <h3 class="text-base text-zinc-300">{{ secondaryMsg }}</h3>
            <span class="flex flex-col justify-center items-center content-center">
                <!--Inputs-->
            </span>
            <slot></slot>
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


    .nested-enter, .nested-leave-to {
      opacity: 0;
    }
</style>

    