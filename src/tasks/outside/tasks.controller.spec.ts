import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { ListAllTasks } from '../domain/list-all-tasks/listAllTasks';
import { CreateTask } from '../domain/create-task/createTask';

describe('TasksController', () => {
  let controller: TasksController;

  let mockListAllTasks = {
    execute: jest.fn()
  }

  let mockCreateTask = { 
    execute: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: ListAllTasks,
          useValue: mockListAllTasks
        },
        {
          provide: CreateTask,
          useValue: mockCreateTask
        }
      ]
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

    mockListAllTasks.execute.mockReturnValue(tasks);

    expect(controller.list()).toEqual(tasks);
  });
});
