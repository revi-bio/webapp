import { Widget, type SettingDefinition, type WidgetInitializer } from '../Widget';

export const LinkContainerSettingDefinitions: SettingDefinition[] = [
  {
    name: 'links',
    type: 'links', //{ link: string, name: string, background: Color }[]
  },
  {
    name: 'title',
    type: 'string'
  }
];

export class LinkContainerWidget extends Widget {
  constructor(options: Omit<Partial<WidgetInitializer>, 'type'>) {
    super({
      type: 'linkContainer',
      specificSettings: {
        title: 'FASZ',
        links: [
          {link: "https://tylerpalko.github.io/Is-My-Computer-ON/", name: "uno"},
          {link: "https://tylerpalko.github.io/Is-My-Computer-ON/", name: "dos"},
          {link: "https://tylerpalko.github.io/Is-My-Computer-ON/", name: "három"},
          {link: "https://tylerpalko.github.io/Is-My-Computer-ON/", name: "vier"},
          {link: "https://tylerpalko.github.io/Is-My-Computer-ON/", name: "five"},
        ]
      },
      genericSettings: options.genericSettings ?? {},
    });
  }
}
