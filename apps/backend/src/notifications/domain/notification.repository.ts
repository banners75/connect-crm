import { UserNotification } from './notification.entity';

export interface INotificationsRepository {
  markAsRead(id: number): Promise<UserNotification>;
  findAll(): Promise<UserNotification[]>;
  create(message: string, recipient: string): Promise<UserNotification>;
}
