<script lang="ts" setup>
import Button from '@/components/global/Button.vue';
import Input from '@/components/global/Input.vue';
import Searchbar from '@/components/global/Searchbar.vue';
import Checkbox from '@/components/global/Checkbox.vue';
import { DateTime } from '@/composables/date';
import { useAdminStore } from '@/stores/admin';
import type { UserForAdmin } from '@/stores/admin';
import { onMounted, ref, computed } from 'vue';
import Avatar from '@/components/global/Avatar.vue';
import Icon from '@/components/global/Icon.vue';
import Alert from '@/components/global/Alert.vue';

const adminStore = useAdminStore();

const usersList = ref<UserForAdmin[]>([]);
const search = ref('');
const filteredData = ref<UserForAdmin[]>([]);
const selectedUsers = ref<UserForAdmin[]>([]);

const mailTitle = ref('');
const mailContent = ref('');
const sendToAllUsers = ref(false);

const alertStatus = ref<number>(0);
const alertError = ref<string>('');
const alertMessage = ref<string>('');
const alertActive = ref<boolean>(false);

onMounted(async () => {
  await adminStore.fetchAllUsers();
  usersList.value = [...adminStore.users];
  filteredData.value = [];
});

function changeSearch(filtered: UserForAdmin[]) {
  filteredData.value = filtered;
}

const showNoUsers = computed(() => {
  if (search.value === '') {
    return true;
  }
  return filteredData.value.length === 0;
});

const showUsersList = computed(() => {
  return search.value !== '' && filteredData.value.length > 0;
});

const isUserSelected = (user: UserForAdmin): boolean => {
  return selectedUsers.value.some(selectedUser => selectedUser._id === user._id);
};

const selectUser = (user: UserForAdmin) => {
  if (!isUserSelected(user)) {
    selectedUsers.value.push(user);
  }
};

const unselectUser = (user: UserForAdmin) => {
  selectedUsers.value = selectedUsers.value.filter(selectedUser => selectedUser._id !== user._id);
};

const toggleUserSelection = (user: UserForAdmin) => {
  if (isUserSelected(user)) {
    unselectUser(user);
  } else {
    selectUser(user);
  }
};

const selectAllUsers = (checked: boolean) => {
  selectedUsers.value = [];
};

const showAlert = (status: number, message: string, error: string = '') => {
  alertStatus.value = status;
  alertMessage.value = message;
  alertError.value = error;
  alertActive.value = true;
};

const onAlertHide = () => {
  alertActive.value = false;
};

const sendMail = async () => {
  if (!mailTitle.value || !mailContent.value) {
    showAlert(400, 'Please fill in both title and content', 'Validation Error');
    return;
  }

  if (selectedUsers.value.length === 0 && !sendToAllUsers.value) {
    showAlert(400, 'Please select at least one user or choose to send to all users', 'No Recipients Selected');
    return;
  }

  try {
    if (sendToAllUsers.value) {
      await adminStore.sendMessageToAllUser(
        mailTitle.value,
        mailContent.value
      );

      resetMailForm();
      showAlert(200, `Mail sent successfully to all users!`);
    } else {
      for (const user of selectedUsers.value) {
        await adminStore.sendMessageToUser(
          user._id,
          mailTitle.value,
          mailContent.value
        );
      }

      resetMailForm();
      showAlert(200, `Mail sent successfully to user(s)!`);
    }
  } catch (error: any) {
    console.error('Error sending mail:', error);
    showAlert(500, 'Failed to send mail', error.message || 'Unknown error occurred');
  }
};

const resetMailForm = () => {
  mailTitle.value = '';
  mailContent.value = '';
  selectedUsers.value = [];
  sendToAllUsers.value = false;
};

const removeSelectedUser = (user: UserForAdmin) => {
  unselectUser(user);
};
</script>

