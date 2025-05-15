<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useSpotifyStore } from '@/stores/widgets/spotify';
import NewModal from '@/components/global/NewModal.vue';
import Button from '@/components/global/Button.vue';
import Input from '@/components/global/Input.vue';
import Icon from '@/components/global/Icon.vue';
import LoadingCircle from '@/components/global/LoadingCircle.vue';
import type { Widget } from '@/types/Widget';
import { SpotifyWidget } from '@/types/widgets/Spotify';

const props = defineProps<{
  data: Widget;
}>();

const spotifyStore = useSpotifyStore();
const isLoading = ref(false);
const error = ref<string>('');
const showModal = ref(false);
const tempPlaylistId = ref('');

const settings = computed(() => props.data.specificSettings as any);
const playlistData = computed(() => {
  return settings.value.playlistId && spotifyStore.spotifyData.data?.playlistId === settings.value.playlistId
    ? spotifyStore.spotifyData.data
    : null;
});


onMounted(async () => {
  if (settings.value.playlistId) {
    await fetchPlaylistData();
  }
});

watch(() => settings.value.playlistId, async (newId) => {
  if (newId) {
    await fetchPlaylistData();
  }
});

async function fetchPlaylistData() {
  if (!settings.value.playlistId) return;

  isLoading.value = true;
  error.value = '';

  try {
    await spotifyStore.getPlaylist(settings.value.playlistId);
    if (spotifyStore.error) {
      error.value = spotifyStore.error;
    }
  } catch (err) {
    error.value = 'Failed to load playlist';
    console.error('Error fetching playlist:', err);
  } finally {
    isLoading.value = false;
  }
}

const displayedTracks = computed(() => {
  if (!playlistData.value?.tracks?.items) return [];
  const limit = settings.value.displayLimit || 10;
  return playlistData.value.tracks.items.slice(0, limit);
});

async function refreshPlaylist() {
  if (!settings.value.playlistId) return;

  isLoading.value = true;
  error.value = '';

  try {
    await spotifyStore.refreshSpotifyData(settings.value.playlistId);
    if (spotifyStore.error) {
      error.value = spotifyStore.error;
    }
  } catch (err) {
    error.value = 'Failed to refresh playlist';
    console.error('Error refreshing playlist:', err);
  } finally {
    isLoading.value = false;
  }
}

</script>

<template>
  <div class="w-full">
    <div class="p-4">
      <!-- Error state -->
      <div v-if="error" class="text-red-500 text-center py-4 gap-2 flex flex-col justify-center content-center items-center">
        <Icon type="error" />
        <h3 class="mt-2">{{ error }}</h3>
        <Button text="Refresh" primary small iconRight icon="refresh" @click="refreshPlaylist" class="mt-3">
          <Icon type="error" />
          Try again
        </Button>
      </div>

      <div v-else-if="isLoading" class="flex justify-center content-center items-center py-8">
        <LoadingCircle/>
      </div>

      <div v-else-if="!settings.playlistId" class="text-center text-xl gap-2 flex flex-col justify-center content-center items-center opacity-70 ">
        <Icon type="library_music"/>
        <h3 class="mb-4">No Spotify playlist chosen</h3>
      </div>

      <!-- Playlist content -->
      <div v-else-if="playlistData" class="flex flex-col justify-start content-start items-start gap-4">
        <!-- Playlist header -->
        <div class="flex flex-row justify-start content-center items-center gap-4">
          <!-- Playlist artwork -->
          <img
            v-if="settings.showArtwork && playlistData.image"
            :src="playlistData.image"
            :alt="playlistData.playlistName"
            class="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />

          <div class="flex flex-col justify-start content-start items-start">
            <!-- Playlist name -->
            <h3 v-if="settings.showPlaylistName" class="text-lg">
              {{ playlistData.playlistName }}
            </h3>

            <!-- Playlist owner -->
            <p v-if="settings.showOwner && playlistData.owner" class="text-sm opacity-70">
              by {{ playlistData.owner.displayName }}
            </p>
          </div>
        </div>

        <!-- Track list -->
        <div class="flex flex-col justify-start content-start items-start gap-2">
          <div
            v-for="(item, index) in displayedTracks"
            :key="index"
            class="flex items-center gap-3 p-2 rounded-lg transition-colors group"
          >
            <!-- Track artwork -->
            <img
              v-if="settings.showArtwork && item.track.album?.images?.[0]?.url"
              :src="item.track.album.images[0].url"
              :alt="item.track.name"
              class="w-10 h-10 rounded object-cover flex-shrink-0"
            />

            <div class="flex-1 min-w-0">
              <!-- Track name -->
              <p class="font-medium truncate">{{ item.track.name }}</p>

              <!-- Artist names -->
              <p v-if="settings.showTrackArtist && item.track.artists" class="text-sm opacity-70 truncate">
                {{ item.track.artists.map(artist => artist.name).join(', ') }}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
