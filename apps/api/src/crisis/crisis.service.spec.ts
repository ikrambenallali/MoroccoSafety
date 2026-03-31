import { Test, TestingModule } from '@nestjs/testing';
import { CrisisService } from './crisis.service';
import { getModelToken } from '@nestjs/mongoose';
import { Crisis } from './schemas/crisis.schema';
import { AlertsService } from 'src/alerts/alerts.service'; // ✅ ajouter

describe('CrisisService', () => {
  let service: CrisisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrisisService,
        {
          provide: getModelToken(Crisis.name),
          useValue: {},
        },
        {                                    // ✅ ajouter
          provide: AlertsService,
          useValue: {
            create: jest.fn(),
            sendAlert: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CrisisService>(CrisisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});