import { INotificationsRepository } from './notification.repository';
import { ILogger } from 'src/logging/logger';

export class NotificationsService {

    findAll() {
        return this.notificationsRepository.findAll();
    }

    constructor(
        private notificationsRepository: INotificationsRepository,
        private logger: ILogger,
    ) { }

    createNotification(message: string, recipient: string) {
        this.logger.log('NotificationsService.createNotification was called');
        return this.notificationsRepository.create(message, recipient);
    }
}
