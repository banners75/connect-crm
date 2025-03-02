import { Task } from "./task";

export interface ITaskRepository {
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task>;
    create(task: Task): Promise<Task>;
    update(task: Task): Promise<Task>;
    remove(id: number): Promise<void>;
}