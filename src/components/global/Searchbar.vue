<script lang="ts" setup>
import Input from '@/components/global/Input.vue';
import { ref } from 'vue';

interface Item {
  name?: string; // Mark `name` as optional with `?`
  // Add other properties if needed
}



const search = defineModel<string>();
const basearray = ref<Item[]>([]); // Most már egy ref!

const emit = defineEmits<{ (event: 'filtered', value: Item[]): void }>();

function activateFilter(filter: string | undefined) {
  const normalizedFilter = filter ?? '';
  const filtered = basearray.value.filter(item =>
    item.name?.toLowerCase().includes(normalizedFilter.toLowerCase())
  );

  emit('filtered', filtered);
}


</script>

<template>
  <Input 
    class="input" 
    placeholder="Search" 
    v-model="search" 
    @input="activateFilter(search)" 
    type="text"
  />
</template>

<style>
.input {
  width: 20rem;
}
</style>