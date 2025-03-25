import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ApiWrapper } from '@/composables/ApiWrapper';

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


  function updateDraft<K extends keyof Draft>(field: K, value: Draft[K]) {
    draft.value[field] = value;


    if (field === 'displayName') isDirty.value.displayName = true;
    if (field === 'newEmail' || field === 'currentPasswordForEmail') isDirty.value.email = true;
    if (field === 'newPassword' || field === 'currentPasswordForPassword') isDirty.value.password = true;
    if (field === 'pronounce' || field === 'adultContent') isDirty.value.preferences = true;
  }

  async function saveSettings() {

    if (isDirty.value.displayName && draft.value.displayName) {
      await ApiWrapper.patch('user/change-displayname', {
        displayName: draft.value.displayName,
      });
    }


    if (
      isDirty.value.email &&
      draft.value.newEmail &&
      draft.value.currentPasswordForEmail
    ) {
      await ApiWrapper.patch('user/change-email', {
        email: draft.value.newEmail,
        currentPassword: draft.value.currentPasswordForEmail,
      });
    }


    if (
      isDirty.value.password &&
      draft.value.newPassword &&
      draft.value.currentPasswordForPassword
    ) {
      await ApiWrapper.patch('user/change-password', {
        password: draft.value.newPassword,
        currentPassword: draft.value.currentPasswordForPassword,
      });
    }


    /*if (isDirty.value.preferences) {
      await ApiWrapper.patch('user/preferences', {
        pronounce: draft.value.pronounce,
        adultContent: draft.value.adultContent,
      });
    }*/


    resetDirty();
  }

  function resetDirty() {
    isDirty.value = {
      displayName: false,
      email: false,
      password: false,
      preferences: false,
    };
  }

  return { draft, isDirty, updateDraft, saveSettings, resetDirty };
});
