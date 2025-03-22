import { Controller, Injectable } from '@nestjs/common';
import { NotificationsService } from '../domain/notifications.service';
import { OnEvent } from '@nestjs/event-emitter';
import { OwnerChangedEvent } from 'src/contacts/outside/ownerChange.event';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }


  @OnEvent('contact.owner.changed')
  handleOwnerChangedEvent(payload: OwnerChangedEvent) {
    console.log(`notifications controller - Owner changed for contact ${payload.contactId} from ${payload.originalOwner} to ${payload.newOwner}`);
  }
}
