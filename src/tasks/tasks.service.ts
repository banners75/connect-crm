import { Injectable } from '@nestjs/common';
import { ITasksService } from './ports/tasks.service';

@Injectable()
export class TasksService implements ITasksService {
    listTasks() {
        var tasks = [
            {
              id: 1,
              title: 'Service Task 1',
              description: 'Description 1',
              done: false,
            },
            {
              id: 2,
              title: 'Service Task 2',
              description: 'Description 2',
              done: false,
            }
          ]

          return tasks;
    }
}
