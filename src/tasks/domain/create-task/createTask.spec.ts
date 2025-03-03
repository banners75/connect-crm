import { Test, TestingModule } from '@nestjs/testing';
import { CreateTask } from './createTask';

describe('CreateTask', () => {
  let command: CreateTask;

  let mockTaskRepository = {
    create: jest.fn()
  }

  beforeEach(async () => {

    command = new CreateTask(mockTaskRepository);

    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [
    //     CreateTask,
    //     {
    //       provide: 'ITaskRepository',
    //       useValue: mockTaskRepository
    //     }
    //   ],
    // }).compile();

    // command = module.get<CreateTask>(CreateTask);
  });

  // it('should be defined', () => {
  //   expect(command).toBeDefined();
  // });

  it ('should create and return a task', () => {
    var task = {
      title: 'Task 1',
      description: 'Description 1',
    }

    var createdTask = {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      completed: false,
    }

    mockTaskRepository.create.mockReturnValue(createdTask);

    expect(command.execute(task)).resolves.toMatchObject(createdTask);
  }
  );
});
