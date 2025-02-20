<script lang="ts" setup>
import { onMounted, nextTick, ref, computed } from 'vue';
import Button from '@/components/global/Button.vue';
import Dropdown from '@/components/global/Dropdown.vue';
import * as echarts from 'echarts';

var colorPalette = ['#fafafa', '#f43f5e', '#717179'];
const chartDom = ref<HTMLElement | null>(null);
const barDom = ref<HTMLElement | null>(null);
const barInstance = ref<echarts.ECharts | null>(null);
const chartInstance = ref<echarts.ECharts | null>(null);

const rawVisitorData = ref([
  { value: 420, country: 'Germany' },
  { value: 210, country: 'Brazil' },
  { value: 69, country: 'Hungary' },
]);

const visitorData = computed(() =>
  rawVisitorData.value.map((item) => ({
    value: item.value,
    name: `${item.country} - ${item.value}`,
  }))
);

onMounted(() => {
  nextTick(() => {
    if (chartDom.value) {
      chartInstance.value = echarts.init(chartDom.value);

      const option = {
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: { show: false },
            data: visitorData.value,
            color: colorPalette
          }
        ]
      };


      chartInstance.value.setOption(option);
    }
    if(barDom.value){
      barInstance.value = echarts.init(barDom.value);

      
      const bar = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      };

      setTimeout(() => {
        barInstance.value?.setOption(bar);
      }, 100);
    }
  });
});
</script>

<template>
  <div class="flex flex-col justify-center content-center items-center p-6 gap-2 w-full h-full">
    <span class="flex flex-row justify-end content-center items-center w-full gap-4">
      <Button text="Export" size="small" rank="primary" icon-position="left" icon-type="check"></Button>
      <Dropdown
        type="normal"
        baseText="Choose one"
        align="center"
        :items="[ { name: 'Last 30 days' }, { name: 'Last 60 days' }, { name: 'Last 3 months' }, { name: 'Last 6 months' } ]"
      />
    </span>
    <div class="flex flex-row justify-start content-center items-center w-full h-full gap-4">

      <!--Smaller left side-->
      <div class="flex flex-col justify-center content-center items-center w-2/6 h-full gap-4">

        <!--Most viewed-->
        <div class="dashboardCard h-[130%] w-full gap-4">
          <h3>Most viewed bio pages</h3>
          <div class="text-lg flex flex-row justify-between content-center items-center bg-zinc-700 w-full rounded-lg overflow-hidden pr-4">

            <div class="flex flex-row justify-start content-center items-center gap-2">
              <span class="w-[5rem] h-[5rem] bg-indigo-700 rounded-lg">
                <!--profilePic-->
              </span>
              <span class="flex flex-col justify-center content-center items-start">
                <h3 class="text-sm font-[300]">@lakatosdezso</h3>
                <h3>Lakatok dezso</h3>
              </span>

            </div>
            <h3 class="text-2xl">#1</h3>

          </div>

        </div>

        <!--Recently edited-->
        <div class="dashboardCard h-full w-full">
          <h3>Recently edited</h3>
        </div>

        <!--Referral distribution-->
        <div class="dashboardCard h-1/2 w-full">
          <h3>Referral distribution</h3>
        </div>

        <!--Platform distribution-->
        <div class="dashboardCard h-1/2 w-full">
          <h3>Platform distribution</h3>
        </div>

      </div>

      <!--Bigger right side-->
      <div class="flex flex-col justify-center content-center items-center w-4/6 h-full gap-4">
        <!--Top-->
        <div class="flex flex-row w-full h-2/5 gap-4">

          <span class="dashboardCard w-full h-full">
            <h3>Views gained</h3>
          </span>

          <span class="dashboardCard w-full h-full">
            <h3>Links/Socials clicked</h3>
          </span>

          <span class="dashboardCard w-full h-full">
            <h3>Avarage time on-site</h3>
          </span>

          <span class="dashboardCard w-full h-full">
            <h3>Guest-Click ratio</h3>
          </span>

        </div>

        <!--Middle-->
        <div class="flex flex-row gap-4 w-full h-full">

          <div class="dashboardCard w-5/12 h-full" >
            <h3 class="">Most visitors per countries</h3>
            <div ref="chartDom" class="w-full h-full flex items-center justify-center"></div>
            <span class="w-full flex flex-row justify-center content-center items-center gap-4">
              <h3
                v-for="(visitor, index) in visitorData"
                :key="visitor.name"
                :style="{ color: colorPalette[index % colorPalette.length] }"
              >
                {{ visitor.name }}
              </h3>

            </span>
          </div>

          <div class="dashboardCard w-7/12 h-full">
            <h3>Most used links</h3>
          </div>

        </div>

        <!--Bottom-->
        <div class="dashboardCard w-full h-full">
            <h3>Additional views</h3>
            <div ref="barDom" class="w-full h-full"> </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style>
.dashboardCard{
  @apply bg-zinc-700/50 rounded-2xl p-4 flex flex-col justify-start content-start items-start  text-xl
}

</style>
