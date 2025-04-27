<script lang="ts" setup>
import { computed, onMounted, ref, type Ref } from 'vue';
import Button from '@/components/global/Button.vue';
import { WidgetGenericSettings, type WidgetType } from '@/types/Widget';
import Widget from '@/components/widget/Widget.vue';
import { v4 as uuidv4 } from 'uuid';
import Input from '@/components/global/Input.vue';
import type { Page } from '@/types/Page';
import { LinkWidget } from '@/types/widgets/Link';
import { ProfileWidget } from '@/types/widgets/Profile';
import { YoutubeWidget } from '@/types/widgets/YouTube';
import { MarkdownWidget } from '@/types/widgets/Markdown';
import { GalleryWidget } from '@/types/widgets/Gallery';
import ColorPicker from '@/components/global/ColorPicker.vue';
import { GENERIC_SETTINGS_DEFINITIONS, SPECIFIC_SETTINGS_DEFINITIONS } from '@/types/WidgetSettings';
import { useBioStore } from '@/stores/bio';
import { useRoute } from 'vue-router';
import ImagePicker from '@/components/global/ImagePicker.vue';
import Alert from '@/components/global/Alert.vue';

const route = useRoute();
const handle = route.params.handle as string;
const currentPageIndex = ref(0);
const selectedWidgetId = ref<string | null>(null);
const widgetToolboxOpened = ref(false);
const bioSettingsOpened = ref(false);
const bioStore = useBioStore();
const alertStatus = ref<number>(0);
const alertError = ref<string>('');
const alertMessage = ref<string>('');
const alertActive = ref<boolean>(false);


// Initialize pages with sample widgets
const pages = ref<Page[]>([
  {
    id: uuidv4(),
    name: 'Page 1',
    icon: 'home',
    widgets: [],
  },
]);

onMounted(async () => {
  try {
    const stored = await bioStore.getBioPages(handle);
    if (stored.length != 0) {
      pages.value = stored;
      console.log(pages.value)
    }
  } catch (error: any) {
    console.error("Error fetching bio pages:", error);
    showAlert(
      error.response?.status || 500,
      error.response?.data?.error || "Error",
      error.response?.data?.message || "Failed to fetch bio pages"
    );
  }
});

// Computed properties
const currentPage = computed(() =>
  currentPageIndex.value < pages.value.length ? pages.value[currentPageIndex.value] : null,
);

const widgetsOnCurrentPage = computed(() => currentPage.value?.widgets || []);

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
function findWidgetIndex(id: string): number {
  if (!currentPage.value) return -1;
  return currentPage.value.widgets.findIndex((w) => w.id === id);
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
  try {
    if (!selectedWidgetId.value || !currentPage.value) return;

    const index = findWidgetIndex(selectedWidgetId.value);
    if (index === -1) return;

    // Don't move if at the edge
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === currentPage.value.widgets.length - 1)) {
      return;
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1;

    // Swap widgets in the array
    const widgets = [...currentPage.value.widgets];
    const temp = widgets[newIndex];
    widgets[newIndex] = widgets[index];
    widgets[index] = temp;

    currentPage.value.widgets = widgets;

    // Show success alert
    showAlert(200, '', `Widget moved ${direction} successfully!`);
  } catch (error: any) {
    console.error(`Error moving widget ${direction}:`, error);
    showAlert(
      error.response?.status || 500,
      error.response?.data?.error || "Error",
      error.response?.data?.message || `Failed to move widget ${direction}`
    );
  }
}

