// settings.ts
import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import { ApiWrapper } from '@/composables/ApiWrapper';
import { useUserStore } from './user';

const userStore = useUserStore();

type Draft = {
  displayName: string;
  newEmail: string;
  currentPasswordForEmail: string;
  newPassword: string;
  currentPasswordForPassword: string;
  pronounce: string;
  adultContent: boolean;
};

type IsDirty = {
  displayName: boolean;
  email: boolean;
  password: boolean;
  preferences: boolean;
};

export const useSettingsStore = defineStore('settings', () => {
  const draft = ref<Draft>({
    displayName: '',
    newEmail: '',
    currentPasswordForEmail: '',
    newPassword: '',
    currentPasswordForPassword: '',
    pronounce: '',
    adultContent: false,
  });

  const isDirty = ref<IsDirty>({
    displayName: false,
    email: false,
    password: false,
    preferences: false,
  });

  const isLoading = ref(false);

  async function loadSettings() {
    try {
      isLoading.value = true;
      console.log('Loading settings...');

      const response = await ApiWrapper.get('setting', {});
      console.log('API response:', response.data);

      if (response && response.data) {

        if (response.data['preferences.pronouns']) {
          draft.value.pronounce = response.data['preferences.pronouns'];
        } else if (response.data.pronouns) {
          draft.value.pronounce = response.data.pronouns;
        }


        if (typeof response.data['preferences.autoAcceptAdultContent'] === 'boolean') {
          draft.value.adultContent = response.data['preferences.autoAcceptAdultContent'];
        }

        console.log('Settings loaded successfully:', draft.value);
      }
    } catch (error) {
      console.error('Error while loading settings:', error);
    } finally {
      isLoading.value = false;
    }
  }

  function updateDraft<K extends keyof Draft>(field: K, value: Draft[K]) {
    if (typeof value === 'object' && value !== null && 'isTrusted' in value) {
      console.error(`Received event object for ${field} instead of a value:`, value);

      if (field === 'adultContent' && 'target' in value && 'checked' in value.target) {
        // @ts-ignore - handle event object from checkbox
        value = value.target.checked;
      } else {
        return;
      }
    }


    if (draft.value[field] === value) {
      return;
    }

    draft.value[field] = value;


    if (field === 'displayName') isDirty.value.displayName = true;
    if (field === 'newEmail' || field === 'currentPasswordForEmail') isDirty.value.email = true;
    if (field === 'newPassword' || field === 'currentPasswordForPassword') isDirty.value.password = true;
    if (field === 'pronounce' || field === 'adultContent') isDirty.value.preferences = true;

    console.log(`Updated ${field}:`, value, 'isDirty:', isDirty.value);
  }

  async function saveSettings() {
    console.log('Saving settings...');
    try {
      if (isDirty.value.displayName && draft.value.displayName) {
        await ApiWrapper.patch('user/displayname', { displayName: draft.value.displayName });
        await userStore.refreshUserData();
      }

      if (isDirty.value.email && draft.value.newEmail && draft.value.currentPasswordForEmail) {
        await ApiWrapper.patch('user/email', {
          email: draft.value.newEmail,
          currentPassword: draft.value.currentPasswordForEmail,
        });
      }

      if (isDirty.value.password && draft.value.newPassword && draft.value.currentPasswordForPassword) {
        await ApiWrapper.patch('user/password', {
          password: draft.value.newPassword,
          currentPassword: draft.value.currentPasswordForPassword,
        });
      }

      if (isDirty.value.preferences) {

        const serverSettings = {
          "preferences.pronouns": draft.value.pronounce,
          "preferences.autoAcceptAdultContent": draft.value.adultContent
        };

        console.log('Saving preferences:', serverSettings);

        try {
          await ApiWrapper.post('setting', serverSettings);
          console.log('Preferences saved successfully with dotted notation');
        } catch (error) {
          console.error('Error saving with dotted notation, trying without dots:', error);

        }
      }

      resetDirty();
      console.log('All settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  }

  function resetDirty() {
    isDirty.value = { displayName: false, email: false, password: false, preferences: false };
  }

  return {
    draft,
    isDirty,
    isLoading,
    updateDraft,
    saveSettings,
    resetDirty,
    loadSettings
  };
});
