import { Logger, Module } from '@nestjs/common';
import { NotificationsService } from '../domain/notifications.service';
import { NotificationsController } from './notifications.controller';
import { SqlNotificationsRepository } from './sql.notifications.repository';
import { PrismaService } from 'src/prisma.service';
import { CustomLogger } from 'src/logging/CustomLogger';

@Module({
  controllers: [NotificationsController],
  providers: [
    {
      provide: NotificationsService,
      useValue: new NotificationsService(
        new SqlNotificationsRepository(new PrismaService()),
        new CustomLogger(new Logger(NotificationsService.name)),
      ),
    },
  ],
})
export class NotificationsModule { }
