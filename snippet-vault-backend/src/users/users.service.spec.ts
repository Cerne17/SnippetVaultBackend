import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let model: any;

  const mockUser = {
    _id: 'someId',
    email: 'test@example.com',
    passwordHash: 'hashedPassword',
    name: 'Test User',
    save: jest.fn().mockResolvedValue({
      _id: 'someId',
      email: 'test@example.com',
      passwordHash: 'hashedPassword',
      name: 'Test User',
    }),
  };

  const mockUserModel = jest.fn().mockImplementation(() => mockUser);
  (mockUserModel as any).findOne = jest.fn();
  (mockUserModel as any).findById = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user with hashed password', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const name = 'Test User';

      jest.spyOn(bcrypt, 'genSalt').mockImplementation(() => Promise.resolve('salt'));
      jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashedPassword'));

      const result = await service.create(email, password, name);

      expect(bcrypt.genSalt).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 'salt');
      expect(mockUserModel).toHaveBeenCalledWith({
        email,
        passwordHash: 'hashedPassword',
        name,
      });
      expect(result).toEqual(expect.objectContaining({
        email,
        name,
      }));
    });
  });

  describe('findOneByEmail', () => {
    it('should find a user by email', async () => {
      const email = 'test@example.com';
      (model.findOne as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      });

      const result = await service.findOneByEmail(email);

      expect(model.findOne).toHaveBeenCalledWith({ email });
      expect(result).toEqual(mockUser);
    });
  });
});
