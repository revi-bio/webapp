<script lang="ts" setup>
import Button from '@/components/global/Button.vue';
import Widget from '@/components/widget/Widget.vue';
import { useBioStore } from '@/stores/bio';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';
import type { Page } from '@/types/Page';

const route = useRoute();
const handle = route.params.handle as string;
const currentPageIndex = ref(0);
const selectedWidgetId = ref<string | null>(null);
const widgetToolboxOpened = ref(false);
const bioSettingsOpened = ref(false);
const bioStore = useBioStore();

// Initialize pages with sample widgets
const pages = ref<Page[]>(
  [
    {
      id: uuidv4(),
      name: 'Page 1',
      icon: 'home',
      widgets: [
/*
      {
        id: uuidv4(),
        genericSettings: new WidgetGenericSettings({
          background: {
            hue: 340,
            saturation: 8,
            value: 16,
            opacity: 0.8,
          },
        }),
        specificSettings: {
          title: 'hello',
          description: 'asdlkasjdlksajdlksajdklsajdkl',
          link: 'https://youtube.com/',
        },
        type: 'link',
      },
      {
        id: uuidv4(),
        genericSettings: new WidgetGenericSettings({}),
        specificSettings: {
          title: 'big gyatt in your area',
          description: 'hahahahahahahahaha',
          link: 'https://youtube.com/',
        },
        type: 'link',
      },
*/
    ],
  },
]
);

onMounted(async () => {
  pages.value = await bioStore.getBioPages(handle);
})

// Computed properties
const currentPage = computed(() =>
  currentPageIndex.value < pages.value.length ? pages.value[currentPageIndex.value] : null,
);

const widgetsOnCurrentPage = computed(() => currentPage.value?.widgets || []);

// Helper functions
function findWidgetIndex(id: string): number {
  if (!currentPage.value) return -1;
  return currentPage.value.widgets.findIndex((w) => w.id === id);
}
</script>

<template>
  <div class="flex justify-center items-center h-full w-full relative">
    <div id="widgets" class="flex flex-col gap-3 justify-center z-0 h-[80%] w-1/2">
      <template v-for="widget in widgetsOnCurrentPage" :key="widget.id">
        <div class="flex gap-2 relative">
          <!-- Widget component -->
          <Widget
            :data="widget"
            class="w-full"
            />
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.sidebar {
  @apply max-w-[400px] min-w-[350px] h-full bg-zinc-800/80 rounded-2xl z-[20] backdrop-blur-3xl relative p-4 flex flex-col gap-2 overflow-y-auto;

  > span {
    @apply mb-1;
  }
}
</style>
