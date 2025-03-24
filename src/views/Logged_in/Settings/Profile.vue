<script lang="ts" setup>
import ProfilePic from '@/components/global/ProfilePic.vue';
import Button from '@/components/global/Button.vue';
import Input from '@/components/global/Input.vue';
import { useSettingsStore } from '@/stores/settings';
import { ref } from 'vue';

// Initialize the settings store
const settingsStore = useSettingsStore();

// Handle profile picture changes
const handleChangePicture = () => {
  // Create a file input element
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.onchange = (event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      // Here you would typically upload the file to your server
      // Example API call (uncomment when ready):
      // const formData = new FormData();
      // formData.append('profilePicture', target.files[0]);
      // ApiWrapper.post('user/profile-picture', formData);
    }
  };
  fileInput.click();
};

// Handle profile picture deletion
const handleDeletePicture = () => {
  // Implement picture deletion
  // Example API call (uncomment when ready):
  // ApiWrapper.delete('user/profile-picture');
};

// Handle display name changes
const handleDisplayNameChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  settingsStore.updateDraft('displayName', target.value);
};
</script>

<template>
  <div class="flex flex-col justify-center content-start items-center gap-4">
    <h3 class="text-lg text-zinc-300 text-left w-full">Profile picture</h3>

    <div class="flex flex-row justify-center content-center items-center gap-10">
      <ProfilePic class="w-[9rem] h-[9rem]"></ProfilePic>

      <div class="flex flex-col justify-center content-center items-start gap-2">
        <Button
          text="Change picture"
          size="small"
          rank="primary"
          icon-position="right"
          icon-type="edit"
          @click="handleChangePicture"
        ></Button>
        <Button
          text="Delete picture"
          size="small"
          rank="primary"
          icon-position="right"
          icon-type="delete"
          @click="handleDeletePicture"
        ></Button>
      </div>
    </div>

    <Input
      type="text"
      placeholder="Displayname"
      class="text-base"
      :value="settingsStore.draft.displayName"
      @input="handleDisplayNameChange"
    />
  </div>
</template>

<style lang="scss">
/* Custom styles can be added here if needed */
</style>
