<script setup lang="ts">
import Checkbox from '@/components/global/Checkbox.vue';
import Radiobutton from '@/components/global/Radiobutton.vue';

</script>
<template>
    <div class="flex flex-col justify-center content-center items-start gap-5">
        
        
        <div class="flex flex-col justify-center content-center items-start gap-2 ">
            <h3 class="text-lg">Pronounce</h3>
            <Radiobutton
                text="Choose an option"
                :options="[
                    { key: 'Male', value: 'A' },
                    { key: 'Female', value: 'B' },
                    { key: 'They', value: 'C' },
                    { key: 'Cheese (cheddar)', value: 'D' },
                    { key: 'Other', value: 'E' },
                ]"
                direction="col"
                class="text-sm"
            />

        </div>
        <div class="flex flex-col justify-center content-center items-start gap-2 ">
            <h3 class="text-lg">Adult content</h3>
            <Checkbox text="Set my account to adult by default"></Checkbox>
        </div>
    </div>
</template>
