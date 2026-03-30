import { Test, TestingModule } from '@nestjs/testing';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

describe('MediaController', () => {
  let controller: MediaController;
  let service: MediaService;

  const mockMedia = {
    _id: '123',
    filename: 'test-file.jpg',
    originalname: 'test-file.jpg',
    path: '/uploads/test-file.jpg',
    size: 1024,
    createdAt: new Date(),
    toObject: jest.fn().mockReturnValue({
      _id: '123',
      filename: 'test-file.jpg',
      originalname: 'test-file.jpg',
      path: '/uploads/test-file.jpg',
      size: 1024,
    }),
  };

  const mockMediaService = {
    create: jest.fn().mockResolvedValue(mockMedia),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [
        {
          provide: MediaService,
          useValue: mockMediaService,
        },
      ],
    }).compile();

    controller = module.get<MediaController>(MediaController);
    service = module.get<MediaService>(MediaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('upload', () => {
    it('should upload a file', async () => {
      const mockFile: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'test-file.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: '/uploads',
        filename: 'test-file.jpg',
        path: '/uploads/test-file.jpg',
        size: 1024,
        buffer: Buffer.from('test'),
      };

      const result = await controller.upload(mockFile);

      expect(service.create).toHaveBeenCalledWith(mockFile);
      expect(result).toHaveProperty('url');
      expect(result.url).toContain('http://localhost:3000/uploads/');
    });
  });
});
