import type { Widget } from "@/types/Widget";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useBioStore = defineStore('editor', () => {
    const widgets: Ref<Widget[]> = ref([]);

    return { widgets };
});
