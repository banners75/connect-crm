import { INotificationsRepository } from './notification.repository';
import { ILogger } from 'src/logging/logger';

export class NotificationsService {
  markAsRead(id: number) {
    return this.notificationsRepository.markAsRead(id);
  }
  constructor(
    private notificationsRepository: INotificationsRepository,
    private logger: ILogger,
  ) {}

  findAll() {
    return this.notificationsRepository.findAll();
  }

  createNotification(message: string, recipient: string) {
    this.logger.log('NotificationsService.createNotification was called');
    return this.notificationsRepository.create(message, recipient);
  }
}
