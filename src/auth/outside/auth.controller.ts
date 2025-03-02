
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginService } from '../application/login/login.service';
import { Public } from './constants';


@Controller('auth')
export class AuthController {
  constructor(private authService: LoginService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
