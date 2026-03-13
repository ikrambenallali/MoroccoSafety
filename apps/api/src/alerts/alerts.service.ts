import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Alert, AlertDocument } from './schemas/alert.schema';
import { Model } from 'mongoose';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AlertsService {

  constructor(
    @InjectModel(Alert.name) private alertModel: Model<AlertDocument>,
    private notificationsService: NotificationsService
  ) {}

  async create(data: any) {
    const alert = new this.alertModel(data);
    return alert.save();
  }

  async sendAlert(id: string) {

    const alert = await this.alertModel.findById(id);

    if (!alert) {
      throw new NotFoundException('Alert not found');
    }

    // envoyer notification
    await this.notificationsService.sendNotification(
      alert.title,
      alert.message,
      alert.zone
    );

    alert.sent = true;
    await alert.save();

    return alert;
  }
}