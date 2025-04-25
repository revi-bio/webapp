import { Widget, type SettingDefinition, type WidgetInitializer } from '../Widget';

export const GallerySettingDefinitions: SettingDefinition[] = [
  {
    name: 'title',
    type: 'string',
  },
  {
    name: 'images',
    type: 'Image[]',
  },
];

export class GalleryWidget extends Widget {
  constructor(options: Omit<Partial<WidgetInitializer>, 'type'>) {
    super({
      type: 'gallery',
      specificSettings: {
        title: 'This is a gallery widget',
        images: ['http://65.87.7.245/file/680b8599500cbc3d3b2c456b'],
      },
      genericSettings: options.genericSettings ?? {},
    });
  }
}
