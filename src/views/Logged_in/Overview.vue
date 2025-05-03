<script lang="ts" setup>
import Button from '@/components/global/Button.vue';
import Dropdown from '@/components/global/Dropdown.vue';
import LinkIcon from '@/components/global/LinkIcon.vue';
import * as echarts from 'echarts';
import { computed, nextTick, onMounted, ref } from 'vue';
import BioPfp from '@/components/global/BioPfp.vue';
import { useBioStore } from '@/stores/bio';
import type { Bio } from '@/types/Bio';

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

const lastUpdatedBio = computed(() => {
  if (biosList.value.length === 0) return null;

  return [...biosList.value].sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  })[0];
});

var colorPalette = ['#fafafa', '#f43f5e', '#717179'];

const referralColors = ['#d946ef', '#3b82f6', '#f97316', '#facc15', '#10b981'];
const referralData = ref([
  { name: 'No referral', value: 35, color: referralColors[0] },
  { name: 'YouTube', value: 20, color: referralColors[1] },
  { name: 'Instagram', value: 25, color: referralColors[2] },
  { name: 'Twitter', value: 10, color: referralColors[3] },
  { name: 'Other', value: 10, color: referralColors[4] },
]);
const totalValue = computed(() => referralData.value.reduce((sum, item) => sum + item.value, 0));
const hoveredItem = ref('');

const linkData = ref([
  { name: 'Youtube', icon: 'youtube', value: 123 },
  { name: 'Instagram', icon: 'instagram', value: 103 },
  { name: 'Steam', icon: 'steam', value: 88 },
  { name: 'Github', icon: 'github', value: 46 },
  { name: 'Other', icon: 'other', value: 22 },
  { name: 'Something', icon: 'something', value: 21 },
]);

const scaleHeight = (value) => {
  const maxValue = Math.max(...linkData.value.map((link) => link.value));
  return (value / maxValue) * 80;
};
const chartDom = ref<HTMLElement | null>(null);
const barDom = ref<HTMLElement | null>(null);
const barInstance = ref<echarts.ECharts | null>(null);
const chartInstance = ref<echarts.ECharts | null>(null);

//Doughnut chart
const rawVisitorData = ref([
  { value: 420, country: 'Germany' },
  { value: 210, country: 'Brazil' },
  { value: 69, country: 'Hungary' },
]);

//Bar (Additional views)
const barViewsData = ref<{ date: string; value: number }[]>([]);

const generateBarData = (days: number) => {
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    data.push({
      date: (days - i).toString(),
      value: Math.floor(Math.random() * 500), //random
    });
  }
  barViewsData.value = data;
};

const handleDropdownSelect = (selected: string) => {
  let days = 30;
  if (selected === 'Last 30 days') days = 30;
  else if (selected === 'Last 60 days') days = 60;
  else if (selected === 'Last 3 months') days = 90;
  else if (selected === 'Last 6 months') days = 180;

  generateBarData(days);

  nextTick(() => {
    if (barInstance.value) {
      barInstance.value.setOption({
        xAxis: [
          {
            type: 'category',
            data: barViewsData.value.map((item) => item.date),
            axisTick: { alignWithLabel: true },
          },
        ],
        yAxis: [{ type: 'value' }],
        series: [
          {
            name: 'Views',
            type: 'bar',
            barWidth: '60%',
            data: barViewsData.value.map((item) => item.value),
            color: colorPalette,
          },
        ],
      });
    }
  });
};

const visitorData = computed(() =>
  rawVisitorData.value.map((item) => ({
    value: item.value,
    name: `${item.country} - ${item.value}`,
  })),
);

onMounted(async () => {
  generateBarData(30);

  nextTick(() => {
    if (chartDom.value) {
      chartInstance.value = echarts.init(chartDom.value);
      chartInstance.value.setOption({
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: { show: false, position: 'center' },
            emphasis: { label: { show: true, fontSize: 20, fontWeight: 'bold' } },
            labelLine: { show: false },
            data: visitorData.value,
            color: colorPalette,
          },
        ],
      });
    }

    if (barDom.value) {
      barInstance.value = echarts.init(barDom.value);
      barInstance.value.setOption({
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: [
          {
            type: 'category',
            data: barViewsData.value.map((item) => item.date),
            axisTick: { alignWithLabel: true },
          },
        ],
        yAxis: [{ type: 'value' }],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: barViewsData.value.map((item) => item.value),
            color: colorPalette,
          },
        ],
      });
    }
  });
  await bioStore.fetchBios();
  biosList.value = [...bioStore.bios];
});
</script>

