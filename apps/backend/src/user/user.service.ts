import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export type User = {
  username: string;
  password: string;
};

@Injectable()
export class UserService {
  //TODO: Prisma service should be called from repository

  constructor(private prismaService: PrismaService) {}

  async create(username: string, password: string): Promise<User> {
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

  async findOne(username: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
