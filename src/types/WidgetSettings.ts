import type { SettingDefinition, WidgetGenericSettings, WidgetType } from './Widget';
import { GallerySettingDefinitions } from './widgets/Gallery';
import { LinkSettingDefinitions } from './widgets/Link';
import { MarkdownSettingDefinitions } from './widgets/Markdown';
import { ProfileSettingDefinitions } from './widgets/Profile';
import { SpotifySettingDefinitions } from './widgets/Spotify';
import { YouTubeSettingDefinitions } from './widgets/YouTube';

export const SPECIFIC_SETTINGS_DEFINITIONS: { [key in WidgetType]: SettingDefinition[] } = {
  link: LinkSettingDefinitions,
  linkContainer: [],
  profile: ProfileSettingDefinitions,
  spotify: SpotifySettingDefinitions,
  markdown: MarkdownSettingDefinitions,
  youtube: YouTubeSettingDefinitions,
  gallery: GallerySettingDefinitions,
};

export const GENERIC_SETTINGS_DEFINITIONS: SettingDefinition<keyof (typeof WidgetGenericSettings)['prototype']>[] = [
  {
    name: 'borderRadius',
    type: 'number',
  },
  {
    name: 'background',
    type: 'color',
  },
  {
    name: 'sex',
    type: 'string',
  },
];
