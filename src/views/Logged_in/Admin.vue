<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, computed, ref } from 'vue';
import TabControl from '@/components/global/TabControl.vue';
const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (route.path === '/baseDash/admin') {
    router.push('/baseDash/admin/adminOverview');
  }
})
</script>

<template>
  <div class="flex flex-col justify-start content-start items-start w-full h-full gap-5 py-20 px-6">
    <TabControl :items="[
      {
        buttonText: 'Admin overview',
        buttonSize: 'small',
        tabItem: true,
        event: () => router.push('/baseDash/admin/adminOverview'),
      },
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
    ]"></TabControl>
    <div class="w-full h-full">
      <RouterView></RouterView>
    </div>
  </div>
</template>
