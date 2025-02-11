<script lang="ts" setup>
  import TabControl from '@/components/global/TabControl.vue';
  import { RouterView } from 'vue-router';
  import { useRoute, useRouter } from 'vue-router';
  import { onMounted } from 'vue';

  const router = useRouter();
  onMounted(()=>{
    router.push('/profile')
  })

</script>
<template>
  <div class="w-full h-full flex flex-col justify-start content-start items-start text-3xl py-20 px-6">
    <span>
      <TabControl
      :items="[
        { buttonText: 'Profile', buttonSize: 'small', buttonRank: 'tabItem', buttonIconPosition: 'none', event:()=> router.push('/profile') },
        { buttonText: 'Account', buttonSize: 'small', buttonRank: 'tabItem', buttonIconPosition: 'none', event:()=> router.push('/account') },
        { buttonText: 'Preferences', buttonSize: 'small', buttonRank: 'tabItem', buttonIconPosition: 'none', event:()=> router.push('/preferences') }
      ]"
    ></TabControl>
    </span>
    <div class="w-full h-full">
      <RouterView></RouterView>
    </div>
  </div>
</template>
