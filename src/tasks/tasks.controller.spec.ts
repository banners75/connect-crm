import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;

  let mockTasksService = {
    listTasks: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: 'ITasksService',
          useValue: mockTasksService
        },
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

    mockTasksService.listTasks.mockReturnValue(tasks);

    expect(controller.listTasks()).toEqual(tasks);
  });
});
