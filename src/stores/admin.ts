import { defineStore } from "pinia";
import { ref } from 'vue';
import { ApiWrapper } from '@/composables/ApiWrapper';
import type { Bio } from "@/types/Bio";
import type { InboxMessage } from "@/types/InboxMessage";


export interface UserForAdmin {
  _id: string,
  displayName: string,
  email:string,
  role: string,
  validations: [],
  avatar?: string
  createdAt: string,
}
export const useAdminStore =  defineStore('admin', ()=>{


  const bios = ref<Bio[]>([]);
  const users = ref<UserForAdmin[]>([]);

  async function fetchAllUsers() {
    try{
      const res = await ApiWrapper.get<UserForAdmin[]>('admin/users', {});
      users.value = res.data;
      return res.data;
    }catch(error){
      console.error("Failed to fetch users:", error);
      return [];
    }
  }

  async function deleteUser(userId: string) {
    try {
      const res = await ApiWrapper.delete(`admin/users/${userId}`, null);
      fetchAllUsers();
      return res.data;
    } catch (error) {
      console.error('Failed to delete user:', error);
      return null;
    }
  }

  async function getUserBios(userId: string) {
    try{
      const res = await ApiWrapper.get<Bio>(`admin/users/${userId}/bios`, {});
      console.log("users bios:", res.data)
      return res.data;

    }catch(error: any){
      console.error("Failed to load bios for the user:", error)
      return null;
    }
  }

  async function deleteBio(bioId: string) {
    try{
      const res = await ApiWrapper.delete<Bio>(`admin/bios/${bioId}`,null);
      // Update the bios array after deleting a bio
      await fetchAllBios();
      return res.data;
    }catch(error: any){
      console.error("Failed to delete bio", error)
      return null;
    }
  }

  async function fetchAllBios() {
    try{
      const res = await ApiWrapper.get<Bio[]>('admin/bios', {});
      bios.value = res.data;
      return res.data;
    }catch(error){
      console.error("Failed to fetch users:", error);
      return [];
    }
  }

  async function sendMassageToUser(userId: string, title: string, text: string) {
    try{
      const res = await ApiWrapper.post<InboxMessage>(`admin/users/${userId}/messages`,{userId, title, text})
      return res.data
    }catch(error: any){
      console.error('Error while sending message:', error)
    }
  }

  async function verifyUser(userId: string) {
    try{
      const res = await ApiWrapper.get<any>(`admin/users/${userId}/verify`,null);
      return res.data;
    }catch(error){
      console.error("Failed to verify bio", error)
      return null;
    }
  }

  return{
    users,
    bios,
    fetchAllUsers,
    deleteUser,
    getUserBios,
    deleteBio,
    fetchAllBios,
    sendMassageToUser,
    verifyUser
  }
})
