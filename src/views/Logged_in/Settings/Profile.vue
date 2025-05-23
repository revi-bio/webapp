<script lang="ts" setup>
import Avatar from '@/components/global/Avatar.vue';
import Button from '@/components/global/Button.vue';
import Input from '@/components/global/Input.vue';
import { useSettingsStore } from '@/stores/settings';
import { useUserStore } from '@/stores/user';
import { ref, computed } from 'vue';
import { ApiWrapper } from '@/composables/ApiWrapper';

const settingsStore = useSettingsStore();
const userStore = useUserStore();

userStore.refreshUserData();

const currentDisplayName = computed(() => userStore.getUserData()?.displayName);

const handleChangePicture = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.onchange = async (event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const formData = new FormData();
      formData.append('file', target.files[0]);
      await ApiWrapper.patch('user/avatar', formData);
      await userStore.refreshUserData();
    }
  };
  fileInput.click();
};


// Handle profile picture deletion
const handleDeletePicture = async() => {

  await ApiWrapper.delete('user/avatar',null);
  await userStore.refreshUserData();
};

// Handle display name changes
const handleDisplayNameChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  settingsStore.updateDraft('displayName', target.value);
};
</script>

<template>
  <div class="flex flex-col justify-start content-start items-start gap-4">
    <h3 class="text-lg text-zinc-300 text-left w-full">Profile picture</h3>

    <div class="flex flex-row justify-center content-center items-center gap-10">
      <Avatar :avatar-url="userStore.getUserData().avatar" class="w-[9rem] h-[9rem]"></Avatar>

      <div class="flex flex-col justify-center content-center items-start gap-2">
        <Button
          @click="handleChangePicture"
          text="Change picture"
          icon="edit"
          icon-right
          small
        />
        <Button
          @click="handleDeletePicture"
          text="Delete picture"
          icon="delete"
          icon-right
          small
        />
      </div>
    </div>
    <div class="flex flex-col justify-center content-start items-start gap-2">
      <h3 class="text-base text-zinc-500">Your current display name is: {{ currentDisplayName }}</h3>
      <Input
      type="text"
      placeholder="Displayname"
      class="text-base"
      :value="settingsStore.draft.displayName"
      @input="handleDisplayNameChange"
    />
    </div>

  </div>
</template>

<style lang="scss">
/* Custom styles can be added here if needed */
</style>
