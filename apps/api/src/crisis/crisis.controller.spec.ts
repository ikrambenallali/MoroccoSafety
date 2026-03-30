import { Test, TestingModule } from '@nestjs/testing';
import { CrisisController } from './crisis.controller';
import { CrisisService } from './crisis.service';
import { CreateCrisisDto } from './dto/create-crisis.dto';
import { UpdateCrisisDto } from './dto/update-crisis.dto';

describe('CrisisController', () => {
  let controller: CrisisController;
  let service: CrisisService;

  const mockCrisis = {
    _id: '123',
    title: 'Test Crisis',
    description: 'Test Description',
    severity: 'high',
    status: 'EN_COURS',
    type: 'flood',
    zone: { latitude: 33.5, longitude: -7.5 },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCrisisService = {
    create: jest.fn().mockResolvedValue(mockCrisis),
    findAll: jest.fn().mockResolvedValue([mockCrisis]),
    findOne: jest.fn().mockResolvedValue(mockCrisis),
    update: jest.fn().mockResolvedValue(mockCrisis),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrisisController],
      providers: [
        {
          provide: CrisisService,
          useValue: mockCrisisService,
        },
      ],
    }).compile();

    controller = module.get<CrisisController>(CrisisController);
    service = module.get<CrisisService>(CrisisService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a crisis', async () => {
      const createDto: CreateCrisisDto = {
        title: 'New Crisis',
        description: 'New Description',
        severity: 'critical',
        type: 'earthquake',
        zone: { latitude: 33.5, longitude: -7.5 },
      };

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockCrisis);
    });
  });

  describe('findAll', () => {
    it('should return array of crises', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return single crisis by id', async () => {
      const result = await controller.findOne('123');

      expect(service.findOne).toHaveBeenCalledWith('123');
      expect(result).toEqual(mockCrisis);
    });
  });

  describe('update', () => {
    it('should update a crisis', async () => {
      const updateDto: UpdateCrisisDto = { status: 'RESOLUE' };

      const result = await controller.update('123', updateDto);

      expect(service.update).toHaveBeenCalledWith('123', updateDto);
      expect(result).toEqual(mockCrisis);
    });
  });

  describe('remove', () => {
    it('should delete a crisis', async () => {
      const result = await controller.remove('123');

      expect(service.remove).toHaveBeenCalledWith('123');
      expect(result).toEqual({ deleted: true });
    });
  });
});
