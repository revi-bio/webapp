<script lang="ts" setup>
import { computed, onMounted, ref, watchEffect, type Ref } from 'vue';
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
import { LinkContainerWidget } from '@/types/widgets/LinkContainer';
import { SpotifyWidget } from '@/types/widgets/Spotify';
import ColorPicker from '@/components/global/ColorPicker.vue';
import { GENERIC_SETTINGS_DEFINITIONS, SPECIFIC_SETTINGS_DEFINITIONS } from '@/types/WidgetSettings';
import { useBioStore } from '@/stores/bio';
import { useRoute } from 'vue-router';
import ImagePicker from '@/components/global/ImagePicker.vue';
import Alert from '@/components/global/Alert.vue';
import LinkSelector from '@/components/global/LinkSelector.vue';
import Slider from '@/components/global/Slider.vue';
import { ApiWrapper } from '@/composables/ApiWrapper';
import Textbox from '@/components/global/Textbox.vue';
import { default as Modal } from '@/components/global/NewModal.vue';
import Icon from '@/components/global/Icon.vue';
import PageSelector from '@/components/global/PageSelector.vue';
import LoadingCircle from '@/components/global/LoadingCircle.vue';

const emits = defineEmits([
  'avatarChange',
  'wallpaperChange'
]);

const apiUrl = import.meta.env.VITE_BASE_URL;
const route = useRoute();
const handle = route.params.handle as string;
const currentPageIndex = ref(0);
const selectedWidgetId = ref<string | null>(null);
const widgetToolboxOpened = ref(false);
const bioSettingsOpened = ref(false);
const pagesSidebarOpened = ref(false);
const bioStore = useBioStore();
const alertStatus = ref<number>(0);
const alertError = ref<string>('');
const alertMessage = ref<string>('');
const alertActive = ref<boolean>(false);
const backgroundStyle = ref(``);
const newPageName = ref('');
const newPageIcon = ref('');
const globalGenericSettings = ref<Record<string, any>>({});
const editSelectPage = ref({
  id: '',
  name: '',
  icon: '',
});

const isLoadingBio = ref(false);

// Initialize pages with sample widgets
const pages = ref<Page[]>([
  {
    id: uuidv4(),
    name: 'Page 1',
    icon: 'home',
    widgets: [],
  },
]);

async function updateBackgroundStyle() {
  const currentBio = await bioStore.fetchBio(handle);

  backgroundStyle.value = `background-image: url(${import.meta.env.VITE_API_BASE_URL}/file/${currentBio.backgroundImage});`;
}

