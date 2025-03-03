import { Module } from '@nestjs/common';
import { LoginService } from '../domain/login/login.service';
import { LogoutService } from '../domain/logout/logout.service';
import { RegisterService } from '../domain/register/register.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    LoginService, 
    LogoutService, 
    RegisterService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  
  controllers: [AuthController]
})
export class AuthModule {}
