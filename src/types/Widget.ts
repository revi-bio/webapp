import { v4 as uuidv4 } from 'uuid';

export type WidgetType = 'profile' | 'link' | 'linkContainer' | 'spotify' | 'youtube' | 'markdown' | 'gallery';

export interface SettingDefinition<T = string> {
  name: T;
  type: 'string' | 'number' | 'color' | 'boolean' | 'images';
}

export interface Color {
  opacity: number;
  hue: number;
  // to be discussed
  saturation: number;
  value: number;
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
    hue: 240,
    saturation: 4,
    value: 16,
    opacity: 0.8,
  };

  sex: string = 'asasd';
}

export interface WidgetInitializer {
  type: WidgetType;
  specificSettings: object;
  genericSettings: Partial<WidgetGenericSettings>;
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

  constructor(options: WidgetInitializer) {
    this.type = options.type;
    this.genericSettings = new WidgetGenericSettings(options.genericSettings ?? {});

    // prevent calling this constructor in a non-abstract way
    if (!options.specificSettings) throw Error('do not pls');

    this.specificSettings = options.specificSettings;
  }
}
