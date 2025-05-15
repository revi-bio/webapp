<script setup lang="ts">
import Checkbox from '@/components/global/Checkbox.vue';
import Radiobutton from '@/components/global/Radiobutton.vue';
import { useSettingsStore } from '@/stores/settings';
import { ref, onMounted, computed, watch } from 'vue';

const settingsStore = useSettingsStore();

const pronounceOptions = [
  { key: 'He/Him', value: 'he/him' },
  { key: 'She/Her', value: 'she/her' },
  { key: 'They/Them', value: 'they/them' },
  { key: 'Cheese/cheddar', value: 'cheese/cheddar' }
];

const selectedPronounce = computed(() => settingsStore.draft.pronounce);

const isAdultContent = computed(() => {
  return Boolean(settingsStore.draft.adultContent);
});


const handlePronounceChange = (value: string) => {
  settingsStore.updateDraft('pronounce', value);
};

const handleAdultContentChange = (checked: boolean) => {
  settingsStore.updateDraft('adultContent', checked);
};

onMounted(() => {
  settingsStore.loadSettings();
});
</script>

<template>
  <div class="flex flex-col justify-center content-center items-start gap-8 w-full">
    <div class="flex flex-col justify-center content-center items-start gap-2">
      <h3 class="text-lg text-zinc-300">Pronoun</h3>
      <Radiobutton
        text="Choose an option"
        :options="pronounceOptions"
        direction="col"
        class="text-sm"
        :selected="selectedPronounce"
        @change="handlePronounceChange"
      />
      <div class="text-xs text-zinc-500">Current value: {{ selectedPronounce }}</div>
    </div>

    <div class="flex flex-col justify-center content-center items-start gap-2">
      <h3 class="text-lg text-zinc-300">Adult content</h3>
      <Checkbox
        text="Set my account to adult by default"
        :checked="isAdultContent"
        @change="handleAdultContentChange"
      />
      <div class="text-xs text-zinc-500">Current value: {{ settingsStore.draft.adultContent ? 'Yes' : 'No' }}</div>
    </div>

    <!-- Debug info -->
    <div class="text-xs text-zinc-500 mt-4" v-if="settingsStore.isDirty.preferences">
      Changes detected and ready to save
    </div>
  </div>
</template>