function moveWidgetToPage(direction: 'prev' | 'next') {
  if (!selectedWidgetId.value) return;

  // Find the page that contains the widget
  const sourcePageIndex = selectedWidgetPageIndex.value;
  if (sourcePageIndex === -1) return;

  // Determine target page index
  const targetPageIndex = direction === 'prev' ? sourcePageIndex - 1 : sourcePageIndex + 1;

  // Check if target page is out of bounds
  if (targetPageIndex < 0) return;

  // Check page limit (max 3 pages)
  if (direction === 'next' && targetPageIndex >= pages.value.length && pages.value.length >= 3) return;

  const sourcePage = pages.value[sourcePageIndex];
  let targetPage;

  // Check if target page exists or create a new one if moving to next and at the end
  if (direction === 'next' && targetPageIndex >= pages.value.length) {
    // Create a new page
    targetPage = {
      id: uuidv4(),
      name: `Page ${pages.value.length + 1}`,
      icon: 'page',
      widgets: [],
    };
    pages.value.push(targetPage);
  } else {
    targetPage = pages.value[targetPageIndex];
  }

  // Find the widget in the source page
  const widgetIndex = sourcePage.widgets.findIndex((w) => w.id === selectedWidgetId.value);
  if (widgetIndex === -1) return;

  // Get the widget to move
  const widgetToMove = { ...sourcePage.widgets[widgetIndex] };

  // Remove widget from source page
  sourcePage.widgets = sourcePage.widgets.filter((w) => w.id !== selectedWidgetId.value);

  // Check if source page is now empty and remove it if it is
  if (sourcePage.widgets.length === 0) {
    // Remove the empty page
    const pageToRemoveIndex = pages.value.findIndex((p) => p.id === sourcePage.id);
    if (pageToRemoveIndex !== -1) {
      pages.value.splice(pageToRemoveIndex, 1);

      // Adjust current page index if needed
      if (currentPageIndex.value >= pageToRemoveIndex && currentPageIndex.value > 0) {
        currentPageIndex.value--;
      }

      // Adjust target page index if it was after the removed page
      if (targetPageIndex > pageToRemoveIndex) {
        targetPage = pages.value[targetPageIndex - 1];
      }
    }
  }

  // Add widget to target page
  targetPage.widgets.push(widgetToMove);

  // Always navigate to the target page when moving a widget
  // This ensures we follow the widget to its new location
  const newTargetPageIndex = pages.value.findIndex((p) => p.id === targetPage.id);
  if (newTargetPageIndex !== -1) {
    currentPageIndex.value = newTargetPageIndex;
  }
}

function deleteWidget() {
  try {
    if (!selectedWidgetId.value || !currentPage.value) return;

    const index = findWidgetIndex(selectedWidgetId.value);
    if (index === -1) return;

    // Remove the widget
    currentPage.value.widgets = currentPage.value.widgets.filter((w) => w.id !== selectedWidgetId.value);

    // Select another widget if available
    if (currentPage.value.widgets.length > 0) {
      selectedWidgetId.value = currentPage.value.widgets[Math.max(0, index - 1)].id;
    } else {
      selectedWidgetId.value = null;
    }

    // Show success alert
    showAlert(200, '', 'Widget deleted successfully!');
  } catch (error: any) {
    console.error("Error deleting widget:", error);
    showAlert(
      error.response?.status || 500,
      error.response?.data?.error || "Error",
      error.response?.data?.message || "Failed to delete widget"
    );
  }
}

function addWidget(type: WidgetType) {
  try {
    if (!currentPage.value) return;

    const data = {};

    switch (type) {
      case 'link': {
        currentPage.value.widgets.push(new LinkWidget(data));
        showAlert(200, '', `Link widget added successfully!`);
        break;
      }
      case 'profile': {
        currentPage.value.widgets.push(new ProfileWidget(data));
        showAlert(200, '', `Profile widget added successfully!`);
        break;
      }
      case 'youtube': {
        currentPage.value.widgets.push(new YoutubeWidget(data));
        showAlert(200, '', `YouTube widget added successfully!`);
        break;
      }
      case 'markdown': {
        currentPage.value.widgets.push(new MarkdownWidget(data));
        showAlert(200, '', `Markdown widget added successfully!`);
        break;
      }
      case 'gallery': {
        currentPage.value.widgets.push(new GalleryWidget(data));
        showAlert(200, '', `Gallery widget added successfully!`);
        break;
      }
    }
  } catch (error: any) {
    console.error(`Error adding ${type} widget:`, error);
    showAlert(
      error.response?.status || 500,
      error.response?.data?.error || "Error",
      error.response?.data?.message || `Failed to add ${type} widget`
    );
  }
}

