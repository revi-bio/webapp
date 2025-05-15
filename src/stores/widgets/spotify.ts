import { ref } from 'vue';
import { defineStore } from 'pinia';
import { ApiWrapper } from '@/composables/ApiWrapper';


export interface TrackItem {
  track: {
    name: string;
    artists: {
      name: string;
      external_urls: {
        spotify: string;
      };
    }[];
    album: {
      images: {
        url: string;
        height: number;
        width: number;
      }[];
    };
    external_urls: {
      spotify: string;
    };
  };
}

export interface Spotify {
  accessToken: string;
  data?: {
    playlistId: string;
    image: string;
    playlistName: string;
    owner?: {
      href: string;
      displayName: string;
    };
    tracks?: {
      items: TrackItem[];
    };
    playlistUrl?: string;
  };
}

export const useSpotifyStore = defineStore('spotify', () => {
  const spotifyData = ref<Spotify>({
    accessToken: '',
    data: undefined,
  });

  const error = ref<string | null>(null);

  function setPlaylistData(data: Spotify['data']) {
    spotifyData.value.data = data;
  }

  async function getPlaylistTracks(playlistId: string): Promise<{ items: TrackItem[] } | null> {
    if (!playlistId) {
      error.value = 'Missing playlist ID';
      return null;
    }

    error.value = null;

    try {
      const response = await ApiWrapper.get(`spotify/playlist/${playlistId}/tracks`, {});
      return response.data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error while fetching playlist tracks:', err);
      return null;
    }
  }

  async function getPlaylist(playlistId: string) {
    if (!playlistId) {
      error.value = 'Hiányzó playlist ID';
      return null;
    }

    error.value = null;

    try {
      const response = await ApiWrapper.get(`spotify/playlist/${playlistId}`, {});
      const playlistData = response.data;

      setPlaylistData(playlistData);
      return playlistData;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error while fetching spotify data:', err);
      return null;
    }
  }

  async function refreshSpotifyData(playlistId: string) {
    error.value = null;

    try {
      const response = await ApiWrapper.get(`spotify/playlist/${playlistId}`, {
        params: { refresh: 'true' }
      });

      const playlistData = response.data;
      setPlaylistData(playlistData);
      return playlistData;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error while refreshing spotify data:', err);
      return null;
    }
  }

  return {
    spotifyData,
    error,
    setPlaylistData,
    getPlaylist,
    getPlaylistTracks,
    refreshSpotifyData,
  };
});
