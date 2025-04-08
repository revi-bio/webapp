import { defineStore } from "pinia";
import { ref } from "vue";
import { ApiWrapper } from "@/composables/ApiWrapper";
import type { Bio } from "@/types/Bio";

export const useBioStore = defineStore('bios', () => {
    const bios = ref<Bio[]>([]);
    const fileServerUrl = 'http://65.87.7.245/file/';

    async function fetchBios() {
        try {
            ;
            const response = await ApiWrapper.get<Bio[]>('bio', {});
            bios.value = response.data;
            return response.data;
        } catch (error) {
            console.error("Failed to fetch bios:", error);
            return [];
        } finally {
            ;
        }
    }

    function getBios(): Bio[] {
        return bios.value;
    }

    function getBioByHandle(handle: string): Bio | undefined {
        return bios.value.find(bio => bio.handle === handle);
    }

    function getFirstBio(): Bio | undefined {
        return bios.value.length > 0 ? bios.value[0] : undefined;
    }

    function getBioPfpPath(handle?: string): string | null {

        if (handle) {
            const bio = getBioByHandle(handle);
            return bio?.avatar || null;
        }


        const firstBio = getFirstBio();
        return firstBio?.avatar || null;
    }

    function getBioPfpUrl(handle?: string): string | null {
        const path = getBioPfpPath(handle);
        return path ? `${fileServerUrl}${path}` : null;
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

    async function deleteBio(handle: string) {
        try {
            const response = await ApiWrapper.delete<Bio>(`bio/${handle}`, null);
            fetchBios();
            return response.data;
        } catch (error) {
            console.error("Failed to delete bio:", error);
            return null;
        }
    }



    async function uploadBioPfp(file: File, handle?: string) {
      try {
          ;

          let bioHandle: string;
          if (handle) {
              bioHandle = handle;
          } else if (bios.value.length > 0) {
              bioHandle = bios.value[0].handle;
          } else {
              throw new Error("No bio handle provided and no bios available");
          }

          console.log(`Uploading profile picture for bio: ${bioHandle}`);


          const formData = new FormData();
          formData.append('file', file);


          console.log('File being uploaded:', file.name, file.size, file.type);


          const response = await ApiWrapper.patch(`bio/${bioHandle}/bioPfp`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });

          console.log('Upload response:', response);


          await fetchBios();

          return response.data;
      } catch (error) {
          console.error('Failed to upload profile picture. Error details:', error);
          throw error;
      }
    }

    async function deleteBioPfp(handle?: string) {
        try {
            ;


            let bioHandle: string;

            if (handle) {

                bioHandle = handle;
            } else if (bios.value.length > 0) {

                bioHandle = bios.value[0].handle;
            } else {
                throw new Error("No bio handle provided and no bios available");
            }

            await ApiWrapper.delete(`bio/${bioHandle}/bioPfp`, null);

            await fetchBios();
        } catch (error) {
            console.error('Failed to delete profile picture:', error);
            throw error;
        } finally {
            ;
        }
    }

    return {
        bios,
        fetchBios,
        getBios,
        getBioByHandle,
        getFirstBio,
        getBioPfpPath,
        getBioPfpUrl,
        createBio,
        deleteBio,
        uploadBioPfp,
        deleteBioPfp
    };
});
