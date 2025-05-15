<script lang="ts" setup>
import Button from '@/components/global/Button.vue';
import Dropdown from '@/components/global/Dropdown.vue';
import LinkIcon from '@/components/global/LinkIcon.vue';
import { computed, onMounted, ref, type Ref } from 'vue';
import BioPfp from '@/components/global/BioPfp.vue';
import { useBioStore } from '@/stores/bio';
import type { Bio } from '@/types/Bio';
import router from '@/router';
import { DateTime } from '@/composables/date';
import { ApiWrapper } from '@/composables/ApiWrapper';
import Skeleton from '@/components/global/Skeleton.vue';
import LoadingCircle from '@/components/global/LoadingCircle.vue';

const bioStore = useBioStore();
const biosList = ref<Bio[]>([]);

const topBios = computed(() => {
  return [...biosList.value]
    .sort((a, b) => {
      if (b.views !== a.views) {
        return b.views - a.views;
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    })
    .slice(0, 3);
});

const lastUpdatedBios = computed(() => {
  if (biosList.value.length === 0) return null;
  return [...biosList.value]
    .sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    })
    .slice(0, 3);
});

const info: Ref<{ views: number; linksClicked: number; avgSecondsOnSites: number } | null> = ref(null);
const countries: Ref<Map<string, number> | null> = ref(null);
const socials: Ref<Map<string, number> | null> = ref(null);
const referralDistribution: Ref<Map<string, number> | null> = ref(null);
const views: Ref<Array<number>> = ref([]);

var colorPalette = ['#fafafa', '#f43f5e', '#717179'];
const referralColors = ['#d946ef', '#3b82f6', '#f97316', '#facc15', '#10b981'];

const referralData = computed(() => {
  if (!referralDistribution.value) return [];
  const entries = Array.from(referralDistribution.value.entries());
  return entries.map(([name, value], index) => ({
    name,
    value,
    color: referralColors[index % referralColors.length]
  }));
});

const totalValue = computed(() => referralData.value.reduce((sum, item) => sum + item.value, 0));

const linkData = computed(() => {
  if (!socials.value) return [];
  return Array.from(socials.value.entries()).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    icon: name.toLowerCase(),
    value
  }));
});

const scaleHeight = (value: number) => {
  const maxValue = Math.max(...linkData.value.map((link) => link.value));
  if (maxValue === 0) return 0;
  return (value / maxValue) * 85;
};

const visitorData = computed(() => {
  if (!countries.value) return [];
  return Array.from(countries.value.entries()).map(([country, value]) => ({
    value,
    name: `${country} - ${value}`,
  }));
});

// Pie chart computed
const pieSlices = computed(() => {
  if (!visitorData.value.length) return [];

  const total = visitorData.value.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  return visitorData.value.map((item, index) => {
    const percentage = item.value / total;
    const angle = percentage * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    // SVG path calculation for pie slice
    const centerX = 100;
    const centerY = 100;
    const radius = 80;
    const innerRadius = 40;

    const x1 = centerX + innerRadius * Math.cos((startAngle * Math.PI) / 180);
    const y1 = centerY + innerRadius * Math.sin((startAngle * Math.PI) / 180);
    const x2 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
    const y2 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
    const x3 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
    const y3 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
    const x4 = centerX + innerRadius * Math.cos((endAngle * Math.PI) / 180);
    const y4 = centerY + innerRadius * Math.sin((endAngle * Math.PI) / 180);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const path = [
      `M ${x1} ${y1}`,
      `L ${x2} ${y2}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x3} ${y3}`,
      `L ${x4} ${y4}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}`,
      'Z'
    ].join(' ');

    currentAngle += angle;

    return {
      path,
      color: colorPalette[index % colorPalette.length],
      name: item.name,
      value: item.value
    };
  });
});

// Bar chart data
const barViewsData = ref<{ date: string; value: number }[]>([]);
const selectedPeriod = ref('Last 30 days');

const generateBarData = (days: number) => {
  if (views.value.length > 0) {
    const data = views.value.slice(-days).map((value, index) => ({
      date: (index + 1).toString(),
      value
    }));
    barViewsData.value = data;
  }
};

