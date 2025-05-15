<script lang="ts" setup>
import type { Widget } from '@/types/Widget';
import BioPfp from '../global/BioPfp.vue';
import Icon from '../global/Icon.vue';
import { ref, computed, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';
import { useBioStore } from '@/stores/bio';


const bioStore = useBioStore();
const route = useRoute();
const pageHandle = route.params.handle as string;
const handle = pageHandle || bioStore.getCurrentHandle();
const displayName = ref<string | undefined>(bioStore.getCurrentDisplayName());

// Fetch the display name for the handle if it's from the route
onMounted(async () => {
  if (pageHandle) {
    const bio = await bioStore.fetchBio(pageHandle);
    if (bio) {
      displayName.value = bio.name;
    }
  }
});
const props = defineProps<{
  data: Widget;
}>();

let badgeStyle = computed(
  () =>
    `color: hsla(${props.data.specificSettings['badgeColor'].hue}, ${props.data.specificSettings['badgeColor'].saturation}%, ${props.data.specificSettings['badgeColor'].value}%, ${props.data.specificSettings['badgeColor'].opacity});`,
);

let handleStyle = computed(
  () =>
    `color: hsla(${props.data.specificSettings['handleColor'].hue}, ${props.data.specificSettings['handleColor'].saturation}%, ${props.data.specificSettings['handleColor'].value}%, ${props.data.specificSettings['handleColor'].opacity});`,
);

let nameStyle = computed(
  () =>
    `color: hsla(${props.data.specificSettings['nameColor'].hue}, ${props.data.specificSettings['nameColor'].saturation}%, ${props.data.specificSettings['nameColor'].value}%, ${props.data.specificSettings['nameColor'].opacity});`,
);

let textStyle = computed(
  () =>
    `color: hsla(${props.data.specificSettings['textColor'].hue}, ${props.data.specificSettings['textColor'].saturation}%, ${props.data.specificSettings['textColor'].value}%, ${props.data.specificSettings['textColor'].opacity});`,
);


</script>

<template>
  <!-- Main container with stacking context -->
  <div class="relative isolate">
    <!-- Full widget with lower z-index -->
    <div
      :class="`flex flex-col justify-center content-${data.specificSettings['fullAlign']} items-${data.specificSettings['fullAlign']} w-full p-4 ${data.specificSettings['profileOver'] ? 'pt-12' : ''} gap-4 relative z-0`">
      <!--Bio avatar,name/badge, CENTER/START-->
      <div
        :class="`flex flex-col justify-center content-${data.specificSettings['bioAvatarAndName']} items-${data.specificSettings['bioAvatarAndName']}`">
        <!--Bio avatar - only show if NOT profileOver-->
        <BioPfp v-if="!data.specificSettings['profileOver']" class="w-20 h-20" :bioHandle="handle"></BioPfp>

        <!--Bio name/badge, BADGE VISIBLE / BADGE INVISIBLE-->
        <div class="flex flex-row justify-center content-center items-center text-xl gap-2 mt-2">
          <h3 :style=nameStyle>{{ displayName }}</h3>
          <div v-if="data.specificSettings['badgeVisible']"
            class="flex flex-row justify-center content-center items-center" :style=badgeStyle>
            <Icon type="shield_person" size="2xl"></Icon>
            <Icon type="apps" size="2xl"></Icon>
            <Icon type="id_card" size="2xl"></Icon>
          </div>
        </div>
      </div>

      <!--Bio handle VISIBLE/INVISIBLE-->
      <h3 v-if="data.specificSettings['handleVisible']" :style=handleStyle>
        @{{ handle }}
      </h3>

      <!--Text-->
      <div class="flex flex-col justify-center content-start items-start w-full" :style=textStyle>
        <p>{{ data.specificSettings['text'] }}</p>
      </div>
    </div>

    <!-- Avatar with higher z-index -->
    <div v-if="data.specificSettings['profileOver']" class="absolute w-full flex justify-center top-[-2.5rem] z-10">
      <BioPfp class="w-20 h-20" :bioHandle="handle"></BioPfp>
    </div>
  </div>
</template>
