import { Widget, type WidgetInitializer } from "../Widget";

export class YoutubeWidget extends Widget {
  constructor(options: Omit<Partial<WidgetInitializer>, 'type'>) {
    super({
      type: 'youtube',
      specificSettings: {
        title: 'This is a YouTube widget',
        description: 'This is a description',
        id: 'dQw4w9WgXcQ'
      },
      genericSettings: options.genericSettings ?? {},
      position: options.position!,
      page: options.page!,
    });
  }
}
