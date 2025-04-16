import type { SettingDefinition } from '../Widget';

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

export const SpotifySettingDefinitions: SettingDefinition[] = [
  {
    name: 'playlistId',
    type: 'string',
  },
  {
    name: 'showArtwork',
    type: 'boolean',
  },
];
