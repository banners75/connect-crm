import { Injectable } from "@nestjs/common";
import { Task } from "../domain/model/task";
import { ITaskRepository } from "../domain/model/taskRepository";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class SqlTaskRepository implements ITaskRepository {

    constructor(private prisma: PrismaService){}
    
    async findAll(): Promise<Task[]> {
        
        const tasks = await this.prisma.task.findMany();
        return tasks.map((task) => {
            var response = new Task();
            response.id = task.id;
            response.title = task.title;
            response.description = task.description;
            response.completed = task.completed ? true : false;
            return response;
        });
    }

    async find(id: number): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    async delete(task: Task): Promise<boolean> {
        throw new Error("Method not implemented.");
    } 
    
    async create(task: Task): Promise<Task> {

       var result = await this.prisma.task.create({
            data: {
                title: task.title,
                description: task.description,
                completed: task.completed
            }
        });

        var response = new Task();
        response.id = result.id;
        response.title = result.title;
        response.description = result.description;
        response.completed = result.completed? true : false;

        return response;
    }
}