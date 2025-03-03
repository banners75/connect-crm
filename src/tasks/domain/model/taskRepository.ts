import { Task } from "./task";

export interface ITaskRepository {
    create(task: Task): Promise<Task>;
}