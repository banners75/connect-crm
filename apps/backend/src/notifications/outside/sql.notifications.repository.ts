import { PrismaService } from 'src/prisma.service';
import { INotificationsRepository } from '../domain/notification.repository';
import { UserNotification } from '../domain/notification.entity';

export class SqlNotificationsRepository implements INotificationsRepository {
  constructor(private prisma: PrismaService) {}

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
