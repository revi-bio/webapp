import { defineStore } from 'pinia';

export const widget = defineStore('widget', {
  state: () => ({
    selectedWidget: {} as Record<string, any>
  }),
  actions: {
    setSelectedProps(props: Record<string, any>) {
      this.selectedWidget = { ...props }; 
    },
    clearSelectedProps() {
      this.selectedWidget = {};
    },
    setSelectedProp(key: string, value: any, id:string) {
      if(this.selectedWidget.id == id){
        this.selectedWidget = {
          ...this.selectedWidget,
          [key]: value
        };
      }
    }
  }
});
