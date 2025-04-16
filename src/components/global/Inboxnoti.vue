<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import Icon from './Icon.vue';
import Logo from './Logo.vue';
import type { InboxMessage } from '@/types/InboxMessage';

const props = defineProps<{
  items: InboxMessage[]
}>();

const emit = defineEmits(["selectMsg"]);
const messages = ref<InboxMessage[]>([...props.items]);
const activeMsgIndex = ref<number | null>(null);

const selectMsg = (index: number) => {
  activeMsgIndex.value = index;
  emit("selectMsg", index);
};

watchEffect(() => {
  messages.value = [...props.items];
});



</script>

<template>
  <div class="flex flex-col cursor-pointer p-2 border-b-2"
       v-for="(item, index) in messages"
       :key="item._id"
       @click.prevent="() => { selectMsg(index); }"
       :class="item.isRead ? index == activeMsgIndex ? 'text-zinc-900 bg-zinc-200 rounded-2xl':'text-zinc-500 border-zinc-500/70' : 'text-zinc-200 border-rose-500/70'"
       :selected="activeMsgIndex === index">
    <div class="flex flex-row items-center justify-between">
      <Logo type="revi" width="40"></Logo>
      <p class="text-md truncate w-[80px]">{{ item.title }}</p>
      <Icon v-if="!item.isRead" type="mail" size="3xl" class="text-rose-500"></Icon>
      <Icon v-if="item.isRead" type="drafts" size="3xl"></Icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
