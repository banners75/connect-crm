import { INotificationsRepository } from './notification.repository';
import { ILogger } from 'src/logging/logger';

export class NotificationsService {
  constructor(
    private notificationsRepository: INotificationsRepository,
    private logger: ILogger,
  ) {}
}
