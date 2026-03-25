import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument } from '../reports/schemas/reports.schema';
import { Crisis, CrisisDocument } from '../crisis/schemas/crisis.schema';
import { Alert, AlertDocument } from '../alerts/schemas/alert.schema';

@Injectable()
export class StatsService {

  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
    @InjectModel(Crisis.name) private crisisModel: Model<CrisisDocument>,
    @InjectModel(Alert.name) private alertModel: Model<AlertDocument>,
  ) { }

  async getOverview() {

    const reports = await this.reportModel.countDocuments();
    const crisis = await this.crisisModel.countDocuments();
    const alerts = await this.alertModel.countDocuments();

    return {
      reports,
      crisis,
      alerts,
    };
  }

  async crisisByType() {

  return this.crisisModel.aggregate([
  {
    $group: {
      _id: "$severity",
      total: { $sum: 1 }
    }
  }
]);
  }

  async resolutionTime() {

    return this.crisisModel.aggregate([
      {
        $match: { status: "RESOLUE" }
      },
      {
        $project: {
          type: "$type",
          resolutionTime: {
            $divide: [
              { $subtract: ["$updatedAt", "$createdAt"] },
              1000 * 60 * 60
            ]
          }
        }
      }
    ]);
  }
}