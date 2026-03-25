import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument, ReportStatus } from './schemas/reports.schema';
import { Crisis, CrisisDocument } from '../crisis/schemas/crisis.schema';

@Injectable()
export class ReportsService {

    constructor(
        @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
        @InjectModel(Crisis.name) private crisisModel: Model<CrisisDocument>,
    ) { }

    async create(createReportDto: CreateReportDto, userId: string) {
        const report = new this.reportModel({
            ...createReportDto,
            userId,
        });

        return report.save();
    }

    async findAll() {
        return this.reportModel.find().populate('userId');
    }

    async validateReport(id: string) {

        const report = await this.reportModel.findById(id);

        if (!report) {
            throw new NotFoundException('Report not found');
        }

        report.status = ReportStatus.VALIDATED;
        await report.save();

        const crisis = new this.crisisModel({
            title: 'Incident signalé',
            description: report.description,
            zone: report.location,
            status: 'SIGNALEE',
            severity: 'MEDIUM',
        });

        await crisis.save();

        return report;
    }

    async rejectReport(id: string) {

        const report = await this.reportModel.findByIdAndUpdate(
            id,
            { status: 'rejected' },
            { new: true }
        );

        return report;
    }
}