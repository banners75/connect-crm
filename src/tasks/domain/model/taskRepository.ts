import { Task } from "./task";

export interface ITaskRepository {
    find(id: number): Promise<Task>;
    delete(task: Task): Promise<boolean>;
    create(task: Task): Promise<Task>;
}