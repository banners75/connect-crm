export class OwnerChangedEvent {
    
    contactId: number;
    originalOwner: string;
    newOwner: string;

    constructor(contactId: number, originalOwner: string, newOwner: string) {
        this.contactId = contactId;
        this.originalOwner = originalOwner;
        this.newOwner = newOwner;
    }
}