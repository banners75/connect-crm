import { Task } from '../model/task';
import { ITaskRepository } from '../model/taskRepository';

export class DeleteTask {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(task: Task): Promise<boolean> {
    var task = await this.taskRepository.find(task.id);

    if (task == null) {
      throw new Error('Task not found');
    }

    return await this.taskRepository.delete(task);
  }
}
