<script lang="ts" setup>
import Input from '@/components/global/Input.vue';
import type { UserForAdmin } from '@/stores/admin';
import type { Bio } from '@/types/Bio';
import { watch } from 'vue';

const search = defineModel<string>();
const props = defineProps<{
  basearray: Bio[] | UserForAdmin[]
}>()

const emit = defineEmits(["filtered"]);

watch(search, (newSearch) => {
  if (!newSearch) {
    emit('filtered', props.basearray);
    return;
  }

  let filtered;

  if (props.basearray.length > 0) {
    const firstItem = props.basearray[0];

    if ('name' in firstItem) {
      const nameFiltered = props.basearray.filter((item: Bio) =>
        item.name.toLowerCase().replace(/\s+/g, "").includes(newSearch.toLowerCase().replace(/\s+/g, ""))
      );
      const handleFiltered = props.basearray.filter((item: Bio) =>
        item.handle.toLowerCase().replace(/\s+/g, "").includes(newSearch.toLowerCase().replace(/\s+/g, ""))
      );
      const combined = [...nameFiltered, ...handleFiltered];
      filtered = Array.from(new Map(combined.map(item => [item._id, item])).values());

    } else if ('displayName' in firstItem) {
      filtered = props.basearray.filter((item: UserForAdmin) =>
        item.displayName.toLowerCase().replace(/\s+/g, "").includes(newSearch.toLowerCase().replace(/\s+/g, ""))
      );
    } else {
      filtered = [];
    }
  } else {
    filtered = [];
  }

  emit('filtered', filtered);
});

</script>

<template>
  <Input
    class="searchInput"
    placeholder="Search"
    v-model="search"
    type="text"
  />
</template>

<style>
.searchInput {
  width: 20rem;
}
</style>
