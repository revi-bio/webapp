<script lang="ts" setup>
import Input from '@/components/global/Input.vue';
import type { Bio } from '@/types/Bio';
import { computed, ref } from 'vue';

const search = defineModel<string>();
const props = defineProps<{
  basearray:Bio[]
}>()

const emit = defineEmits(["filtered"]);

function activateFilter(filter: string ) {
  if (filter == "") {
    emit('filtered', props.basearray)
  }

  const filtered = props.basearray.filter(item =>
    item.name.toLowerCase()
          .replace(/\s+/g, "")
          .includes(filter.toLowerCase().replace(/\s+/g, ""))
  );
  console.log(filtered)
  emit('filtered', filtered);
}

</script>

<template>
  <Input 
    class="input" 
    placeholder="Search" 
    v-model="search"
    @update:model-value="activateFilter(search!)"
    type="text"
  />
</template>

<style>
.input {
  width: 20rem;
}
</style>