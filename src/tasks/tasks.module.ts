import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: 'ITasksService',
      useClass: TasksService
    }]
})
export class TasksModule { }
