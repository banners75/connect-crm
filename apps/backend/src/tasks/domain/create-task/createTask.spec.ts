import { CreateTask } from './createTask';

describe('CreateTask', () => {
  let command: CreateTask;

  const mockTaskRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(() => {
    command = new CreateTask(mockTaskRepository);
  });
  it('should create and return a task', () => {
    const task = {
      title: 'Task 1',
      description: 'Description 1',
    };

    const createdTask = {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      completed: false,
    };

    mockTaskRepository.create.mockReturnValue(createdTask);

    void expect(command.execute(task)).resolves.toMatchObject(createdTask);
  });
});
