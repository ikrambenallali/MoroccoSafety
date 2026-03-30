import { Test, TestingModule } from '@nestjs/testing';
import { ZonesService } from './zones.service';
import { getModelToken } from '@nestjs/mongoose';
import { Zone } from './schemas/zones.schema';

describe('ZonesService', () => {
  let service: ZonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZonesService,
        {
          provide: getModelToken(Zone.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ZonesService>(ZonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
