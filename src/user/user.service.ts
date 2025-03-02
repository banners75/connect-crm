
import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'paul',
      password: 'password',
    },
    {
      userId: 2,
      username: 'hattie',
      password: 'batboo',
    },
    {
      userId: 3,
      username: 'sophie',
      password: 'urangel',
    }
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
