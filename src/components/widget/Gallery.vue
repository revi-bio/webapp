<script lang="ts" setup>
import type { Widget } from '@/types/Widget';
import { ref, watch } from 'vue';
import Icon from '../global/Icon.vue';

const props = defineProps<{
  data: Widget;
}>();

const currentIndex = ref(0);
const images = ref<string[]>([]);

watch(
  () => props.data.specificSettings['images'],
  (newImages) => {
    images.value = newImages || [];
    console.log('update');
    currentIndex.value = 0;
    console.log(currentIndex.value);
  },
  { immediate: true },
);

function nextImage() {
  if (currentIndex.value < images.value.length - 1) {
    currentIndex.value++;
  }
}

function prevImage() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <h3 class="text-2xl">{{ data.specificSettings['title'] }}</h3>
    <div class="relative">
      <img v-if="images.length" :src="images[currentIndex]" alt="Gallery image" class="w-full h-auto rounded-lg" />
      <p v-else class="text-center text-zinc-500">No images available</p>

      <Icon
        v-if="currentIndex > 0"
        class="absolute top-1/2 left-2 py-1 px-2 text-zinc-200 bg-zinc-700/70 rounded-full cursor-pointer text-3xl"
        @click="prevImage"
        type="chevron_left" />
      <Icon
        v-if="currentIndex < images.length - 1"
        class="absolute top-1/2 right-2 py-1 px-2 text-zinc-200 bg-zinc-700/70 rounded-full cursor-pointer text-3xl"
        @click="nextImage"
        type="chevron_right" />

      <p
        v-if="images.length"
        class="absolute bottom-1 left-1/2 text-zinc-200 text-sm bg-black/50 px-3 py-1 rounded-full">
        {{ currentIndex + 1 }} / {{ images.length }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.gallery {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.image-container img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.controls {
  margin-top: 12px;
}

.icon {
  padding: 8px 16px;
  margin: 0 8px;
  font-size: 16px;
  cursor: pointer;
}

.icon:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px;
  font-size: 24px;
  cursor: pointer;
  color: white;
  border-radius: 50%;
  user-select: none;

  &.left {
    left: 12px;
  }

  &.right {
    right: 12px;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}

.counter {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}
</style>
