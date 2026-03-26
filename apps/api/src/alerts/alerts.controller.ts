import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AlertsService } from './alerts.service';

@Controller('alerts')
export class AlertsController {

  constructor(private alertsService: AlertsService) { }

  @Get()
  findAll() {
    return this.alertsService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.alertsService.create(body);
  }

  @Post(':id/send')
  send(@Param('id') id: string) {
    return this.alertsService.sendAlert(id);
  }

}