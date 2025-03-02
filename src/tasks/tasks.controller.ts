import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('tasks')
export class TasksController {

    @HttpCode(HttpStatus.OK)
    @Get()
    listTasks() {
        return [
            {
                id: 1,
                title: 'Task 1',
                description: 'Description 1',
                done: false,
            },
            {
                id: 2,
                title: 'Task 2',
                description: 'Description 2',
                done: false,
            }
        ]
    }
}
