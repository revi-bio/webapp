import { defineStore } from 'pinia';

export const widget = defineStore('widget', {
  state: () => ({
    selectedWidgetProps: {} as Record<string, any>
  }),
  actions: {
    setSelectedProps(props: Record<string, any>) {
      this.selectedWidgetProps = props;
    },
    clearSelectedProps() {
      this.selectedWidgetProps = {};
    }
  }
});
