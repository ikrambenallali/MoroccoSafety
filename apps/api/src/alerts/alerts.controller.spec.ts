import { Test, TestingModule } from '@nestjs/testing';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';

describe('AlertsController', () => {
  let controller: AlertsController;
  let service: AlertsService;

  const mockAlert = {
    _id: '123',
    title: 'Test Alert',
    description: 'Alert description',
    type: 'crisis',
    status: 'active',
    sentAt: new Date(),
  };

  const mockAlertsService = {
    findAll: jest.fn().mockResolvedValue([mockAlert]),
    create: jest.fn().mockResolvedValue(mockAlert),
    sendAlert: jest.fn().mockResolvedValue({ ...mockAlert, sentAt: new Date(), status: 'sent' }),
    findSentAlerts: jest.fn().mockResolvedValue([mockAlert]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertsController],
      providers: [
        {
          provide: AlertsService,
          useValue: mockAlertsService,
        },
      ],
    }).compile();

    controller = module.get<AlertsController>(AlertsController);
    service = module.get<AlertsService>(AlertsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of alerts', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
    });
  });

  describe('create', () => {
    it('should create a new alert', async () => {
      const alertData = {
        title: 'Test Alert',
        description: 'Alert description',
        type: 'crisis',
      };

      const result = await controller.create(alertData);

      expect(service.create).toHaveBeenCalledWith(alertData);
      expect(result._id).toBe('123');
      expect(result.title).toBe('Test Alert');
    });
  });

  describe('send', () => {
    it('should send an alert', async () => {
      const result = await controller.send('123');

      expect(service.sendAlert).toHaveBeenCalledWith('123');
      expect(result.status).toBe('sent');
    });
  });

  describe('findSent', () => {
    it('should return sent alerts', async () => {
      const result = await controller.findSent();

      expect(service.findSentAlerts).toHaveBeenCalled();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
