
import { ContactsService } from './contacts.service';

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(async () => {

    let contactsRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
    
    service = new ContactsService(contactsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
