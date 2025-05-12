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
      filtered = props.basearray.filter((item: Bio) =>
        item.name.toLowerCase().replace(/\s+/g, "").includes(newSearch.toLowerCase().replace(/\s+/g, ""))
      );

      filtered += props.basearray.filter((item: Bio) =>
        item.handle.toLowerCase().replace(/\s+/g, "").includes(newSearch.toLowerCase().replace(/\s+/g, ""))
      );

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
    class="max-w-[300px] input"
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
