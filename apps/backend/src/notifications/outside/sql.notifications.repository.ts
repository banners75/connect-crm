import { PrismaService } from 'src/prisma.service';
import { INotificationsRepository } from '../domain/notification.repository';
import { UserNotification } from '../domain/notification.entity';

export class SqlNotificationsRepository implements INotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async markAsRead(id: number): Promise<any> {
    return this.prisma.userNotification.update({
      where: { id: Number(id) },
      data: { read: true },
    });
  }

  async findAll(): Promise<UserNotification[]> {
    const notifications = await this.prisma.userNotification.findMany();
    return notifications.map((notification) => ({
      ...notification,
      recipient: notification.owner,
    }));
  }

  async create(message: string, recipient: string): Promise<any> {
    const notification = await this.prisma.userNotification.create({
      data: {
        message: message,
        owner: recipient,
      },
    });

    return notification;
  }
}
