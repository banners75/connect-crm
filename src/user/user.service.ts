import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export type User = any;

@Injectable()
export class UserService {
  //TODO: Prisma service should be called from repository

  constructor(private prismaService: PrismaService) {}

  async create(username: any, password: any): Promise<User> {
    return this.findOne(username).then((user) => {
      if (user) {
        throw new Error('username already exists');
      } else {
        return this.prismaService.user.create({
          data: {
            username: username,
            password: password,
          },
        });
      }
    });
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = this.prismaService.user.findUnique({
      where: {
        username: username,
      },
    });

    return user;
  }
}
