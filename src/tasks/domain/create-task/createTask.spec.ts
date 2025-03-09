import { Test, TestingModule } from '@nestjs/testing';
import { CreateTask } from './createTask';

describe('CreateTask', () => {
  let command: CreateTask;

  const mockTaskRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
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

    expect(command.execute(task)).resolves.toMatchObject(createdTask);
  });
});
