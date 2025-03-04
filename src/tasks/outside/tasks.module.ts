import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { SqlTaskRepository } from './sql.taslRepository';
import { ListAllTasks } from '../domain/list-all-tasks/listAllTasks';
import { CreateTask } from '../domain/create-task/createTask';
import { PrismaService } from 'src/prisma.service';
import { Sql } from '@prisma/client/runtime/library';

@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: ListAllTasks,
      useValue: new ListAllTasks(new SqlTaskRepository(new PrismaService()))
    },
    {
      provide: CreateTask,
      useValue: new CreateTask(new SqlTaskRepository(new PrismaService()))
    }
  ]
})
export class TasksModule { }
