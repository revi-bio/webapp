<script lang="ts" setup>
import Avatar from '@/components/global/Avatar.vue';
import Button from '@/components/global/Button.vue';
import Icon from '@/components/global/Icon.vue';
import Input from '@/components/global/Input.vue';
import { useAdminStore } from '@/stores/admin';
import type { UserForAdmin } from '@/stores/admin';
import type { Bio } from "@/types/Bio";
import { onMounted, ref, watchEffect } from 'vue';
import NewModal from '@/components/global/NewModal.vue';
import router from '@/router';
import { DateTime } from '@/composables/date';

const adminStore = useAdminStore();
const usersList = ref<UserForAdmin[]>([]);
const alertStatus = ref<number>(0);
const alertError = ref<string>('');
const alertMessage = ref<string>('');
const alertActive = ref<boolean>(false);


const showBiosModal = ref(false);
const selectedUserBios = ref<Bio[]>([]);
const selectedUser = ref<UserForAdmin | null>(null);

const showMailModal = ref(false);
const mailTitle = ref('');
const mailContent = ref('');
const mailRecipient = ref<UserForAdmin | null>(null);

onMounted(async () => {
  await adminStore.fetchAllUsers();
  usersList.value = [...adminStore.users];
});

watchEffect(() => {
  usersList.value = [...adminStore.users];
});

const needsEmailVerification = (user: UserForAdmin): boolean => {
  if (!user || !(user as any).validations || !Array.isArray((user as any).validations)) {
    return false;
  }

  return (user as any).validations.some((validation: any) =>
    validation && typeof validation === 'object' && 'emailVerification' in validation
  );
};

const openBiosModal = async (user: UserForAdmin) => {
  try {
    selectedUser.value = user;
    await refreshUserBios(user._id);
  } catch (error) {
    console.error('Error fetching user bios:', error);
  }
};

const refreshUserBios = async (userId: string) => {
  try {
    const bios = await adminStore.getUserBios(userId);
    if (bios) {
      selectedUserBios.value = Array.isArray(bios) ? bios as Bio[] : [bios as Bio];
      showBiosModal.value = true;
    }
  } catch (error) {
    console.error('Error refreshing user bios:', error);
  }
};

const handleDeleteBio = async (bioId: string, event: Event) => {
  event.stopPropagation();

  try {
    if (selectedUser.value) {
      await adminStore.deleteBio(bioId);
      await refreshUserBios(selectedUser.value._id);
    }
  } catch (error) {
    console.error('Error deleting bio:', error);
  }
};

const navigateToBio = (handle: string) => {
  router.push(`/${handle}`);
};

const resetMailForm = () => {
  mailTitle.value = '';
  mailContent.value = '';
};

const openMailModal = (user: UserForAdmin) => {
  mailRecipient.value = user;
  mailTitle.value = '';
  mailContent.value = '';
  showMailModal.value = true;
};

const closeMailModal = () => {
  showMailModal.value = false;
  mailTitle.value = '';
  mailContent.value = '';
};

const sendMail = async () => {
  try {
    await adminStore.sendMassageToUser(
      mailRecipient.value._id,
      mailTitle.value,
      mailContent.value
    );
    resetMailForm();
    showMailModal.value = false;
  } catch (error) {
    console.error('Error sending mail:', error);
  }
};


// No longer needed with NewModal

</script>

