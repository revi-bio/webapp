import { Widget, type WidgetInitializer } from "../Widget";

export class GalleryWidget extends Widget {
  constructor(options: Omit<Partial<WidgetInitializer>, 'type'>) {
    super({
      type: 'gallery',
      specificSettings: {
        title: 'This is a gallery widget',
        images: []
      },
      genericSettings: options.genericSettings ?? {},
      position: options.position!,
      page: options.page!,
    });
  }
}
