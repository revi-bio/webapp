import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ApiWrapper } from '@/composables/ApiWrapper';
import type { Bio } from '@/types/Bio';

export const useBioStore = defineStore('bios', () => {
  const bios = ref<Bio[]>([]);
  const currentHandle = ref<string | null>(null);
  async function fetchBios(): Promise<unknown> {
    try {
      const response = await ApiWrapper.get<Bio[]>('bio', {});
      bios.value = response.data;
      return response.data;
    } catch (error) {
      console.error('Failed to fetch bios:', error);
      return [];
    }
  }

  function getBios(): Bio[] {
    return bios.value;
  }

  function getBioByHandle(handle: string): Bio | undefined {
    return bios.value.find((bio) => bio.handle === handle);
  }

  function getFirstBio(): Bio | undefined {
    return bios.value.length > 0 ? bios.value[0] : undefined;
  }

  function getBioPfpUrl(handle: string): string | null {
    const bio = getBioByHandle(handle);
    return bio?.avatar ? `${import.meta.env.VITE_API_BASE_URL}/file/${bio?.avatar}` : null;
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
      console.error('Failed to create bio:', error);
      return null;
    }
  }

  async function deleteBio(handle: string) {
    try {
      const response = await ApiWrapper.delete<Bio>(`bio/${handle}`, null);
      fetchBios();
      return response.data;
    } catch (error) {
      console.error('Failed to delete bio:', error);
      return null;
    }
  }

  async function uploadBioPfp(file: File, handle: string) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      console.log('File being uploaded:', file.name, file.size, file.type);

      const response = await ApiWrapper.patch(`bio/${handle}/bioPfp`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response);

      await fetchBios();
      return response.data;
    } catch (error) {
      console.error('Failed to upload profile picture. Error details:', error);
      throw error;
    }
  }

  async function deleteBioPfp(handle: string) {
    try {
      await ApiWrapper.delete(`bio/${handle}/bioPfp`, null);
      await fetchBios();
    } catch (error) {
      console.error('Failed to delete profile picture:', error);
      throw error;
    }
  }

  function setCurrentHandle(handle: string) {
    currentHandle.value = handle;
  }

  function getCurrentHandle(): string | null {
    return currentHandle.value;
  }

  return {
    bios,
    fetchBios,
    getBios,
    getBioByHandle,
    getFirstBio,
    getBioPfpUrl,
    createBio,
    deleteBio,
    uploadBioPfp,
    deleteBioPfp,
    getCurrentHandle,
    setCurrentHandle
  };
});
