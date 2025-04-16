import { Widget, type SettingDefinition, type WidgetInitializer } from '../Widget';

export const LinkSettingDefinitions: SettingDefinition[] = [
  {
    name: 'title',
    type: 'string',
  },
  {
    name: 'description',
    type: 'string',
  },
  {
    name: 'link',
    type: 'string',
  },
];

export class LinkWidget extends Widget {
  constructor(options: Omit<Partial<WidgetInitializer>, 'type'>) {
    super({
      type: 'link',
      specificSettings: {
        title: 'This is a link widget',
        description: 'This is a description',
        link: 'https://youtu.be/dQw4w9WgXcQ',
      },
      genericSettings: options.genericSettings ?? {},
      position: options.position!,
      page: options.page!,
    });
  }
}
