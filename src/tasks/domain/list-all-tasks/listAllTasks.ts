import { Task } from "@prisma/client";
import { ITaskRepository } from "../model/taskRepository";

export class ListAllTasks  {
    constructor(private taskRepository: ITaskRepository){} 

    async execute() {
        var tasks = await this.taskRepository.findAll();
        return tasks;
    }
}
