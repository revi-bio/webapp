<script lang="ts" setup>
import Button from '@/components/global/Button.vue';
import Widget from '@/components/widget/Widget.vue';
import { useBioStore } from '@/stores/bio';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';
import type { Page } from '@/types/Page';
import PageSelector from '@/components/global/PageSelector.vue';

const route = useRoute();
const handle = route.params.handle as string;
const currentPageIndex = ref(0);
const selectedWidgetId = ref<string | null>(null);
const widgetToolboxOpened = ref(false);
const bioSettingsOpened = ref(false);
const bioStore = useBioStore();
const backgroundStyle = ref('');

// Initialize pages with sample widgets
const pages = ref<Page[]>(
  [
    {
      id: uuidv4(),
      name: 'Page 1',
      icon: 'home',
      widgets: [],
    },
  ]
);

async function updateBackgroundStyle() {
  const currentBio = await bioStore.fetchBio(handle);
  backgroundStyle.value = `background-image: url(${import.meta.env.VITE_API_BASE_URL}/file/${currentBio.backgroundImage});`;
}

onMounted(async () => {
  pages.value = await bioStore.getBioPages(handle);
  await updateBackgroundStyle();
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
  <div class="flex justify-center items-center h-full w-full relative bg-cover bg-center" :style="backgroundStyle">
    <div class="h-[80%] max-w-[600px] w-1/2 max-md:w-full max-md:p-4 overflow-y-scroll pr-2">
      <div id="widgets"
        class="flex flex-col gap-3 justify-center z-0 ">
        <template v-for="widget in widgetsOnCurrentPage" :key="widget.id">
          <div class="flex gap-2 relative">
            <!-- Widget component -->
            <Widget :data="widget" class="w-full" />
          </div>
        </template>
      </div>
    </div>

    <div class="absolute w-full bottom-0 flex justify-center items-center gap-2 p-4">

      <PageSelector :pages="pages" @selectedPageIndex="(index) => currentPageIndex = index" />
    </div>
  </div>
</template>

<style lang="scss">
.sidebar {
  @apply max-w-[400px] min-w-[350px] h-full bg-zinc-800/80 rounded-2xl z-[20] backdrop-blur-3xl relative p-4 flex flex-col gap-2 overflow-y-auto;

  >span {
    @apply mb-1;
  }
}
</style>
