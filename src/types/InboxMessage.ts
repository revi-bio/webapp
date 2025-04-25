import type { User } from '@/types/User';
export interface InboxMessage {
  _id: string;
  title: string;
  text: string;
  user: User;
  isRead: boolean;
  createdAt: string;
}
