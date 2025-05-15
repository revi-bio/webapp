<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useSpotifyStore } from '@/stores/widgets/spotify';
import Button from '@/components/global/Button.vue';
import Icon from '@/components/global/Icon.vue';
import LoadingCircle from '@/components/global/LoadingCircle.vue';
import type { Widget } from '@/types/Widget';


const props = defineProps<{
  data: Widget;
}>();

const spotifyStore = useSpotifyStore();
const isLoading = ref(false);
const error = ref<string>('');

const playlistData = computed(() => {
  return props.data.specificSettings['playlistId'] && spotifyStore.spotifyData.data?.playlistId === props.data.specificSettings['playlistId']
    ? spotifyStore.spotifyData.data
    : null;
});

const isLoadingData = computed(() => {
  return isLoading.value;
});

let playListNameColorStyle = computed(() => {
  try {
    const color = props.data.specificSettings['playListNameColor'];
    if (color && typeof color === 'object' && 'hue' in color) {
      return `color: hsla(${color.hue}, ${color.saturation}%, ${color.value}%, ${color.opacity});`;
    } else {
      return 'color: var(--color-zinc-200);';
    }
  } catch (err) {
    return 'color: var(--color-zinc-200);';
  }
});

let playListOwnerColorStyle = computed(() => {
  try {
    const color = props.data.specificSettings['playListOwnerColor'];
    if (color && typeof color === 'object' && 'hue' in color) {
      return `color: hsla(${color.hue}, ${color.saturation}%, ${color.value}%, ${color.opacity});`;
    } else {
      return 'color: var(--color-zinc-200);';
    }
  } catch (err) {
    return 'color: var(--color-zinc-200);';
  }
});

onMounted(async () => {
  if (props.data.specificSettings['playlistId']) {
    await fetchPlaylistData();
  }
});

watch(() => props.data.specificSettings['playlistId'], async (newId) => {
  if (newId) {
    await fetchPlaylistData();
  }
});

async function fetchPlaylistData() {
  if (!props.data.specificSettings['playlistId']) return;

  isLoading.value = true;
  error.value = '';

  try {
    await spotifyStore.getPlaylist(props.data.specificSettings['playlistId']);

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
  const limit = props.data.specificSettings['displayLimit'] || 10;
  return playlistData.value.tracks.items.slice(0, limit);
});

async function refreshPlaylist() {
  if (!props.data.specificSettings['playlistId']) return;

  isLoading.value = true;
  error.value = '';

  try {
    await spotifyStore.refreshSpotifyData(props.data.specificSettings['playlistId']);
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

      <div v-else-if="isLoadingData" class="flex justify-center content-center items-center py-8">
        <LoadingCircle/>
      </div>

      <div v-else-if="!props.data.specificSettings['playlistId']" class="text-center text-xl gap-2 flex flex-col justify-center content-center items-center opacity-70 ">
        <Icon type="library_music"/>
        <h3 class="mb-4">No Spotify playlist chosen</h3>
      </div>

      <div v-else-if="!playlistData && !isLoadingData" class="text-center text-xl gap-2 flex flex-col justify-center content-center items-center opacity-70 ">
        <Icon type="error"/>
        <h3 class="mb-4">Failed to load playlist data</h3>
        <Button text="Retry" primary small iconRight icon="refresh" @click="fetchPlaylistData">
        </Button>
      </div>

      <!-- Playlist content -->
      <div v-else-if="playlistData" class="flex flex-col justify-start content-start items-start gap-4">
        <!-- Playlist header -->
        <div class="flex flex-row justify-start content-center items-center gap-4">
          <!-- Playlist artwork -->
          <img
            v-if="props.data.specificSettings['showArtwork'] && playlistData.image"
            :src="playlistData.image"
            :alt="playlistData.playlistName"
            class="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />

          <div class="flex flex-col justify-start content-start items-start">
            <!-- Playlist name -->
            <h3 v-if="props.data.specificSettings['showPlaylistName']" class="text-lg" :style="playListNameColorStyle">
              {{ playlistData.playlistName }}
            </h3>

            <!-- Playlist owner -->
            <h3 v-if="props.data.specificSettings['showOwner'] && playlistData.owner" class="text-sm" :style="playListOwnerColorStyle">
              by {{ playlistData.owner.displayName }}
            </h3>
          </div>
        </div>

        <!-- Track list -->
        <div class="flex flex-col justify-start content-start items-start gap-2 overflow-y-scroll max-h-[200px] w-full">
          <div
            v-for="(item, index) in displayedTracks"
            :key="index"
            class="flex items-center gap-3 p-2 rounded-lg transition-colors group"
          >
            <!-- Track artwork -->
            <img
              v-if="props.data.specificSettings['showArtwork'] && item.track.album?.images?.[0]?.url"
              :src="item.track.album.images[0].url"
              :alt="item.track.name"
              class="w-10 h-10 rounded object-cover flex-shrink-0"
            />

            <div class="flex-1 min-w-0">
              <!-- Track name -->
              <p class="font-medium truncate">{{ item.track.name }}</p>

              <!-- Artist names -->
              <p v-if="props.data.specificSettings['showTrackArtist'] && item.track.artists" class="text-sm opacity-70 truncate">
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
