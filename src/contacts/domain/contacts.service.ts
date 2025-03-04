import { IContactsRepository } from './contacts.repository';
import { Contact } from './contact.entity';

export class ContactsService {

  constructor(private contactsRepository: IContactsRepository) {
  }

  create(contact: Contact) { 
    return this.contactsRepository.create(contact);
  }

  findAll() {
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
