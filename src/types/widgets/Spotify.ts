import { Widget, type SettingDefinition, type WidgetInitializer } from '../Widget';

export const SpotifySettingDefinitions: SettingDefinition[] = [
  {
    name: 'playlistId',
    type: 'string',
  },
  {
    name: 'showArtwork',
    type: 'boolean',
  },
  {
    name: 'displayLimit',
    type: 'number',
  },
  {
    name: 'showOwner',
    type: 'boolean',
  },
  {
    name: 'showPlaylistName',
    type: 'boolean',
  },
  {
    name: 'showTrackArtist',
    type: 'boolean',
  },
];

export class SpotifyWidget extends Widget {
  constructor(options: Omit<Partial<WidgetInitializer>, 'type'>) {
    super({
      type: 'spotify',
      specificSettings: {
        playlistId: '',
        showArtwork: true,
        displayLimit: 10,
        showOwner:true,
        showPlaylistName: true,
        showTrackArtist:  true,
      },
      genericSettings: options.genericSettings ?? {},
    });
  }
}
