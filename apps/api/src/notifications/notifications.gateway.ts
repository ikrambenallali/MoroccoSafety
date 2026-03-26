import {
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class NotificationsGateway {

  @WebSocketServer()
  server: Server;

  sendAlert(alert: any) {
    console.log('📢 Envoi d\'alerte via socket:', alert);
    this.server.emit('alert', alert);
  }

}