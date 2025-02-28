<script lang="ts" setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import Button from '@/components/global/Button.vue';

const route = useRoute()
const id = route.params.id

</script>

<template>
    <div class="flex justify-center items-center h-full w-full relative">
        Widgets
        
        <div class="absolute left-0 bottom-0 p-6 flex space-x-2">
            <Button icon-position="only" icon-type="info" size="small" rank="secondary"></Button> 
            <Button icon-position="only" icon-type="eye_tracking" size="small" rank="secondary"></Button> 
            <Button icon-position="right" icon-type="delete" size="small" rank="secondary" text="Clear all"></Button> 
        </div>
    </div>
</template>

<style>

</style>
