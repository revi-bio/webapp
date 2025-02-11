<script lang="ts" setup>
  import TabControl from '@/components/global/TabControl.vue';
  import Button from '@/components/global/Button.vue';
  import { RouterView } from 'vue-router';
  import { useRoute, useRouter } from 'vue-router';
  import { onMounted } from 'vue';

  const router = useRouter();
  onMounted(()=>{
    router.push('/profile')
  })

</script>
<template>
  <div class="w-full h-full flex flex-col justify-start content-start items-start text-3xl py-20 px-6 gap-5">
    <span class="flex flex-row justify-center content-start items-center gap-5">
      <TabControl
      :items="[
        { buttonText: 'Profile', buttonSize: 'small', buttonRank: 'tabItem', buttonIconPosition: 'none', event:()=> router.push('/profile') },
        { buttonText: 'Account', buttonSize: 'small', buttonRank: 'tabItem', buttonIconPosition: 'none', event:()=> router.push('/account') },
        { buttonText: 'Preferences', buttonSize: 'small', buttonRank: 'tabItem', buttonIconPosition: 'none', event:()=> router.push('/preferences') }
      ]"
      ></TabControl>
      <Button text="Save changes" size="small" rank="primary" icon-position="right" icon-type="check"></Button>
    </span>
    <div class="w-full h-full flex justify-start content-start items-start">
      <RouterView></RouterView>
    </div>
  </div>
</template>