// Page navigation
function navigatePage(direction: 'prev' | 'next') {
  if (selectedWidgetId.value != null)
    selectedWidgetId.value = null;

  if (direction === 'prev') {
    if (currentPageIndex.value > 0) {
      // Check if the current page has no widgets before navigating away
      if (currentPage.value && currentPage.value.widgets.length === 0) {
        // Remove the empty page
        pages.value.splice(currentPageIndex.value, 1);
        // Adjust the current page index
        currentPageIndex.value--;
      } else {
        currentPageIndex.value--;
      }
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

const showAlert = (status: number, error: string, message: string) => {
  alertStatus.value = status;
  alertError.value = status === 200 ? '' : error;
  alertMessage.value = message;
  alertActive.value = true;
};
const onAlertHide = () => {
  alertActive.value = false;
};
async function savePages() {
  console.log(pages.value);
  try {
    const response = await bioStore.saveBioPages(handle, pages.value);
    showAlert(200, '', "Bio saved successfully!");
  } catch (error: any) {
    console.error("Error saving bio pages:", error);
    showAlert(
      error.response?.status || 500,
      error.response?.data?.error || "Error",
      error.response?.data?.message || "Failed to save bio pages"
    );
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
        <Button :onClick="() => navigatePage('prev')" icon-position="only" icon-type="chevron_left" size="small"
          rank="secondary" />
        <span v-for="(page, index) in pages" :key="page.id">
          {{ currentPageIndex === index ? 'x' : '-' }}
        </span>
        <Button :onClick="() => navigatePage('next')" icon-position="only" icon-type="chevron_right" size="small"
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
        <div @click="addWidget('markdown')" class="cursor-pointer hover:bg-zinc-700 p-2 rounded">
          Add markdown widget
        </div>
        <div @click="addWidget('gallery')" class="cursor-pointer hover:bg-zinc-700 p-2 rounded">Add gallery widget</div>
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
          <Input v-if="setting.type === 'number' || setting.type === 'string'" type="text"
            v-model="(selectedWidget.specificSettings as any)[setting.name]" />
          <ColorPicker v-else-if="setting.type === 'color'" class="w-full" :type="setting.name" @color-selected="
            (_baseColor, _shade, opacity, hslaValue) => {
              (selectedWidget!.specificSettings as any)[setting.name] = {
                hue: hslaValue.h,
                saturation: hslaValue.s,
                value: hslaValue.l,
                opacity: hslaValue.a,
              };
            }
          " />
          <ImagePicker :widgetId="selectedWidgetId" :images="selectedWidget.specificSettings['images']"
            v-else-if="setting.type === 'images'" @change-images="(images) => {
              selectedWidget.specificSettings['images'] = images
            }" />
        </span>

        <!-- Generic settings -->
        <span>Generic settings</span>
        <span v-for="setting in GENERIC_SETTINGS_DEFINITIONS" :key="setting.name">
          <span class="text-zinc-400">{{ setting.name }}</span>
          <Input v-if="setting.type !== 'color'" type="text"
            v-model="(currentPage?.widgets.find((w) => w.id === selectedWidgetId)?.genericSettings as any)[setting.name]" />
          <ColorPicker v-if="setting.type === 'color'" class="w-full" :type="setting.name" @color-selected="
            (_baseColor, _shade, opacity, hslaValue) => {
              (selectedWidget!.genericSettings as any)[setting.name] = {
                hue: hslaValue.h,
                saturation: hslaValue.s,
                value: hslaValue.l,
                opacity: hslaValue.a,
              };
            }
          " />
        </span>
      </div>
    </Teleport>

    <!-- Widgets display -->
    <div id="widgets" class="flex flex-col gap-3 justify-center z-0 h-[80%] w-1/2">
      <template v-for="widget in widgetsOnCurrentPage" :key="widget.id">
        <div class="flex gap-2 relative">
          <!-- Widget component -->
          <Widget @click="toggleSelection(widget.id)" :data="widget" class="w-full"
            :selected="widget.id === selectedWidgetId" />

          <!-- Widget controls - only show for widgets on the current page -->
          <div class="flex absolute left-[calc(100%+12px)] gap-2 z-10"
            v-if="widget.id === selectedWidgetId && isSelectedWidgetOnCurrentPage">
            <div class="flex flex-col gap-2">
              <Button :onClick="() => moveWidget('up')" icon-position="only" icon-type="arrow_upward" size="small"
                rank="secondary" />
              <Button :onClick="() => moveWidget('down')" icon-position="only" icon-type="arrow_downward" size="small"
                rank="secondary" />
              <Button :onClick="deleteWidget" icon-position="only" icon-type="delete" size="small" rank="secondary" />
            </div>
            <div class="flex gap-2">
              <Button :onClick="() => moveWidgetToPage('prev')" icon-position="only" icon-type="arrow_back" size="small"
                rank="secondary">
                Previous
              </Button>
              <Button :onClick="() => moveWidgetToPage('next')" icon-position="only" icon-type="arrow_forward"
                size="small" rank="secondary">
                Next
              </Button>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="top-0 right-0 m-6 absolute">
      <Button :onClick="savePages" icon-position="only" icon-type="save" size="small" rank="primary" />
    </div>
  </div>
  <Alert :status="alertStatus" :error="alertError" :message="alertMessage" :active="alertActive" @hide="onAlertHide" />
</template>

<style lang="scss">
#widgets *[selected='true'] {
  @apply ring-2 ring-rose-500;
}

.sidebar {
  @apply max-w-[400px] min-w-[350px] h-full bg-zinc-800/80 rounded-2xl z-[20] backdrop-blur-3xl relative p-4 flex flex-col gap-2 overflow-y-auto;

  >span {
    @apply mb-1;
  }
}
</style>
