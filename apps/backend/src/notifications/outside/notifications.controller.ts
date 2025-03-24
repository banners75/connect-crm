import { Controller, Get, Sse } from '@nestjs/common';
import { NotificationsService } from '../domain/notifications.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { OwnerChangedEvent } from 'src/contacts/outside/ownerChange.event';
import { map, Observable, Subject } from 'rxjs';
import { Public } from 'src/auth/outside/constants';

@Controller('notifications')
export class NotificationsController {

  private notificationStream = new Subject<{id: number, message: string, recipient: string}>();

  constructor(private readonly notificationsService: NotificationsService, private readonly eventEmitter: EventEmitter2) { }

  @Get()
    findAll() {
      return this.notificationsService.findAll();
    }

  @OnEvent('contact.owner.changed')
  async handleOwnerChangedEvent(payload: OwnerChangedEvent) {
    console.log(`notifications controller - Owner changed for contact ${payload.contactId} from ${payload.originalOwner} to ${payload.newOwner}`);
  
    const newNotification = await this.notificationsService.createNotification(
      `Owner changed for contact ${payload.contactId} from ${payload.originalOwner} to ${payload.newOwner}`,
      payload.newOwner
    );

    const notification = {
      id: newNotification.id,
      message: `Owner changed for contact ${payload.contactId} from ${payload.originalOwner} to ${payload.newOwner}`,
      recipient: payload.newOwner
    }

    this.notificationStream.next(notification);
  }

  getNotificationStream() {
    return this.notificationStream.asObservable();
  }

  @Sse('stream')
  @Public() // TODO add auth
  contactOwnerChanged() {
    
    return this.getNotificationStream().pipe(
      map((notification: any) => {
        return {
          data: notification
        }
      })
    );
  }
}
