<script setup lang="ts">
import Checkbox from '@/components/global/Checkbox.vue';
import Radiobutton from '@/components/global/Radiobutton.vue';
import { useSettingsStore } from '@/stores/settings';
import { ref, onMounted } from 'vue';

// Initialize the settings store
const settingsStore = useSettingsStore();

// Create a map for pronounce options
const pronounceOptions = [
  { key: 'Male', value: 'male' },
  { key: 'Female', value: 'female' },
  { key: 'They', value: 'they' },
  { key: 'Cheese (cheddar)', value: 'cheese' },
  { key: 'Other', value: 'other' },
];

// Handle pronounce selection change
const handlePronounceChange = (value: string) => {
  settingsStore.updateDraft('pronounce', value);
};

// Handle adult content checkbox change
const handleAdultContentChange = (checked: boolean) => {
  settingsStore.updateDraft('adultContent', checked);
};

// Find the initial selected pronounce value when component mounts
onMounted(() => {
  // If no pronounce is set in the store but we need a default
  if (!settingsStore.draft.pronounce) {
    settingsStore.updateDraft('pronounce', 'cheese'); // Default value
  }
});
</script>

<template>
  <div class="flex flex-col justify-center content-center items-start gap-8 w-full">
    <!-- Pronounce Section -->
    <div class="flex flex-col justify-center content-center items-start gap-2">
      <h3 class="text-lg text-zinc-300">Pronounce</h3>
      <Radiobutton
        text="Choose an option"
        :options="pronounceOptions"
        direction="col"
        class="text-sm"
        :selected="settingsStore.draft.pronounce"
        @change="handlePronounceChange"
      />
    </div>

    <!-- Adult Content Section -->
    <div class="flex flex-col justify-center content-center items-start gap-2">
      <h3 class="text-lg text-zinc-300">Adult content</h3>
      <Checkbox
        text="Set my account to adult by default"
        :checked="settingsStore.draft.adultContent"
        @change="handleAdultContentChange"
      />
    </div>
  </div>
</template>
