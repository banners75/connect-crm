import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Req,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsService } from '../domain/contacts.service';
import { Contact } from '../domain/contact.entity';

export type UserRequest = {
  username: string;
};

@Controller('contacts')
export class ContactsController {
  private readonly logger = new Logger(ContactsController.name);

  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto, @Req() request: Request) {
    const user = request['user'] as UserRequest;

    const contact = new Contact();
    contact.name = createContactDto.name;
    contact.email = createContactDto.email;
    contact.phone = createContactDto.phone;
    contact.notes = createContactDto.notes;
    contact.owner = user.username;

    return this.contactsService.create(contact);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    //TODO: Add validation properly
    if (
      !updateContactDto.id ||
      !updateContactDto.name ||
      !updateContactDto.email ||
      !updateContactDto.phone ||
      !updateContactDto.notes ||
      !updateContactDto.owner
    ) {
      throw new Error('id is required');
    }

    const contact = {
      id: +id,
      name: updateContactDto.name,
      email: updateContactDto.email,
      phone: updateContactDto.phone,
      notes: updateContactDto.notes,
      owner: updateContactDto.owner,
    };

    return this.contactsService.update(contact);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(+id);
  }
}
