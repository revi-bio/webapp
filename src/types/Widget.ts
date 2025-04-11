export type WidgetType = 'profile' | 'link' | 'linkContainer';

export interface SettingDefinition<T = string> {
  name: T;
  type: 'string' | 'number' | 'color';
}

export const SPECIFIC_SETTINGS_DEFINITIONS: { [key in WidgetType]: SettingDefinition[] } = {
  link: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'description',
      type: 'string',
    },
    {
      name: 'link',
      type: 'string',
    },
  ],
  linkContainer: [],
  profile: [],
};

export const GENERIC_SETTINGS_DEFINITIONS: SettingDefinition<keyof (typeof WidgetGenericSettings)['prototype']>[] = [
  {
    name: 'borderRadius',
    type: 'number',
  },
  {
    name: 'background',
    type: 'color',
  },
];

export interface Color {
  opacity: number;
  tint: number;
  // to be discussed
  saturation: number;
}

export class WidgetGenericSettings {
  constructor(overrides: Partial<WidgetGenericSettings> = {}) {
    for (const [key, value] of Object.entries(overrides)) {
      if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
        if (this[key] && typeof this[key] === 'object' && !(this[key] instanceof Date)) {
          this[key] = this.mergeObjects(this[key], value);
        } else {
          this[key] = value;
        }
      } else {
        this[key] = value;
      }
    }
  }

  private mergeObjects<T extends object>(target: T, source: Partial<T>): T {
    return { ...target, ...source };
  }

  borderRadius: number = 16;
  /*
    backgroundColor: string;
    textColor: string;
    */
  background: Color = {
    tint: 240,
    saturation: 4,
    opacity: 0.8,
  };
}

/** The actual widget placed on the bio site, NOT the widget definition */
export interface Widget {
  /** unique id for a widget */
  id: string;

  type: WidgetType;

  /** settings that every widget has */
  genericSettings: Partial<WidgetGenericSettings>;

  /** widget-specific settings */
  specificSettings: { [key: string]: any };

  /** the index of the page the widget is on */
  page: number;

  /** the index of the widget on the page */
  position: number;
}
