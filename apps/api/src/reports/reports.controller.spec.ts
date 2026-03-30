import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';

describe('ReportsController', () => {
  let controller: ReportsController;
  let service: ReportsService;

  const mockReport = {
    _id: '123',
    title: 'Test Report',
    description: 'Test description',
    location: { type: 'Point', coordinates: [0, 0] },
    status: 'pending',
    userId: 'user123',
    createdAt: new Date(),
  };

  const mockReportsService = {
    create: jest.fn().mockResolvedValue(mockReport),
    findAll: jest.fn().mockResolvedValue([mockReport]),
    validateReport: jest.fn().mockResolvedValue({ ...mockReport, status: 'validated' }),
    rejectReport: jest.fn().mockResolvedValue({ ...mockReport, status: 'rejected' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        {
          provide: ReportsService,
          useValue: mockReportsService,
        },
      ],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
    service = module.get<ReportsService>(ReportsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new report', async () => {
      const createReportDto: CreateReportDto = {
        title: 'Test Report',
        description: 'Test description',
        location: { type: 'Point', coordinates: [0, 0] },
      };

      const req = { user: { id: 'user123' } };
      const result = await controller.create(createReportDto, req);

      expect(service.create).toHaveBeenCalledWith(createReportDto, 'user123');
      expect(result._id).toBe('123');
      expect(result.title).toBe('Test Report');
    });
  });

  describe('findAll', () => {
    it('should return an array of reports', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
    });
  });

  describe('validate', () => {
    it('should validate a report', async () => {
      const result = await controller.validate('123');

      expect(service.validateReport).toHaveBeenCalledWith('123');
      expect(result.status).toBe('validated');
    });
  });

  describe('reject', () => {
    it('should reject a report', async () => {
      const result = await controller.reject('123');

      expect(service.rejectReport).toHaveBeenCalledWith('123');
      expect(result.status).toBe('rejected');
    });
  });
});
