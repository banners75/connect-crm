import { Module } from '@nestjs/common';
import { NotificationsService } from '../domain/notifications.service';
import { NotificationsController } from './notifications.controller';

@Module({
  controllers: [NotificationsController],
  providers: [
    {
      provide: NotificationsService,
      useClass: NotificationsService,
      // useValue: new NotificationsService(
      //   new SqlNotificationsRepository(new PrismaService()),
      //   new CustomLogger(new Logger(NotificationsService.name)),
      // ),
    },
  ],
})
export class NotificationsModule { }
