import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoginService } from '../domain/login/login.service';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../../user/user.module';
import { PrismaService } from '../../prisma.service';
import { RegisterService } from '../domain/register/register.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      controllers: [AuthController],
      providers: [LoginService, UserService, JwtService, PrismaService, RegisterService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
