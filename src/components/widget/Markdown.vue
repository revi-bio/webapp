<script lang="ts" setup>
    import type { Widget } from '@/types/Widget';
    import {marked} from 'marked';

const props = defineProps<{
        data:Widget
    }>();

    const text = marked.parse(props.data.specificSettings['text'])
</script>
<template>
    <div :class="`flex flex-col justify-start content-${data.specificSettings['align']} items-${data.specificSettings['align']} gap-4 p-4 bg-${data.genericSettings['background']}`">
        <h3 :class="`text-2xl font-bold text-${data.genericSettings['textColor']}`">{{ data.specificSettings['title'] }}</h3>
        <div :class="`text-base text-${data.genericSettings['textColor']}`" v-html="text"></div>
    </div>
</template>
