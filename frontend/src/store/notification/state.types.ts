import type { NotificationInstance } from 'antd/es/notification/interface';

export type NotificationTypes = 'success' | 'error' | 'info' | 'warning';

export interface NotificationMessage {
  title: string;
  description: string;
}

export interface NotificationState {
  notification: NotificationInstance;
}
