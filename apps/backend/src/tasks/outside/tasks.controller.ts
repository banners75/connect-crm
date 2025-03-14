import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ListAllTasks } from '../domain/list-all-tasks/listAllTasks';
import { CreateTask } from '../domain/create-task/createTask';
import { CreateTaskDto } from './createTaskDto';

@Controller('tasks')
export class TasksController {
  constructor(
    private listAllTasks: ListAllTasks,
    private createTask: CreateTask,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  list() {
    return this.listAllTasks.execute();
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.createTask.execute(createTaskDto);
  }
}
