import { DeleteTask } from "./deleteTask";


describe('DeleteTask', () => {

  var command: DeleteTask;
  var taskRepository: any;

  beforeEach(async () => {

    taskRepository = {
      delete: jest.fn(),
      create: jest.fn(),
      find: jest.fn()
    }

    //do setup
    command = new DeleteTask(taskRepository);
  }

  );
  it ('should succesfully delete a task that exists', () => {

    var taskToDelete = {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      completed: false,
    }

    taskRepository.find.mockReturnValue(taskToDelete);
    taskRepository.delete.mockReturnValue(true);

    expect(command.execute(taskToDelete)).resolves.toBe(true);
  }
  );

  it ('should throw an exception when task is not found', () => {

    var taskToDelete = {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      completed: false,
    }

    taskRepository.delete.mockReturnValue(false);

    expect(command.execute(taskToDelete)).rejects.toThrow();
  }
  );
});
