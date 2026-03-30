import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    const mockAuthService = {
        register: jest.fn().mockResolvedValue({
            _id: '123',
            email: 'test@example.com',
            role: 'citizen',
        }),
        login: jest.fn().mockResolvedValue({
            access_token: 'jwt-token-123',
            user: { _id: '123', email: 'test@example.com', role: 'citizen' },
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('register', () => {
        it('should register a new user', async () => {
            const registerDto: RegisterDto = {
                email: 'test@example.com',
                password: 'password123',
                firstName: 'John',
                lastName: 'Doe',
            };

            const result = await controller.register(registerDto);

            expect(service.register).toHaveBeenCalledWith(registerDto);
            expect(result).toHaveProperty('_id');
            expect(result.email).toBe('test@example.com');
        });
    });

    describe('login', () => {
        it('should login user and return token', async () => {
            const loginDto: LoginDto = {
                email: 'test@example.com',
                password: 'password123',
            };

            const result = await controller.login(loginDto);

            expect(service.login).toHaveBeenCalledWith(loginDto);
            expect(result).toHaveProperty('access_token');
            expect(result.access_token).toBe('jwt-token-123');
        });
    });
});
