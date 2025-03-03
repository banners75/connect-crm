import { Inject } from "@nestjs/common";
import { Task } from "../model/task";
import { ITaskRepository } from "../model/taskRepository";

export class CreateTask {

    constructor(@Inject('ITaskRepository') private taskRepository: ITaskRepository){}

    async execute(task: { title: string; description: string; }) {
        
        var taskModel = new Task();
        taskModel.id = 1
        taskModel.title = task.title;
        taskModel.description = task.description;
        taskModel.completed = false;

        var result = await this.taskRepository.create(taskModel);

        return result;
    }
}