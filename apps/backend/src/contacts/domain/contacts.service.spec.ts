import { ContactsService } from './contacts.service';

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(() => {
    const contactsRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const logger = {
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn(),
    };

    service = new ContactsService(contactsRepository, logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
