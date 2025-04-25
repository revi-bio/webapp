import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ApiWrapper } from '@/composables/ApiWrapper';
import type { InboxMessage } from '@/types/InboxMessage';
import type { User } from '@/types/User';

export const useInboxStore = defineStore('inboxMessages', () => {
  const inboxMessages = ref<InboxMessage[]>([]);

  async function fetchInbox() {
    try {
      const res = await ApiWrapper.get<InboxMessage[]>('message', {});
      inboxMessages.value = res.data;
      return res.data;
    } catch (error) {
      console.error('Failed to load inbox messages', error);
    }
  }

  function getInboxMessages(): InboxMessage[] {
    return inboxMessages.value;
  }

  function getInboxMessagesById(): InboxMessage | undefined {
    return inboxMessages.value.length > 0 ? inboxMessages.value[0] : undefined;
  }

  async function createInboxMessageForUser(title: string, text: string, user: string) {
    try {
      const newInboxMessage = {
        title,
        text,
        user,
      };
      const res = await ApiWrapper.post<InboxMessage>('message', newInboxMessage);
      inboxMessages.value.push(res.data);
      return res.data;
    } catch (error) {
      console.error('Failed to create to inboxMessage: ', error);
      return null;
    }
  }
  /* Create message for all users is missing */

  async function deleteInboxMessage(id: string) {
    try {
      const res = await ApiWrapper.delete<InboxMessage>(`message/${id}`, {});
      fetchInbox();
      return res.data;
    } catch (error) {
      console.error('Failed to delete inbox message:', error);
      return null;
    }
  }

  async function markAsRead(id: string) {
    try{
      await ApiWrapper.patch<InboxMessage>(`message/${id}`, {})
    }catch(error){
      console.error('Failed to mark as read message:', error)
      return null
    }
  }

  return {
    inboxMessages,
    fetchInbox,
    getInboxMessages,
    getInboxMessagesById,
    createInboxMessageForUser,
    deleteInboxMessage,
    markAsRead,
  };
});
