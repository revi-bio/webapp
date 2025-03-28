import { defineStore } from "pinia";
import { ref } from "vue";
import { ApiWrapper } from "@/composables/ApiWrapper";
import type { Bio } from "@/types/Bio";

export const useBioStore = defineStore('bios', () => {
    const bios = ref<Bio[]>([]); 

    async function fetchBios() {
        try {
            const response = await ApiWrapper.get<Bio[]>('bio', {});
            bios.value = response.data;
        } catch (error) {
            console.error("Failed to fetch bios:", error);
        }
    }

    function getBios(): Bio[] {
        return bios.value;
    }

    async function createBio(name: string, handle: string) {
        try {
            const newBio: Bio = {
                name,
                handle,
                views: 0,
                widgets: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            const response = await ApiWrapper.post<Bio>('bio', newBio);
            bios.value.push(response.data);
            return response.data;
        } catch (error) {
            console.error("Failed to create bio:", error);
            return null;
        }
    }

    return { bios, fetchBios, getBios, createBio };
});
