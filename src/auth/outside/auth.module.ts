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
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [
    LoginService, 
    LogoutService, 
    RegisterService,
    UserService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  
  controllers: [AuthController]
})
export class AuthModule {}
