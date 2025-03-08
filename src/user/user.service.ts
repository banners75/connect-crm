
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';


export type User = any;

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService) { }

  async create(username: any, password: any): Promise<User> {

    await this.findOne(username).then((user) => {

      if (user) {
        throw new Error("username already exists");
      } else {
        return this.prismaService.user.create(
          {
            data: {
              username: username,
              password: password
            }
          });
      }
    });
  }

  async findOne(username: string): Promise<User | undefined> {

    var user = this.prismaService.user.findUnique({
      where: {
        username: username
      }
    });

    return user;
  }
}
