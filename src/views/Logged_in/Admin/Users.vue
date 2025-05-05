<script lang="ts" setup>
import Avatar from '@/components/global/Avatar.vue';
import Button from '@/components/global/Button.vue';
import Icon from '@/components/global/Icon.vue';
import { useAdminStore } from '@/stores/admin';
import type { UserForAdmin } from '@/stores/admin';
import { useSettingsStore } from '@/stores/settings';
import type { User } from '@/types/User';
import type { Bio } from "@/types/Bio";
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import Modal from '@/components/global/Modal.vue';
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


const biosModalActions: {
  text: string;
  icon?: string;
  rank?: "primary" | "secondary" | "tabItem";
  callback: string;
}[] = [
  {
    text: "Close",
    icon: "close",
    rank: "primary",
    callback: "close"
  }
];

const mailModalActions = computed(() => {
  const actions: {
    text: string;
    icon?: string;
    rank?: "primary" | "secondary" | "tabItem";
    callback: string;
  }[] = [
    {
      text: "Send",
      icon: "send",
      rank: "primary",
      callback: "submit"
    },
    {
      text: "Cancel",
      icon: "close",
      rank: "secondary",
      callback: "close"
    }
  ];

  return actions;
});

const mailInputs = computed(() => [
  {
    placeholder: "Title",
    modelValue: mailTitle.value,
    type: "text" as "text" | "password" | "email"
  },
  {
    placeholder: "Content",
    modelValue: mailContent.value,
    type: "text" as "text" | "password" | "email"
  }
]);

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
        <Button v-if="needsEmailVerification(user)" rank="primary" size="small" text="verify" icon-position="right"
          icon-type="verified"></Button>
        <Button rank="primary" size="small" text="Bios" icon-position="right" icon-type="recent_actors"
          @click.prevent="openBiosModal(user)"></Button>
        <Button rank="primary" size="small" text="Mail" icon-position="right" icon-type="mail"
          @click.prevent="openMailModal(user)"></Button>
        <Button rank="primary" size="small" text="Delete" icon-position="right" icon-type="delete"
          @click.prevent="adminStore.deleteUser(user._id)"></Button>
      </div>
    </div>

    <Modal
      :show="showBiosModal"
      @close="showBiosModal = false"
      :primaryMsg="selectedUser ? `${selectedUser.displayName}'s Bios` : 'User Bios'"
      :secondaryMsg="selectedUserBios.length ? `${selectedUserBios.length} bios found` : 'No bios found'"
      :actions="biosModalActions">
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
                  <Icon type="visibility" size="3"></Icon>
                  {{ bio.views || 0 }}
                </span>
                <span class="text-sm text-zinc-400 flex items-center">
                  <Icon type="widgets" size="3"></Icon>
                  {{ bio.widgetsCount || 0 }}
                </span>
                <span class="text-sm text-zinc-400 flex items-center">
                  <Icon type="wysiwyg" size="3"></Icon>
                  {{ bio.pagesCount || 0 }}
                </span>
              </div>
            </div>
            <div class="flex justify-between text-xs text-zinc-500 mb-2" @click="navigateToBio(bio.handle)">
              <div>Created: {{ new Date(bio.createdAt).toLocaleString() }}</div>
              <div>Updated: {{ new Date(bio.updatedAt).toLocaleString() }}</div>
            </div>
            <div class="flex flex-row gap-2">
              <Button rank="primary" size="small" text="View" icon-position="right" icon-type="visibility"
                @click.stop="navigateToBio(bio.handle)"></Button>
              <Button rank="primary" size="small" text="Delete" icon-position="right" icon-type="delete"
                @click="handleDeleteBio(bio._id, $event)"></Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>

    <Modal
      :show="showMailModal"
      @close="closeMailModal"
      @submit="sendMail"
      :primaryMsg="mailRecipient ? `Send Message to ${mailRecipient.displayName}` : 'Send Message'"
      :secondaryMsg="mailRecipient ? `Email: ${mailRecipient.email}` : ''"
      :actions="mailModalActions"
      :inputs="mailInputs">
    </Modal>
  </div>
</template>
