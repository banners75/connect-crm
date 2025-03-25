import { IContactsRepository } from './contacts.repository';
import { Contact } from './contact.entity';
import { ILogger } from 'src/logging/logger';
import { IOwnerChangedObserver } from './ownerChanged.observer';

export class ContactsService {
  ownerChangedObserver: Array<IOwnerChangedObserver> = [];

  constructor(
    private contactsRepository: IContactsRepository,
    private logger: ILogger,
  ) {}

  registerOwnerChangedObserver(observer: IOwnerChangedObserver) {
    this.ownerChangedObserver.push(observer);
  }

  async changeOwner(contactId: number, newOwner: string) {
    const contact = await this.findOne(contactId);

    if (!contact) {
      throw new Error('Contact not found');
    }

    if (contact.owner === newOwner) {
      throw new Error('New owner is the same as the current owner');
    }

    const originalOwner = contact.owner;
    contact.owner = newOwner;

    const result = await this.update(contact);

    this.ownerChangedObserver.forEach((observer) => {
      try {
        observer.notify(result.id, originalOwner, result.owner);
      } catch (error) {
        this.logError(this.logger, 'Failed to notify observer', error);
      }
    });

    return result;
  }

  create(contact: Contact) {
    this.logger.log('ContactsService.create was called');
    return this.contactsRepository.create(contact);
  }

  findAll() {
    this.logger.log('ContactsService.findAll was called');
    return this.contactsRepository.findAll();
  }

  findOne(id: number) {
    return this.contactsRepository.find(id);
  }

  update(contact: Contact) {
    return this.contactsRepository.update(contact);
  }

  remove(id: number) {
    return this.contactsRepository.delete(id);
  }

  logError(logger: ILogger, message: string, error: unknown) {
    if (error instanceof Error) {
      logger.error(`${message}: ${error.message}`);
    } else {
      logger.error(`${message}: Unknown error`);
    }
  }
}
