import { Logger, Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from '../domain/contacts.service';
import { SqlContactRepository } from './sql.contacts.repository';
import { CustomLogger } from 'src/logging/CustomLogger';
import { PrismaService } from 'src/prisma.service';


@Module({
  imports: [],
  controllers: [ContactsController],
  providers: [
    Logger,
    PrismaService,
    {
      provide: ContactsService,
      useValue: new ContactsService(
        new SqlContactRepository(new PrismaService()),
        new CustomLogger(new Logger(ContactsService.name)),
      ),
    },
  ],
})
export class ContactsModule {}
