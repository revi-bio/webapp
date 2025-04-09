<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue';
import { useSpotifyStore } from '@/stores/widgets/spotify';
import { SpotifyApi } from '@/composables/widgets/SpotifyApi';

const icons = import.meta.glob('../../assets/LinkIcons/spotify-fill-svgrepo-com.svg', { eager: true, as: 'raw' });

const logo = computed(() => {
  const iconPath = Object.values(icons)[0];
  if (!iconPath) return null;

  return iconPath
    .replace(/<svg/, '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet"')
    .replace(/fill="[^"]*"/g, 'fill="#1DB954"')
    .replace(/stroke="[^"]*"/g, 'stroke="#1DB954"');
});

const spotifyStore = useSpotifyStore();
const playlistId = "6el3eI1j7EpF2xNpgxUtGj";

watch(() => spotifyStore.spotifyData, (newVal) => {
  console.log('Spotify data changed:', newVal);
}, { deep: true });


watch(() => spotifyStore.error, (error) => {
  if (error) {
    console.error('Spotify error:', error);
  }
});

const getPlaylistForWidget = async () => {
  console.log('Requesting playlist data...');
  
  try {
    const token = await spotifyStore.getAccessToken();
    console.log('Got access token:', token.substring(0, 10) + '...');
    
    const playlistData = await spotifyStore.getPlaylist(playlistId);
    console.log('Playlist data received:', playlistData);
  } catch (err) {
    console.error('Error fetching Spotify data:', err);
  }
}

</script>

<template>
  <div class="w-full py-5 px-2 gap-2 
  flex flex-row justify-start content-center items-center rounded-lg 
  border border-zinc-100/30 bg-zinc-200/10 hover:bg-zinc-200/20 active:bg-zinc-200/30 duration-200"
    @click.prevent="getPlaylistForWidget">
    
    <div class="w-20 h-20" v-html="logo"></div>
    
    <div class="flex flex-col">
      <h3 class="text-lg">Spotify playlist</h3>
      
      
      <div v-if="spotifyStore.error" class="text-sm text-red-500">
        {{ spotifyStore.error }}
      </div>
      
      <div v-else-if="spotifyStore.spotifyData.data" class="text-sm">
        {{ spotifyStore.spotifyData.data.playlistName }}
      </div>
    </div>
  </div>
</template>