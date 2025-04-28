import Profile from '@/views/Logged_in/Settings/Profile.vue';
import { Widget, type SettingDefinition, type WidgetInitializer } from '../Widget';
import { useBioStore } from '@/stores/bio';
import router from '@/router';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

interface ProfileWidgetOptions extends Omit<Partial<WidgetInitializer>, 'type'> {
  handle?: string;
}
const route = useRoute();
export const ProfileSettingDefinitions: SettingDefinition[] = [
  {
    name: 'fullAlign',
    type: 'string',
  },
  {
    name: 'profileOver',
    type: 'string',
  },
  {
    name: 'rounded',
    type: 'string',
  },
  {
    name: 'bioAvatarAndName',
    type: 'string',
  },
  {
    name: 'nameColor',
    type: 'color',
  },
  {
    name: 'badgeColor',
    type: 'color',
  },
  {
    name: 'badgeVisible',
    type: 'boolean',
  },
  {
    name: 'handleVisible',
    type: 'boolean',
  },
  {
    name: 'handleColor',
    type: 'color',
  },
  {
    name: 'text',
    type: 'string',
  },
  {
    name: 'textColor',
    type: 'color',
  },
];

export class ProfileWidget extends Widget {
  constructor(options: ProfileWidgetOptions) {
    const bioStore = useBioStore();

    super({
      type: 'profile',
      specificSettings: {
        fullAlign: 'start',
        profileOver: false,
        rounded: 'xl',
        bioAvatarAndName: 'start',
        nameColor: 'violet-500',
        textColor: 'violet-500',
        name: '',
        badgeColor: 'violet-500',
        badgeVisible: true,
        handleVisible: true,
        handleColor: 'violet-500',
        handle: '',
        text: 'Your text comes here',
      },
      genericSettings: options.genericSettings ?? {},
    });
  }
}
