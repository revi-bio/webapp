<script lang="ts" setup>
import Inboxnoti from '@/components/global/Inboxnoti.vue';
import { ref, onMounted, computed } from 'vue';
import Button from '@/components/global/Button.vue';
import Icon from '@/components/global/Icon.vue';
import Logo from '@/components/global/Logo.vue';
import { useInboxStore } from '@/stores/inboxMessages';
import type { InboxMessage } from '@/types/InboxMessage';
import LoadingCircle from '@/components/global/LoadingCircle.vue';
import Skeleton from '@/components/global/Skeleton.vue';

const inboxStore = useInboxStore();
const msgs = ref<InboxMessage[]>([]);
const selectedMsg = ref<InboxMessage | undefined>();
const isLoading = ref<boolean>(true);
const isLoadingMsg = ref<boolean>(false);
const showMobileMessage = ref<boolean>(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    await inboxStore.fetchInbox();
    msgs.value = inboxStore.getInboxMessages();
  } catch (error: any) {
    console.error("Error while fetching messages:", error);
  } finally {
    isLoading.value = false;
  }
});

async function selectMsg(index: number) {
  try {
    isLoadingMsg.value = true;
    msgs.value = inboxStore.getInboxMessages();
    selectedMsg.value = msgs.value[index];
    await inboxStore.markAsRead(msgs.value[index]._id);

    // Mobile nézetnél átváltunk a levél megjelenítésére
    showMobileMessage.value = true;
  } catch (error: any) {
    console.error("Error while selecting message:", error);
  } finally {
    isLoadingMsg.value = false;
  }
}

async function deleteMsg() {
  if (selectedMsg.value) {
    await inboxStore.deleteInboxMessage(selectedMsg.value._id);
    await inboxStore.fetchInbox();
    msgs.value = [...inboxStore.getInboxMessages()];
    selectedMsg.value = undefined;
    showMobileMessage.value = false;
  }
}

function goBackToList() {
  showMobileMessage.value = false;
  selectedMsg.value = undefined;
}

const countOfUnreaded = computed(() => msgs.value.filter((msg) => !msg.isRead).length);
</script>

<template>
  <!-- Desktop view (md and up) -->
  <div class="hidden md:flex h-full justify-center content-center items-center flex-row gap-4 p-6">
    <div class="w-full h-full flex-col flex items-center justify-center">
      <div v-if="selectedMsg" class="space-y-6 w-full max-w-[600px]">
        <div class="space-y-6" v-if="!isLoadingMsg">
          <div class="w-full bg-zinc-700 rounded-2xl p-6">{{ selectedMsg.title }}</div>
          <div class="w-full bg-zinc-700 rounded-2xl p-6 text-justify">{{ selectedMsg.text }}</div>
          <div class="w-full bg-zinc-700 rounded-2xl p-6">From: Us</div>
          <div class="text-rose-500 flex justify-between items-center">
            <div class="bg-zinc-900 w-[70px] h-[40px] flex items-center rounded-2xl justify-center">
              <span>
                <Logo type="revibio" width="60"></Logo>
              </span>
            </div>
            <div class="cursor-pointer" @click="deleteMsg()">
              <Icon size="lg" type="delete"></Icon> Delete this mail
            </div>
          </div>
        </div>
        <div class="space-y-6" v-else>
          <div class="w-full bg-zinc-700 rounded-2xl p-6"><Skeleton :height="2"/></div>
          <div class="w-full bg-zinc-700 rounded-2xl p-6"><Skeleton :height="2"/></div>
          <div class="w-full bg-zinc-700 rounded-2xl p-6"><Skeleton/></div>
          <div class="text-rose-500 flex justify-between items-center">
            <div class="bg-zinc-900 w-[70px] h-[40px] p-2 flex items-center rounded-xl justify-center">
              <span>
                <Logo type="revibio" width="60"></Logo>
              </span>
            </div>
            <div class="cursor-pointer" @click="deleteMsg()">
              <Icon size="lg" type="delete"></Icon> Delete this mail
            </div>
          </div>
        </div>
      </div>

      <div v-if="!selectedMsg" class="space-y-4 text-3xl flex items-center justify-center flex-col text-center">
        <h3>Keep</h3>
        <h3>track of <span class="text-rose-500">your</span> notifications</h3>
        <Button icon-position="none" rank="primary" size="normal" text="Have any question?" @click=""></Button>
        <div>
          (Looks like you have <span class="text-rose-500">{{ countOfUnreaded }} unread</span> message)
        </div>
      </div>
    </div>
    <div class="w-[400px] max-w-[400px] h-full flex-col space-y-2 p-6 bg-zinc-900 rounded-2xl overflow-y-auto">
      <Inboxnoti :items="msgs" @selectMsg="selectMsg"></Inboxnoti>
      <div v-if="isLoading" class="w-full flex flex-col justify-center content-center items-center py-8">
        <LoadingCircle />
      </div>
    </div>
  </div>

  <!-- Mobile view (below md) -->
  <div class="md:hidden w-full h-full py-20">
    <!-- Message list view -->
    <div v-if="!showMobileMessage" class="w-full h-full flex flex-col p-4 pb-20">

      <div class="w-full h-full">
        <Inboxnoti :items="msgs" @selectMsg="selectMsg"></Inboxnoti>
        <div v-if="isLoading" class="w-full flex flex-col justify-center content-center items-center py-8">
          <LoadingCircle />
        </div>
      </div>

      <div v-if="msgs.length === 0 && !isLoading" class="text-center text-zinc-400 mt-8">
        No messages yet
      </div>
    </div>

    <!-- Single message view -->
    <div v-if="showMobileMessage && selectedMsg" class="w-full h-full flex flex-col overflow-hidden">
      <!-- Header with back button -->
      <div class="flex items-center justify-between p-4 bg-zinc-800 border-b border-zinc-700">
        <Button
          icon="arrow_back"
          icon-position="left"
          text="Back"
          @click="goBackToList()"
          rank="secondary"
          size="small"
        />
        <div class="cursor-pointer text-rose-500 flex items-center gap-2" @click="deleteMsg()">
          <Icon size="base" type="delete"></Icon>
          <span class="text-sm">Delete</span>
        </div>
      </div>

      <!-- Message content -->
      <div class="flex-1 overflow-y-auto p-4 pb-20 gap-6">
        <div class="space-y-4" v-if="!isLoadingMsg">
          <div class="w-full bg-zinc-700 rounded-xl p-4">
            <h2 class="text-lg font-medium">{{ selectedMsg.title }}</h2>
          </div>
          <div class="w-full bg-zinc-700 rounded-xl p-4">
            <p class="text-justify leading-relaxed">{{ selectedMsg.text }}</p>
          </div>
          <div class="w-full bg-zinc-700 rounded-xl p-4">
            <p class="text-sm text-zinc-400">From: Us</p>
          </div>
          <div class="flex justify-center">
            <div class="bg-zinc-900 w-[60px] h-[35px] flex items-center rounded-xl justify-center">
              <Logo type="revibio" width="50"></Logo>
            </div>
          </div>
        </div>
        <div class="space-y-4" v-else>
          <div class="w-full bg-zinc-700 rounded-xl p-4"><Skeleton :height="2"/></div>
          <div class="w-full bg-zinc-700 rounded-xl p-4"><Skeleton :height="3"/></div>
          <div class="w-full bg-zinc-700 rounded-xl p-4"><Skeleton/></div>
          <div class="flex justify-center mt-6">
            <div class="bg-zinc-900 w-[60px] h-[35px] flex items-center rounded-xl justify-center">
              <Skeleton :height="1"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
