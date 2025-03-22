export interface INotificationsRepository {
  findAll(): Promise<Notification[]>;
  find(notificationId: number): Promise<Notification>;
  delete(id: number): Promise<boolean>;
  create(notification: Notification): Promise<Notification>;
  update(notification: Notification): Promise<Notification>;
}
