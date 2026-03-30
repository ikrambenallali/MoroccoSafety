import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = {
    _id: '123',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'citizen',
    phone: '1234567890',
  };

  const mockUsersService = {
    getProfile: jest.fn().mockResolvedValue(mockUser),
    updateProfile: jest.fn().mockResolvedValue({ ...mockUser, firstName: 'Jane' }),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    updateRole: jest.fn().mockResolvedValue({ ...mockUser, role: 'authority' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      const req = { user: { id: '123' } };
      const result = await controller.getProfile(req);

      expect(service.getProfile).toHaveBeenCalledWith('123');
      expect(result._id).toBe('123');
      expect(result.email).toBe('test@example.com');
    });
  });

  describe('updateProfile', () => {
    it('should update user profile', async () => {
      const req = { user: { id: '123' } };
      const updateUserDto: UpdateUserDto = {
        firstName: 'Jane',
        lastName: 'Doe',
      };

      const result = await controller.updateProfile(req, updateUserDto);

      expect(service.updateProfile).toHaveBeenCalledWith('123', updateUserDto);
      expect(result.firstName).toBe('Jane');
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
    });
  });

  describe('updateRole', () => {
    it('should update user role', async () => {
      const body = { userId: '123', role: 'authority' };
      const result = await controller.updateRole(body);

      expect(service.updateRole).toHaveBeenCalledWith('123', 'authority');
      expect(result.role).toBe('authority');
    });
  });
});
