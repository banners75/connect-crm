import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ITasksService } from './ports/tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(@Inject('ITasksService') private tasksService: ITasksService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    listTasks() {
        return this.tasksService.listTasks();
    }
}
