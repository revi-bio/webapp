import { Widget, type SettingDefinition, type WidgetInitializer } from '../Widget';

export const MarkdownSettingDefinitions: SettingDefinition[] = [
  {
    name: 'align',
    type: 'string',
  },
  {
    name: 'title',
    type: 'string',
  },
  {
    name: 'text',
    type: 'string',
  },
];

export class MarkdownWidget extends Widget {
  constructor(options: Omit<Partial<WidgetInitializer>, 'type'>) {
    super({
      type: 'markdown',
      specificSettings: {
        title: 'This is a markdown widget',
        text: 'This is the *text*',
      },
      genericSettings: options.genericSettings ?? {},
    });
  }
}
