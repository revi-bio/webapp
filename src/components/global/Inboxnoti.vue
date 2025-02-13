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
    event?: () => void;
    onClick?: () => void;
    selected?: boolean;
  }[]
}>();
const messages = ref([...props.items]);
const activeMsgIndex = ref<number | null>(null);

const selectMsg = (index: number) => {
  activeMsgIndex.value = index;
  if (!messages.value[index].readed) {
    messages.value[index].readed = !messages.value[index].readed;
  }
};

watchEffect(() => {
  messages.value = [...props.items];
});

</script>

<template>
<div class="flex flex-col gap-5 cursor-pointer pb-4" v-for="(item, index) in messages" :id="index" @click.prevent="() => { selectMsg(index); item.event?.(); }" :class="item.readed ? 'text-zinc-500': 'text-zinc-200'" :selected="activeMsgIndex === index">
  <div class="flex flex-row items-center justify-between">
    <Logo type="revi"></Logo>
    <p class="text-md truncate w-[80px]">{{ item.title }}</p>
    <p class="text-sm">{{ item.senddate }}</p>
    <Icon v-if="!item.readed" type="mail" size="3xl" class="text-rose-500"></Icon>
    <Icon v-if="item.readed" type="opened_mail" size="3xl"></Icon>
  </div>
  <span v-if="item.selected" class="rounded-full w-full h-[2px]" :class="item.readed ? 'bg-zinc-500/70': 'bg-rose-500/70'"><!--Separator--></span>
</div>
</template>

<style lang="scss" scoped>

</style>
