<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useSpotifyStore } from '@/stores/widgets/spotify';
import { SpotifyApi } from '@/composables/widgets/SpotifyApi';
import type { Widget } from '@/types/Widget';
import type { Spotify } from '@/types/widgets/Spotify';

const props = defineProps<{
  data:Widget;
  isUsed: boolean;
}>();

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

const playlistData = ref<Spotify['data'] | null>(null);

const getPlaylistForWidget = async () => {
  try {
    const token = await spotifyStore.getAccessToken();
    
    const playlist = await spotifyStore.getPlaylist(playlistId);
    playlistData.value = playlist ? playlist : null;
  } catch (err) {
    console.error('Error fetching Spotify data:', err);
    playlistData.value = null;
  }
}

</script>

<template>
  <div v-if="!isUsed" class="w-full py-5 px-2 gap-2 
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

  <a v-else :href="spotifyStore.spotifyData.data?.playlistUrl" target="_blank">
  <div class="flex flex-col justify-start content-start items-start w-full bg-zinc-950">
    <div class="w-full h-full p-4 gap-2 flex flex-row flex-start content-start items-start ">
      <img :src="spotifyStore.spotifyData.data?.image" alt="playlist_cover" class="w-24 h-24">
      <div class="gap-2 w-full h-full flex flex-col justify-center content-start items-start text-zinc-100">
        <h3 class="text-lg">{{ spotifyStore.spotifyData.data?.playlistName}}</h3>
        <h3 class="text-base">{{ spotifyStore.spotifyData.data?.owner?.displayName }}</h3>
      </div>
    </div>
    <div 
      v-for="(item, index) in spotifyStore.spotifyData.data?.tracks?.items.slice(0,5)" 
      :key="index" 
      class="flex flex-row justify-start content-center items-center w-full p-2 gap-4 border-zinc-800 hover:bg-zinc-900"
    >
      <img 
        :src="item.track.album.images[0]?.url" 
        alt="Track cover" 
        class="w-12 h-12"
      >
      <div class="flex flex-col">
        <a 
          :href="item.track.external_urls.spotify" 
          target="_blank" 
          class="text-white hover:underline"
        >
          {{ item.track.name }}
        </a>
        <div class="text-zinc-400 text-sm">
          <a 
            v-for="(artist, artistIndex) in item.track.artists" 
            :key="artistIndex"
            :href="artist.external_urls.spotify"
            target="_blank"
            class="hover:underline"
          >
            {{ artist.name }}{{ artistIndex < item.track.artists.length - 1 ? ', ' : '' }}
          </a>
        </div>
      </div>
    </div>
  </div>
</a>

</template>