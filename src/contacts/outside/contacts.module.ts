import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from '../domain/contacts.service';
import { PrismaService } from 'src/prisma.service';
import { SqlContactRepository } from './sql.contacts.repository';


@Module({
  controllers: [ContactsController],
  providers: [
    {
      provide: ContactsService,
      useValue: new ContactsService(new SqlContactRepository(new PrismaService()))
    }
  ]
})
export class ContactsModule {}
