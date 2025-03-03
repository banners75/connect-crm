import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { SqlTaskRepository } from './sql.taslRepository';
import { ListAllTasks } from '../domain/list-all-tasks/listAllTasks';
import { CreateTask } from '../domain/create-task/createTask';

@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: ListAllTasks,
      useValue: new ListAllTasks()
    },
    {
      provide: CreateTask,
      useValue: new CreateTask(new SqlTaskRepository())
    }
  ]
})
export class TasksModule { }
