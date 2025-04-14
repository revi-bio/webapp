<script setup lang="ts">
import PicBox from '../global/PicBox.vue';
import Button from '../global/Button.vue';
import { ref } from 'vue';

const components = ref([1]);

</script>
<template>
    <PicBox v-for="(item, index) in components" :key="index"></PicBox>
</template>
