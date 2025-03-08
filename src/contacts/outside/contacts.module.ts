import { Logger, Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from '../domain/contacts.service';
import { PrismaService } from 'src/prisma.service';
import { SqlContactRepository } from './sql.contacts.repository';
import { CustomLogger } from 'src/logging/CustomLogger';


@Module({
  controllers: [ContactsController],
  providers: [
    Logger,
    {
      provide: ContactsService,
      useValue: new ContactsService(
        new SqlContactRepository(new PrismaService()), 
        new CustomLogger(new Logger(ContactsService.name))
      )
    }
  ]
})
export class ContactsModule {}
