import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { ListAllTasks } from '../application/list-all-tasks/listAllTasks';
import { CreateTask } from '../application/create-task/createTask';

@Module({
  controllers: [TasksController],
  providers: [
    ListAllTasks,
    CreateTask,
    ]
})
export class TasksModule { }
