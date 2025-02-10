<script lang="ts" setup>
  import TabControl from '@/components/global/TabControl.vue';
</script>
<template>
  <div class="w-full h-full flex flex-col justify-start content-start items-start text-3xl py-20 px-6">
    <span>
      <TabControl
      :items="[
        { buttonText: 'Profile', buttonSize: 'small', buttonRank: 'tabItem', buttonIconPosition: 'none' },
        { buttonText: 'Account', buttonSize: 'small', buttonRank: 'tabItem', buttonIconPosition: 'none' },
        { buttonText: 'Preferences', buttonSize: 'small', buttonRank: 'tabItem', buttonIconPosition: 'none' }
      ]"
    ></TabControl>
    </span>
  </div>
</template>
