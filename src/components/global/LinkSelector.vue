<script lang="ts" setup>
import { ref } from 'vue';
import Icon from './Icon.vue';
import Input from './Input.vue';
import Button from './Button.vue';

const props = defineProps<{
  links: { link: string; name: string }[];
}>();

const emit = defineEmits<{
  (e: 'change-links', links: { link: string; name: string }[]): void;
}>();

const newLink = ref('');
const newName = ref('');
const linkList = ref([...props.links]);

const addLink = () => {
  if (newLink.value.trim() && newName.value.trim()) {
    linkList.value.push({ link: newLink.value.trim(), name: newName.value.trim() });
    emit('change-links', linkList.value);
    newLink.value = '';
    newName.value = '';
  }
};

const removeLink = (index: number) => {
  linkList.value.splice(index, 1);
  emit('change-links', linkList.value);
};

const moveLinkUp = (index: number) => {
  if (index > 0) {
    const temp = linkList.value[index];
    linkList.value[index] = linkList.value[index - 1];
    linkList.value[index - 1] = temp;
    emit('change-links', linkList.value);
  }
};

const moveLinkDown = (index: number) => {
  if (index < linkList.value.length - 1) {
    const temp = linkList.value[index];
    linkList.value[index] = linkList.value[index + 1];
    linkList.value[index + 1] = temp;
    emit('change-links', linkList.value);
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full gap-2">
    <!-- Input for adding new links -->
    <div class="flex flex-col items-center justify-center w-full gap-2">
      <Input
        v-model="newName"
        type="text"
        placeholder="Enter link name" />
      <Input
        v-model="newLink"
        type="text"
        placeholder="Enter link URL"
        @keyup.enter="addLink" />
      <Button
        icon-position="left"
        icon-type="add"
        rank="primary"
        size="small"
        text="Add Link"
        @click="addLink" />
    </div>

    <!-- Display the list of links -->
    <div v-if="linkList.length" class="w-full grid gap-2">
      <div v-for="(link, index) in linkList" :key="index" class="relative group">
        <div class="flex items-center justify-between border-2 border-zinc-900/80 rounded-md px-4 py-2 bg-zinc-800">
          <a :href="link.link" target="_blank" rel="noopener noreferrer" class="text-zinc-300 hover:underline">
            {{ link.name }}
          </a>
          <div class="flex items-center gap-2">
            <button
              v-if="index > 0"
              class="bg-zinc-700 text-white rounded-full px-1 opacity-0 group-hover:opacity-100 transition-opacity"
              @click.prevent="moveLinkUp(index)">
              <Icon type="keyboard_arrow_up" />
            </button>
            <button
              v-if="index < linkList.length - 1"
              class="bg-zinc-700 text-white rounded-full px-1 opacity-0 group-hover:opacity-100 transition-opacity"
              @click.prevent="moveLinkDown(index)">
              <Icon type="keyboard_arrow_down" />
            </button>
            <button
              class="bg-rose-500 text-white rounded-full px-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
              @click.prevent="removeLink(index)">
              <Icon type="close" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>
