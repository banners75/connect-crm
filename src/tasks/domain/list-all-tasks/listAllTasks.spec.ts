import { ListAllTasks } from './listAllTasks';

describe('TasksService', () => {
  let command: ListAllTasks;

  command = new ListAllTasks();

  beforeEach(async () => {
  });
    
  it('should be defined', () => {
    expect(command).toBeDefined();
  });
});
