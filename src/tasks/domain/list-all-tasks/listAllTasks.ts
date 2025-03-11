import { Task } from '@prisma/client';
import { ITaskRepository } from '../model/taskRepository';

export class ListAllTasks {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(): Promise<Task[]> {
    // const tasks = this.taskRepository.findAll();

    return new Promise<Task[]>(() => new Array<Task>());
  }
}
