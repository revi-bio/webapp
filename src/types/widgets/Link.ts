import { Widget, type WidgetInitializer } from "../Widget";

export class LinkWidget extends Widget {
  constructor(options: Omit<WidgetInitializer, 'type'>) {
    super({
      type: 'link',
      specificSettings: {
        title: 'This is a link widget',
        description: 'This is a description',
        link: 'https://youtu.be/dQw4w9WgXcQ'
      },
      genericSettings: options.genericSettings,
    });
  }
}