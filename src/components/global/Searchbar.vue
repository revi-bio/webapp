<script lang="ts" setup>
import Input from '@/components/global/Input.vue';
import type { Bio } from '@/types/Bio';
import { watch } from 'vue';

const search = defineModel<string>();
const props = defineProps<{
  basearray:Bio[]
}>()

const emit = defineEmits(["filtered"]);

watch(search, (newSearch) => {
  if (!newSearch) {
    emit('filtered', props.basearray);
    return;
  }

  const filtered = props.basearray.filter(item =>
    item.name.toLowerCase().replace(/\s+/g, "").includes(newSearch.toLowerCase().replace(/\s+/g, ""))
  );

  emit('filtered', filtered);
});

</script>

<template>
  <Input
    class="input"
    placeholder="Search"
    v-model="search"
    type="text"
  />
</template>

<style>
.input {
  width: 20rem;
}
</style>
