<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, computed, ref } from 'vue';
import TabControl from '@/components/global/TabControl.vue';
const router = useRouter();
const route = useRoute();

const activeTabIndex = computed(() => {
  const path = route.path;

  if (path.includes('/baseDash/admin/adminUsers')) return 0;
  if (path.includes('/baseDash/admin/adminBios')) return 1;
  if (path.includes('/baseDash/admin/adminMail')) return 2;

  return 0;
});

</script>

<template>
  <div class="flex flex-col justify-start content-start items-start w-full h-full gap-5 pt-20 pb-6 px-6">
    <TabControl :items="[
      {
        buttonText: 'Users',
        buttonSize: 'small',
        tabItem: true,
        event: () => router.push('/baseDash/admin/adminUsers'),
      },
      {
        buttonText: 'Bios',
        buttonSize: 'small',
        tabItem: true,
        event: () => router.push('/baseDash/admin/adminBios'),
      },
      {
        buttonText: 'Mail',
        buttonSize: 'small',
        tabItem: true,
        event: () => router.push('/baseDash/admin/adminMail'),
      },
    ]" :activeTabIndex="activeTabIndex"
    />

    <div class="w-full h-full">
      <RouterView></RouterView>
    </div>
  </div>
</template>
