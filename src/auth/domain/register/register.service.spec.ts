import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from './register.service';
import { UserService } from '../../../user/user.service';
import { UserModule } from '../../../user/user.module';
import { PrismaService } from '../../../prisma.service';

describe('RegisterService', () => {
  let service: RegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      providers: [RegisterService, UserService, PrismaService],
    }).compile();

    service = module.get<RegisterService>(RegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
