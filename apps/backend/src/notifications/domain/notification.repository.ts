import { UserNotification } from "./notification.entity";

export interface INotificationsRepository {
  findAll(): Promise<UserNotification[]>;
  create(message: string, recipient: string): Promise<UserNotification>;
}
