<script lang="ts" setup>
import { ref } from 'vue';
import Button from './Button.vue';
import PicBox from './PicBox.vue';
import Dropdown from './Dropdown.vue';

const children = ref<number[]>([]);
const layout = ref('row');

function addComponent() {
  children.value.push(1);
}

function Row() {
  layout.value = 'row';
}

function Col() {
  layout.value = 'column';
}

</script>

<template>
    <div class="flex flex-col bg-zinc-500/30 mt-4 rounded-lg w-full h-full">
        <Button size="normal" rank="primary" iconPosition="only" iconType="add" @click="addComponent"></Button>
        <Dropdown
            type="normal"
            baseText="Choose one"
            align="end"
            :items="[
            { name: 'Row', event:Row },
            { name: 'Column', event:Col },
            ]"
        />
        <div class="flex flex-row justify-center w-full h-full gap-4">
            <PicBox v-for="(item, index) in children" :key="index"></PicBox>
        </div>
    </div>
</template>     