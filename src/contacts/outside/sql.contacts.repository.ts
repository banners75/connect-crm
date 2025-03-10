import { PrismaService } from 'src/prisma.service';
import { IContactsRepository } from '../domain/contacts.repository';
import { Contact } from '../domain/contact.entity';

export class SqlContactRepository implements IContactsRepository {
  constructor(private prismaService: PrismaService) {}

  create(contact: Contact): Promise<Contact> {
    return this.prismaService.contact.create({
      data: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        notes: contact.notes,
        owner: contact.owner,
      },
    });
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
      response.push(contact);
    });

    return response;
  }

  find(id: number): Promise<Contact> {
    throw new Error('Method not implemented.' + id);
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
}
