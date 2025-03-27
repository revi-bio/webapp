<script lang="ts" setup>
import TabControl from '@/components/global/TabControl.vue';
import Button from '@/components/global/Button.vue';
import { RouterView } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, computed } from 'vue';
import { useSettingsStore } from '@/stores/settings';


const router = useRouter();
const route = useRoute();
const settingsStore = useSettingsStore();


onMounted(() => {
  if (route.path === '/baseDash/settings') {
    router.push('/baseDash/settings/profile');
  }
});



const hasChanges = computed(() => {
  const { isDirty } = settingsStore;
  return isDirty.displayName || isDirty.email || isDirty.password || isDirty.preferences;
});


const saveChanges = async () => {
  await settingsStore.saveSettings();

};
</script>

<template>
  <div class="w-full h-full flex flex-col justify-start content-start items-start text-3xl py-20 px-6 gap-5">
    <span class="flex flex-row justify-center content-start items-center gap-5">
      <TabControl
  :items="[
    {
      buttonText: 'Profile',
      buttonSize: 'small',
      buttonRank: 'tabItem',
      buttonIconPosition: 'none',
      event: () => router.push('/baseDash/settings/profile'),
    },
    {
      buttonText: 'Account',
      buttonSize: 'small',
      buttonRank: 'tabItem',
      buttonIconPosition: 'none',
      event: () => router.push('/baseDash/settings/account'),
    },
    {
      buttonText: 'Preferences',
      buttonSize: 'small',
      buttonRank: 'tabItem',
      buttonIconPosition: 'none',
      event: () => router.push('/baseDash/settings/preferences'),
    }
  ]"
/>


      <Button
        text="Save changes"
        size="small"
        rank="primary"
        icon-position="right"
        icon-type="edit"
        :disabled="!hasChanges"
        @click="saveChanges"
      ></Button>
    </span>

    <div class="w-full h-full flex justify-start content-start items-start">
      <RouterView></RouterView>
    </div>
  </div>
</template>
