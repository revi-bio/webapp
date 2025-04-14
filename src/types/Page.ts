import { type Widget as IWidget } from '@/types/Widget';

export interface Page {
  id: string;
  name: string;
  icon: string;
  widgets: IWidget[];
}