<template>
  <div class="flex flex-col justify-center content-center items-center p-6 gap-2 w-full h-full overflow-y-auto">
    <span class="flex flex-row justify-end content-center items-center w-full gap-4">
      <Button text="Export" size="small" rank="primary" icon-position="left" icon-type="check"></Button>
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
    <div class="flex lg:flex-row flex-col justify-start content-center items-center w-full h-full gap-4 pt-4">
      <!--Smaller left side-->
      <div class="flex flex-col justify-center content-center items-center lg:w-2/6 w-full h-full gap-4">
        <!--Most viewed-->
        <div class="dashboardCard w-full gap-4">
          <h3>Most viewed bio pages</h3>
          <div
            v-for="(bio, index) in topBios"
            class="text-lg flex flex-row justify-between content-center items-center bg-zinc-700 w-full rounded-lg overflow-hidden p-2">
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
        <div class="dashboardCard h-full w-full gap-4 p-4">
          <h3>Recently edited</h3>
          <div
            class="text-lg flex flex-row justify-between content-center items-center bg-zinc-700 w-full rounded-lg overflow-hidden p-2">
            <div class="flex flex-row justify-start content-center items-center gap-2">
              <BioPfp class="w-16 h-16" :bioHandle="lastUpdatedBio?.handle"></BioPfp>
              <span class="flex flex-col justify-center content-center items-start">
                <h3 class="text-sm font-[300]">{{ lastUpdatedBio?.handle }}</h3>
                <h3>{{ lastUpdatedBio?.name }}</h3>
              </span>
            </div>
            <h3>
              {{ lastUpdatedBio?.updatedAt.split('T')[0] }}
            </h3>
          </div>
        </div>

        <!--Referral distribution-->
        <div class="dashboardCard h-1/2 w-full">
          <h3>Referral distribution</h3>
          <div class="referralDom w-full h-full flex flex-row justify-center content-center items-center">
            <!-- Referral distribution csíkok -->
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
      </div>

      <!--Bigger right side-->
      <div class="flex flex-col justify-center content-center items-center lg:w-4/6 w-full h-full gap-4">
        <!--Top-->
        <div class="flex xl:flex-row flex-col w-full h-2/5 gap-4">
          <div class="flex sm:flex-row flex-col w-full gap-4">
            <span class="dashboardCard w-full h-full">
              <h3 class="text-base text-zinc-300">Views gained</h3>
              <h3 class="text-4xl">3020</h3>
            </span>

            <span class="dashboardCard w-full h-full">
              <h3 class="text-base text-zinc-300">Links/Socials clicked</h3>
              <h3 class="text-4xl">999 999</h3>
            </span>
          </div>

          <div class="flex sm:flex-row flex-col w-full gap-4">
            <span class="dashboardCard w-full h-full">
              <h3 class="text-base text-zinc-300">Avarage time on-site</h3>
              <h3 class="text-4xl">40s</h3>
            </span>

            <span class="dashboardCard w-full h-full">
              <h3 class="text-base text-zinc-300">Guest-Click ratio</h3>
              <h3 class="text-4xl">0</h3>
            </span>
          </div>
        </div>

        <!--Middle-->
        <div class="flex lg:flex-row flex-col gap-4 w-full min-h-[500px] h-full">
          <div class="dashboardCard w-full lg:w-5/12 h-full">
            <h3 class="">Most visitors per countries</h3>
            <div ref="chartDom" class="w-full h-full flex flex-col justify-center content-center items-center"></div>
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
          <div class="dashboardCard w-full lg:w-7/12 min-h-[500px] h-full">
            <h3>Most used links</h3>
            <div class="linkDom w-full h-full gap-2 md:gap-5 flex flex-row justify-center items-end">
              <span
                v-for="(link, id) in linkData"
                :key="id"
                class="w-full h-full flex flex-col items-center gap-2 relative">
                <span
                  class="w-full flex flex-col items-center justify-start mt-auto"
                  :style="{ height: scaleHeight(link.value) + '%' }">
                  <div class="flex justify-center content-center items-center">
                    <LinkIcon :type="link.icon" :color="'zinc-100'" :width="'90%'"></LinkIcon>
                  </div>

                  <span class="bg-rose-500 rounded-lg w-full h-full"></span>
                </span>

                <h3 class="text-xs md:text-sm text-zinc-400">{{ link.value }}</h3>
              </span>
            </div>
          </div>
        </div>

        <!--Bottom-->
        <div class="dashboardCard w-full h-full h-min-[400px]">
          <h3>Additional views</h3>
          <div ref="barDom" class="w-full h-full flex flex-col justify-center content-center items-center"></div>
          <!--

          -->
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
.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>