<template>
  <!--Desktop view-->
  <div class="hidden md:flex flex-row justify-start content-start items-start w-full h-full gap-5 pb-20 overflow-hidden">
    <div class="flex flex-col justify-start content-start items-start w-full h-full gap-5 overflow-y-auto pb-40 sm:pb-20">
      <div class="flex flex-row justify-between content-center items-center w-full rounded-lg p-4 bg-zinc-700/50">
        <Searchbar v-model="search" :basearray="usersList" @filtered="changeSearch"></Searchbar>
      </div>

      <Checkbox
        v-model="sendToAllUsers"
        text="Send mail to all users"
        @change="selectAllUsers"
      />

      <div v-if="showNoUsers" class="w-full h-full flex flex-col justify-center content-center items-center">
        <h3 class="w-full text-center text-zinc-400">
          {{ search === '' ? 'No users have been selected yet.' : 'No such user.' }}
        </h3>
      </div>

      <div v-else-if="showUsersList" class="w-full flex-1 overflow-y-auto userList">
        <div class="flex flex-col gap-2 pr-2">
          <div v-for="user in filteredData" :key="user?._id" class="w-full flex flex-row justify-between content-center items-center p-4 bg-zinc-700/50 rounded-xl hover:bg-zinc-600/50 transition duration-200">

            <div class="w-full flex flex-row justify-start content-center items-center gap-5">
              <Avatar class="w-16 h-16" :avatar-url="user?.avatar" />

              <div class="flex flex-col justify-center content-start items-start">
                <h3 class="text-xl">{{ user?.displayName }}</h3>
                <h3 class="text-sm text-zinc-400">{{ user?.role }}</h3>
              </div>

              <h3 class="text-sm text-zinc-200">{{ user?.email }}</h3>
              <h3 class="text-sm text-zinc-400">{{ DateTime.formatDate(user?.createdAt) }}</h3>
            </div>

            <div class="flex flex-row justify-center content-center items-center gap-2">
              <Button
                :text="isUserSelected(user) ? 'Unselect' : 'Select'"
                :icon="isUserSelected(user) ? 'cancel' : 'check_circle'"
                icon-right
                small
                :primary="!isUserSelected(user)"
                :secondary="isUserSelected(user)"
                @click="toggleUserSelection(user)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col justify-start content-start items-start w-full h-full gap-5 bg-zinc-900 p-5 border-zinc-700 rounded-lg">
      <h3 class="text-xl">Write mail</h3>

      <div v-if="!sendToAllUsers && selectedUsers.length > 0" class="w-full">
        <div class="flex flex-wrap gap-2 p-3 bg-zinc-800 rounded-lg max-h-32 overflow-y-auto">
          <div
            v-for="user in selectedUsers"
            :key="user._id"
            class="flex items-center gap-2 px-3 py-1 bg-zinc-700 rounded-full text-sm hover:bg-zinc-600 transition-colors"
          >
            <Avatar class="w-4 h-4" :avatar-url="user?.avatar" />
            <span>{{ user.displayName }}</span>
            <Icon
              type="cancel"
              class="cursor-pointer hover:text-red-400 transition-colors"
              @click="removeSelectedUser(user)"
            />
          </div>
        </div>
      </div>

      <div v-else-if="sendToAllUsers" class="w-full p-3 bg-rose-500/70 border border-rose-300/50 rounded-lg">
        <div class="flex items-center gap-2 text-rose-200">
          <Icon type="groups" />
          <span>Sending to all users ({{ usersList.length }} recipients)</span>
        </div>
      </div>

      <div class="flex flex-col justify-start content-start items-start w-full h-full gap-2">
        <Input v-model="mailTitle" type="text" placeholder="Title" class="w-full"/>
        <Input v-model="mailContent" type="textarea" placeholder="Content" class="w-full h-full"/>
      </div>

      <div class="flex flex-row justify-start content-start items-start w-full gap-2">
        <Button
          text="Send"
          icon="send"
          icon-right
          small
          primary
          @click="sendMail"
          :disabled="(!selectedUsers.length && !sendToAllUsers) || !mailTitle || !mailContent"
        />
        <Button text="Clear" icon="clear" icon-right small @click="resetMailForm" />
      </div>
    </div>
  </div>

  <!--Mobile view-->
  <div class="flex md:hidden flex-col justify-start content-start items-start w-full h-full p-4 gap-4 pb-20">
    <!-- Search and users section - fixed height -->
    <div class="flex flex-col justify-start content-start items-start w-full bg-zinc-700/50 rounded-lg p-4 gap-4">
      <Searchbar v-model="search" :basearray="usersList" @filtered="changeSearch"></Searchbar>

      <Checkbox
        v-model="sendToAllUsers"
        text="Send mail to all users"
        @change="selectAllUsers"
      />

      <div v-if="showNoUsers" class="w-full flex flex-col justify-center content-center items-center">
        <h3 class="w-full text-center text-zinc-400">
          {{ search === '' ? '' : 'No such user.' }}
        </h3>
      </div>

      <div v-else-if="showUsersList" class="w-full h-64 overflow-y-auto userList rounded-lg bg-zinc-800/50 p-2">
        <div class="flex flex-col gap-2">
          <div v-for="user in filteredData" :key="user?._id" class="flex flex-row justify-between content-center items-center flex-wrap p-3 gap-3 bg-zinc-600/50 rounded-lg hover:bg-zinc-500/50 transition duration-200">
            <div class="flex flex-row justify-start content-center items-center gap-3 flex-1 w-full ">
              <Avatar class="w-12 h-12 flex-shrink-0" :avatar-url="user?.avatar" />
              <div class="flex flex-col justify-center content-start items-start flex-1">
                <h3 class="text-base">{{ user?.displayName }}</h3>
                <h3 class="text-xs text-zinc-400">{{ user?.email }}</h3>
              </div>
            </div>
            <div class="w-full flex flex-row justify-end content-center items-center">
              <Button
                :text="isUserSelected(user) ? 'Remove' : 'Select'"
                :icon="isUserSelected(user) ? 'cancel' : 'check_circle'"
                icon-right
                small
                :primary="!isUserSelected(user)"
                :secondary="isUserSelected(user)"
                @click="toggleUserSelection(user)"
              />
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Write mail section - scrollable content -->
    <div class="flex flex-col justify-start content-start items-start w-full flex-1 gap-4 bg-zinc-900 p-4 rounded-lg overflow-y-auto">
      <h3 class="text-xl">Write mail</h3>

      <div v-if="!sendToAllUsers && selectedUsers.length > 0" class="w-full">
        <div class="flex flex-wrap gap-2 p-3 bg-zinc-800 rounded-lg max-h-32 overflow-y-auto">
          <div
            v-for="user in selectedUsers"
            :key="user._id"
            class="flex items-center gap-2 px-3 py-1 bg-zinc-700 rounded-full text-sm hover:bg-zinc-600 transition-colors"
          >
            <Avatar class="w-4 h-4" :avatar-url="user?.avatar" />
            <span>{{ user.displayName }}</span>
            <Icon
              type="cancel"
              class="cursor-pointer hover:text-red-400 transition-colors"
              @click="removeSelectedUser(user)"
            />
          </div>
        </div>
      </div>

      <div v-else-if="sendToAllUsers" class="w-full p-3 bg-rose-500/70 border border-rose-300/50 rounded-lg">
        <div class="flex items-center gap-2 text-rose-200">
          <Icon type="groups" />
          <span>Sending to all users ({{ usersList.length }} recipients)</span>
        </div>
      </div>

      <div class="flex flex-col justify-start content-start items-start w-full flex-1 gap-3 min-h-0">
        <Input v-model="mailTitle" type="text" placeholder="Title" class="w-full"/>
        <Input v-model="mailContent" type="textarea" placeholder="Content" class="w-full flex-1 min-h-0"/>
      </div>

      <div class="flex flex-row justify-start content-start items-start w-full gap-2">
        <Button
          text="Send"
          icon="send"
          icon-right
          small
          primary
          @click="sendMail"
          :disabled="(!selectedUsers.length && !sendToAllUsers) || !mailTitle || !mailContent"
        />
        <Button text="Clear" icon="clear" icon-right small @click="resetMailForm" />
      </div>
    </div>
  </div>

  <Alert
    :status="alertStatus"
    :error="alertError"
    :message="alertMessage"
    :active="alertActive"
    @hide="onAlertHide"
  />
</template>

<style>
/* width */
.userList::-webkit-scrollbar {
  @apply w-2 rounded-full
}

/* Track */
.userList::-webkit-scrollbar-track {
  @apply bg-zinc-800 rounded-full
}

/* Handle */
.userList::-webkit-scrollbar-thumb {
  @apply bg-zinc-600/50 rounded-full border-4
}

/* Handle on hover */
.userList::-webkit-scrollbar-thumb:hover {
  @apply bg-zinc-700 rounded-full
}
</style>
