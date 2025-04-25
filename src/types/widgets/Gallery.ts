import { Widget, type SettingDefinition, type WidgetInitializer } from '../Widget';

export const GallerySettingDefinitions: SettingDefinition[] = [
  {
    name: 'title',
    type: 'string',
  },
  {
    name: 'images',
    type: 'images',
  },
];

export class GalleryWidget extends Widget {
  constructor(options: Omit<Partial<WidgetInitializer>, 'type'>) {
    super({
      type: 'gallery',
      specificSettings: {
        title: 'This is a gallery widget',
        images: [],
      },
      genericSettings: options.genericSettings ?? {},
    });
  }
}
