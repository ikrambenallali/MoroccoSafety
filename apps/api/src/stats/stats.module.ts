import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from '../reports/schemas/reports.schema';
import { Crisis, CrisisSchema } from '../crisis/schemas/crisis.schema';
import { Alert, AlertSchema } from '../alerts/schemas/alert.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema },
      { name: Crisis.name, schema: CrisisSchema },
      { name: Alert.name, schema: AlertSchema },
    ]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}