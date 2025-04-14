import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import type { Spotify, TrackItem } from '@/types/widgets/Spotify';

export const useSpotifyStore = defineStore('spotify', () => {
  const TOKENURL = 'https://accounts.spotify.com/api/token';
  const clientId = '44583529b1f04c2b89fb776bc52f9929'; // ENV
  const clientSecret = 'f425ba741b7a4a26bf7ec592f3fff245'; // ENV

  const spotifyData = ref<Spotify>({
    accessToken: '',
    data: undefined
  });

  const tokenExpiresAt = ref<number>(0);
  const error = ref<string | null>(null);

  const hasValidToken = computed(() => {
    return !!spotifyData.value.accessToken && Date.now() < tokenExpiresAt.value;
  });

  function setToken(token: string, expiresAt: number) {
    spotifyData.value.accessToken = token;
    tokenExpiresAt.value = expiresAt;
  }

  async function getAccessToken(): Promise<string> {
    if (hasValidToken.value) {
      return spotifyData.value.accessToken;
    }

    try {
      const credentials = btoa(`${clientId}:${clientSecret}`);
      const response = await axios.post(
        TOKENURL,
        new URLSearchParams({ grant_type: 'client_credentials' }),
        {
          headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token, expires_in } = response.data;
      setToken(access_token, Date.now() + expires_in * 1000);

      return access_token;
    } catch (err) {
      const errorMsg = 'Failed to get Spotify access token';
      error.value = errorMsg;
      console.error(errorMsg, err);
      throw new Error(errorMsg);
    }
  }

  function setPlaylistData(data: Spotify['data']) {
    spotifyData.value.data = data;
  }

  async function getPlaylistTracks(playlistId: string): Promise<{ items: TrackItem[] } | null> {
    if (!playlistId) {
      error.value = 'Hiányzó playlist ID';
      return null;
    }

    try {
      const { SpotifyApi } = await import('@/composables/widgets/SpotifyApi');

      const response = await SpotifyApi.get(`playlists/${playlistId}/tracks`, {
        params: {
          fields: 'items(track(name,artists(name,external_urls),album(images),external_urls))',
        }
      });

      return { items: response.data.items };
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
      const { SpotifyApi } = await import('@/composables/widgets/SpotifyApi');

      const response = await SpotifyApi.get(`playlists/${playlistId}`, {
        fields: 'id,name,images,owner(display_name,external_urls),external_urls'
      });

      const data = response.data;

      const tracksData = await getPlaylistTracks(playlistId);

      const playlistData: Spotify['data'] = {
        playlistId: data.id,
        playlistName: data.name,
        image: data.images[0]?.url || '',
        owner: {
          displayName: data.owner.display_name,
          href: data.owner.external_urls.spotify
        },
        playlistUrl: data.external_urls.spotify,
        tracks: tracksData || undefined
      };

      setPlaylistData(playlistData);

      return playlistData;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error while fetching spotify data:', err);
      return null;
    }
  }

  async function refreshSpotifyData(playlistId: string) {
    return await getPlaylist(playlistId);
  }

  return {
    spotifyData,
    error,
    hasValidToken,
    setToken,
    getAccessToken,
    setPlaylistData,
    getPlaylist,
    getPlaylistTracks,
    refreshSpotifyData
  };
});