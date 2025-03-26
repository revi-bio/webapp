import { defineStore } from 'pinia';

export const widget = defineStore('widget', {
  state: () => ({
    selectedWidget: {} as Record<string, any> // 🔥 NE használj reactive()!
  }),
  actions: {
    setSelectedProps(props: Record<string, any>) {
      this.selectedWidget = { ...props }; // ✅ Teljes másolat, így reaktív marad
    },
    clearSelectedProps() {
      this.selectedWidget = {}; // ✅ Törlés helyes módja
    },
    setSelectedProp(key: string, value: any) {
      this.selectedWidget = {
        ...this.selectedWidget, // ✅ Új objektum referenciával
        [key]: value
      };
    }
  }
});
