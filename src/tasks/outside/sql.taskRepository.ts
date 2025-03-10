import { Injectable } from '@nestjs/common';
import { Task } from '../domain/model/task';
import { ITaskRepository } from '../domain/model/taskRepository';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SqlTaskRepository implements ITaskRepository {
  constructor(private prisma: PrismaService) {}
  delete(task: Task): boolean | PromiseLike<boolean> {
    throw new Error('Method not implemented.' + task.title);
  }

  async find(id: number): Promise<Task> {
    const result = await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });

    if (result == null) {
      throw new Error('Task not found');
    }

    const response = new Task();
    response.id = result.id;
    response.title = result.title;
    response.description = result.description;
    response.completed = result.completed ? true : false;
    return response;
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany();
    return this.mapTasks(tasks);
  }

  private mapTasks(
    tasks: {
      id: number;
      title: string;
      description: string;
      completed: boolean | null;
    }[],
  ): Task[] {
    return tasks.map((task) => {
      const response = new Task();
      response.id = task.id;
      response.title = task.title;
      response.description = task.description;
      response.completed = task.completed ? true : false;
      return response;
    });
  }

  async create(task: Task): Promise<Task> {
    const result = await this.prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        completed: task.completed,
      },
    });

    const response = new Task();
    response.id = result.id;
    response.title = result.title;
    response.description = result.description;
    response.completed = result.completed ? true : false;

    return response;
  }
}
