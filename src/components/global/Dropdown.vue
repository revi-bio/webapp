<script lang="ts" setup>
import Icon from './Icon.vue';



defineProps<{
  text?: string;
  type: "iconOnly" | "normal";
  items: [];
  align: "center" | "left" | "right"
}>();
</script>

<template>
    <div v-if="align === 'center' " class="flex flex-col justify-center content-center items-center">
        <span v-if="type === 'iconOnly'" class="dropdown" >
            
        </span>
        <span v-else class="dropdown">
            <Icon type="arrow_drop_down"></Icon>
            <h3>{{ text }}</h3>
        </span>
        <span class="flex flex-col justify-center content-center items-center ">
            <!--Items of dropdown-->
        </span>
    </div>
    <div v-else-if="align === 'left' " class="flex flex-col justify-center content-start items-start">
        <span v-if="type === 'iconOnly'" class="dropdown" >
            
        </span>
        <span v-else class="dropdown">
            <Icon type="arrow_drop_down"></Icon>
            <h3>{{ text }}</h3>
        </span>
        <span class="flex flex-col justify-center content-center items-center p-2">
            <!--Items of dropdown-->
        </span>
    </div>
    <div v-else class="flex flex-col justify-center content-end items-end">
        <span v-if="type === 'iconOnly'" class="dropdown" >
            
        </span>
        <span v-else class="dropdown">
            <Icon type="arrow_drop_down"></Icon>
            <h3>{{ text }}</h3>
        </span>
        <span class="flex flex-col justify-center content-center items-center p-2">
            <!--Items of dropdown-->
        </span>
    </div>

</template>

<style lang="scss" scoped>
.dropdown{
    @apply flex flex-row px-3 justify-between content-center items-center gap-2 bg-zinc-600
}
</style>