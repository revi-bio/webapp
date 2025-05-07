<script setup lang="ts">
import BioListItem from '@/components/global/BioListItem.vue';
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import { useAdminStore } from '@/stores/admin';
import type { Bio } from '@/types/Bio';

const adminStore = useAdminStore();
const biolists = ref<Bio[]>([]);
onMounted(async()=>{
  await adminStore.fetchAllBios();
  biolists.value = [...adminStore.bios];
})
watchEffect(() => {
  biolists.value = [...adminStore.bios];
})
</script>
<template>
  <div class="w-full h-full flex flex-col justify-start content-start items-start gap-5 overflow-y-auto">
    <div class="w-full" v-for="item in biolists" :key="item.handle">
        <BioListItem
          :avatar="item.handle"
          :name="item.name"
          :handle="item.handle"
          :views="item.views"
          :widgetsCount="item.widgetsCount"
          :pagesCount="item.pagesCount"
          :createdAt="item.createdAt"
          :updatedAt="item.updatedAt"
          @bioDeleted="adminStore.deleteBio(item._id)"
        ></BioListItem>
      </div>
  </div>
</template>
