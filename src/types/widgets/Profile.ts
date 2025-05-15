import { Widget, type SettingDefinition, type WidgetInitializer } from '../Widget';

export const ProfileSettingDefinitions: SettingDefinition[] = [
  {
    name: 'fullAlign',
    type: 'string',
  },
  {
    name: 'profileOver',
    type: 'string',
  },
  {
    name: 'rounded',
    type: 'string',
  },
  {
    name: 'bioAvatarAndName',
    type: 'string',
  },
  {
    name: 'nameColor',
    type: 'color',
  },
  {
    name: 'badgeColor',
    type: 'color',
  },
  {
    name: 'badgeVisible',
    type: 'boolean',
  },
  {
    name: 'handleVisible',
    type: 'boolean',
  },
  {
    name: 'handleColor',
    type: 'color',
  },
  {
    name: 'text',
    type: 'text',
  },
  {
    name: 'textColor',
    type: 'color',
  },
];

export class ProfileWidget extends Widget {
  constructor(options: Omit<Partial<WidgetInitializer>, 'type'>) {
    super({
      type: 'profile',
      specificSettings: {
        fullAlign: 'start',
        profileOver: false,
        rounded: 'xl',
        bioAvatarAndName: 'start',
        nameColor: 'violet-500',
        textColor: 'violet-500',
        badgeColor: 'violet-500',
        badgeVisible: true,
        handleVisible: true,
        handleColor: 'violet-500',
        text: 'Your text comes here',
      },
      genericSettings: options.genericSettings ?? {},
    });
  }
}
