<script setup lang="ts">

//$emit('input', item.value)

defineProps<{
  text: string;
  options: {key: string, value:string | number}[];
  disabled?: boolean;
  icon?: string;
  direction: "col" | "row";
}>();

</script>

<template>
  <div>
    <h3 class="text-2xl">{{ text }}</h3>
      <div :class="direction === 'col' ? 'column' : 'row'" >
        <div class="flex flex-row" v-for="item in options" :value="item.value" :key="item.key">
        <div class="flex items-center flex-row hover:bg-zinc-700/50 rounded-md p-1" >
          <input class="h-4 w-4 m-1 order-1 text-rose-600 ring-rose-500 focus:ring-rose-500 focus:ring-2"
            :id="item.key+'_'+item.value" type="radio" :name="text" @change="$emit('selected', item.value)" :value="item.value"/>
          <label class="order-2 py-1 px-1 text-zinc-200"
            :for="item.key+'_'+item.value">{{ item.key }}</label>
        </div>
        </div>
      </div>
  </div>
</template>

<style>
  .row{
    @apply flex flex-row
  }
  .column{
    @apply flex flex-col
  }
</style>



