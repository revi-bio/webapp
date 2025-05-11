<script lang="ts" setup>
import Inboxnoti from '@/components/global/Inboxnoti.vue';
import { ref, onMounted, computed } from 'vue';
import Button from '@/components/global/Button.vue';
import Icon from '@/components/global/Icon.vue';
import Logo from '@/components/global/Logo.vue';
import { useInboxStore } from '@/stores/inboxMessages';
import type { InboxMessage } from '@/types/InboxMessage';

const inboxStore = useInboxStore();
const msgs = ref<InboxMessage[]>([]);
const selectedMsg = ref<InboxMessage | undefined>();

onMounted(async () => {
  await inboxStore.fetchInbox();
  msgs.value = inboxStore.getInboxMessages();
});

async function selectMsg(index: number) {
  await inboxStore.markAsRead(msgs.value[index]._id);
  await inboxStore.fetchInbox();
  msgs.value = [...inboxStore.getInboxMessages()];
  selectedMsg.value = msgs.value[index];
}

async function deleteMsg() {
  if (selectedMsg.value) {
    await inboxStore.deleteInboxMessage(selectedMsg.value._id);
    await inboxStore.fetchInbox();
    msgs.value = [...inboxStore.getInboxMessages()];
    selectedMsg.value = undefined;
  }
}

const countOfUnreaded = computed(() => msgs.value.filter((msg) => !msg.isRead).length);
</script>

<template>
  <div class="flex h-full justify-center content-center items-center flex-row gap-4 p-6">
    <div class="w-full h-full flex-col flex items-center justify-center">
      <div v-if="selectedMsg" class="space-y-6 w-full max-w-[600px]">
        <div class="w-full bg-zinc-700 rounded-2xl p-6">{{ selectedMsg.title }}</div>
        <div class="w-full bg-zinc-700 rounded-2xl p-6 text-justify">{{ selectedMsg.text }}</div>
        <div class="w-full bg-zinc-700 rounded-2xl p-6">From: Us</div>
        <div class="text-rose-500 flex justify-between items-center">
          <div class="bg-zinc-900 w-[70px] h-[40px] flex items-center rounded-2xl justify-center">
            <span><Logo type="revibio" width="60"></Logo></span>
          </div>
          <div class="cursor-pointer" @click="deleteMsg()">
            <Icon size="lg" type="delete"></Icon> Delete this mail
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
    <div class="w-[400px] max-w-[400px] h-full flex-col space-y-2 p-6 bg-zinc-900 rounded-2xl">
      <Inboxnoti :items="msgs" @selectMsg="selectMsg"></Inboxnoti>
    </div>
  </div>
</template>

<style></style>
