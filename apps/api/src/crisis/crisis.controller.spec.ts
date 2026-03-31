import { Test, TestingModule } from '@nestjs/testing';
import { CrisisService } from './crisis.service';
import { getModelToken } from '@nestjs/mongoose';
import { Crisis } from './schemas/crisis.schema';
import { AlertsService } from 'src/alerts/alerts.service';

describe('CrisisService', () => {
  let service: CrisisService;

  const mockCrisis = {
    _id: '123',
    title: 'Test Crisis',
    description: 'Test Description',
    severity: 'high',
    status: 'EN_COURS',
    type: 'flood',
    zone: { latitude: 33.5, longitude: -7.5 },
    save: jest.fn().mockResolvedValue({
      _id: '123',
      title: 'Test Crisis',
      description: 'Test Description',
      zone: { latitude: 33.5, longitude: -7.5 },
    }),
  };

  const mockCrisisModel = jest.fn().mockImplementation(() => mockCrisis);
  mockCrisisModel.find = jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([mockCrisis]) });
  mockCrisisModel.findById = jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockCrisis) });
  mockCrisisModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockCrisis);
  mockCrisisModel.findByIdAndDelete = jest.fn().mockResolvedValue(mockCrisis);

  const mockAlertsService = {
    create: jest.fn().mockResolvedValue({ _id: 'alert123' }),
    sendAlert: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrisisService,
        {
          provide: getModelToken(Crisis.name),
          useValue: mockCrisisModel,
        },
        {
          provide: AlertsService,
          useValue: mockAlertsService,
        },
      ],
    }).compile();

    service = module.get<CrisisService>(CrisisService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw if location is outside Morocco', async () => {
      await expect(
        service.create({
          title: 'Out of bounds',
          description: 'desc',
          severity: 'low',
          type: 'flood',
          zone: { latitude: 48.8, longitude: 2.3 }, // Paris
        })
      ).rejects.toThrow('La localisation doit être située au Maroc.');
    });

    it('should create a crisis and trigger an alert', async () => {
      const result = await service.create({
        title: 'Test Crisis',
        description: 'Test Description',
        severity: 'high',
        type: 'flood',
        zone: { latitude: 33.5, longitude: -7.5 }, // Casablanca
      });

      expect(mockAlertsService.create).toHaveBeenCalled();
      expect(mockAlertsService.sendAlert).toHaveBeenCalledWith('alert123');
      expect(result).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return crises inside Morocco', async () => {
      const result = await service.findAll();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return a crisis by id', async () => {
      const result = await service.findOne('123');
      expect(result).toEqual(mockCrisis);
    });

    it('should throw NotFoundException if not found', async () => {
      mockCrisisModel.findById.mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.findOne('nonexistent')).rejects.toThrow('Crisis not found');
    });
  });

  describe('update', () => {
    it('should update and return the crisis', async () => {
      const result = await service.update('123', { status: 'RESOLUE' });
      expect(result).toEqual(mockCrisis);
    });

    it('should throw NotFoundException if not found', async () => {
      mockCrisisModel.findByIdAndUpdate.mockResolvedValueOnce(null);
      await expect(service.update('bad-id', {})).rejects.toThrow('Crisis not found');
    });
  });

  describe('remove', () => {
    it('should delete a crisis', async () => {
      await expect(service.remove('123')).resolves.not.toThrow();
    });

    it('should throw NotFoundException if not found', async () => {
      mockCrisisModel.findByIdAndDelete.mockResolvedValueOnce(null);
      await expect(service.remove('bad-id')).rejects.toThrow('Crisis not found');
    });
  });
});