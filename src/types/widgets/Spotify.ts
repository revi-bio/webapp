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
      playlistUrl?: string;
    };
  }