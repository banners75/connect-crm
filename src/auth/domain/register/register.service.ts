import { Injectable } from '@nestjs/common';
import { User, UserService } from 'src/user/user.service';

@Injectable()
export class RegisterService {

    constructor(private userService: UserService) { }

    async register(username: any, password: any): Promise<User> {
        
        return await this.userService.create(username, password).catch((error) => {
            throw new Error("username already exists", error);
        });
    }
}
