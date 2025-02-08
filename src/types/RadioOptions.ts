export class RadioOption{
  key: string;
  value: string | number;
  icon?: string

  constructor(key: string, value:string | number, icon?: string){
    this.key = key;
    this.value = value;
    this.icon = icon;
  }
}
