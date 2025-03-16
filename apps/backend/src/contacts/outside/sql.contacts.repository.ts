import { IContactsRepository } from '../domain/contacts.repository';
import { Contact } from '../domain/contact.entity';
import { PrismaService } from 'src/prisma.service';

export class SqlContactRepository implements IContactsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(contact: Contact): Promise<Contact> {
    const result = await this.prismaService.contact.create({
      data: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        notes: contact.notes,
        owner: contact.owner,
      },
    });

    const response = new Contact();
    response.id = result.id;
    response.name = result.name;
    response.email = result.email;
    response.phone = result.phone;
    response.notes = result.notes || '';
    response.owner = result.owner;

    return response;
  }

  async delete(id: number): Promise<boolean> {
    return this.prismaService.contact
      .delete({
        where: {
          id,
        },
      })
      .then(() => true)
      .catch(() => false);
  }

  async findAll(): Promise<Contact[]> {
    const result = await this.prismaService.contact.findMany();

    const response = new Array<Contact>();
    result.forEach((element) => {
      const contact = new Contact();
      contact.id = element.id;
      contact.name = element.name;
      contact.email = element.email;
      contact.phone = element.phone;
      contact.notes = element.notes || '';
      contact.owner = element.owner;
      contact.favourite = element.favourite;
      response.push(contact);
    });

    return response;
  }

  async find(contactId: number): Promise<Contact> {
    const result = await this.prismaService.contact.findUnique({
      where: {
        id: contactId,
      },
    });

    if (result === null) {
      throw new Error('Contact not found');
    }

    const contact = new Contact();
    if (!result) {
      throw new Error('Contact not found');
    }
    contact.id = result.id;
    contact.name = result.name;
    contact.email = result.email;
    contact.phone = result.phone;
    contact.notes = result.notes || '';
    contact.owner = result.owner;
    contact.favourite = result.favourite;

    return contact;
  }

  async update(contact: Contact): Promise<Contact> {
    const id = contact.id;

    const result = await this.prismaService.contact.update({
      where: {
        id,
      },
      data: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        notes: contact.notes,
        owner: contact.owner,
        favourite: contact.favourite,
      },
    });

    const response = new Contact();
    response.id = result.id;
    response.name = result.name;
    response.email = result.email;
    response.phone = result.phone;
    response.notes = result.notes || '';
    response.owner = result.owner;
    response.favourite = result.favourite;

    return response;
  }
}
