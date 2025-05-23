import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class LoginService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    if (!username) {
      throw new UnauthorizedException();
    }

    const user = (await this.userService.findOne(username)) as User;

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
