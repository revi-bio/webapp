import { v4 as uuidv4 } from 'uuid';

export type WidgetType = 'profile' | 'link' | 'linkContainer' | 'spotify' | 'youtube'| 'markdown';

export interface SettingDefinition<T = string> {
  name: T;
  type: 'string' | 'number' | 'color' | 'boolean';
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
  profile: [
    {
      name:'fullAlign',
      type:'string'
    },
    {
      name:'profileOver',
      type:'string'
    },
    {
      name:'rounded',
      type:'string'
    },
    {
      name:'bioAvatarAndName',
      type:'string'
    },
    {
      name:'nameColor',
      type:'color'
    },
    {
      name:'name',
      type:'string'
    },
    {
      name:'badgeColor',
      type:'color'
    },
    {
      name:'badgeVisible',
      type:'boolean'
    },
    {
      name:'handleVisible',
      type: 'boolean'
    },
    {
      name:'handleColor',
      type:'color'
    },
    {
      name:'handle',
      type:'string'
    },
    {
      name:'text',
      type:'string'
    },
  ],
  spotify: [
    {
      name: 'playlistId',
      type: 'string',
    },
    {
      name: 'showArtwork',
      type: 'boolean',
    },
  ],

  markdown:[
    {
      name:'align',
      type:'string'
    },
    {
      name:'title',
      type:'string'
    },
    {
      name:'text',
      type:'string'
    },
  ],

  youtube: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'description',
      type: 'string',
    },
    {
      name: 'id',
      type: 'string',
    },
  ],

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

export interface WidgetInitializer {
  type: WidgetType;
  specificSettings: object;
  genericSettings: Partial<WidgetGenericSettings>;
  page: number;
  position: number;
}

/** The actual widget placed on the bio site, NOT the widget definition */
export class Widget {
  /** unique id for a widget */
  id: string = uuidv4();

  type: WidgetType;

  /** settings that every widget has */
  genericSettings: Partial<WidgetGenericSettings>;

  /** widget-specific settings */
  specificSettings: object;

  /** the index of the page the widget is on */
  page: number = 0;

  /** the index of the widget on the page */
  position: number = 0;

  constructor(options: WidgetInitializer) {
    this.type = options.type;
    this.genericSettings = new WidgetGenericSettings(options.genericSettings ?? {});

    // prevent calling this constructor in a non-abstract way
    if (!options.specificSettings) throw Error('do not pls');

    this.specificSettings = options.specificSettings;
    this.page = options.page;
    this.position = options.position;
  }
}
