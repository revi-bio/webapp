<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue';
import Icon from '@/components/global/Icon.vue';

const props = defineProps<{
  pages: { id: string; name: string; icon: string }[];
}>();

const emit = defineEmits<{ (event: 'selectedPageIndex', index: number): void }>();

const currentPageIndex = ref(0);

function selectPage(index: number) {
  currentPageIndex.value = index;
  emit('selectedPageIndex', index);
}
</script>

<template>
  <div class="PageContainer">
    <span v-for="(page, index) in pages" :key="page.id" class="Page" :selected="currentPageIndex == index"
      @click="selectPage(index)">
      <Icon :type="page.icon" class="Page__Icon" />
      <span class="Page__Name">{{ page.name }}</span>
    </span>
  </div>
</template>

<style lang="scss">
.PageContainer {
  @apply flex gap-2 items-center justify-center bg-zinc-900 place-self-center rounded-full border border-zinc-900;
}

.Page {
  @apply bg-zinc-800 flex gap-2 items-center cursor-pointer rounded-full lg:pr-3 hover:bg-zinc-700 transition duration-200;

  .Page__Icon {
    @apply px-3 rounded-full bg-zinc-700;
  }

  .Page__Name {
    @apply max-lg:hidden;
  }

  &[selected='true'] {
    // @apply ;

    .Page__Icon {
      @apply bg-rose-500;
    }
  }
}
</style>
