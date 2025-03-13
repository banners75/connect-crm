import { Task } from '../model/task';
import { ITaskRepository } from '../model/taskRepository';

export class DeleteTask {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(task: Task): Promise<boolean> {
    const result = await this.taskRepository.find(task.id);

    if (result == null) {
      throw new Error('Task not found');
    }

    return await this.taskRepository.delete(result);
  }
}