const barChartBars = computed(() => {
  if (!barViewsData.value.length) return [];

  const maxValue = Math.max(...barViewsData.value.map(item => item.value));
  const chartHeight = 200;
  const barWidth = 280 / barViewsData.value.length;

  return barViewsData.value.map((item, index) => ({
    x: index * barWidth + barWidth * 0.1,
    y: chartHeight - (item.value / maxValue) * chartHeight,
    width: barWidth * 0.8,
    height: (item.value / maxValue) * chartHeight,
    value: item.value,
    date: item.date
  }));
});

const handleDropdownSelect = (selected: string) => {
  selectedPeriod.value = selected;
  let days = 30;
  if (selected === 'Last 30 days') days = 30;
  else if (selected === 'Last 60 days') days = 60;
  else if (selected === 'Last 3 months') days = 90;
  else if (selected === 'Last 6 months') days = 180;

  generateBarData(days);
};

onMounted(async () => {
  try {
    const [infoResult, countriesResult, socialsResult, referralResult, viewsResult] = await Promise.all([
      ApiWrapper.get('statistics/info', {}),
      ApiWrapper.get('statistics/countries', {}),
      ApiWrapper.get('statistics/socials', {}),
      ApiWrapper.get('statistics/referral-distribution', {}),
      ApiWrapper.get('statistics/views', {})
    ]);

    info.value = infoResult.data;
    countries.value = new Map(Object.entries(countriesResult.data));
    socials.value = new Map(Object.entries(socialsResult.data));
    referralDistribution.value = new Map(Object.entries(referralResult.data));
    views.value = viewsResult.data;

    // Initialize with 30 days
    generateBarData(30);

    await bioStore.fetchBios();
    biosList.value = [...bioStore.bios];
  } catch (error) {
    console.error('Error loading statistics:', error);
  }
});

function openBio(handle: string) {
  bioStore.setCurrentHandle(handle);
  router.push({
    name: 'Editor',
    params: { handle },
  }).catch(err => {
    console.error('Navigation error:', err);
    window.location.href = `/baseDash/editor/${handle}`;
  });
}
</script>

