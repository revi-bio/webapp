<script lang="ts" setup>
import { computed } from 'vue';
import Avatar from '../global/Avatar.vue';
import Icon from '../global/Icon.vue';
import { widget } from "@/stores/widget";

const widgetStore = widget();
const emit = defineEmits(["profile_clicked"]);

const widgetData = computed(() => {
  if (widgetStore.selectedId != null) {
    return widgetStore.getWidget(props.id);
  } else {
    return {};
  }
});

const props = defineProps<{
  id: string;
  profile_align: "start" | "center";
  name: string;
  handle: string;
  badge: string[];
  text: string;

  profile_over?: boolean;
  badge_color?: string;
  handle_color?: string;
  name_color?: string;
  bg_color?: string;
  text_color?: string;
  rounded?: string;

}>();

function selectWidget(props: Record<string, any>) {
  widgetStore.addWidget(props.id, props);
  widgetStore.selectWidget(props.id);
}


</script>

<template>
    <div @click="selectWidget(props)" class="flex w-full p-2 flex-col" :class="`bg-${widgetData.bg_color} rounded-${widgetData.rounded} ${widgetData.profile_over ? 'pt-8 relative' : ''}`">
      <div :class="`flex w-full ${widgetData.profile_over ? 'absolute -top-8 pr-4' : 'static'} justify-${widgetData.profile_align}`">
        <div :class="`flex `">
          <Avatar class= "w-[64px] h-[64px]"></Avatar>
        </div>
      </div>
      <div class="flex" :class="`justify-${widgetData.profile_align}`">
        <h1 class="text-2xl" :class="`text-${widgetData.name_color}`">{{ widgetData.name }}</h1>
        <div v-if="widgetData.profile_align != 'center' && badge.length != 0" v-for="badge in badge" :key="badge" class="flex items-center" :class="`text-${widgetData.badge_color}`">
          <Icon :type="`${badge}`" size="text-lg" class=""></Icon>
        </div>
      </div>
      <p class="text-sm flex" :class="`justify-${widgetData.profile_align} text-${widgetData.handle_color}`" >@{{ widgetData.handle }}</p>

      <div class="flex justify-center w-full">
        <div v-if="widgetData.profile_align == 'center' && badge.length != 0" v-for="badge in badge" :key="badge" class="flex items-center" :class="`text-${widgetData.badge_color}`">
          <Icon :type="`${badge}`" size="text-lg" class=""></Icon>
        </div>
      </div>

      <p class="text-md" :class="`text-${widgetData.text_color}`">{{ widgetData.text }}</p>

    </div>
</template>

<style>

</style>
