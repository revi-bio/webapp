<script setup lang="ts">
import type { Widget } from '@/types/Widget';
import { ref, watch } from 'vue';
import LinkIcon from '../global/LinkIcon.vue';
import Icon from '../global/Icon.vue';

const props = defineProps<{
  data: Widget
  inEditor: boolean,
}>();

const links = ref<{ link: string; name: string }[]>([]);

watch(
  () => props.data.specificSettings['links'],
  (newLinks) => {
    links.value = newLinks || [];
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex flex-wrap gap-4 justify-center">
    <div
      v-for="(link, index) in links"
      :key="index"
      class="flex-1 min-w-[calc(33.33%-1rem)] text-center bg-zinc-700/20 rounded-md hover:bg-zinc-600/30 transition duration-200 ease-in-out"
    >
      <a
        v-if="!inEditor"
        :href="link.link"
        target="_blank"
        rel="noopener noreferrer"
        class="text-zinc-300 cursor-pointer flex flex-col items-center justify-center h-full p-4"
      >
        {{ link.name }}
        <LinkIcon width="32px" color="zinc-200" :url="link.link" />
      </a>
      <p
        v-if="inEditor"
        class="text-zinc-300 cursor-pointer flex flex-col items-center justify-center h-full p-4"
      >
        {{ link.name }}
        <LinkIcon width="48px" color="zinc-200" :url="link.link" />
      </p>

    </div>
    <div v-if="!links || links.length === 0" class="w-full text-center text-zinc-400 text-2xl py-4">
      <Icon type="account_tree" size="2xl"/>
      <p class="w-full text-center text-2xl py-4">
        No links selected.
      </p>
    </div>
  </div>
</template>

<style lang="scss">

</style>
