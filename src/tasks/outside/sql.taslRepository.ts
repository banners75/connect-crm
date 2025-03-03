import { Injectable } from "@nestjs/common";
import { Task } from "../domain/model/task";
import { ITaskRepository } from "../domain/model/taskRepository";

@Injectable()
export class SqlTaskRepository implements ITaskRepository { 
    async create(task: Task): Promise<Task> {

        //TODO: Implement the logic to save the task in a SQL database
        return task;
    }
}