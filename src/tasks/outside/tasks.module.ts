import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { ListAllTasks } from '../domain/list-all-tasks/listAllTasks';
import { CreateTask } from '../domain/create-task/createTask';

@Module({
  controllers: [TasksController],
  providers: [
    ListAllTasks,
    CreateTask,
    ]
})
export class TasksModule { }
