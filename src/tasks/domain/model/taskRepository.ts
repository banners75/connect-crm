import { Task } from "./task";

export interface ITaskRepository {
    findAll(): Promise<Task[]>;
    find(id: number): Promise<Task>;
    delete(task: Task): Promise<boolean>;
    create(task: Task): Promise<Task>;
}