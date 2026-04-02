import { Test, TestingModule } from '@nestjs/testing';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

describe('StatsController', () => {
  let controller: StatsController;
  let service: StatsService;

  const mockOverview = {
    totalCrises: 10,
    activeCrises: 3,
    resolvedCrises: 7,
    totalReports: 25,
    totalAlerts: 50,
  };

  const mockCrisisByType = [
    { type: 'flood', count: 5 },
    { type: 'fire', count: 3 },
    { type: 'earthquake', count: 2 },
  ];

  const mockResolutionTime = {
    avgTime: '2.5 hours',
    fastest: '0.5 hours',
    slowest: '8 hours',
  };

  const mockStatsService = {
    getOverview: jest.fn().mockResolvedValue(mockOverview),
    crisisByType: jest.fn().mockResolvedValue(mockCrisisByType),
    resolutionTime: jest.fn().mockResolvedValue(mockResolutionTime),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [
        {
          provide: StatsService,
          useValue: mockStatsService,
        },
      ],
    }).compile();

    controller = module.get<StatsController>(StatsController);
    service = module.get<StatsService>(StatsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('overview', () => {
    it('should return statistics overview', async () => {
      const result = await controller.overview();

      expect(service.getOverview).toHaveBeenCalled();
      expect(result).toHaveProperty('totalCrises');
      expect(result).toHaveProperty('activeCrises');
      expect(result.totalCrises).toBe(10);
    });
  });

  describe('crisisByType', () => {
    it('should return crises grouped by type', async () => {
      const result = await controller.crisisByType();

      expect(service.crisisByType).toHaveBeenCalled();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(3);
      expect(result[0]).toHaveProperty('type');
      expect(result[0]).toHaveProperty('count');
    });
  });


});
