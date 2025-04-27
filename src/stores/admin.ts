import { defineStore } from "pinia";
import { ref } from 'vue';
import { ApiWrapper } from '@/composables/ApiWrapper';
import type { Bio } from "@/types/Bio";
import type { User } from "@/types/User";

export const useAdminStore =  defineStore('admin', ()=>{
  const bios = ref<Bio[]>([]);
  const users = ref<User[]>([]);

  async function fetchAllUsers() {
    try{
      const res = await ApiWrapper.get<User[]>('admin/users', {});
      users.value = res.data;
      return res.data;
    }catch(error){
      console.error("Failed to fetch users:", error);
      return [];
    }
  }

  async function deleteUser(userId: string) {
    try {
      const res = await ApiWrapper.delete<Bio>(`admin/users/${userId}`, null);
      fetchAllUsers();
      return res.data;
    } catch (error) {
      console.error('Failed to delete bio:', error);
      return null;
    }
  }

  async function fetchAllBios() {
    try{
      const res = await ApiWrapper.get<User[]>('admin/bios', {});
      users.value = res.data;
      return res.data;
    }catch(error){
      console.error("Failed to fetch users:", error);
      return [];
    }
  }

  return{
    users,
    bios,
    fetchAllUsers,
    deleteUser,
    fetchAllBios
  }
})
