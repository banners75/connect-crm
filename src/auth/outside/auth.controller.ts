
import { Body, Controller, Post, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { LoginService } from '../domain/login/login.service';
import { Public } from './constants';
import { RegisterService } from '../domain/register/register.service';


@Controller('auth')
export class AuthController {
  constructor(private authService: LoginService, private registerService: RegisterService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @Post('register')
  register(@Body() registerDto: Record<string, any>) {
    return this.registerService.register(registerDto.username, registerDto.password).catch(() => {
      throw new HttpException('Username already exists', HttpStatus.FORBIDDEN);
    });
  }
}
