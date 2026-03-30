import { Test, TestingModule } from '@nestjs/testing';
import { ZonesController } from './zones.controller';
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';

describe('ZonesController', () => {
  let controller: ZonesController;
  let service: ZonesService;

  const mockZone = {
    _id: '123',
    name: 'Zone 1',
    description: 'Test zone',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-5.5, 33.5],
          [-5.5, 33.6],
          [-5.4, 33.6],
          [-5.4, 33.5],
          [-5.5, 33.5],
        ],
      ],
    },
    riskLevel: 'high',
    createdAt: new Date(),
  };

  const mockZonesService = {
    create: jest.fn().mockResolvedValue(mockZone),
    findAll: jest.fn().mockResolvedValue([mockZone]),
    findOne: jest.fn().mockResolvedValue(mockZone),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZonesController],
      providers: [
        {
          provide: ZonesService,
          useValue: mockZonesService,
        },
      ],
    }).compile();

    controller = module.get<ZonesController>(ZonesController);
    service = module.get<ZonesService>(ZonesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new zone', async () => {
      const createZoneDto: CreateZoneDto = {
        name: 'Zone 1',
        description: 'Test zone',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-5.5, 33.5],
              [-5.5, 33.6],
              [-5.4, 33.6],
              [-5.4, 33.5],
              [-5.5, 33.5],
            ],
          ],
        },
        riskLevel: 'high',
      };

      const result = await controller.create(createZoneDto);

      expect(service.create).toHaveBeenCalledWith(createZoneDto);
      expect(result._id).toBe('123');
      expect(result.name).toBe('Zone 1');
    });
  });

  describe('findAll', () => {
    it('should return an array of zones', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a single zone', async () => {
      const result = await controller.findOne('123');

      expect(service.findOne).toHaveBeenCalledWith('123');
      expect(result._id).toBe('123');
      expect(result.name).toBe('Zone 1');
    });
  });
});
