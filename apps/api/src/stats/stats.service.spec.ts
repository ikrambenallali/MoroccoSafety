import { Test, TestingModule } from '@nestjs/testing';
import { StatsService } from './stats.service';
import { getModelToken } from '@nestjs/mongoose';
import { Report } from '../reports/schemas/reports.schema';
import { Crisis } from '../crisis/schemas/crisis.schema';
import { Alert } from '../alerts/schemas/alert.schema';

describe('StatsService', () => {
  let service: StatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatsService,
        {
          provide: getModelToken(Report.name),
          useValue: {},
        },
        {
          provide: getModelToken(Crisis.name),
          useValue: {},
        },
        {
          provide: getModelToken(Alert.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<StatsService>(StatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