<template>
  <div class="flex flex-col p-6 gap-4 w-full h-full max-lg:h-full">
    <span class="flex flex-row justify-end w-full gap-4">
      <Button text="Export" icon="check" primary />
      <Dropdown
        type="normal"
        baseText="Choose one"
        position="center"
        :items="[
          { name: 'Last 30 days', event: () => handleDropdownSelect('Last 30 days') },
          { name: 'Last 60 days', event: () => handleDropdownSelect('Last 60 days') },
          { name: 'Last 3 months', event: () => handleDropdownSelect('Last 3 months') },
          { name: 'Last 6 months', event: () => handleDropdownSelect('Last 6 months') },
        ]" />
    </span>

    <div class="overflow-y-auto h-full w-full overflow-x-hidden">
      <div
        class="w-full gap-4 max-lg:flex max-lg:flex-col lg:min-h-[800px] lg:max-h-[800px] lg:grid lg:grid-cols-12 lg:grid-rows-7">
        <!--Smaller left side-->
        <!--Most viewed-->
        <div class="dashboardCard gap-4 lg:overflow-y-scroll lg:row-start-1 row-span-3 lg:col-span-4">
          <h3>Most viewed bio pages</h3>
          <template v-if="topBios.length == 0">
            <div
              v-for="i in 2"
              :key="i"
              class="text-lg flex flex-row justify-between content-center items-center bg-zinc-700 w-full rounded-lg overflow-hidden p-2 cursor-pointer">
              <div class="flex flex-row justify-start content-center items-center gap-2">
                <Skeleton class="min-w-16 min-h-16 rounded-full"></Skeleton>
                <span class="flex flex-col justify-center content-center items-start min-w-16 gap-1">
                  <Skeleton />
                  <Skeleton :height="1.5" />
                </span>
              </div>
              <h3 class="text-2xl"></h3>
            </div>
          </template>
          <div
            v-for="(bio, index) in topBios"
            :key="bio.handle"
            class="text-lg flex flex-row justify-between content-center items-center bg-zinc-700 w-full rounded-lg overflow-hidden p-2 cursor-pointer"
            @click="openBio(bio.handle)">
            <div class="flex flex-row justify-start content-center items-center gap-2">
              <BioPfp class="w-16 h-16" :bioHandle="bio.handle"></BioPfp>
              <span class="flex flex-col justify-center content-center items-start">
                <h3 class="text-sm font-[300]">{{ bio.handle }}</h3>
                <h3>{{ bio.name }}</h3>
              </span>
            </div>
            <h3 class="text-2xl">#{{ index + 1 }}</h3>
          </div>
        </div>

        <!--Recently edited-->
        <div class="dashboardCard gap-4 p-4 lg:overflow-y-scroll lg:row-start-4 row-span-3 lg:col-span-4">
          <h3>Recently edited</h3>
          <template v-if="lastUpdatedBios == null">
            <div
              v-for="i in 2"
              :key="i"
              class="text-lg flex flex-row justify-between content-center items-center bg-zinc-700 w-full rounded-lg overflow-hidden p-2 cursor-pointer">
              <div class="flex flex-row justify-start content-center items-center gap-2">
                <Skeleton class="min-w-16 min-h-16 rounded-full"></Skeleton>
                <span class="flex flex-col justify-center content-center items-start min-w-16 gap-1">
                  <Skeleton />
                  <Skeleton :height="1.5" />
                </span>
              </div>
              <h3 class="text-2xl"></h3>
            </div>
          </template>
          <div
            v-for="bio in lastUpdatedBios"
            :key="bio?.handle"
            class="text-lg flex flex-row justify-between content-center items-center bg-zinc-700 w-full rounded-lg overflow-hidden p-2 cursor-pointer"
            @click="openBio(bio.handle)">
            <div class="flex flex-row justify-start content-center items-center gap-2">
              <BioPfp class="w-16 h-16" :bioHandle="bio?.handle"></BioPfp>
              <span class="flex flex-col justify-center content-center items-start">
                <h3 class="text-sm font-[300]">{{ bio?.handle }}</h3>
                <h3>{{ bio?.name }}</h3>
              </span>
            </div>
            <h3>
              {{ DateTime.formatDate(bio?.updatedAt) }}
            </h3>
          </div>
        </div>

        <!--Referral distribution-->
        <div class="dashboardCard flex flex-col gap-2 lg:row-start-7 lg:col-span-4">
          <h3>Referral distribution</h3>
          <div class="referralDom w-full h-full flex flex-row justify-center content-center items-center">
            <div
              v-for="(item, index) in referralData"
              :key="index"
              class="h-3 first:rounded-l-full last:rounded-r-full relative group"
              :style="{
                backgroundColor: item.color,
                width: `${(item.value / totalValue) * 100}%`,
              }">
              <div
                class="absolute bottom-full top-5 left-1/2 transform mb-2 p-2 text-white bg-black rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>

        <!--Bigger right side-->
        <!--Top-->
        <div class="grid w-full gap-4 max-lg:grid-cols-2 lg:grid-cols-4 lg:col-span-8 max-lg:order-first">
          <span class="dashboardCard w-full h-full min-h-[100px]">
            <h3 class="text-base text-zinc-300">Views gained</h3>
            <Skeleton :height="2" v-if="info == null" />
            <h3 v-else class="text-4xl">{{ info.views }}</h3>
          </span>

          <span class="dashboardCard w-full h-full min-h-[90px]">
            <h3 class="text-base text-zinc-300">Links/Socials clicked</h3>
            <Skeleton :height="2" v-if="info == null" />
            <h3 v-else class="text-4xl">{{ info.linksClicked }}</h3>
          </span>

          <span class="dashboardCard w-full h-full min-h-[90px]">
            <h3 class="text-base text-zinc-300">Average time on-site</h3>
            <Skeleton :height="2" v-if="info == null" />
            <h3 v-else class="text-4xl">{{ info.avgSecondsOnSites }}s</h3>
          </span>

          <span class="dashboardCard w-full h-full min-h-[90px]">
            <!--
              <h3 class="text-base text-zinc-300">Guest-Click ratio</h3>
              <h3 class="text-4xl">0</h3>
              -->
          </span>
        </div>

        <!--Middle-->
        <div class="dashboardCard w-full h-full max-lg:min-h-[300px] lg:row-span-3 lg:col-span-4">
          <h3 class="">Most visitors per countries</h3>

          <div class="w-full h-full flex flex-col justify-center content-center items-center p-4">
            <div class="w-full h-full flex justify-center items-center" v-if="!countries">
              <LoadingCircle class="relative" />
            </div>
            <div v-else class="w-full h-full flex flex-col items-center justify-center">
              <svg viewBox="0 0 200 200" class="w-48 h-48">
                <path
                  v-for="slice in pieSlices"
                  :key="slice.name"
                  :d="slice.path"
                  :fill="slice.color"
                  class="opacity-90"
                />
              </svg>
            </div>
          </div>
          <span class="w-full flex flex-row justify-center content-center flex-wrap items-center gap-4">
            <h3
              v-for="(visitor, index) in visitorData"
              :key="visitor.name"
              :style="{ color: colorPalette[index % colorPalette.length] }">
              {{ visitor.name }}
            </h3>
          </span>
        </div>

        <!--Most used links-->
        <div class="dashboardCard w-full max-lg:min-h-[400px] max-lg:h-auto h-full lg:row-span-3 lg:col-span-4">
          <h3>Most used links</h3>
          <div class="w-full max-lg:h-[320px] h-full flex flex-row justify-center items-center pt-8 gap-4 lg:gap-2">
            <LoadingCircle v-if="!socials" />
            <span
              v-for="(link, id) in linkData"
              :key="id"
              class="w-full h-full flex flex-col justify-end content-center items-center gap-2 relative">
              <div class="w-full flex flex-col justify-center content-center items-center">
                <LinkIcon :type="link.icon" color="zinc-100" width="50px"></LinkIcon>
              </div>
              <!-- Mobile view with text label -->

              <span
                class="bg-rose-500 rounded-lg max-lg:w-full lg:w-3/4 mt-2 lg:mt-8 self-center transition-all duration-300"
                :style="{ height: scaleHeight(link.value) + '%' }">
              </span>
              <h3 class="text-xs md:text-sm text-zinc-400">{{ link.value }}</h3>
              <div class="w-full flex flex-col justify-center content-center items-center text-xs text-zinc-300 pb-2">
                {{ link.name }}
              </div>
            </span>
          </div>
        </div>

        <!--Bottom-->
        <div class="dashboardCard relative max-lg:min-h-[350px] h-[350px] w-full lg:col-span-8 lg:row-span-3 max-lg:overflow-hidden">
          <h3>Additional views</h3>

          <div class="w-full h-full max-lg:overflow-x-auto lg:overflow-x-visible overflow-y-hidden p-4">
            <div class="w-full h-full flex justify-center items-center" v-if="!views.length">
              <LoadingCircle class="relative" />
            </div>
            <div v-else class="max-lg:min-w-max h-full flex flex-row justify-center items-end gap-2 pt-8 pb-8">
              <span
                v-for="(bar, index) in barChartBars"
                :key="index"
                class="flex flex-col justify-end items-center gap-2 max-lg:w-8 max-lg:min-w-8 lg:flex-1 lg:max-w-[40px]"
                style="height: calc(100% - 30px);">
                <span
                  class="bg-zinc-100 rounded-md w-3/4 transition-all duration-300"
                  :style="{ height: bar.height + '%' }">
                </span>
                <h3 class="text-xs text-zinc-400">{{ bar.date }}</h3>
              </span>
            </div>
          </div>
          <div class="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">{{ selectedPeriod }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.dashboardCard {
  @apply bg-zinc-700/50 rounded-2xl p-4 flex flex-col justify-start content-start items-start text-xl;
}

.referralDom div {
  position: relative;
}
</style>
