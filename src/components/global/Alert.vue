<script lang="ts" setup>
import { animate } from "@motionone/dom";
import Icon from "./Icon.vue";
import { ref, watch, onMounted, nextTick, computed } from "vue";

const props = defineProps<{
  status: number,
  error?: string,
  message: string,
  active: boolean
}>();

const emit = defineEmits(['hide']);
const isVisible = ref(props.active);
const alertRef = ref<HTMLElement | null>(null);

const isError = computed(() => {
  return (props.error && props.error.trim() !== '') || (props.status < 200 || props.status >= 300);
});

const animateIn = async () => {
  await nextTick();

  if (alertRef.value) {
    await animate(
      alertRef.value,
      { transform: "translateY(100px)", opacity: [0, 1] },
      { duration: 0.5, easing: "ease-out" }
    );
  }
};

const animateOut = async () => {
  if (alertRef.value) {
    await animate(
      alertRef.value,
      {
        transform: 'translateY(-100px)',
        opacity: [1, 0]
      },
      {
        duration: 0.5,
        easing: 'ease-in'
      }
    ).finished;

    isVisible.value = false;
    emit('hide');
  }
};

watch(() => props.active, async (newValue) => {
  if (newValue === true) {
    isVisible.value = true;

    await animateIn();

    setTimeout(() => {
      animateOut();
    }, 3000);
  }
});

onMounted(async () => {
  if (props.active) {
    isVisible.value = true;

    await animateIn();

    setTimeout(() => {
      animateOut();
    }, 3000);
  }
});
</script>

<template>
  <div class="alert fixed z-[1000] -top-[50px] left-0 right-0 flex justify-center">
    <div
      v-if="isVisible"
      ref="alertRef"
      :class="`w-1/4 min-w-[25rem] min-h-32 flex flex-row justify-between content-center items-center p-5 relative ${isError ? 'bg-red-500/90' : 'bg-green-500/90'} overflow-clip rounded-lg shadow-lg`"
    >
      <div class="flex flex-col justify-center content-start items-start gap-2">
        <h3 class="text-xl text-white font-medium">{{ status === 200 ? 'Success' : status }}</h3>
        <span class="flex flex-row justify-center content-start items-start gap-2 text-white text-base">
          <template v-if="isError">
            <h3 v-if="error">{{ error }}</h3>
            <h3 v-if="error"> - </h3>
          </template>
          <h3>{{ message }}</h3>
        </span>
      </div>
      <Icon :type="isError ? 'error' : 'check'" size="3xl" class="text-white"></Icon>
      <span :class="`w-16 h-16 ${isError ? 'bg-red-300' : 'bg-green-300'} blur-3xl absolute right-0 top-0`">
        <!--Blob-->
      </span>
    </div>
  </div>
</template>
