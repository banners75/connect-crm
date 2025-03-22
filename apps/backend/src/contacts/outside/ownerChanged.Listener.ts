import { EventEmitter2 } from "@nestjs/event-emitter";
import { IOwnerChangedObserver } from "../domain/ownerChanged.observer";
import { OwnerChangedEvent } from "./ownerChange.event";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OwnerChangedListener implements IOwnerChangedObserver{

    constructor(private eventEmitter: EventEmitter2) {
    }

    notify(contactId: number, originalOwner: string, newOwner: string): void {
        console.log(`Owner changed for contact ${contactId} from ${originalOwner} to ${newOwner}`);

        const event = new OwnerChangedEvent(contactId, originalOwner, newOwner);
        this.eventEmitter.emit('contact.owner.changed', event); 
    }
}