import { Injectable } from "@nestjs/common";
import { Task } from "../domain/model/task";
import { ITaskRepository } from "../domain/model/taskRepository";

@Injectable()
export class SqlTaskRepository implements ITaskRepository {
    find(id: number): Promise<Task> {
        throw new Error("Method not implemented.");
    }
    delete(task: Task): Promise<boolean> {
        throw new Error("Method not implemented.");
    } 
    async create(task: Task): Promise<Task> {

        //TODO: Implement the logic to save the task in a SQL database
        return task;
    }
}