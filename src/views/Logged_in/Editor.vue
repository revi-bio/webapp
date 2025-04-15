<script lang="ts" setup>
import { computed, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import Button from '@/components/global/Button.vue';
import {
  GENERIC_SETTINGS_DEFINITIONS,
  SPECIFIC_SETTINGS_DEFINITIONS,
  WidgetGenericSettings,
  type Widget as IWidget,
  type WidgetType,
} from '@/types/Widget';
import Widget from '@/components/widget/Widget.vue';
import { v4 as uuidv4 } from 'uuid';
import Input from '@/components/global/Input.vue';
import { LinkWidget } from '@/types/widgets/Link';
import type { Page } from '@/types/Page';
import Spotify from '@/components/widget/Spotify.vue';
import { ProfileWidget } from '@/types/widgets/Profile';
import { YoutubeWidget } from '@/types/widgets/YouTube';
import { MarkdownWidget } from '@/types/widgets/Markdown';

const route = useRoute();
const handle = route.params.handle as string;
const currentPageIndex = ref(0);
const selectedWidgetId = ref<string | null>(null);
const widgetToolboxOpened = ref(false);
const bioSettingsOpened = ref(false);

// Initialize pages with sample widgets
const pages = ref<Page[]>([
  {
    id: uuidv4(),
    name: 'Page 1',
    icon: 'home',
    widgets: [
      {
        id: uuidv4(),
        genericSettings: new WidgetGenericSettings({
          background: {
            tint: 340,
            saturation: 8,
            opacity: 0.8,
          },
        }),
        page: 0,
        position: 1,
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
        page: 0,
        position: 2,
        specificSettings: {
          title: 'big gyatt in your area',
          description: 'hahahahahahahahaha',
          link: 'https://youtube.com/',
        },
        type: 'link',
      },
    ],
  },
]);

// Computed properties
const currentPage = computed(() =>
  currentPageIndex.value < pages.value.length ? pages.value[currentPageIndex.value] : null,
);

const widgetsOnCurrentPage = computed(() => currentPage.value?.widgets.sort((a, b) => a.position - b.position) || []);

const selectedWidget = computed(() => {
  if (!selectedWidgetId.value) return null;

  // Look for the selected widget across all pages
  for (const page of pages.value) {
    const widget = page.widgets.find((w) => w.id === selectedWidgetId.value);
    if (widget) return widget;
  }

  return null;
});

// Check if the selected widget is on the current page
const isSelectedWidgetOnCurrentPage = computed(() => {
  if (!selectedWidgetId.value || !currentPage.value) return false;
  return currentPage.value.widgets.some((w) => w.id === selectedWidgetId.value);
});

// Find the page that contains the selected widget
const selectedWidgetPageIndex = computed(() => {
  if (!selectedWidgetId.value) return -1;

  for (let i = 0; i < pages.value.length; i++) {
    if (pages.value[i].widgets.some((w) => w.id === selectedWidgetId.value)) {
      return i;
    }
  }

  return -1;
});

// Helper functions
function getNextPosition(): number {
  if (!currentPage.value || currentPage.value.widgets.length === 0) return 0;

  return Math.max(...currentPage.value.widgets.map((w) => w.position)) + 1;
}

function findWidgetIndex(id: string): number {
  if (!currentPage.value) return -1;
  return currentPage.value.widgets.findIndex((w) => w.id === id);
}

function findWidgetByPosition(position: number): number {
  if (!currentPage.value) return -1;
  return currentPage.value.widgets.findIndex((w) => w.position === position);
}

// UI interaction functions
function toggleSelection(id: string) {
  selectedWidgetId.value = selectedWidgetId.value === id ? null : id;
  widgetToolboxOpened.value = false;
  bioSettingsOpened.value = false;
}

function toggleWidgetToolbox() {
  selectedWidgetId.value = null;
  widgetToolboxOpened.value = !widgetToolboxOpened.value;
  bioSettingsOpened.value = false;
}

function toggleBioSettings() {
  selectedWidgetId.value = null;
  widgetToolboxOpened.value = false;
  bioSettingsOpened.value = !bioSettingsOpened.value;
}

// Widget manipulation functions
function moveWidget(direction: 'up' | 'down') {
  if (!selectedWidgetId.value || !currentPage.value) return;

  const index = findWidgetIndex(selectedWidgetId.value);
  if (index === -1) return;

  const widget = currentPage.value.widgets[index];
  const newPosition = direction === 'up' ? widget.position - 1 : widget.position + 1;

  // Find the min and max positions in the current page
  const positions = currentPage.value.widgets.map(w => w.position);
  const minPosition = Math.min(...positions);
  const maxPosition = Math.max(...positions);

  // Don't move if at the edge
  if (newPosition < minPosition || newPosition > maxPosition) return;

  const swapIndex = findWidgetByPosition(newPosition);
  if (swapIndex !== -1) {
    // Swap positions
    currentPage.value.widgets[swapIndex].position = widget.position;
    widget.position = newPosition;
  }
}

function moveWidgetToPage(direction: 'prev' | 'next') {
  if (!selectedWidgetId.value) return;

  // Find the page that contains the widget
  const sourcePageIndex = selectedWidgetPageIndex.value;
  if (sourcePageIndex === -1) return;

  // Determine target page index
  const targetPageIndex = direction === 'prev' ? sourcePageIndex - 1 : sourcePageIndex + 1;

  // Check if target page exists
  if (targetPageIndex < 0 || targetPageIndex >= pages.value.length) return;

  const sourcePage = pages.value[sourcePageIndex];
  const targetPage = pages.value[targetPageIndex];

  // Find the widget in the source page
  const widgetIndex = sourcePage.widgets.findIndex((w) => w.id === selectedWidgetId.value);
  if (widgetIndex === -1) return;

  // Get the widget to move
  const widgetToMove = { ...sourcePage.widgets[widgetIndex] };
  const removedPosition = widgetToMove.position;

  // Remove widget from source page
  sourcePage.widgets = sourcePage.widgets.filter((w) => w.id !== selectedWidgetId.value);

  // Reindex widgets in the source page to avoid gaps
  sourcePage.widgets.forEach((widget) => {
    if (widget.position > removedPosition) {
      widget.position -= 1;
    }
  });

  // Calculate new position at the end of target page
  const newPosition = targetPage.widgets.length > 0 ? Math.max(...targetPage.widgets.map((w) => w.position)) + 1 : 0;

  // Update widget's page property
  widgetToMove.page = targetPageIndex;
  widgetToMove.position = newPosition;

  // Add widget to target page
  targetPage.widgets.push(widgetToMove);

  // Navigate to the target page if the widget was on the current page
  if (sourcePageIndex === currentPageIndex.value) {
    currentPageIndex.value = targetPageIndex;
  }
}

function deleteWidget() {
  if (!selectedWidgetId.value || !currentPage.value) return;

  const index = findWidgetIndex(selectedWidgetId.value);
  if (index === -1) return;

  // Remove the widget
  currentPage.value.widgets = currentPage.value.widgets.filter((w) => w.id !== selectedWidgetId.value);

  // Select another widget if available
  if (currentPage.value.widgets.length > 0) {
    selectedWidgetId.value = currentPage.value.widgets[0].id;
  } else {
    selectedWidgetId.value = null;
  }
}

function addWidget(type: WidgetType) {
  if (!currentPage.value) return;

  const data = {
    page: currentPageIndex.value,
    position: getNextPosition(),
  };

  switch(type) {
    case 'link': {
      currentPage.value.widgets.push(new LinkWidget(data));
      break;
    }
    case 'profile': {
      currentPage.value.widgets.push(new ProfileWidget(data));
      break;
    }
    case 'youtube': {
      currentPage.value.widgets.push(new YoutubeWidget(data));
      break;
    }
    case 'markdown':{
      currentPage.value.widgets.push(new MarkdownWidget(data));
      break;
    }
  }
}

// Page navigation
function navigatePage(direction: 'prev' | 'next') {
  if (direction === 'prev') {
    if (currentPageIndex.value > 0) {
      currentPageIndex.value--;
    }
  } else {
    if (currentPageIndex.value >= pages.value.length - 1) {
      // Create a new page if we're at the last page and there's less than 3 pages
      if (pages.value.length < 3) {
        pages.value.push({
          id: uuidv4(),
          name: `Page ${pages.value.length + 1}`,
          icon: 'page',
          widgets: [],
        });
      } else {
        return;
      }
    }
    currentPageIndex.value++;
  }
}
</script>

<template>
  <div class="flex justify-center items-center h-full w-full relative">
    <!-- Bottom toolbar -->
    <div class="absolute w-full bottom-0 p-6 justify-between space-x-2 text-zinc-200 grid grid-cols-3">
      <!-- Add widget button -->
      <div class="flex gap-2">
        <Button :onClick="toggleWidgetToolbox" icon-position="only" icon-type="add" size="small" rank="primary" />
      </div>

      <!-- Page navigation -->
      <div class="flex gap-2 items-center justify-center">
        <Button
          :onClick="() => navigatePage('prev')"
          icon-position="only"
          icon-type="chevron_left"
          size="small"
          rank="secondary" />
        <span v-for="(page, index) in pages" :key="page.id">
          {{ currentPageIndex === index ? 'x' : '-' }}
        </span>
        <Button
          :onClick="() => navigatePage('next')"
          icon-position="only"
          icon-type="chevron_right"
          size="small"
          rank="secondary" />
      </div>

      <!-- Bio settings button -->
      <div class="flex justify-end">
        <Button :onClick="toggleBioSettings" icon-position="only" icon-type="settings" size="small" rank="secondary" />
      </div>
    </div>

    <!-- Widget toolbox sidebar -->
    <Teleport defer to="#sidebar-right-outlet" v-if="widgetToolboxOpened">
      <div class="sidebar">
        <span class="text-2xl">Widget toolbox</span>
        <div @click="addWidget('profile')" class="cursor-pointer hover:bg-zinc-700 p-2 rounded">Add profile widget</div>
        <div @click="addWidget('link')" class="cursor-pointer hover:bg-zinc-700 p-2 rounded">Add link widget</div>
        <div @click="addWidget('youtube')" class="cursor-pointer hover:bg-zinc-700 p-2 rounded">Add youtube widget</div>
        <div @click="addWidget('markdown')" class="cursor-pointer hover:bg-zinc-700 p-2 rounded">Add markdown widget</div>
        <!--
        <div @click="addWidget('spotify')" class="cursor-pointer hover:bg-zinc-700 p-2 rounded">Add link widget</div>
        <div @click="addWidget('markdown')" class="cursor-pointer hover:bg-zinc-700 p-2 rounded">Add link widget</div>
        -->
      </div>
    </Teleport>

    <!-- Bio settings sidebar -->
    <Teleport defer to="#sidebar-right-outlet" v-if="bioSettingsOpened">
      <div class="sidebar">
        <span class="text-2xl">Bio settings</span>
      </div>
    </Teleport>

    <!-- Widget settings sidebar -->
    <Teleport defer to="#sidebar-right-outlet" v-if="selectedWidgetId !== null && selectedWidget">
      <div class="sidebar">
        <span class="text-2xl">Widget settings</span>

        <!-- Widget-specific settings -->
        <span>Widget-specific settings</span>
        <span v-for="setting in SPECIFIC_SETTINGS_DEFINITIONS[selectedWidget.type]" :key="setting.name">
          <span class="text-zinc-400">{{ setting.name }}</span>
          <Input type="text" v-model="(selectedWidget.specificSettings as any)[setting.name]" />
        </span>

        <!-- Generic settings -->
        <span>Generic settings</span>
        <span v-for="setting in GENERIC_SETTINGS_DEFINITIONS" :key="setting.name">
          <span class="text-zinc-400">{{ setting.name }}</span>
          <Input type="text" v-model="selectedWidget.genericSettings[setting.name]" />
        </span>
      </div>
    </Teleport>

    <!-- Widgets display -->
    <div id="widgets" class="flex flex-col gap-3 justify-center z-0 h-[80%] w-1/2">
      <template v-for="widget in widgetsOnCurrentPage" :key="widget.id">
        <div class="flex gap-2 relative">
          <!-- Widget component -->
          <Widget
            @click="toggleSelection(widget.id)"
            :data="widget"
            class="w-full"
            :selected="widget.id === selectedWidgetId" />

          <!-- Widget controls - only show for widgets on the current page -->
          <div
            class="flex absolute left-[calc(100%+12px)] gap-2 z-10"
            v-if="widget.id === selectedWidgetId && isSelectedWidgetOnCurrentPage">
            <div class="flex flex-col gap-2">
              <Button
                :onClick="() => moveWidget('up')"
                icon-position="only"
                icon-type="arrow_upward"
                size="small"
                rank="secondary" />
              <Button
                :onClick="() => moveWidget('down')"
                icon-position="only"
                icon-type="arrow_downward"
                size="small"
                rank="secondary" />
              <Button :onClick="deleteWidget" icon-position="only" icon-type="delete" size="small" rank="secondary" />
            </div>
            <div class="flex gap-2">
              <Button
                :onClick="() => moveWidgetToPage('prev')"
                :disabled="selectedWidgetPageIndex <= 0"
                icon-position="only"
                icon-type="arrow_back"
                size="small"
                rank="secondary">
                Previous
              </Button>
              <Button
                :onClick="() => moveWidgetToPage('next')"
                :disabled="selectedWidgetPageIndex >= pages.length - 1"
                icon-position="only"
                icon-type="arrow_forward"
                size="small"
                rank="secondary">
                Next
              </Button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
#widgets *[selected='true'] {
  @apply border-2 border-dashed border-rose-500;
}

.sidebar {
  @apply max-w-[400px] min-w-[350px] h-full bg-zinc-800/80 rounded-2xl z-[20] backdrop-blur-3xl relative p-4 flex flex-col gap-2 overflow-y-auto;

  > span {
    @apply mb-1;
  }
}
</style>
