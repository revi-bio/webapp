<script lang="ts" setup>
import { animate } from "motion";
import Icon from "./Icon.vue";
import { ref, watch, onMounted, nextTick } from "vue";

const props = defineProps<{
  status: number,
  error?: string,
  message: string,
  active: boolean
}>();

const emit = defineEmits(['hide']);
const isVisible = ref(props.active);
const alertRef = ref<HTMLElement | null>(null);

const animateIn = async () => {
  await nextTick();

  if (alertRef.value) {
    animate(
      alertRef.value,
      {
        y: ['-100px', '0px'],
        opacity: [0, 1]
      },
      {
        duration: 0.5,
        easing: 'ease-out'
      }
    );
  }
};

const animateOut = async () => {
  if (alertRef.value) {
    await animate(
      alertRef.value,
      {
        y: ['0px', '-100px'],
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
  <div class="alert fixed z-[1000] top-10 left-0 right-0 flex justify-center">
    <div
      v-if="isVisible"
      ref="alertRef"
      :class="`w-1/4 min-w-[25rem] min-h-32 flex flex-row justify-between content-center items-center p-5 relative ${props.error ? 'bg-red-500' : 'bg-green-500'} overflow-clip rounded-lg`"
    >
      <div class="flex flex-col justify-center content-start items-start gap-2">
        <h3 class="text-xl text-zinc-300">{{ props.status }}</h3>
        <span class="flex flex-row justify-center content-start items-start gap-2 text-zinc-300 text-base">
          <h3 v-if="props.error">{{ props.error }}</h3>
          <h3 v-if="props.error"> - </h3>
          <h3>{{ props.message }}</h3>
        </span>
      </div>
      <Icon :type="props.error ? 'error' : 'check'" size="3xl"></Icon>
      <span :class="`w-16 h-16 ${props.error? 'bg-red-300' : 'bg-green-300'} blur-3xl absolute right-0 top-0`">
        <!--Blob-->
      </span>
    </div>
  </div>
</template>
