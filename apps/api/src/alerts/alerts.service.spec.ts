import { Test, TestingModule } from '@nestjs/testing';
import { AlertsService } from './alerts.service';
import { getModelToken } from '@nestjs/mongoose';
import { Alert } from './schemas/alert.schema';
import { NotificationsGateway } from '../notifications/notifications.gateway';

describe('AlertsService', () => {
  let service: AlertsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlertsService,
        {
          provide: getModelToken(Alert.name),
          useValue: {},
        },
        {
          provide: NotificationsGateway,
          useValue: { sendAlert: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<AlertsService>(AlertsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
