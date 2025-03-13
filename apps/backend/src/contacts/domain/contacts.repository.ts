import { Contact } from './contact.entity';

export interface IContactsRepository {
  findAll(): Promise<Contact[]>;
  find(id: number): Promise<Contact>;
  delete(id: number): Promise<boolean>;
  create(contact: Contact): Promise<Contact>;
  update(contact: Contact): Promise<Contact>;
}
