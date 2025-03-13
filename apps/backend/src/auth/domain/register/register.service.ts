import { Injectable } from '@nestjs/common';
import { User, UserService } from '../../../user/user.service';

@Injectable()
export class RegisterService {
  constructor(private userService: UserService) {}

  async register(username: string, password: string): Promise<User> {
    return this.userService.create(username, password).catch((error: Error) => {
      throw new Error('username already exists', error);
    });
  }
}
