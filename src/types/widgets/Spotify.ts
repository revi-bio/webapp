import { Widget, type SettingDefinition, type WidgetInitializer } from '../Widget';

export const SpotifySettingDefinitions: SettingDefinition[] = [
  {
    name: 'playlistId',
    type: 'string',
  },
  {
    name: 'playListNameColor',
    type:'color',
  },
  {
    name: 'playListOwnerColor',
    type:'color',
  },
  {
    name: 'trackNameColor',
    type:'color',
  },
  {
    name: 'trackArtistColor',
    type:'color',
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
  {
    name:'tracksRowAlign',
    type:'boolean'
  }
];

export class SpotifyWidget extends Widget {
  constructor(options: Omit<Partial<WidgetInitializer>, 'type'>) {
    super({
      type: 'spotify',
      specificSettings: {
        playlistId: '',
        playListNameColor: 'zinc-200',
        playListOwnerColor: 'zinc-200',
        trackNameColor:'zinc-200',
        trackOwnerColor:'zinc-300',
        showArtwork: true,
        displayLimit: 10,
        showOwner:true,
        showPlaylistName: true,
        showTrackArtist:  true,
        tracksAlign: false
      },
      genericSettings: options.genericSettings ?? {},
    });
  }
}
