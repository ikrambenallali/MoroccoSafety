import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {

  async sendNotification(title: string, message: string, zone: string) {

    console.log('Notification envoyée');
    console.log('Zone:', zone);
    console.log('Titre:', title);
    console.log('Message:', message);

    return true;
  }

}