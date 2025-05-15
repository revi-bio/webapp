import { Widget, type SettingDefinition, type WidgetInitializer } from '../Widget';

export const LinkContainerSettingDefinitions: SettingDefinition[] = [
  {
    name: 'links',
    type: 'links', //{ link: string, name: string }[]
  }
];

export class LinkContainerWidget extends Widget {
  constructor(options: Omit<Partial<WidgetInitializer>, 'type'>) {
    super({
      type: 'linkContainer',
      specificSettings: {
        links: []
      },
      genericSettings: options.genericSettings ?? {},
    });
  }
}
