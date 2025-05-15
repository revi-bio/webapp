<script lang="ts" setup>
import Button from '@/components/global/Button.vue';
import Dropdown from '@/components/global/Dropdown.vue';
import LinkIcon from '@/components/global/LinkIcon.vue';
import * as echarts from 'echarts';
import { computed, nextTick, onMounted, ref, type Ref } from 'vue';
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

const chartDom = ref<HTMLElement | null>(null);
const barDom = ref<HTMLElement | null>(null);
const barInstance = ref<echarts.ECharts | null>(null);
const chartInstance = ref<echarts.ECharts | null>(null);

const visitorData = computed(() => {
  if (!countries.value) return [];

  return Array.from(countries.value.entries()).map(([country, value]) => ({
    value,
    name: `${country} - ${value}`,
  }));
});

//Bar (Additional views)
const barViewsData = ref<{ date: string; value: number }[]>([]);

const generateBarData = (days: number) => {
  if (views.value.length > 0) {
    const data = views.value.slice(-days).map((value, index) => ({
      date: (index + 1).toString(),
      value
    }));
    barViewsData.value = data;
  }
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

onMounted(async () => {
  try {
    info.value = (await ApiWrapper.get('statistics/info', {})).data;
    countries.value = new Map(Object.entries((await ApiWrapper.get('statistics/countries', {})).data));
    socials.value = new Map(Object.entries((await ApiWrapper.get('statistics/socials', {})).data));
    referralDistribution.value = new Map(Object.entries((await ApiWrapper.get('statistics/referral-distribution', {})).data));
    views.value = (await ApiWrapper.get('statistics/views', {})).data;

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
        barInstance.value?.resize();
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

window.addEventListener('resize', () => {
  barInstance.value?.resize();
});
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
            v-on:click="openBio(bio.handle)">
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
            v-on:click="openBio(bio.handle)">
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

          <div ref="chartDom" class="w-full h-full flex flex-col justify-center content-center items-center">
            <div class="w-full h-full flex justify-center items-center" v-if="!countries || chartInstance == null">
              <LoadingCircle class="relative" />
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
        <div class="dashboardCard w-full max-lg:min-h-[300px] h-full lg:row-span-3 lg:col-span-4">
          <h3>Most used links</h3>
          <div class="linkDom w-full h-full flex flex-row justify-center items-center pt-8 gap-2">
            <LoadingCircle v-if="!socials" />
            <span
              v-for="(link, id) in linkData"
              :key="id"
              class="w-full h-full flex flex-col justify-end content-center items-center gap-2 relative">
              <div class="w-full flex flex-col justify-center content-center items-center" style="height: 24px;">
                <LinkIcon :type="link.icon" color="zinc-100" width="50px"></LinkIcon>
              </div>
              <span
                class="bg-rose-500 rounded-lg w-1/3 lg:w-3/4 mt-8 self-center"
                :style="{ height: scaleHeight(link.value) + '%' }">
              </span>

              <h3 class="text-xs md:text-sm text-zinc-400">{{ link.value }}</h3>
            </span>
          </div>
        </div>

        <!--Bottom-->
        <div class="dashboardCard relative max-lg:min-h-[350px] h-[350px] w-full lg:col-span-8 lg:row-span-3">
          <h3>Additional views</h3>

          <div ref="barDom" class="w-full h-full flex justify-center content-center items-center">
            <div class=" w-full h-full flex justify-center items-center" v-if="!views.length || !barInstance  ">
              <LoadingCircle class="relative" />
            </div>
          </div>
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
