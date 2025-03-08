import { IContactsRepository } from './contacts.repository';
import { Contact } from './contact.entity';
import { ILogger } from 'src/logging/logger';

export class ContactsService {

  constructor(private contactsRepository: IContactsRepository, private logger: ILogger) {
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
    return `This action returns a #${id} contact`;
  }

  update(contact: Contact) {
    return this.contactsRepository.update(contact);
  }

  remove(id: number) {
    return this.contactsRepository.delete(id);
  }
}
