import { Task } from '../model/task';
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

  it('should return an array of tasks', () => {
    var tasks = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
        done: false,
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description 2',
        done: false,
      }
    ]

    mockTaskRepository.findAll.mockReturnValue(tasks);

    expect(command.execute()).resolves.toEqual(tasks);
  });

  it('should return an empty array of tasks when no tasks are returned from the repository', () => {
    
    var tasks: Task[] = [];

    mockTaskRepository.findAll.mockReturnValue(tasks);

    expect(command.execute()).resolves.toEqual(tasks)
  });
});
