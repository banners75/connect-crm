import { Logger, Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from '../domain/contacts.service';
import { SqlContactRepository } from './sql.contacts.repository';
import { CustomLogger } from 'src/logging/CustomLogger';
import { PrismaService } from 'src/prisma.service';
import { OwnerChangedListener } from './ownerChanged.Listener';

@Module({
  controllers: [ContactsController],
  providers: [
    Logger,
    PrismaService,
    OwnerChangedListener,
    {
      provide: ContactsService,
      useValue: new ContactsService(
        new SqlContactRepository(new PrismaService()),
        new CustomLogger(new Logger(ContactsService.name)),
      ),
    },
  ],
})
export class ContactsModule {
  constructor(
    private readonly contactsService: ContactsService,
    private readonly ownerChangedListener: OwnerChangedListener,
  ) {
    contactsService.registerOwnerChangedObserver(ownerChangedListener);
  }
}
