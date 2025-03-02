
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(private usersService: UserService, private jwtService: JwtService) 
  {
  }

  async signIn(username: string, password: string) : Promise<{ access_token: string }> {
    
    if (!username) {
        throw new UnauthorizedException();
    }

    const user = await this.usersService.findOne(username);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
