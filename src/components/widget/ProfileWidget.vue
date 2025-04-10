<script lang="ts" setup>
import type { Widget } from '@/types/Widget';
import BioPfp from '../global/BioPfp.vue';
import Icon from '../global/Icon.vue';

const props = defineProps<{
  data?: Widget
}>()
</script>
<template>
  <!--Full widget, CENTER/START-->
  <div :class="`flex flex-col justify-center content-${data.specificSettings['profileAlign']} items-${data.specificSettings['profileAlign']} w-full p-4 gap-4 bg-red-500`">

    <!--Bio avatar,name/badge, CENTER/START-->
    <div class="flex flex-col justify-center content-center items-center">

      <!--Bio avatar IN/OVER-->
      <BioPfp class="w-20 h-20"></BioPfp>

      <!--Bio name/badge, BADGE ON / BADGE OFF-->
      <div class="flex flex-row justify-center content-center items-center text-xl gap-2">
        <h3>Locksmith Dennis</h3>
        <div class="flex flex-row justify-center content-center items-center">
          <Icon type="shield_person" size="2xl"></Icon>
          <Icon type="apps" size="2xl"></Icon>
          <Icon type="id_card" size="2xl"></Icon>
        </div>
      </div>

    </div>

    <!--Bio handle ON/OFF-->
    <h3>@locksmithdennis</h3>

    <!--Text-->
    <div class="flex flex-col justify-center content-start items-start w-full">
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque aperiam soluta deleniti sunt mollitia reiciendis doloribus, dolore qui rerum, corrupti aliquam corporis blanditiis tempora! Voluptas ducimus tenetur ex id earum.</p>
    </div>

  </div>
</template>
