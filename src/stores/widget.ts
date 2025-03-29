import { defineStore } from 'pinia';

export const widget = defineStore('widget', {
  state: () => ({
    widgets: {} as Record<string, Record<string, any>>,
    selectedId: null as string | null
  }),
  actions: {
    addWidget(id: string, props: Record<string, any>) {
      this.widgets[id] = props;
    },
    removeWidget(id: string) {
      delete this.widgets[id];
    },
    updateWidgetProp(id: string, key: string, value: any) {
      console.log(key, value, id)
      if (this.widgets[id]) {
        this.widgets[id][key] = value;
      }
    },
    getWidget(id: string) {
      return this.widgets[id];
    },
    selectWidget(id: string) {
      this.selectedId = id;
    }
  }
});
