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
    const result = this.prismaService.contact.findMany();
    return result;
  }
  find(id: number): Promise<Contact> {
    throw new Error('Method not implemented.');
  }

  async update(contact: Contact): Promise<Contact> {
    const id = contact.id;

    return this.prismaService.contact.update({
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
  }
}
