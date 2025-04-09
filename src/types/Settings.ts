export interface Settings {
  'preferences.pronouns': string;
  'preferences.autoAcceptAdultContent': boolean;
}

export type SettingKey = keyof Settings;
