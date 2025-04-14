import { Widget, type WidgetInitializer } from "../Widget";

export class ProfileWidget extends Widget {
  constructor(options: Omit<Partial<WidgetInitializer>, 'type'>) {
    super({
      type: 'profile',
      specificSettings: {
        // fill
      },
      genericSettings: options.genericSettings ?? {},
      position: options.position!,
      page: options.page!,
    });
  }
}
