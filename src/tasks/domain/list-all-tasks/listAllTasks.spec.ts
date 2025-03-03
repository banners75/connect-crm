import { Test, TestingModule } from '@nestjs/testing';
import { ListAllTasks } from './listAllTasks';

describe('TasksService', () => {
  let command: ListAllTasks;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListAllTasks],
    }).compile();

    command = module.get<ListAllTasks>(ListAllTasks);
  });

  it('should be defined', () => {
    expect(command).toBeDefined();
  });
});
