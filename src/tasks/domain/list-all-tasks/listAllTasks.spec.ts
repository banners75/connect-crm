import { ListAllTasks } from './listAllTasks';

describe('TasksService', () => {
  let command: ListAllTasks;

  let mockTaskRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn()
  }

  beforeEach(async () => {
    command = new ListAllTasks(mockTaskRepository);
  });
    
  it('should be defined', () => {
    expect(command).toBeDefined();
  });
});