onMounted(async () => {
  try {
    isLoadingBio.value = true;
    const stored = await bioStore.getBioPages(handle);
    if (stored.length != 0) {
      pages.value = stored;
      console.log(pages.value)
    }

    await updateBackgroundStyle();
  } catch (error: any) {
    console.error("Error fetching bio pages:", error);
    showAlert(
      error.response?.status || 500,
      error.response?.data?.error || "Error",
      error.response?.data?.message || "Failed to fetch bio pages"
    );
  } finally {
    isLoadingBio.value = false;
  }

  if (pages.value.length > 0 && pages.value[0].widgets.length > 0) {
    const firstWidget = pages.value[0].widgets[0];
    globalGenericSettings.value = { ...firstWidget.genericSettings };
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
  pagesSidebarOpened.value = false;

  console.log(selectedWidget.value)
}

function toggleWidgetToolbox() {
  selectedWidgetId.value = null;
  widgetToolboxOpened.value = !widgetToolboxOpened.value;
  bioSettingsOpened.value = false;
  pagesSidebarOpened.value = false;
}

function togglePagesSidebar() {
  selectedWidgetId.value = null;
  widgetToolboxOpened.value = false;
  bioSettingsOpened.value = false;
  pagesSidebarOpened.value = !pagesSidebarOpened.value;
}

function toggleBioSettings() {
  selectedWidgetId.value = null;
  widgetToolboxOpened.value = false;
  bioSettingsOpened.value = !bioSettingsOpened.value;
  pagesSidebarOpened.value = false;
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
      case 'markdown': {
        currentPage.value.widgets.push(new MarkdownWidget(data));
        break;
      }
      case 'gallery': {
        currentPage.value.widgets.push(new GalleryWidget(data));
        break;
      }
      case 'linkContainer': {
        currentPage.value.widgets.push(new LinkContainerWidget(data));
        break;
      }
      case 'spotify': {
        currentPage.value.widgets.push(new SpotifyWidget(data));
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

function addPage() {
  pages.value.push({ id: uuidv4(), name: newPageName.value, icon: newPageIcon.value, widgets: [] });
  newPageName.value = '';
  newPageIcon.value = '';
}

function deletePage(pageId: string) {
  pages.value = pages.value.filter((page) => page.id !== pageId);
}

function movePageUp(pageId: string) {
  const index = pages.value.findIndex((page) => page.id === pageId);
  const temp = pages.value[index - 1];
  pages.value[index - 1] = pages.value[index];
  pages.value[index] = temp;
}

function movePageDown(pageId: string) {
  const index = pages.value.findIndex((page) => page.id === pageId);
  const temp = pages.value[index + 1];
  pages.value[index + 1] = pages.value[index];
  pages.value[index] = temp;
}

function editPage(pageId: string) {
  const page = pages.value.find((page) => page.id === pageId);
  if (page) {
    page.name = newPageName.value;
    page.icon = newPageIcon.value;
  }

  page.name = editSelectPage.value.name;
  page.icon = editSelectPage.value.icon;

  editSelectPage.value = {
    id: '',
    name: '',
    icon: '',
  };

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

async function shareBio() {
  await navigator.clipboard.writeText(apiUrl + "/" + handle);
  showAlert(200, '', 'Bio url copied to clipboard!')
}

function handleUploadFile(path: string) {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';

  fileInput.onchange = async (event) => {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files[0]) {
      const formData = new FormData();
      formData.append('file', target.files[0]);
      await ApiWrapper.patch(path, formData);

      if (path.includes('bioPfp')) {
        emits('avatarChange');
      }
    }
    await updateBackgroundStyle();
  };

  fileInput.click();

};

function updateAllWidgetsGenericSettings(settingName: string, value: any) {
  pages.value.forEach((page) => {
    page.widgets.forEach((widget) => {
      if (!widget.genericSettings) {
        widget.genericSettings = {};
      }
      widget.genericSettings[settingName] = value;
    });
  });
}

</script>

<template>
  <Modal @close="widgetToolboxOpened = false" :show="widgetToolboxOpened" title="Add widget">
    <div class="grid grid-cols-3 grid-rows-3 [&>*]:aspect-square">
      <div @click="addWidget('profile')" class="cursor-pointer hover:bg-zinc-700 p-2 rounded">Profile widget</div>
      <div @click="addWidget('link')" class="cursor-pointer hover:bg-zinc-700 p-2 rounded">Link widget</div>
      <div @click="addWidget('youtube')" class="cursor-pointer hover:bg-zinc-700 p-2 rounded">YouTube widget</div>
      <div @click="addWidget('markdown')" class="cursor-pointer hover:bg-zinc-700 p-2 rounded">Markdown widget</div>
      <div @click="addWidget('gallery')" class="cursor-pointer hover:bg-zinc-700 p-2 rounded">Gallery widget</div>
      <div @click="addWidget('linkContainer')" class="cursor-pointer hover:bg-zinc-700 p-2 rounded">Link container
        widget</div>
      <div @click="addWidget('spotify')" class="cursor-pointer hover:bg-zinc-700 p-2 rounded">Spotify widget</div>
    </div>
  </Modal>
  <div class="flex justify-center items-center h-full w-full relative rounded-2xl bg-cover bg-center"
    :style="backgroundStyle">
    <!-- Bottom toolbar -->
    <div
      class="absolute w-full bottom-0 p-4 gap-2 justify-between space-x-2 text-zinc-200 grid md:grid-cols-2 lg:grid-cols-7 bg-zinc-900/50 lg:rounded-2xl">
      <!-- Add widget button -->
      <div class="flex gap-2 lg:col-span-2">
        <Button @click="toggleWidgetToolbox" text="Add widget" icon="add" primary small />
      </div>

      <!-- Page navigation -->

      <PageSelector class="lg:col-span-3 max-lg:col-span-2 max-lg:row-start-1 max-lg:w-full" :pages="pages"
        @selectedPageIndex="(index) => {
          currentPageIndex = index
          selectedWidgetId = null;
          widgetToolboxOpened = false;
          bioSettingsOpened = false;
          pagesSidebarOpened = false;
        }"></PageSelector>

      <!-- Bio settings button -->
      <div class="flex justify-end gap-2 lg:col-span-2">
        <Button @click="togglePagesSidebar" text="Pages" icon="settings" small />
        <Button @click="toggleBioSettings" text="Bio settings" icon="settings" small />
      </div>
    </div>

    <!-- Bio settings sidebar -->
    <Teleport defer to="#sidebar-right-outlet" v-if="bioSettingsOpened">
      <div class="sidebar">
        <span class="text-2xl">Bio settings</span>
        <Button :onClick="() => handleUploadFile(`bio/${handle}/bioWallpaper`)" text="Change wallpaper"
          icon-position="none" size="normal" rank="secondary" />
        <Button :onClick="() => handleUploadFile(`bio/${handle}/bioPfp`)" text="Change avatar" icon-position="none"
          size="normal" rank="secondary" />


        <!-- Generic settings -->
        <span>Generic settings for all widgets</span>
        <div v-for="setting in GENERIC_SETTINGS_DEFINITIONS" :key="setting.name" class="mb-4">
          <span class="text-zinc-400">{{ setting.name }}</span>
          <Input v-if="setting.type === 'string'" type="text" v-model="globalGenericSettings[setting.name]"
            @input="updateAllWidgetsGenericSettings(setting.name, globalGenericSettings[setting.name])" />
          <ColorPicker v-else-if="setting.type === 'color'" class="w-full" :type="setting.name" @color-selected="
            (_baseColor, _shade, opacity, hslaValue) => {
              const newValue = {
                hue: hslaValue.h,
                saturation: hslaValue.s,
                value: hslaValue.l,
                opacity: hslaValue.a,
              };
              globalGenericSettings[setting.name] = newValue;
              updateAllWidgetsGenericSettings(setting.name, newValue);
            }
          " />
          <Slider :max="100" :min="0" v-model="globalGenericSettings[setting.name]"
            @input="updateAllWidgetsGenericSettings(setting.name, globalGenericSettings[setting.name])"
            v-else-if="setting.type === 'number'" />
        </div>
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
          <Input v-if="setting.type === 'string'" type="text"
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
          <LinkSelector :widgetId="selectedWidgetId" :links="selectedWidget.specificSettings['links']"
            v-else-if="setting.type === 'links'" @change-links="(links) => {
              selectedWidget.specificSettings['links'] = links;
            }" />
          <Slider :max="100" :min="0" v-model="(selectedWidget.specificSettings as any)[setting.name]"
            v-else-if="setting.type === 'number'" />
          <Input v-model="(selectedWidget.specificSettings as any)[setting.name]" type="textarea" class="h-[200px]"
            v-else-if="setting.type === 'text'" />
        </span>

        <!-- Generic settings -->
        <span>Generic settings</span>
        <span v-for="setting in GENERIC_SETTINGS_DEFINITIONS" :key="setting.name">
          <span class="text-zinc-400">{{ setting.name }}</span>
          <Input v-if="setting.type === 'string'" type="text"
            v-model="(currentPage?.widgets.find((w) => w.id === selectedWidgetId)?.genericSettings as any)[setting.name]" />
          <ColorPicker v-else-if="setting.type === 'color'" class="w-full" :type="setting.name" @color-selected="
            (_baseColor, _shade, opacity, hslaValue) => {
              (selectedWidget!.genericSettings as any)[setting.name] = {
                hue: hslaValue.h,
                saturation: hslaValue.s,
                value: hslaValue.l,
                opacity: hslaValue.a,
              };
            }
          " />
          <Slider :max="100" :min="0" v-model="(selectedWidget.genericSettings as any)[setting.name]"
            v-else-if="setting.type === 'number'" />
        </span>
      </div>
    </Teleport>

    <!-- Pages sidebar -->
    <Teleport defer to="#sidebar-right-outlet" v-if="pagesSidebarOpened">
      <div class="sidebar">
        <span class="text-2xl">Pages</span>
        <span class="text-zinc-400">Note: When someone visits your bio page, they will see the first page.</span>

        <div class="flex flex-col gap-2" v-if="editSelectPage.id === ''">
          <span>New page</span>
          <Input type="text" placeholder="Name" v-model="newPageName" />
          <Input type="text" placeholder="Icon" v-model="newPageIcon" />
          <Button @click="addPage" text="Add page" :disabled="pages.length == 3" icon="add" primary />
        </div>

        <div class="flex flex-col gap-2" v-if="editSelectPage.id !== ''">
          <span>Edit page</span>
          <Input type="text" placeholder="Name" v-model="editSelectPage.name" />
          <Input type="text" placeholder="Icon" v-model="editSelectPage.icon" />
          <Button @click="editPage(editSelectPage.id)" text="Confirm" icon="edit" primary />
        </div>

        <span>Page list</span>
        <div class="flex flex-col gap-2">
          <div v-for="(page, index) in pages" :key="page.id"
            class="flex items-center w-full bg-zinc-800 rounded-lg p-1 gap-2 cursor-pointer border-zinc-900/70 border-2 hover:bg-zinc-700 transition duration-200"
            @click="() => {
              if (editSelectPage.id === '') {
                editSelectPage.id = page.id;
                editSelectPage.name = page.name;
                editSelectPage.icon = page.icon;
              }
              else {
                editSelectPage.id = '';
                editSelectPage.name = '';
                editSelectPage.icon = '';
              }
            }">
            <Icon :type="page.icon" size="2xl" />
            <span class="w-full">{{ page.name }}</span>
            <div class="grid grid-cols-2 grid-rows-2 gap-1 min-w-[66px]">
              <Button class="row-start-1 col-start-1" icon="keyboard_arrow_up" :small="true" :disabled="index === 0"
                @click="movePageUp(page.id)" />
              <Button class="row-start-2 col-start-1" icon="keyboard_arrow_down" :small="true"
                :disabled="index === pages.length - 1" @click="movePageDown(page.id)" />
              <Button class="row-start-1 col-start-2 row-span-2" :primary="true" icon="delete" :small="true"
                @click="deletePage(page.id)" :disabled="pages.length === 1" />
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Widgets display -->
    <div class="overflow-y-scroll flex flex-col max-w-[600px] justify-center z-0 h-[80%] w-1/2 p-2">
      <div id="widgets" v-if="!isLoadingBio" class="flex flex-col gap-3 h-full">
        <template v-for="widget in widgetsOnCurrentPage" :key="widget.id">
          <div class="flex gap-2 relative">
            <!-- Widget component -->
            <Widget @click="toggleSelection(widget.id)" :data="widget" :in-editor="true" class="w-full"
              :selected="widget.id === selectedWidgetId" />

            <!-- Widget controls - only show for widgets on the current page -->
            <div class="flex absolute left-[calc(100%+12px)] gap-2 z-10"
              v-if="widget.id === selectedWidgetId && isSelectedWidgetOnCurrentPage">
              <div class="flex flex-col gap-2">
                <Button @click="() => moveWidget('up')" icon="arrow_upward" icon-only small />
                <Button @click="() => moveWidget('down')" icon="arrow_downward" icon-only small />
                <Button @click="deleteWidget" icon="delete" icon-only small />
              </div>
              <div class="flex gap-2">
                <Button @click="() => moveWidgetToPage('prev')" icon="arrow_back" icon-only small />
                <Button @click="() => moveWidgetToPage('next')" icon="arrow_forward" icon-only small />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <LoadingCircle v-if="isLoadingBio" />

    <div class="top-0 right-0 m-6 absolute flex gap-2">
      <Button @click="shareBio" text="Share" icon="share" />
      <Button @click="savePages" text="Save" icon="save" primary />
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
