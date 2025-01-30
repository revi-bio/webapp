import { User } from "@/types/User";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export const useUserStore = defineStore('user', () => {
    const currentUser: Ref<User | null> = ref(null);
    const currentStatus: Ref<number | null> = ref(null);
  
});