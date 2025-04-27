<script setup lang="ts">
import type { Widget } from '@/types/Widget';
import { ref, watch } from 'vue';

const props = defineProps<{
  data: Widget
}>();

const links = ref<[{ link: string; name: string }]>();
console.log(props.data)
// Figyeljük a specificSettings.links változását
watch(
  () => props.data.specificSettings['links'],
  (newLinks) => {
    links.value = newLinks || [];
    console.log('specificSettings.links:', props.data.specificSettings['links']);
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    adsasd
    <h3 class="text-2xl">{{ data.specificSettings['title'] }}</h3>
    <ul class="link-list">
      <li v-for="(link, index) in links" :key="index" class="link-item">
        <a :href="link.link" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">
          {{ link.name }}
        </a>
      </li>
    </ul>
  </div>
  <pre>{{ JSON.stringify(data.specificSettings['links'], null, 2) }}</pre>
</template>

<style lang="scss">

</style>
