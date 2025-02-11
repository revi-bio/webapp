<script lang="ts" setup>
  import Input from '@/components/global/Input.vue';
  const search = defineModel()
  const basearray = defineModel<Record<string, unknown>[]>({ default: () => [] });

  const emit = defineEmits<{
    (event: 'filtered', value: { name: string }[]): void
  }>();



  function activateFilter(filter: string | unknown) {
  if (!Array.isArray(basearray.value)) return;

    const filtered = basearray.value.filter(
      item => item.name?.toLowerCase().includes((filter as string).toLowerCase()) // `?.` elkerüli a hibát, ha nincs `name`
    );
    emit('filtered', filtered);
  }

</script>

<template>
  <Input class="input" placeholder="Search" v-model="search" @change="activateFilter(search)" type="text"></Input>
</template>

<style>
.input{
  @apply w-80
}
</style>
