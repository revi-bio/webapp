import Profile from "@/views/Logged_in/Settings/Profile.vue";
import { Widget, type WidgetInitializer } from "../Widget";
import { useBioStore } from "@/stores/bio";
import router from "@/router";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";

interface ProfileWidgetOptions extends Omit<Partial<WidgetInitializer>, 'type'> {
  handle?: string;
}
const route = useRoute();

export class ProfileWidget extends Widget {
  constructor(options: ProfileWidgetOptions) {
    const bioStore = useBioStore();
    const handle = bioStore.getCurrentHandle();
    console.log('handle from profile: ', handle)
    const bio = handle ? bioStore.getBioByHandle(handle) : null;

    super({
      type: 'profile',
      specificSettings: {
        fullAlign: 'start',
        profileOver: false,
        rounded: 'xl',
        bioAvatarAndName: 'start',
        nameColor: 'violet-500',
        name: bio?.name,
        badgeColor: 'violet-500',
        badgeVisible: true,
        handleVisible: true,
        handleColor: 'violet-500',
        handle: handle,
        text:'Your text comes here'
      },
      genericSettings: options.genericSettings ?? {},
      position: options.position!,
      page: options.page!,
    });
  }
}