<template>
  <div class="w-full h-full flex flex-col justify-start content-center items-center overflow-y-auto gap-5">


    <div v-for="user in usersList" :key="user?._id" class="w-full flex flex-row justify-between content-center items-center p-4 bg-zinc-700/50 rounded-xl hover:bg-zinc-600/50 transition duration-200">
      <div class="w-full flex flex-row justify-start content-center items-center gap-5">
        <Avatar class="w-16 h-16" :avatar-url="user?.avatar" />
        <div class="flex flex-col justify-center content-start items-start">
          <h3 class="text-xl">{{ user?.displayName }}</h3>
          <h3 class="text-sm text-zinc-400">{{ user?.role }}</h3>
        </div>
        <h3 class="text-sm text-zinc-200">{{ user?.email }}</h3>
        <h3 class="text-sm text-zinc-400">{{ DateTime.formatDate(user?.createdAt) }}</h3>
        <Icon :type="!needsEmailVerification(user) ? 'verified' : 'verified_off'"
          :class="!needsEmailVerification(user) ? 'text-cyan-500': 'text-red-500'"></Icon>
      </div>

      <div class="flex flex-row justify-center content-center items-center gap-2">
        <Button v-if="needsEmailVerification(user)" primary small text="verify" iconRight
          icon="verified"></Button>
        <Button primary small text="Bios" iconRight icon="recent_actors"
          @click.prevent="openBiosModal(user)"></Button>
        <Button primary small text="Mail" iconRight icon="mail"
          @click.prevent="openMailModal(user)"></Button>
        <Button primary small text="Delete" iconRight icon="delete"
          @click.prevent="adminStore.deleteUser(user._id)"></Button>
      </div>
    </div>

    <NewModal
      :show="showBiosModal"
      @close="showBiosModal = false"
      :title="selectedUser ? `${selectedUser.displayName}'s Bios` : 'User Bios'">
      <div class="w-full h-full">
        <div v-if="selectedUserBios.length === 0" class="text-center text-zinc-400 my-4">
          This user hasn't created any bios yet.
        </div>
        <div v-else class="flex w-full h-full flex-col justify-center content-center gap-5 overflow-y-auto">
          <div v-for="(bio, index) in selectedUserBios" :key="index"
               class="p-3 gap-2 bg-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-600/80 transition-colors">
            <div class="flex flex-row justify-between items-center mb-2" @click="navigateToBio(bio.handle)">
              <div>
                <h4 class="text-lg text-zinc-200">{{ bio.name || 'Unnamed Bio' }}</h4>
                <p class="text-sm text-zinc-400">@{{ bio.handle }}</p>
              </div>
              <div class="flex flex-row justify-center content-center items-center gap-2">
                <span class="text-sm text-zinc-400 flex items-center">
                  <Icon type="visibility" size="base"></Icon>
                  {{ bio.views || 0 }}
                </span>
                <span class="text-sm text-zinc-400 flex items-center">
                  <Icon type="widgets" size="base"></Icon>
                  {{ bio.widgetsCount || 0 }}
                </span>
                <span class="text-sm text-zinc-400 flex items-center">
                  <Icon type="wysiwyg" size="base"></Icon>
                  {{ bio.pagesCount || 0 }}
                </span>
              </div>
            </div>
            <div class="flex justify-between text-xs text-zinc-500 mb-2" @click="navigateToBio(bio.handle)">
              <div>Created: {{ new Date(bio.createdAt).toLocaleString() }}</div>
              <div>Updated: {{ new Date(bio.updatedAt).toLocaleString() }}</div>
            </div>
            <div class="flex flex-row gap-2">
              <Button primary small text="View" iconRight icon="visibility"
                @click.stop="navigateToBio(bio.handle)"></Button>
              <Button primary small text="Delete" iconRight icon="delete"
                @click="handleDeleteBio(bio._id, $event)"></Button>
            </div>
          </div>
        </div>
      </div>
    </NewModal>

    <NewModal
      :show="showMailModal"
      @close="closeMailModal"
      :title="mailRecipient ? `Send Message to ${mailRecipient.displayName}` : 'Send Message'">
      <div class="flex flex-col gap-4 w-full">
        <Input v-model="mailTitle" placeholder="Title" type="text" />
        <Input v-model="mailContent" placeholder="Content" type="text" />
        <div class="flex justify-end gap-2">
          <Button text="Cancel" @click="closeMailModal" />
          <Button primary text="Send" icon="send" @click="sendMail" />
        </div>
      </div>
    </NewModal>
  </div>
</template>
