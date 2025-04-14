<script lang="ts" setup>
    import type { Widget } from '@/types/Widget';
    import {marked} from 'marked';

    defineProps<{
        data:Widget
    }>();

</script>
<template>
    <div :class="`flex flex-col justify-start content-${data.specificSettings['align']} items-${data.specificSettings['align']} gap-4 p-4`">
        <h3 :class="`text-2xl font-bold text-${data.genericSettings['textColor']}`">{{ data.specificSettings['title'] }}</h3>
        <p :class="`text-base text-${data.genericSettings['textColor']}`">{{ data.specificSettings['text'] }}</p>
    </div>
</template>
