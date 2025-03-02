import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAllTasks  {
    execute() {
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
