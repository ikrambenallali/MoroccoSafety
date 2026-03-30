import { Test, TestingModule } from '@nestjs/testing';
import { MediaService } from './media.service';
import { getModelToken } from '@nestjs/mongoose';
import { Media } from './schemas/media.schema';

describe('MediaService', () => {
  let service: MediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
        {
          provide: getModelToken(Media.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MediaService>(MediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
