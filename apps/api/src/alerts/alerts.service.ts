import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Alert, AlertDocument } from './schemas/alert.schema';
import { Model } from 'mongoose';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Injectable()
export class AlertsService {
  constructor(
    @InjectModel(Alert.name) private alertModel: Model<AlertDocument>,
    private notificationsGateway: NotificationsGateway
  ) { }

  async create(data: any) {
    const alert = new this.alertModel(data);
    return alert.save();
  }

  async findAll() {
    return this.alertModel.find().exec();
  }

  async sendAlert(id: string) {
    const alert = await this.alertModel.findById(id);

    if (!alert) {
      throw new Error('Alert not found');
    }

    alert.sent = true;
    await alert.save();

    console.log('📢 Envoi d\'alerte via socket:', alert);
    this.notificationsGateway.sendAlert(alert);

    return alert;
  }
}