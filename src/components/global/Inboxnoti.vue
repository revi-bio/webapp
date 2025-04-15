<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import Icon from './Icon.vue';
import Logo from './Logo.vue';

const props = defineProps<{
  items:{
    title: string;
    subject:string;
    close:string;
    senddate: string;
    readed: boolean;
    onClick?: () => void;
  }[]
}>();

const emit = defineEmits(["selectMsg"]);
const messages = ref([...props.items]);
const activeMsgIndex = ref<number | null>(null);

const selectMsg = (index: number) => {
  activeMsgIndex.value = index;
  if (!messages.value[index].readed) {
    messages.value[index].readed = !messages.value[index].readed;
  }
  emit("selectMsg", activeMsgIndex.value);
};

watchEffect(() => {
  messages.value = [...props.items];
});

//<span v-if="index != activeMsgIndex" class="rounded-full w-full h-[2px] mt-4" :class="item.readed ? 'bg-zinc-500/70': 'bg-rose-500/70'"><!--Separator--></span>
</script>

<template>
<div class="flex flex-col cursor-pointer p-2 border-b-2" v-for="(item, index) in messages" @click.prevent="() => { selectMsg(index); }" :class="item.readed ? index == activeMsgIndex ? 'text-zinc-900 bg-zinc-200 rounded-2xl':'text-zinc-500 border-zinc-500/70' : 'text-zinc-200 border-rose-500/70'" :selected="activeMsgIndex === index">
  <div class="flex flex-row items-center justify-between">
    <Logo type="revi" width="40"></Logo>
    <p class="text-md truncate w-[80px]">{{ item.title }}</p>
    <p class="text-sm">{{ item.senddate }}</p>
    <Icon v-if="!item.readed" type="mail" size="3xl" class="text-rose-500"></Icon>
    <Icon v-if="item.readed" type="drafts" size="3xl"></Icon>
  </div>
</div>
</template>

<style lang="scss" scoped>

</style>
