import { Widget, type WidgetInitializer } from "../Widget";

export class MarkdownWidget extends Widget {
  constructor(options: Omit<Partial<WidgetInitializer>, 'type'>) {
    super({
      type: 'markdown',
      specificSettings: {
        title: 'This is a markdown widget',
        text: 'This is the *text*',
      },
      genericSettings: options.genericSettings ?? {},
      position: options.position!,
      page: options.page!,
    });
  }
}
