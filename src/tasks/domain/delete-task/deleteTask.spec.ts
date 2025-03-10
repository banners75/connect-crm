import { DeleteTask } from './deleteTask';
import { ITaskRepository } from '../model/taskRepository';

describe('DeleteTask', () => {
  let command: DeleteTask;
  let taskRepository: jest.Mocked<ITaskRepository>;

  beforeEach(() => {
    taskRepository = {
      delete: jest.fn(),
      create: jest.fn(),
      find: jest.fn(),
      findAll: jest.fn(),
    };

    //do setup
    command = new DeleteTask(taskRepository);
  });
  it('should succesfully delete a task that exists', () => {
    const taskToDelete = {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      completed: false,
    };

    taskRepository.find.mockResolvedValue(taskToDelete);
    taskRepository.delete.mockReturnValue(true);

    void expect(command.execute(taskToDelete)).resolves.toBe(true);
  });

  it('should throw an exception when task is not found', () => {
    const taskToDelete = {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      completed: false,
    };

    taskRepository.delete.mockReturnValue(false);

    void expect(command.execute(taskToDelete)).rejects.toThrow();
  });
});
