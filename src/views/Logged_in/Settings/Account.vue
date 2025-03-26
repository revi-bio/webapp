<script setup lang="ts">
import Button from '@/components/global/Button.vue';
import Input from '@/components/global/Input.vue';
import { useSettingsStore } from '@/stores/settings';
import { ref, computed } from 'vue';


const settingsStore = useSettingsStore();

// For demonstration purposes - in a real app, you'd fetch this from your user store or API
const currentEmail = ref('currentEmail@gmail.com');

// Handle email change
const handleNewEmailChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  settingsStore.updateDraft('newEmail', target.value);
};

// Handle current password for email change
const handleCurrentPasswordForEmailChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  settingsStore.updateDraft('currentPasswordForEmail', target.value);
};

// Handle new password change
const handleNewPasswordChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  settingsStore.updateDraft('newPassword', target.value);
};

// Handle current password for password change
const handleCurrentPasswordForPasswordChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  settingsStore.updateDraft('currentPasswordForPassword', target.value);
};

// Computed properties to check if fields are filled
const isEmailFormFilled = computed(() => {
  return settingsStore.draft.newEmail && settingsStore.draft.currentPasswordForEmail;
});

const isPasswordFormFilled = computed(() => {
  return settingsStore.draft.newPassword && settingsStore.draft.currentPasswordForPassword;
});
</script>

<template>
  <div class="flex flex-col justify-center content-center items-start gap-8 w-full">
    <!-- Email Change Section -->
    <div class="flex flex-col justify-center content-center items-start gap-4 w-full">
      <h3 class="text-lg text-zinc-300 text-left w-full">Change Email</h3>

      <div class="flex flex-col justify-center content-center items-start gap-2 ">
        <h3 class="text-base text-zinc-400">Your current e-mail is <span class="underline text-zinc-300">{{ currentEmail }}</span></h3>
        <Input
          type="email"
          placeholder="New e-mail"
          class="text-base w-full"
          :value="settingsStore.draft.newEmail"
          @input="handleNewEmailChange"
        />
        <Input
          type="password"
          placeholder="Current password"
          class="text-base w-full"
          :value="settingsStore.draft.currentPasswordForEmail"
          @input="handleCurrentPasswordForEmailChange"
        />
      </div>
    </div>

    <!-- Password Change Section -->
    <div class="flex flex-col justify-center content-center items-start gap-4 w-full">
      <h3 class="text-lg text-zinc-300 text-left w-full">Change Password</h3>

      <div class="flex flex-col justify-center content-center items-start gap-2 ">
        <Input
          type="password"
          placeholder="New password"
          class="text-base w-full"
          :value="settingsStore.draft.newPassword"
          @input="handleNewPasswordChange"
        />
        <Input
          type="password"
          placeholder="Current password"
          class="text-base w-full"
          :value="settingsStore.draft.currentPasswordForPassword"
          @input="handleCurrentPasswordForPasswordChange"
        />
      </div>
    </div>
  </div>
</template>
