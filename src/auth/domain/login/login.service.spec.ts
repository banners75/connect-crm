import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { UserService } from '../../../user/user.service';
import { JwtService } from '@nestjs/jwt';

describe('LoginService', () => {
  let service: LoginService;

  const mockJwtService = {};

  const mockUserService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService, 
        {
          provide: UserService,
          useValue: mockUserService
        },
        {
          provide: JwtService,
          useValue: mockJwtService
        }
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return access token', async () => {
    const username = 'test';
    const password = 'test';
    const user = {
      userId: 1,
      username: 'test',
      password: 'test',
    }; 

    const access = 'access token';
    mockUserService.findOne.mockResolvedValue(user);
    mockJwtService['signAsync'] = jest.fn().mockResolvedValue(access);
    expect(await service.signIn(username, password)).toEqual({ access_token: access });
  }
  );

  it('should throw UnauthorizedException when username is not present', async () => {
    const username = '';
    const password = 'test';
    await expect(service.signIn(username, password)).rejects.toThrow();
  }
  );

  it('should throw UnauthorizedException when password is incorrect', async () => {
    
    const username= 'test';
    const password = 'incorrect password';

    const user = {
      userId: 1,
      username: 'test',
      password: 'actual password',
    };

    mockUserService.findOne.mockResolvedValue(user);
    await expect(service.signIn(username, password)).rejects.toThrow();
  }
  );

  it('should throw UnauthorizedException when user is not found', async () => {
    const username = 'unknown user';
    const password = 'any';
    mockUserService.findOne.mockResolvedValue(undefined);
    await expect(service.signIn(username, password)).rejects.toThrow();
  }
  );
});
