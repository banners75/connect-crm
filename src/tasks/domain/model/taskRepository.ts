import { Task } from './task';

export interface ITaskRepository {
  delete(task: Task): boolean | PromiseLike<boolean>;
  find(id: number): Promise<Task>;
  findAll(): Promise<Task[]>;
  create(task: Task): Promise<Task>;
}
