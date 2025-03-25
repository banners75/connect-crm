import { ContactsService } from './contacts.service';

describe('ContactsService', () => {
  let service: ContactsService;

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

  beforeEach(() => {
    service = new ContactsService(contactsRepository, logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should change owner of contact when new owner exists', async () => {
    const contact = {
      id: 1,
      owner: 'Alice',
    };

    const updatedContact = {
      id: 1,
      owner: 'Bob',
    };

    contactsRepository.find.mockResolvedValue(contact);
    contactsRepository.update.mockResolvedValue(updatedContact);

    const newOwner = 'Bob';

    const result = await service.changeOwner(contact.id, newOwner);

    expect(result.owner).toBe(newOwner);
  });

  it('should throw error if contact is not found', () => {
    contactsRepository.find.mockResolvedValue(null);
    void expect(service.changeOwner(1, 'Bob')).rejects.toThrow(
      'Contact not found',
    );
  });

  it('should notify observers when owner is changed', async () => {
    const contact = {
      id: 1,
      owner: 'Alice',
    };

    const updatedContact = {
      id: 1,
      owner: 'Bob',
    };

    contactsRepository.find.mockResolvedValue(contact);
    contactsRepository.update.mockResolvedValue(updatedContact);

    const newOwner = 'Bob';

    const notificationObserver = {
      notify: jest.fn(),
    };

    service.registerOwnerChangedObserver(notificationObserver);
    service.registerOwnerChangedObserver(notificationObserver);

    await service.changeOwner(contact.id, newOwner);

    /* eslint-disable */
    service.ownerChangedObserver.forEach((observer) => {
      expect(observer.notify).toHaveBeenCalledWith(
        contact.id, 'Alice', 'Bob'
      );
    });
    /* eslint-enable */
  });
});
