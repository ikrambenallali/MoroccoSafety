import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {

  constructor(private statsService: StatsService) {}

  @Get('overview')
  overview() {
    return this.statsService.getOverview();
  }

  @Get('crisis-by-type')
  crisisByType() {
    return this.statsService.crisisByType();
  }

 

}